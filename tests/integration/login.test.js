require("dotenv").config();
const { string } = require("joi");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const { User } = require("../../models/user");
mongoose.set("strictQuery", false);
const { DB_HOST_TEST } = process.env;

describe("login", () => {
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
      email: "userTestRegistaration@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe(
      "userTestRegistaration@gmail.com"
    );
  });

  it("login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "userTestRegistaration@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.data.user.token).toBe("string");
  });
  it("not login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "userTestRegistaration@gmail.com",
      password: "1234567",
    });
    expect(response.statusCode).toBe(401);
  });
});
