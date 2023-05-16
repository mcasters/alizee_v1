import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.image.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.$queryRaw`ALTER TABLE image AUTO_INCREMENT = 1`;
  await prisma.$queryRaw`ALTER TABLE tag AUTO_INCREMENT = 1`;
  await prisma.$queryRaw`ALTER TABLE post AUTO_INCREMENT = 1`;

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
      label: "concours",
    },
  });

  await prisma.post.create({
    data: {
      title: "A fabulous post",
      date: new Date("2023-03-19T14:21:00+0200"),
      content: "I win with Bibou",
      published: true,
      tags: {
        connect: {
          label: "Bibou",
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "An other fabulous post",
      date: new Date("2023-03-21T14:21:00+0200"),
      content: "I win with Figo",
      published: true,
      tags: {
        connect: {
          label: "Bibou",
        },
      },
    },
  });

  await prisma.image.create({
    data: {
      filename: "image.jpg",
      width: 200,
      height: 350,
      post: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.image.create({
    data: {
      filename: "image2.jpg",
      width: 700,
      height: 600,
      post: {
        connect: {
          id: 2,
        },
      },
    },
  });
  await prisma.image.create({
    data: {
      filename: "image3.jpg",
      width: 700,
      height: 600,
      post: {
        connect: {
          id: 2,
        },
      },
    },
  });
  await prisma.image.create({
    data: {
      filename: "image4.jpg",
      width: 700,
      height: 600,
      post: {
        connect: {
          id: 2,
        },
      },
    },
  });

  const allPosts = await prisma.post.findMany({
    include: {
      tags: true,
    },
  });
  console.dir(allPosts, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
