import Navbar from './components/Navbar'
import Background from './components/background'
import SeletorDeTema from './components/SeletorDeTema'
import Home from './pages/home'
import Sobre from './pages/sobre'
import Projetos from './pages/projetos'

function App() {
  return (
    <>
      <Background/>
      <SeletorDeTema/>
      <Navbar/>
      <section id="home"><Home /></section>
      <section id="sobre"><Sobre /></section>
      <section id="projetos"><Projetos /></section>
    </>
  )
}

export default App