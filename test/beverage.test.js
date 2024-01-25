const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => console.log("Testing on PORT 8080"));
const Beverage = require("../models/beverage");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

afterAll((done) => done());

describe("Test the beverages endpoints", () => {
  test("It should create a new user", async () => {
    const response = await request(app).post("/beverages").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.beverage.name).toEqual("John Doe");
    expect(response.body.beverage.email).toEqual("john.doe@example.com");
    expect(response.body).toHaveProperty("token");
  });

  test("It should login a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await user.save();

    const response = await request(app)
      .post("/users/login")
      .send({ email: "john.doe@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual("John Doe");
    expect(response.body.user.email).toEqual("john.doe@example.com");
    expect(response.body).toHaveProperty("token");
  });

  test("It should update a beverage", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await beverage.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Jane Doe");
    expect(response.body.email).toEqual("jane.doe@example.com");
  });

  test("It should delete a beverage", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .delete(`/beverages/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("Beverage deleted");
  });
});
