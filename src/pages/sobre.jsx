import "./sobre.css"
import foto from "../assets/Foto.jpeg"

function Sobre(){
    return (
        <main className="sobreMain">
            <div>
                <h1 className="muda-tema">Quem Sou Eu</h1>
                <p>Me chamo João Vitor Cavalcante de Oliveira e atualmente estou cursando Desenvolvimento de Software Multiplataforma, Busco uma oportunidade para ingressar no mercado de trabalho e contribuir com minhas habilidades para o crescimento da empresa.</p>
            </div>
            <div>
                <img src={foto} alt="foto"></img>
            </div>
        </main>
    )
}

export default Sobre