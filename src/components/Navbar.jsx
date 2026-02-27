import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar(){
    return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/projetos">Projetos</Link>
    </nav>
    )
}

export default Navbar