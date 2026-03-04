import './Home.css'
import SocialBar from '../components/SocialBar.jsx'
import ColorBends from '../components/ColorBends.jsx'

function Home(){
    return (
        <>
            <ColorBends 
                colors={["#fff"]}
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
                color="#f8f7f8"/>
            <SocialBar/>
            <main>
                <h1>João Cavalcante</h1>
                <p>Desenvolvedor de Software</p>
                <button>Baixe meu curriculo</button>
            </main>
        </>
   )
}

export default Home