import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function SocialBar(){
    return(
        <nav id="SocialBar">
            <a href=""><FaLinkedin/></a>
            <a href=""><FaGithub/></a>
            <a href=""><SiGmail/></a>
        </nav>
    )
}
export default SocialBar