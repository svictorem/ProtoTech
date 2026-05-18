const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware manual de CORS para permitir requisições do frontend React (Vite)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Configuração do pool de conexões com o MySQL (Altamente recomendado para estabilidade)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'prototech_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste de conexão
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado com sucesso ao banco de dados MySQL via pool!');
        connection.release();
    } catch (err) {
        console.error('Erro crítico ao conectar ao MySQL:', err.message);
    }
})();

// Helper para codificar os campos SKU, Categoria e Descrição no campo VARCHAR 'descricao'
const encodeDescription = (category, sku, desc) => {
    return `${category || 'Geral'};${sku || ''};${desc || ''}`;
};

// Helper para decodificar o campo 'descricao'
const decodeDescription = (rawDesc) => {
    if (!rawDesc) {
        return { category: 'Geral', sku: '', description: '' };
    }
    const parts = rawDesc.split(';');
    return {
        category: parts[0] || 'Geral',
        sku: parts[1] || '',
        description: parts[2] || ''
    };
};

// ─── ROTAS CRUD DE PRODUTOS ──────────────────────────────────────────

// 1. GET - Listar todos os produtos (com Estoque e Fornecedor)
app.get('/api/produtos', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id_produto, p.nome_produto, p.descricao as raw_desc, 
                p.preco_custo, p.preco_venda, p.estoque_minimo, p.id_fornecedor,
                e.quantidade_atual, e.localizacao_prateleira,
                f.razao_social as fornecedor_nome
            FROM Produto p
            LEFT JOIN Estoque e ON p.id_produto = e.id_produto
            LEFT JOIN Fornecedor f ON p.id_fornecedor = f.id_fornecedor
        `;
        const [rows] = await pool.query(query);

        // Mapeia o resultado do banco para o formato esperado pelo React Frontend
        const produtos = rows.map(r => {
            const decoded = decodeDescription(r.raw_desc);
            return {
                id: r.id_produto,
                name: r.nome_produto,
                category: decoded.category,
                sku: decoded.sku || `PRD-${r.id_produto}`,
                description: decoded.description,
                cost: parseFloat(r.preco_custo),
                price: parseFloat(r.preco_venda),
                minStock: r.estoque_minimo,
                stock: r.quantidade_atual || 0,
                location: r.localizacao_prateleira || '',
                id_fornecedor: r.id_fornecedor,
                supplier: r.fornecedor_nome || 'Sem Fornecedor'
            };
        });

        res.json(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        res.status(500).json({ error: 'Erro ao buscar produtos do banco de dados' });
    }
});

// 2. POST - Criar um novo produto (insere Produto e correspondente Estoque)
app.post('/api/produtos', async (req, res) => {
    const { name, category, sku, description, cost, price, minStock, stock, location, id_fornecedor } = req.body;
    
    // Validação básica de campos obrigatórios
    if (!name || cost === undefined || price === undefined) {
        return res.status(400).json({ error: 'Nome do produto, preço de custo e preço de venda são obrigatórios' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const encodedDesc = encodeDescription(category, sku, description);

        // A. Insere na tabela Produto
        const insertProductQuery = `
            INSERT INTO Produto (nome_produto, descricao, preco_custo, preco_venda, estoque_minimo, id_fornecedor)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [productResult] = await connection.query(insertProductQuery, [
            name,
            encodedDesc,
            parseFloat(cost),
            parseFloat(price),
            parseInt(minStock) || 5,
            id_fornecedor || null
        ]);

        const newProductId = productResult.insertId;

        // B. Insere na tabela Estoque vinculando ao produto recém criado
        const insertStockQuery = `
            INSERT INTO Estoque (id_produto, quantidade_atual, localizacao_prateleira)
            VALUES (?, ?, ?)
        `;
        await connection.query(insertStockQuery, [
            newProductId,
            parseInt(stock) || 0,
            location || 'Sem prateleira'
        ]);

        await connection.commit();

        res.status(201).json({
            message: 'Produto cadastrado com sucesso!',
            id: newProductId
        });
    } catch (err) {
        await connection.rollback();
        console.error('Erro ao salvar produto (transação abortada):', err.message);
        res.status(500).json({ error: 'Erro ao cadastrar produto no banco de dados' });
    } finally {
        connection.release();
    }
});

// 3. PUT - Atualizar produto existente (atualiza Produto e Estoque)
app.put('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, sku, description, cost, price, minStock, stock, location, id_fornecedor } = req.body;

    if (!name || cost === undefined || price === undefined) {
        return res.status(400).json({ error: 'Nome do produto, preço de custo e preço de venda são obrigatórios' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const encodedDesc = encodeDescription(category, sku, description);

        // A. Atualiza a tabela Produto
        const updateProductQuery = `
            UPDATE Produto 
            SET nome_produto = ?, descricao = ?, preco_custo = ?, preco_venda = ?, estoque_minimo = ?, id_fornecedor = ?
            WHERE id_produto = ?
        `;
        await connection.query(updateProductQuery, [
            name,
            encodedDesc,
            parseFloat(cost),
            parseFloat(price),
            parseInt(minStock) || 5,
            id_fornecedor || null,
            id
        ]);

        // B. Atualiza ou insere o estoque correspondente (UPSERT conceitual)
        const updateStockQuery = `
            INSERT INTO Estoque (id_produto, quantidade_atual, localizacao_prateleira)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantidade_atual = ?, localizacao_prateleira = ?
        `;
        await connection.query(updateStockQuery, [
            id,
            parseInt(stock) || 0,
            location || 'Sem prateleira',
            parseInt(stock) || 0,
            location || 'Sem prateleira'
        ]);

        await connection.commit();
        res.json({ message: 'Produto atualizado com sucesso!' });
    } catch (err) {
        await connection.rollback();
        console.error('Erro ao atualizar produto (transação abortada):', err.message);
        res.status(500).json({ error: 'Erro ao atualizar produto no banco de dados' });
    } finally {
        connection.release();
    }
});

// 4. DELETE - Remover produto (remoção em cascata ativada na tabela Estoque)
app.delete('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleteQuery = 'DELETE FROM Produto WHERE id_produto = ?';
        const [result] = await pool.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json({ message: 'Produto excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar produto:', err.message);
        res.status(500).json({ error: 'Erro ao excluir produto do banco de dados' });
    }
});

// Rota auxiliar para obter os fornecedores cadastrados
app.get('/api/fornecedores', async (req, res) => {
    try {
        const query = 'SELECT id_fornecedor, razao_social FROM Fornecedor';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar fornecedores:', err.message);
        res.status(500).json({ error: 'Erro ao buscar fornecedores do banco de dados' });
    }
});

// ─── CLIENTES ROUTES ───────────────────────────────────────────────

// 1. GET - Obter todos os clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const query = 'SELECT id_cliente, nome_cliente, cpf, email, telefone, data_cadastro FROM Cliente';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err.message);
        res.status(500).json({ error: 'Erro ao buscar clientes do banco de dados' });
    }
});

// 2. POST - Criar novo cliente
app.post('/api/clientes', async (req, res) => {
    const { name, cpf, email, phone } = req.body;

    if (!name || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são campos obrigatórios' });
    }

    try {
        const query = 'INSERT INTO Cliente (nome_cliente, cpf, email, telefone) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [name, cpf, email || null, phone || null]);
        res.status(201).json({
            message: 'Cliente cadastrado com sucesso!',
            id: result.insertId
        });
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'CPF já cadastrado para outro cliente' });
        }
        res.status(500).json({ error: 'Erro ao cadastrar cliente no banco de dados' });
    }
});

// 3. PUT - Atualizar cliente
app.put('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, cpf, email, phone } = req.body;

    if (!name || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são campos obrigatórios' });
    }

    try {
        const query = 'UPDATE Cliente SET nome_cliente = ?, cpf = ?, email = ?, telefone = ? WHERE id_cliente = ?';
        const [result] = await pool.query(query, [name, cpf, email || null, phone || null, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.json({ message: 'Cliente atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'CPF já cadastrado para outro cliente' });
        }
        res.status(500).json({ error: 'Erro ao atualizar cliente no banco de dados' });
    }
});

// 4. DELETE - Remover cliente
app.delete('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM Cliente WHERE id_cliente = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        res.json({ message: 'Cliente excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err.message);
        res.status(500).json({ error: 'Erro ao excluir cliente do banco de dados' });
    }
});

// ─── FUNCIONÁRIOS ROUTES ──────────────────────────────────────────

// 1. GET - Obter todos os funcionários (com JOIN para buscar informações do Cargo)
app.get('/api/funcionarios', async (req, res) => {
    try {
        const query = `
            SELECT 
                f.id_funcionario, 
                f.nome_funcionario, 
                f.cpf, 
                f.id_cargo, 
                f.data_admissao, 
                c.nome_cargo, 
                c.salario_base
            FROM Funcionario f
            LEFT JOIN Cargo c ON f.id_cargo = c.id_cargo
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar funcionários:', err.message);
        res.status(500).json({ error: 'Erro ao buscar funcionários do banco de dados' });
    }
});

// 2. POST - Criar novo funcionário
app.post('/api/funcionarios', async (req, res) => {
    const { name, cpf, id_cargo, hire_date } = req.body;

    if (!name || !cpf || !id_cargo) {
        return res.status(400).json({ error: 'Nome, CPF e Cargo são obrigatórios' });
    }

    try {
        const query = 'INSERT INTO Funcionario (nome_funcionario, cpf, id_cargo, data_admissao) VALUES (?, ?, ?, ?)';
        const admissionDate = hire_date ? new Date(hire_date) : new Date();
        const [result] = await pool.query(query, [name, cpf, parseInt(id_cargo), admissionDate]);

        res.status(201).json({
            message: 'Funcionário cadastrado com sucesso!',
            id: result.insertId
        });
    } catch (err) {
        console.error('Erro ao cadastrar funcionário:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'CPF já cadastrado para outro funcionário' });
        }
        res.status(500).json({ error: 'Erro ao cadastrar funcionário no banco de dados' });
    }
});

// 3. PUT - Atualizar funcionário
app.put('/api/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const { name, cpf, id_cargo, hire_date } = req.body;

    if (!name || !cpf || !id_cargo) {
        return res.status(400).json({ error: 'Nome, CPF e Cargo são obrigatórios' });
    }

    try {
        const query = 'UPDATE Funcionario SET nome_funcionario = ?, cpf = ?, id_cargo = ?, data_admissao = ? WHERE id_funcionario = ?';
        const admissionDate = hire_date ? new Date(hire_date) : new Date();
        const [result] = await pool.query(query, [name, cpf, parseInt(id_cargo), admissionDate, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.json({ message: 'Funcionário atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar funcionário:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'CPF já cadastrado para outro funcionário' });
        }
        res.status(500).json({ error: 'Erro ao atualizar funcionário no banco de dados' });
    }
});

// 4. DELETE - Remover funcionário
app.delete('/api/funcionarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM Funcionario WHERE id_funcionario = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.json({ message: 'Funcionário excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar funcionário:', err.message);
        res.status(500).json({ error: 'Erro ao excluir funcionário do banco de dados' });
    }
});

// Helper - Rota para carregar Cargos
app.get('/api/cargos', async (req, res) => {
    try {
        const query = 'SELECT id_cargo, nome_cargo, salario_base FROM Cargo';
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar cargos:', err.message);
        res.status(500).json({ error: 'Erro ao buscar cargos do banco de dados' });
    }
});

// ─── VENDAS ROUTES ─────────────────────────────────────────────────

// 1. GET - Obter todas as vendas
app.get('/api/vendas', async (req, res) => {
    try {
        const query = `
            SELECT 
                v.id_venda,
                c.nome_cliente,
                n.valor_total,
                n.data_emissao,
                v.status_venda,
                (SELECT COUNT(*) FROM ItemNotaFiscal WHERE id_nota = n.id_nota) AS total_itens
            FROM Venda v
            JOIN Cliente c ON v.id_cliente = c.id_cliente
            JOIN NotaFiscal n ON v.id_nota = n.id_nota
            ORDER BY n.data_emissao DESC
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar vendas:', err.message);
        res.status(500).json({ error: 'Erro ao buscar vendas do banco de dados' });
    }
});

// 2. POST - Criar nova venda com controle transacional e baixa automática de estoque
app.post('/api/vendas', async (req, res) => {
    const { id_cliente, items } = req.body; // items: [{ id_produto, quantidade, preco_unitario }]

    if (!id_cliente || !items || items.length === 0) {
        return res.status(400).json({ error: 'Cliente e itens são obrigatórios' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Obter ou cadastrar um funcionário padrão para a venda se nenhum existir
        let id_funcionario = null;
        const [funcs] = await connection.query('SELECT id_funcionario FROM Funcionario LIMIT 1');
        if (funcs.length > 0) {
            id_funcionario = funcs[0].id_funcionario;
        } else {
            // Insere um cargo padrão e funcionário padrão caso esteja tudo zerado
            let id_cargo = null;
            const [cargos] = await connection.query("SELECT id_cargo FROM Cargo LIMIT 1");
            if (cargos.length > 0) {
                id_cargo = cargos[0].id_cargo;
            } else {
                const [newCargo] = await connection.query(
                    "INSERT INTO Cargo (nome_cargo, salario_base, descricao_atribuicoes) VALUES ('Administrador', 3000.00, 'Administração geral')"
                );
                id_cargo = newCargo.insertId;
            }
            const [newFunc] = await connection.query(
                "INSERT INTO Funcionario (nome_funcionario, cpf, id_cargo) VALUES ('Admin Padrão', '000.000.000-00', ?)",
                [id_cargo]
            );
            id_funcionario = newFunc.insertId;
        }

        // Calcular valor total da venda e criar a Nota Fiscal (tipo SAIDA)
        let valor_total = 0.00;
        for (const item of items) {
            valor_total += parseFloat(item.preco_unitario) * parseInt(item.quantidade);
        }

        const numero_nf = 'NF-' + Math.floor(100000 + Math.random() * 900000);
        const [nfResult] = await connection.query(
            "INSERT INTO NotaFiscal (numero_nf, tipo_operacao, valor_total) VALUES (?, 'SAIDA', ?)",
            [numero_nf, valor_total]
        );
        const id_nota = nfResult.insertId;

        // Inserir itens da nota fiscal e chamar procedure de baixa no estoque
        for (const item of items) {
            await connection.query(
                "INSERT INTO ItemNotaFiscal (id_nota, id_produto, quantidade, valor_unitario) VALUES (?, ?, ?, ?)",
                [id_nota, item.id_produto, item.quantidade, item.preco_unitario]
            );

            // procedure sp_AtualizarSaldoEstoque trata a saída e dispara trigger de alertas
            await connection.query(
                "CALL sp_AtualizarSaldoEstoque(?, ?, 'SAIDA')",
                [item.id_produto, item.quantidade]
            );
        }

        // Criar o registro físico da Venda
        const [vendaResult] = await connection.query(
            "INSERT INTO Venda (id_cliente, id_funcionario, id_nota, status_venda) VALUES (?, ?, ?, 'CONCLUIDA')",
            [parseInt(id_cliente), id_funcionario, id_nota]
        );

        await connection.commit();
        res.status(201).json({
            message: 'Venda criada com sucesso!',
            id_venda: vendaResult.insertId,
            numero_nf
        });
    } catch (err) {
        await connection.rollback();
        console.error('Erro ao registrar venda:', err.message);
        res.status(500).json({ error: 'Erro ao registrar venda no banco de dados' });
    } finally {
        connection.release();
    }
});

// ─── DASHBOARD ROUTES ──────────────────────────────────────────────

// 1. GET - Obter os produtos mais vendidos (Top Produtos)
app.get('/api/dashboard/top-produtos', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.nome_produto AS name,
                SUM(i.quantidade) AS qty
            FROM ItemNotaFiscal i
            JOIN Produto p ON i.id_produto = p.id_produto
            GROUP BY p.id_produto
            ORDER BY qty DESC
            LIMIT 5
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar top produtos:', err.message);
        res.status(500).json({ error: 'Erro ao buscar top produtos do banco de dados' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});