import { faker } from "@faker-js/faker";

const dataSeed = [
  {
    nome: "root",
    email: "root@email.com",
    password: "root123",
    isAdmin: true,
    promotions: {
      create: [
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
      ],
    },
  },
  {
    nome: "test1",
    email: "test1@email.com",
    password: "test123",
    isAdmin: false,
  },
  {
    nome: "test2",
    email: "test2@email.com",
    password: "test123",
    isAdmin: false,
    promotions: {
      create: [
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
        {
          nome: faker.commerce.productName(),
          preco: Number(faker.commerce.price()),
          link: faker.internet.url(),
          descricao: faker.lorem.sentence(4),
        },
      ],
    },
  },
];

export default dataSeed;
