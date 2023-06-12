import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = ['Категория 1', 'Категория 2', 'Категория 3'];

function seedCategories() {
  Promise.all(
    categories.map((category) =>
      prisma.category.create({ data: { title: category } }),
    ),
  )
    .then(() => console.info('[SEED] Successfully create categories records'))
    .catch((e) =>
      console.error('[SEED] Failed to create categories records', e),
    );
}

seedCategories();
