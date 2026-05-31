import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const seedFile = path.resolve("db.json");

async function main() {
  const raw = fs.readFileSync(seedFile, "utf-8");
  const { projetos } = JSON.parse(raw);

  await prisma.project.deleteMany();

  for (const project of projetos) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        img: project.img,
      },
    });
  }

  console.log("Seed concluído: projetos carregados no banco Prisma.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
