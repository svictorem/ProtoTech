import React from 'react';
import GlassCard from './GlassCard';
import DashboardLayout from './DashboardLayout';
import HeroGradient from './HeroGradient';
import SkeletonLoader from './SkeletonLoader';
import MultiStepForm from './MultiStepForm';
import { useToast } from './ToastSystem';

const Showcase = () => {
  const { addToast } = useToast();

  return (
    <div style={{ padding: '120px 24px 64px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* 1. Hero Gradient */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>5. Hero Animado com Gradient Mesh</h2>
          <p style={{ color: 'var(--color-muted)' }}>Fundo animado e ilustração flutuante premium.</p>
        </div>
        <HeroGradient />
      </section>

      {/* 2. Glassmorphism Cards */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>1. Cards Glassmorphism</h2>
          <p style={{ color: 'var(--color-muted)' }}>Animação de entrada fade-up e efeito 3D ao passar o mouse.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} delay={i * 150}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Glass Card {i}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                Este card utiliza filtros de desfoque de fundo (backdrop-filter) combinados com bordas semi-transparentes para um efeito de vidro fosco.
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 3. Dashboard Layout */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>3. Dashboard Layout</h2>
          <p style={{ color: 'var(--color-muted)' }}>Sidebar colapsável, métricas com contador animado e gráfico Recharts customizado com gradient e tooltip.</p>
        </div>
        <DashboardLayout />
      </section>

      {/* 4. Skeleton Loader */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>6. Skeleton Loader (Shimmer)</h2>
          <p style={{ color: 'var(--color-muted)' }}>Indicador de carregamento suave com animação shimmer infinita.</p>
        </div>
        <SkeletonLoader count={3} />
      </section>

      {/* 5. Toast Notifications */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>4. Toast Notifications</h2>
          <p style={{ color: 'var(--color-muted)' }}>Animação de entrada e saída fluida (slide in/fade out) com auto-dismiss progressivo.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="btn-p" onClick={() => addToast({ type: 'success', message: 'Operação realizada com sucesso!', duration: 5000 })}>
            Toast Sucesso
          </button>
          <button className="btn-d" onClick={() => addToast({ type: 'error', message: 'Falha ao processar os dados.', duration: 5000 })}>
            Toast Erro
          </button>
          <button className="btn-g" onClick={() => addToast({ type: 'info', message: 'Nova atualização disponível.', duration: 5000 })}>
            Toast Info
          </button>
        </div>
      </section>

      {/* 6. Multi-Step Form */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700 }}>7. Multi-Step Form</h2>
          <p style={{ color: 'var(--color-muted)' }}>Barra de progresso animada acompanhando a validação inline das etapas.</p>
        </div>
        <MultiStepForm />
      </section>

    </div>
  );
};

export default Showcase;
