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
const server = app.listen(3016, () => console.log("lets test"));
let mongoServer;
const Fruit = require("../models/fruit");
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

describe("Testing Fruit Endpoints For RESTFUL JSON API", () => {
  test("It should Index a list of riped fruits", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem687@yahoo.com",
      password: "687",
    });
    await user.save();

    const fruit = new Fruit({
      name: "test fruit name",
      quantity: 1,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/fruits/ripe")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isOrganic");
      expect(response.body[i]).toHaveProperty("isRipe");
    }
  });

  test("It should Index a list of unriped fruits", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem6877@yahoo.com",
      password: "687",
    });
    await user.save();

    const fruit = new Fruit({
      name: "test fruit name",
      quantity: 1,
      isOrganic: true,
      isRipe: false,
      user: user._id,
    });
    await fruit.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/fruits/notripe")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isOrganic");
      expect(response.body[i]).toHaveProperty("isRipe");
    }
  });

  test("It should Create a list of fruits", async () => {
    const user = new User({
      name: "Christ",
      email: "clflem6871@yahoo.com",
      password: "6871",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const response = await request(app)
      .post("/fruits")
      .send({
        name: "Apple",
        texture: "Hard",
        color: "Red",
        size: "Large",
        quantity: 1,
        isOrganic: true,
        isRipe: true,
      })
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Apple");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isOrganic).toEqual(true);
    expect(response.body.isRipe).toEqual(true);
  });

  test("It should Update an individual fruit", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem6872@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Apple",
      quantity: 1,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const response = await request(app)
      .put(`/fruits/${fruit._id}`)
      .send({
        name: "Banana",
        quantity: 3,
        isOrganic: true,
        isRipe: true,
      })
      .set("Authorization", `Bearer ${token}`); //Before the database has finished resolving, it has to finish saving the document

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Banana");
    expect(response.body.quantity).toEqual(3);
    expect(response.body.isOrganic).toEqual(true);
    expect(response.body.isRipe).toEqual(true);
  });

  test("It should Show an individual fruit", async () => {
    const user = new User({
      name: "Christop",
      email: "clflem6873@yahoo.com",
      password: "6873",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Pear",
      quantity: 4,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const response = await request(app)
      .get(`/fruits/${fruit._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Pear");
    expect(response.body.quantity).toEqual(4);
    expect(response.body.isOrganic).toEqual(true);
    expect(response.body.isRipe).toEqual(true);
  });

  test("It should Delete an individual fruit", async () => {
    const user = new User({
      name: "Christoph",
      email: "clflem6874@yahoo.com",
      password: "6874",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Cantaloupe",
      quantity: 1,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const response = await request(app)
      .delete(`/fruits/${fruit._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
