// npm install devicons-react
import {
  PythonOriginal,
  FigmaOriginal,
  Html5Original,
  Css3Original,
  GithubOriginal,
  MysqlOriginal,
  JupyterOriginal,
  FlaskOriginal,
  JavascriptOriginal,
  ReactOriginal,
  TypescriptOriginal,
} from 'devicons-react'
import './LogoLoop.css'

const LOGOS = [
  { name: "Python",     Icon: PythonOriginal },
  { name: "Figma",      Icon: FigmaOriginal },
  { name: "HTML",       Icon: Html5Original },
  { name: "CSS",        Icon: Css3Original },
  { name: "GitHub",     Icon: GithubOriginal },
  { name: "MySQL",      Icon: MysqlOriginal },
  { name: "Colab",      Icon: JupyterOriginal },
  { name: "Flask",      Icon: FlaskOriginal },
  { name: "JavaScript", Icon: JavascriptOriginal },
  { name: "React",      Icon: ReactOriginal },
  { name: "TypeScript", Icon: TypescriptOriginal },
]

const ITEMS = [...LOGOS, ...LOGOS]

export default function LogoLoop() {
  return (
    <div className="logo-loop-wrapper">
      <div className="logo-loop-fade logo-loop-fade-left" />
      <div className="logo-loop-track">
        <div className="logo-loop-inner">
          {ITEMS.map(({ name, Icon }, i) => (
            <div className="logo-loop-item" key={i}>
              <div className="logo-loop-icon">
                <Icon size="40" />
              </div>
              <span className="logo-loop-name">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="logo-loop-fade logo-loop-fade-right" />
    </div>
  )
}