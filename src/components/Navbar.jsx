import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import "./navbar.css"

function Navbar() {
    const location = useLocation()
    const sliderRef = useRef(null)
    const navRef = useRef(null)

    useEffect(() => {
        const active = navRef.current?.querySelector(".active")
        const slider = sliderRef.current
        if (active && slider) {
            slider.style.width = `${active.offsetWidth}px`
            slider.style.left = `${active.offsetLeft}px`
        }
    }, [location])

    return (
    <nav>
        <div className="links" ref={navRef}>
            <div className="slider" ref={sliderRef}></div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/projetos">Projetos</NavLink>
        </div>
    </nav>
    )
 
}

export default Navbar