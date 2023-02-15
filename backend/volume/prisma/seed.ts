import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const alice = await prisma.user.upsert({

    where: { id: 0 },

    update: {},

    create: {

      id: 0,

      name: 'Alice',

    },

  });

  const bob = await prisma.user.upsert({

    where: { id: 1 },

    update: {},

    create: {

      id:  1,

      name: 'Bob',

    },

  });

  console.log({ alice, bob });

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