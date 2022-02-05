import { faker } from "@faker-js/faker";
import { Utils } from "../src/utils/passwordHash";

const hashPassword = async (password: string) => {
  return await Utils.hashPassword(password);
};

const dataSeed = [
  {
    nome: "root",
    email: "root@email.com",
    password: hashPassword("root123"),
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
    password: hashPassword("test123"),
    isAdmin: false,
  },
  {
    nome: "test2",
    email: "test2@email.com",
    password: hashPassword("test123"),
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
