import React from 'react';

export default function SeletorDeTema() {
    
    const aplicarTema = (temaEscolhido) => {
        let corDestaque;
        let corFundo;

        switch(temaEscolhido) {
            case 'vermelho':
                corDestaque = '#ff0000';
                corFundo = '#1a0000';
                break;
            case 'roxo':
                corDestaque = '#8a2be2';
                corFundo = '#0d001a';
                break;
            case 'verde':
                corDestaque = '#00ff00';
                corFundo = '#001a00';
                break;
            case 'branco':
            default:
                corDestaque = '#ffffff';
                corFundo = '#121212';
                break;
        }

        document.body.style.backgroundColor = corFundo;
        document.body.style.transition = 'background-color 0.5s ease';

        const elementosParaMudar = document.getElementsByClassName('muda-tema');

        for (let i = 0; i < elementosParaMudar.length; i++) {
            let elemento = elementosParaMudar[i];
            
            elemento.style.color = corDestaque;
            
            if (elemento.tagName === 'BUTTON' || elemento.classList.contains('btn')) {
                elemento.style.borderColor = corDestaque;
            }

            elemento.style.transition = 'all 0.4s ease';
        }

        window.dispatchEvent(new CustomEvent('mudaTemaBg', { detail: corDestaque }));
    }

    return (
        <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center', 
            padding: '15px 25px', 
            position: 'fixed', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            borderRadius: '30px',
            border: '1px solid #333'
        }}>
            <button className="botao-tema muda-tema" onClick={() => aplicarTema('branco')}>Branco</button>
            <button className="botao-tema muda-tema" onClick={() => aplicarTema('vermelho')}>Vermelho</button>
            <button className="botao-tema muda-tema" onClick={() => aplicarTema('roxo')}>Roxo</button>
            <button className="botao-tema muda-tema" onClick={() => aplicarTema('verde')}>Verde</button>
        </div>
    );
}