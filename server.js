import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { id: "asc" } });
    res.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

app.post("/projects", async (req, res) => {
  try {
    const { title, description, img } = req.body;
    if (!title || !description || !img) {
      return res.status(400).json({ error: "Título, descrição e imagem são obrigatórios." });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        img,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});

app.put("/projects/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, img } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: { title, description, img },
    });

    res.json(project);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
});

app.delete("/projects/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor Prisma rodando em http://localhost:${port}`);
});
