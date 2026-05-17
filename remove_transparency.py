#!/usr/bin/env python3
"""Script para remover fundo xadrez (transparência) das imagens PNG"""

from PIL import Image
import os
from pathlib import Path

# Diretório das imagens
assets_dir = Path("prototechWeb/src/assets")
background_color = (248, 249, 250)  # #f8f9fa - cinza claro

def remove_transparency(image_path):
    """Remove transparência e substitui por fundo branco/cinza"""
    try:
        # Abrir imagem
        img = Image.open(image_path)
        
        # Converter para RGBA se necessário
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Criar nova imagem com fundo branco/cinza
        background = Image.new('RGB', img.size, background_color)
        
        # Colar a imagem original sobre o fundo
        background.paste(img, mask=img.split()[3])  # Use alpha channel como mask
        
        # Salvar em PNG
        background.save(image_path, 'PNG')
        print(f"✓ Processada: {image_path.name}")
        
    except Exception as e:
        print(f"✗ Erro em {image_path.name}: {e}")

# Processar todas as imagens PNG
if assets_dir.exists():
    png_files = list(assets_dir.glob("*.png"))
    print(f"Encontradas {len(png_files)} imagens PNG\n")
    
    for png_file in png_files:
        remove_transparency(png_file)
    
    print(f"\n✓ Processamento concluído!")
else:
    print(f"Diretório não encontrado: {assets_dir}")
