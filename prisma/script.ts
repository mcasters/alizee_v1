import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /*  await prisma.image.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.$queryRaw`ALTER TABLE image AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE tag AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE post AUTO_INCREMENT = 1`;*/

  await prisma.tag.create({
    data: {
      label: "Bibou",
    },
  });

  await prisma.tag.create({
    data: {
      label: "Figo",
    },
  });

  await prisma.tag.create({
    data: {
      label: "Concours",
    },
  });

  await prisma.tag.create({
    data: {
      label: "Divers",
    },
  });

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
