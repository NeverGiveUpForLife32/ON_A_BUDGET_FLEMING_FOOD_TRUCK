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
const server = app.listen(3013, () => console.log("lets test"));
let mongoServer;
const Protein = require("../models/protein");
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

describe("Testing Protein Endpoints For RESTFUL JSON API", () => {
  test("It should Index a list of organic proteins", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem687@yahoo.com",
      password: "687",
    });
    await user.save();

    const protein = new Protein({
      proteinSourceName: "test protein name",
      specialRequests: "test protein special requests",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/proteins/organic")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("proteinSourceName");
      expect(response.body[i]).toHaveProperty("specialRequests");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isOrganic");
    }
  });

  test("It should Index a list of nonorganic proteins", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem6877@yahoo.com",
      password: "687",
    });
    await user.save();

    const protein = new Protein({
      proteinSourceName: "test protein name",
      specialRequests: "test protein special requests",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save(); //Before the database has finished resolving, it has to finish saving the document

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get("/proteins/notorganic")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("proteinSourceName");
      expect(response.body[i]).toHaveProperty("specialRequests");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isOrganic");
    }
  });

  test("It should Create a list of proteins", async () => {
    const user = new User({
      name: "Christ",
      email: "clflem6871@yahoo.com",
      password: "6871",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const response = await request(app)
      .post("/proteins")
      .send({
        proteinSourceName: "Chicken Thighs",
        specialRequests: "Deep Fried",
        quantity: 1,
        isOrganic: true,
      })
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(response.body.proteinSourceName).toEqual("Chicken Thighs");
    expect(response.body.specialRequests).toEqual("Deep Fried");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isOrganic).toEqual(true);
  });

  test("It should Update an individual protein", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem6872@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const protein = new Protein({
      proteinSourceName: "Salmon",
      specialRequests: "Grilled",
      quantity: 3,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const response = await request(app)
      .put(`/proteins/${protein._id}`)
      .send({
        proteinSourceName: "Steak",
        specialRequests: "Medium",
        quantity: 1,
        isOrganic: true,
      })
      .set("Authorization", `Bearer ${token}`); //Before the database has finished resolving, it has to finish saving the document

    expect(response.statusCode).toBe(200);
    expect(response.body.proteinSourceName).toEqual("Steak");
    expect(response.body.specialRequests).toEqual("Medium");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isOrganic).toEqual(true);
  });

  test("It should Show an individual protein", async () => {
    const user = new User({
      name: "Christop",
      email: "clflem6873@yahoo.com",
      password: "6873",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const protein = new Protein({
      proteinSourceName: "Chicken",
      specialRequests: "Grilled",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const response = await request(app)
      .get(`/proteins/${protein._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.proteinSourceName).toEqual("Chicken");
    expect(response.body.specialRequests).toEqual("Grilled");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isOrganic).toEqual(true);
  });

  test("It should Delete an individual protein", async () => {
    const user = new User({
      name: "Christoph",
      email: "clflem6874@yahoo.com",
      password: "6874",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const protein = new Protein({
      proteinSourceName: "Cat Fish",
      specialRequests: "Grilled",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const response = await request(app)
      .delete(`/proteins/${protein._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
