require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const { User } = require("../../models/user");
mongoose.set("strictQuery", false);
const { DB_HOST_TEST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    await User.deleteMany();
  });
  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connect(DB_HOST_TEST);
  });
  it("register new user", async () => {
    const response = await supertest(app).post("/api/users/signup").send({
      email: "userTest1@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("userTest1@gmail.com");
  });
  it("not register the same user 2 times", async () => {
    await supertest(app).post("/api/users/signup").send({
      email: "userTest2@gmail.com",
      password: "123456",
    });
    const response = await supertest(app).post("/api/users/signup").send({
      email: "userTest2@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(409);
  });
});
