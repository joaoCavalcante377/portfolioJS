import { useState } from "react";
import codewave from "../assets/carrinhoDeCompras.png"
import carrinho from "../assets/codewave_projeto.jpeg"
import upload from "../assets/image.png"

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Projeto de Upload de arquivos",
    description: "Feito 100% em JavaScript. É uma aplicação fullstack com uma interface para upload de arquivos no frontend e um servidor no backend para receber e processar esses uploads.",
    img: upload,
  },
  {
    id: 2,
    title: "Projeto API",
    description: "Dashboard web com gráficos e mapa interativo dos dados do Censo 2022 de São José dos Campos, desenvolvido em equipe com Python e Flask.",
    img: carrinho,
  },
  {
    id: 3,
    title: "Projeto de carrinho de compras",
    description: "Interface de e-commerce em HTML, CSS e JS com carrinho de compras funcional.",
    img: codewave,
  },
];

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  function addProject(newProject) {
    const project = { ...newProject, id: Date.now() };
    setProjects((prev) => [...prev, project]);
  }

  return { projects, addProject };
}