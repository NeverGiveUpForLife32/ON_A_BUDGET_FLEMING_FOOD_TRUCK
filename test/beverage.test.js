/*
router.get('/', todoCtrl.index) // x i need to test and see that I can make a request to this route and get back a list of valid todos, or an emtyp array if its empty
router.post('/', todoCtrl.create) // x i need to ensure that I can create a todo
router.put('/:id', todoCtrl.update) // x i need to ensure that given a valid id and a valid body that I can chanfge an existing todo
router.delete('/:id', todoCtrl.detroy) // x i need to ensure that given a valid id I can destroy an existing todo
router.get('/:id', todoCtrl.show) // x I need to ensure that gicen a vcalid id that I can see an existing todo
*/

const mongoose = require("mongoose");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const server = app.listen(3011, () => console.log("lets test"));
let mongoServer;
const Beverage = require("../models/beverage");
const User = require("../models/user");

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close(); //connection between mongoose and server will close here after test is ran.
  mongoServer.stop(); //mongoServer will stop as well
  server.close(); //The server on 3011 will stop running
});

describe("Testing Beverage Endpoints For RESTFUL JSON API", () => {
  test("It should Index a list of cold beverages", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem6870@yahoo.com",
      password: "687",
    });
    await user.save();

    const beverage = new Beverage({
      name: "test beverage name",
      quantity: 1,
      isCold: true,
      isLargeCup: true,
      user: user._id,
    });
    await beverage.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/beverages/cold")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isCold");
      expect(response.body[i]).toHaveProperty("isLargeCup");
    }
  });

  test("It should Index a list of warm beverages", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem68770@yahoo.com",
      password: "687",
    });
    await user.save();

    const beverage = new Beverage({
      name: "test beverage name",
      quantity: 1,
      isCold: true,
      isLargeCup: true,
      user: user._id,
    });
    await beverage.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/beverages/notcold")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isCold");
      expect(response.body[i]).toHaveProperty("isLargeCup");
    }
  });

  test("It should Create a list of beverages", async () => {
    const user = new User({
      name: "Christ",
      email: "clflem68712@yahoo.com",
      password: "6871",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const response = await request(app)
      .post("/beverages")
      .send({
        name: "Apple Juice",
        quantity: 1,
        isCold: true,
        isLargeCup: true,
      })
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Apple Juice");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isCold).toEqual(true);
    expect(response.body.isLargeCup).toEqual(true);
  });

  test("It should Update an individual beverage", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem68723@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const beverage = new Beverage({
      name: "Orange Juice",
      quantity: 1,
      isCold: true,
      isLargeCup: true,
      user: user._id,
    });
    await beverage.save();

    const response = await request(app)
      .put(`/beverages/${beverage._id}`)
      .send({
        name: "Banana Juice",
        quantity: 3,
        isCold: true,
        isLargeCup: true,
      })
      .set("Authorization", `Bearer ${token}`); //Before the database has finished resolving, it has to finish saving the document

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Banana Juice");
    expect(response.body.quantity).toEqual(3);
    expect(response.body.isCold).toEqual(true);
    expect(response.body.isLargeCup).toEqual(true);
  });

  test("It should Show an individual beverage", async () => {
    const user = new User({
      name: "Christop",
      email: "clflem68734@yahoo.com",
      password: "6873",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const beverage = new Beverage({
      name: "Grape Juice",
      quantity: 1,
      isCold: true,
      isLargeCup: true,
      user: user._id,
    });
    await beverage.save();

    const response = await request(app)
      .get(`/beverages/${beverage._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Grape Juice");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isCold).toEqual(true);
    expect(response.body.isLargeCup).toEqual(true);
  });

  test("It should Delete an individual beverage", async () => {
    const user = new User({
      name: "Christoph",
      email: "clflem68745@yahoo.com",
      password: "6874",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const beverage = new Beverage({
      name: "Coconut Milk",
      quantity: 1,
      isCold: true,
      isLargeCup: true,
      user: user._id,
    });
    await beverage.save();

    const response = await request(app)
      .delete(`/beverages/${beverage._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
