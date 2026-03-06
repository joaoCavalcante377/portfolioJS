import { useState, useEffect } from 'react';
import ColorBends from './ColorBends.jsx';

function Background() {
    const [corBg, setCorBg] = useState("#ffffff");

    useEffect(() => {
        const handleMudaTema = (e) => {
            setCorBg(e.detail);
        };
        
        window.addEventListener('mudaTemaBg', handleMudaTema);
        
        return () => {
            window.removeEventListener('mudaTemaBg', handleMudaTema);
        };
    }, []);

    return (
        <ColorBends
            colors={[corBg]}
            rotation={8}
            speed={0.34}
            scale={1.3}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0}
            parallax={0}
            noise={0}
            transparent
            autoRotate={0}
            color="#f8f7f8"
        />
    );
}

export default Background;