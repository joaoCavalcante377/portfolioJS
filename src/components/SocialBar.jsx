import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./SocialBar.css"

function SocialBar(){
    return(
        <nav id="SocialBar">
            <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-cavalcante-de-oliveira-a58879277/"><FaLinkedin/></a>
            <a href="https://github.com/joaoCavalcante377"><FaGithub/></a>
            <a href="mailto:joaocavalcante377@gmail.com"><SiGmail/></a>
        </nav>
    )
}
export default SocialBar