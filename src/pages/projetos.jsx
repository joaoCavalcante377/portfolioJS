import Experience from "../components/Experiencia"
import LogoLoop from "../components/LogoLoop"
import ProjectCarousel from "../components/ProjectCarousel"
import "./projetos.css"

function Projetos(){
    return (
        <>
            <h1>Projetos</h1>
            <ProjectCarousel/>
            <LogoLoop/>
            <Experience/>
        </>
    )
    }

export default Projetos