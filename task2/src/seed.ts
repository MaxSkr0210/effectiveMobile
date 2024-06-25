import { Sequelize } from "sequelize-typescript";
import { User } from "./user/user.model";
import * as dotenv from "dotenv";

dotenv.config();

async function seed() {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [User],
  });

  await sequelize.sync({ force: true });

  for (let i = 0; i < 1000000; i++) {
    await User.create({
      firstName: `firstname${i}`,
      lastName: `lastname${i}`,
      age: Math.floor(Math.random() * 60) + 18,
      gender: Math.random() > 0.5 ? "male" : "female",
      problems: Math.random() > 0.5,
    });
  }

  await sequelize.close();
}

seed()
  .then(() => {
    console.log("Database seeded");
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
  });
