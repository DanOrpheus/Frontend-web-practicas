import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL!) });

async function main() {
  const passwordHash = hashSync('gimnasio2026', 10);
  await prisma.usuario.deleteMany();
  await prisma.usuario.createMany({
    data: [
      { correo: 'karla@itson.mx', passwordHash, rol: 'miembro', miembroId: 1 },
      { correo: 'ana@itson.mx', passwordHash, rol: 'entrenador' },
      { correo: 'admin@itson.mx', passwordHash, rol: 'admin' },
    ],
  });
}

main().finally(() => prisma.$disconnect());