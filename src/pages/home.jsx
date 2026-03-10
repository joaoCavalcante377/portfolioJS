import './home.css'
import SocialBar from '../components/SocialBar.jsx'

function Home(){
  return (
    <>
      <SocialBar/>
      <main>
        <h1 className="muda-tema">João Cavalcante</h1>
        <p>Desenvolvedor de Software</p>
        <button className="muda-tema" onClick={() => window.open('/CurriculoJoaoCavalcante.pdf', '_blank')}>
  Baixe meu currículo
</button>
      </main>
    </>
  )
}

export default Home