import { useEffect, useRef, useState } from "react"
import "./navbar.css"

function Navbar() {
  const [active, setActive] = useState("home")
  const sliderRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const activeLink = navRef.current?.querySelector(".active")
    const slider = sliderRef.current
    if (activeLink && slider) {
      slider.style.width = `${activeLink.offsetWidth}px`
      slider.style.left = `${activeLink.offsetLeft}px`
    }
  }, [active])

  return (
    <nav className="navbar">
      <div className="links" ref={navRef}>
        <div className="slider" ref={sliderRef}></div>
        <a href="#home" className={`muda-tema ${active === "home" ? "active" : ""}`}>Home</a>
        <a href="#sobre" className={`muda-tema ${active === "sobre" ? "active" : ""}`}>Sobre</a>
        <a href="#projetos" className={`muda-tema ${active === "projetos" ? "active" : ""}`}>Projetos</a>
      </div>
    </nav>
  )
}

export default Navbar