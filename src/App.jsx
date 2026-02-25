import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Sobre from './pages/sobre'
import Projetos from './pages/projetos'




function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/projetos' element={<Projetos/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
