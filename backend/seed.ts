import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash('admin', 10);
  const hashedPasswordsUser = await Promise.all(
    Array.from({ length: 10 }, (_, i) => bcrypt.hash(`user${i + 1}`, 10)),
  );

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      role: 'ADMIN',
    },
  });

  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: hashedPasswordsUser[i],
        role: 'USER',
      },
    });
    users.push(user);
  }

  for (let i = 0; i < 10; i++) {
    await prisma.task.create({
      data: {
        name: `Task ${i + 1}`,
        ownerId: users[i].id,
      },
    });
  }

  for (let i = 10; i < 15; i++) {
    await prisma.task.create({
      data: {
        name: `Task ${i + 1}`,
      },
    });
  }

  console.log('Usuarios y tareas creados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
