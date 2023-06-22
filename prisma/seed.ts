import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = ['Категория 1', 'Категория 2', 'Категория 3'];

const settings = [
  {
    badge: 'Цена указана за 1кг',
    delivery:
      'Доставка = 100 руб. Бесплатная доставка от 1500 рублей. Оплата наличными и по карте. Можно переводом.',
    description:
      'Магазин вкуснейшей рыбы в городе! Быстро доставим к Вам домой Санкт-Петербург, Ладожская улица, дом 1 +7 812 777 77 77 info@fishka.ru',
    email: 'info@fishka.ru',
  },
];

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

function seedSettings() {
  Promise.all(
    settings.map((setting) => prisma.settings.create({ data: setting })),
  )
    .then(() => console.info('[SEED] Successfully create settings records'))
    .catch((e) => console.error('[SEED] Failed to create settings records', e));
}

seedCategories();
seedSettings();
