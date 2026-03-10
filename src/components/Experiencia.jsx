import './Experiencia.css'

const EXPERIENCES = [
  {
    title: "Fatec SJC",
    subtitle: "Ensino Superior — DSM",
    period: "2025 — 2028",
    description: "Cursando Desenvolvimento de Software Multiplataforma na Fatec de São José dos Campos, com foco em desenvolvimento web, mobile e sistemas multiplataforma.",
    current: true,
  },
  {
    title: "Alura",
    subtitle: "Cursos Online",
    period: "2024 — 2025",
    description: "Realização de cursos nas áreas de desenvolvimento web, programação e tecnologia, aprofundando conhecimentos em JavaScript, React, Python e boas práticas de programação.",
    current: false,
  },
  {
    title: "Senac SJC",
    subtitle: "Ensino Médio Técnico",
    period: "2022 — 2024",
    description: "Ensino médio integrado ao curso técnico em Desenvolvimento de Sistemas no Senac de São José dos Campos, onde desenvolvi a base em lógica de programação, banco de dados e desenvolvimento web.",
    current: false,
  },
  {
    title: "Elo Educacional",
    subtitle: "Ensino Fundamental",
    period: "2013 — 2021",
    description: "Ensino fundamental completo, consolidando a base educacional e desenvolvendo habilidades de raciocínio lógico e pensamento crítico.",
    current: false,
  },
]

export default function Experience() {
  return (
    <section className="exp-section">
      <h2 className="exp-heading">Minha Trajetória</h2>

      <div className="exp-timeline">
        {EXPERIENCES.map((exp, i) => (
          <div className="exp-item" key={i}>
            {}
            <div className="exp-line-col">
              <div className={`exp-dot ${exp.current ? 'exp-dot-active' : ''}`}>
                {exp.current && <div className="exp-dot-pulse" />}
              </div>
              {i < EXPERIENCES.length - 1 && <div className="exp-line" />}
            </div>

            {}
            <div className={`exp-card ${exp.current ? 'exp-card-active' : ''}`}>
              <div className="exp-card-header">
                <div>
                  <h3 className="exp-title">{exp.title}</h3>
                  <span className="exp-subtitle">{exp.subtitle}</span>
                </div>
                <span className={`exp-period ${exp.current ? 'exp-period-active' : ''}`}>
                  {exp.period}
                </span>
              </div>
              <p className="exp-desc">{exp.description}</p>
              {exp.current && (
                <span className="exp-badge">Cursando</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}