import './Home.css'
import SocialBar from '../components/SocialBar.jsx'

function Home(){
  return (
    <>
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