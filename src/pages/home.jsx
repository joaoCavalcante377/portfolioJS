import './Home.css'
import SocialBar from '../components/SocialBar.jsx'

function Home(){
  return (
    <>
      <SocialBar/>
      <main>
        <h1 className="muda-tema">João Cavalcante</h1>
        <p>Desenvolvedor de Software</p>
        <button className="muda-tema">Baixe meu curriculo</button>
      </main>
    </>
  )
}

export default Home