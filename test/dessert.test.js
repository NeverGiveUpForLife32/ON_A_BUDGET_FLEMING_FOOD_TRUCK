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
const server = app.listen(3012, () => console.log("lets test"));
let mongoServer;
const Dessert = require("../models/dessert");
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

describe("Testing Dessert Endpoints For RESTFUL JSON API", () => {
  test("It should Index a list of delicious desserts", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem687@yahoo.com",
      password: "687",
    });
    await user.save();

    const dessert = new Dessert({
      name: "test dessert name",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/desserts/delicious")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /desserts.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isSliced");
      expect(response.body[i]).toHaveProperty("isDelicious");
    }
  });

  test("It should Index a list of not delicious desserts", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem6877@yahoo.com",
      password: "687",
    });
    await user.save();

    const dessert = new Dessert({
      name: "test dessert name",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/desserts/notdelicious")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /desserts

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isSliced");
      expect(response.body[i]).toHaveProperty("isDelicious");
    }
  });

  test("It should Create a list of desserts", async () => {
    const user = new User({
      name: "Christ",
      email: "clflem6871@yahoo.com",
      password: "6871",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const response = await request(app)
      .post("/desserts")
      .send({
        name: "Apple Pie",
        quantity: 1,
        isSliced: true,
        isDelicious: true,
      })
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /desserts.

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Apple Pie");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isSliced).toEqual(true);
    expect(response.body.isDelicious).toEqual(true);
  });

  test("It should Update an individual dessert", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem6872@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const dessert = new Dessert({
      name: "Pumpkin Pie",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const response = await request(app)
      .put(`/desserts/${dessert._id}`)
      .send({
        name: "Apple Pie",
        quantity: 10,
        isSliced: true,
        isDelicious: true,
      })
      .set("Authorization", `Bearer ${token}`); //Before the database has finished resolving, it has to finish saving the document

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Apple Pie");
    expect(response.body.quantity).toEqual(10);
    expect(response.body.isSliced).toEqual(true);
    expect(response.body.isDelicious).toEqual(true);
  });

  test("It should Show an individual dessert", async () => {
    const user = new User({
      name: "Christop",
      email: "clflem6873@yahoo.com",
      password: "6873",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const dessert = new Dessert({
      name: "Red Velvet Cake",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const response = await request(app)
      .get(`/desserts/${dessert._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Red Velvet Cake");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isSliced).toEqual(true);
    expect(response.body.isDelicious).toEqual(true);
  });

  test("It should Delete an individual dessert", async () => {
    const user = new User({
      name: "Christoph",
      email: "clflem6874@yahoo.com",
      password: "6874",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const dessert = new Dessert({
      name: "Carrot Cake",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const response = await request(app)
      .delete(`/desserts/${dessert._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
