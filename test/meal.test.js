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
const server = app.listen(3015, () => console.log("lets test"));
let mongoServer;
const Fruit = require("../models/fruit");
const Vegetable = require("../models/vegetable");
const Protein = require("../models/protein");
const Dessert = require("../models/dessert");
const Beverage = require("../models/beverage");
const Meal = require("../models/meal");
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

describe("Testing Meal Endpoints For RESTFUL JSON API", () => {
  test("It should Index a list of ready to eat meals", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem687@yahoo.com",
      password: "687",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Apple",
      texture: "Hard",
      color: "Red",
      size: "Medium",
      quantity: 1,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "Carrot",
      dippingSauce: "Ranch",
      quantity: 10,
      isOrganic: true,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Steak",
      specialRequests: "Rare",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Apple Pie",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Beer",
      size: "Extra Large",
      quantity: 1,
      isCold: true,
      user: user._id,
    });
    await beverage.save();

    const meal = new Meal({
      specialRequests: "Add Plates and Napkins",
      isReadyToEat: true,
      quantity: 1,
      fruit: fruit._id,
      vegetable: vegetable._id,
      protein: vegetable._id,
      dessert: dessert._id,
      beverage: beverage._id,
      user: user._id,
    });
    await meal.save(); //Before the database has finished resolving, it has to finish saving the document

    const response = await request(app)
      .get("/meals/readytoeat")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("fruit");
      expect(response.body[i]).toHaveProperty("vegetable");
      expect(response.body[i]).toHaveProperty("protein");
      expect(response.body[i]).toHaveProperty("dessert");
      expect(response.body[i]).toHaveProperty("beverage");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isReadyToEat");
    }
  });

  test("It should Index a list of not ready to eat meals", async () => {
    const user = new User({
      name: "Chris",
      email: "clflem6877@yahoo.com",
      password: "687",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Apple",
      texture: "Hard",
      color: "Green",
      size: "Large",
      quantity: 2,
      isOrganic: false,
      isRipe: false,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "Asparagus",
      dippingSauce: "None",
      quantity: 5,
      isOrganic: false,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Beef Patty",
      specialRequests: "Medium",
      quantity: 1,
      isOrganic: false,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Banana Pudding",
      quantity: 1,
      isSliced: false,
      isDelicious: false,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Sunkist Grape",
      size: "Large",
      quantity: 1,
      isCold: false,
      user: user._id,
    });
    await beverage.save();

    const meal = new Meal({
      specialRequests: "Add Utensils",
      isReadyToEat: false,
      quantity: 1,
      fruit: fruit._id,
      vegetable: vegetable._id,
      protein: vegetable._id,
      dessert: dessert._id,
      beverage: beverage._id,
      user: user._id,
    });
    await meal.save(); //Before the database has finished resolving, it has to finish saving the document

    const response = await request(app)
      .get("/meals/notreadytoeat")
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty("fruit");
      expect(response.body[i]).toHaveProperty("vegetable");
      expect(response.body[i]).toHaveProperty("protein");
      expect(response.body[i]).toHaveProperty("dessert");
      expect(response.body[i]).toHaveProperty("beverage");
      expect(response.body[i]).toHaveProperty("quantity");
      expect(response.body[i]).toHaveProperty("isReadyToEat");
    }
  });

  test("It should Create a list of meals", async () => {
    const user = new User({
      name: "Christ",
      email: "clflem6871@yahoo.com",
      password: "6871",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Watermelon",
      texture: "N/A",
      color: "Green",
      size: "Large",
      quantity: 1,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "Asparagus",
      dippingSauce: "None",
      quantity: 5,
      isOrganic: true,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Beef Patty",
      specialRequests: "Medium Cooked",
      quantity: 1,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Banana Pudding",
      quantity: 1,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Sunkist Grape",
      size: "Large",
      quantity: 1,
      isCold: true,
      user: user._id,
    });
    await beverage.save();

    const response = await request(app)
      .post("/meals")
      .send({
        fruit: fruit._id,
        vegetable: vegetable._id,
        protein: protein._id,
        dessert: dessert._id,
        beverage: beverage._id,
        specialRequests: "None",
        quantity: 1,
        isReadyToEat: true,
      })
      .set("Authorization", `Bearer ${token}`); //make a request using supertest. Before this finishes resolving, it needs to make a request to /fruits.

    expect(response.statusCode).toBe(200);
    expect(response.body.fruit).toEqual(fruit._id.toString());
    expect(response.body.vegetable).toEqual(vegetable._id.toString());
    expect(response.body.protein).toEqual(protein._id.toString());
    expect(response.body.dessert).toEqual(dessert._id.toString());
    expect(response.body.beverage).toEqual(beverage._id.toString());
    expect(response.body.specialRequests).toEqual("None");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isReadyToEat).toEqual(true);
  });

  test("It should Update an individual meal", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem6872@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Cantaloupe",
      texture: "Soft",
      color: "Orange",
      size: "Medium",
      quantity: 10,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "White Asparagus",
      dippingSauce: "Ranch",
      quantity: 5,
      isOrganic: true,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Chicken Breast",
      specialRequests: "Deep Fried",
      quantity: 6,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Red Velvet Cake",
      quantity: 2,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Sprite",
      size: "16oz Bottle",
      quantity: 1,
      isCold: true,
      user: user._id,
    });
    await beverage.save();

    const meal = new Meal({
      specialRequests: "None",
      isReadyToEat: false,
      quantity: 1,
      fruit: fruit._id,
      vegetable: vegetable._id,
      protein: protein._id,
      dessert: dessert._id,
      beverage: beverage._id,
      user: user._id,
    });
    await meal.save();

    const response = await request(app)
      .put(`/meals/${meal._id}`)
      .send({
        specialRequests: "Add Extra Napkins",
        quantity: 3,
        isReadyToEat: true,
      })
      .set("Authorization", `Bearer ${token}`); //Before the database has finished resolving, it has to finish saving the document
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.specialRequests).toEqual("Add Extra Napkins");
    expect(response.body.quantity).toEqual(3);
    expect(response.body.isReadyToEat).toEqual(true);
  });

  test("It should Show an individual meal", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem687250@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Cantaloupe",
      texture: "Soft",
      color: "Orange",
      size: "Medium",
      quantity: 10,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "White Asparagus",
      dippingSauce: "Ranch",
      quantity: 5,
      isOrganic: true,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Chicken Breast",
      specialRequests: "Deep Fried",
      quantity: 6,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Red Velvet Cake",
      quantity: 2,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Sprite",
      size: "16oz Bottle",
      quantity: 1,
      isCold: true,
      user: user._id,
    });
    await beverage.save();

    const meal = new Meal({
      specialRequests: "None",
      isReadyToEat: true,
      quantity: 1,
      fruit: fruit._id,
      vegetable: vegetable._id,
      protein: protein._id,
      dessert: dessert._id,
      beverage: beverage._id,
      user: user._id,
    });
    await meal.save();

    const response = await request(app)
      .get(`/meals/${meal._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.specialRequests).toEqual("None");
    expect(response.body.quantity).toEqual(1);
    expect(response.body.isReadyToEat).toEqual(true);
  });

  test("It should Delete an individual meal", async () => {
    const user = new User({
      name: "Christo",
      email: "clflem687200@yahoo.com",
      password: "6872",
    });
    await user.save();

    const token = await user.generateAuthToken();

    const fruit = new Fruit({
      name: "Cantaloupe",
      texture: "Soft",
      color: "Orange",
      size: "Medium",
      quantity: 10,
      isOrganic: true,
      isRipe: true,
      user: user._id,
    });
    await fruit.save();

    const vegetable = new Vegetable({
      name: "White Asparagus",
      dippingSauce: "Ranch",
      quantity: 5,
      isOrganic: true,
      user: user._id,
    });
    await vegetable.save();

    const protein = new Protein({
      proteinSourceName: "Chicken Breast",
      specialRequests: "Deep Fried",
      quantity: 6,
      isOrganic: true,
      user: user._id,
    });
    await protein.save();

    const dessert = new Dessert({
      name: "Red Velvet Cake",
      quantity: 2,
      isSliced: true,
      isDelicious: true,
      user: user._id,
    });
    await dessert.save();

    const beverage = new Beverage({
      name: "Sprite",
      size: "16oz Bottle",
      quantity: 1,
      isCold: true,
      user: user._id,
    });
    await beverage.save();

    const meal = new Meal({
      specialRequests: "None",
      isReadyToEat: false,
      quantity: 1,
      fruit: fruit._id,
      vegetable: vegetable._id,
      protein: protein._id,
      dessert: dessert._id,
      beverage: beverage._id,
      user: user._id,
    });
    await meal.save();

    const response = await request(app)
      .delete(`/meals/${meal._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
