import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = ['Категория 1', 'Категория 2', 'Категория 3'];
const foods = [
  {
    image:
      'https://thebigmansworld.com/wp-content/uploads/2023/04/pan-seared-salmon-recipe.jpg',
    name: 'Salmon',
    price: '300',
    categoryId: 1,
  },
  {
    image:
      'https://thebigmansworld.com/wp-content/uploads/2023/04/pan-seared-salmon-recipe.jpg',
    name: 'Salmon2',
    price: '400',
    categoryId: 2,
  },
  {
    image:
      'https://thebigmansworld.com/wp-content/uploads/2023/04/pan-seared-salmon-recipe.jpg',
    name: 'Salmon3',
    price: '500',
    categoryId: 2,
  },
];

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

const users = [
  {
    email: 'user@gmail.com',
    password: '$2a$12$NNtUqgZeWswI6nK5fuWv7eIUgGHPViL/x9ryObkPL.POUFLVwSYFa',
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

function seedUsers() {
  Promise.all(users.map((user) => prisma.users.create({ data: user })))
    .then(() => console.info('[SEED] Successfully create users records'))
    .catch((e) => console.error('[SEED] Failed to create users records', e));
}

function seedFoods() {
  Promise.all(foods.map((food) => prisma.food.create({ data: food })))
    .then(() => console.info('[SEED] Successfully create foods records'))
    .catch((e) => console.error('[SEED] Failed to create foods records', e));
}

seedCategories();
seedSettings();
seedUsers();
seedFoods();
