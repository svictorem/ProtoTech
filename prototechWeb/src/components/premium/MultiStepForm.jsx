import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: '',
  });

  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', borderRadius: '24px' }}>
      
      {/* Progress Bar */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: num < step ? 'var(--color-success)' : num === step ? 'var(--color-cyan)' : 'var(--color-surface2)',
              color: num <= step ? '#fff' : 'var(--color-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: '14px',
              transition: 'all 0.4s ease',
              border: `2px solid ${num === step ? 'var(--color-cyan)' : 'transparent'}`,
              boxShadow: num === step ? '0 0 15px rgba(var(--rgb-cyan), 0.4)' : 'none'
            }}>
              {num < step ? <Check size={18} /> : num}
            </div>
          ))}
        </div>
        <div style={{
          position: 'relative', top: '-18px', height: '4px', background: 'var(--color-surface2)',
          zIndex: 1, borderRadius: '2px', overflow: 'hidden'
        }}>
          <div style={{
            height: '100%', width: `${progress}%`, background: 'var(--color-cyan)',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Form Content */}
      <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {step === 1 && (
          <div className="fade-up">
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Dados Pessoais</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>Como podemos chamar você?</p>
            <input 
              className="inp" 
              placeholder="Nome Completo" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ marginBottom: '16px', padding: '12px' }}
            />
          </div>
        )}
        {step === 2 && (
          <div className="fade-up">
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Contato</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>Onde enviamos as novidades?</p>
            <input 
              className="inp" 
              type="email"
              placeholder="E-mail principal" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={{ marginBottom: '16px', padding: '12px' }}
            />
          </div>
        )}
        {step === 3 && (
          <div className="fade-up">
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Plano</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>Escolha o que melhor se adapta.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {['Básico', 'Pro'].map((p) => (
                <div 
                  key={p}
                  onClick={() => setFormData({...formData, plan: p})}
                  style={{
                    padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)',
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                    background: formData.plan === p ? 'rgba(var(--rgb-cyan), 0.1)' : 'transparent',
                    borderColor: formData.plan === p ? 'var(--color-cyan)' : 'var(--color-border)'
                  }}
                >
                  <strong style={{ fontSize: '18px', color: formData.plan === p ? 'var(--color-cyan)' : 'var(--color-text)' }}>{p}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <button 
          onClick={prevStep}
          disabled={step === 1}
          style={{
            padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'var(--color-surface2)',
            color: step === 1 ? 'var(--color-muted)' : 'var(--color-text)',
            cursor: step === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <ChevronLeft size={18} /> Voltar
        </button>
        <button 
          onClick={step === totalSteps ? () => alert('Finalizado!') : nextStep}
          style={{
            padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'var(--color-cyan)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(var(--rgb-cyan), 0.4)'
          }}
        >
          {step === totalSteps ? 'Finalizar' : 'Avançar'} <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default MultiStepForm;
