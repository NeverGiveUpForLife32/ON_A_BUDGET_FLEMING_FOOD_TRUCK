# On a Budget Fleming Food Truck

### This online restaurant application is dedicated to offering a specialized platform for individualized meal requests. It is crafted to deliver a seamless and personalized dining experience, tailored to satisfy the cravings of our customers while promptly acknowledging and fulfilling their specific meal preferences.

## Installing

1. Start by cloning the git repository:

```
git clone git@github.com:NeverGiveUpForLife32/ON_A_BUDGET_FLEMING_FOOD_TRUCK.git
```

2. Create .env file:

```
touch .env
```

3. Connect MONGO_URI & SECRET inside .env file:

```
MONGO_URI= "......"
SECRET= "......"
```

4. install dependencies:

```
npm i or npm install
```

5. start the program:

```
npm run dev
```

## Understanding the code

I've divided the models into 7 models: User, Fruit, Vegetable, Protein, Dessert, Beverage, & Meal.

```javascript
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fruits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fruit" }],
    proteins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Protein" }],
    vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vegetable" }],
    beverages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beverage" }],
    desserts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dessert" }],
  },
  {
    timestamps: true,
  }
);
```

```javascript
const fruitSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isOrganic: { type: Boolean, required: true },
    isRipe: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

```javascript
const vegetableSchema = new Schema(
  {
    name: { type: String, required: true },
    dippingSauce: { type: String, required: true },
    quantity: { type: Number, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

```javascript
const proteinSchema = new Schema(
  {
    proteinSourceName: { type: String, required: true },
    specialRequests: { type: String, required: true },
    quantity: { type: Number, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

```javascript
const dessertSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isSliced: { type: Boolean, required: true },
    isDelicious: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

```javascript
const beverageSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isCold: { type: Boolean, required: true },
    isLargeCup: { type: Boolean, required: true },

    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

```javascript
const mealSchema = new Schema(
  {
    specialRequests: { type: String, required: true },
    isReadyToEat: { type: Boolean, required: true },
    is$20Each: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    fruit: { type: Schema.Types.ObjectId, ref: "Fruit" },
    vegetable: {
      type: Schema.Types.ObjectId,
      ref: "Vegetable",
    },
    protein: { type: Schema.Types.ObjectId, ref: "Protein" },
    dessert: { type: Schema.Types.ObjectId, ref: "Dessert" },
    beverage: { type: Schema.Types.ObjectId, ref: "Beverage" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
```

This allows for a one to many relationship letting every user have many choices of what he/she wants in their meal.
The User conroller handles authentication and logging a user in for those choices to take place.

### As for the routes /user path controls everything User related:

```javascript
// Create a User
router.post("/", userController.createUser);

// logs a User in
router.post("/login", userController.loginUser);

// Updates a user
router.put("/:id", userController.auth, userController.updateUser);

// Dispalys 1 User
router.get("/:id", userController.showUser);

// Deletes a user
router.delete("/:id", userController.auth, userController.deleteUser);
```

### The /fruit path controls everything Fruit related:

```javascript
// Lists all unriped fruits
router.get("/notripe", userController.auth, fruitCtrl.indexNotRipe);

// Lists all riped fruits
router.get("/ripe", userController.auth, fruitCtrl.indexRipe);

// Creates a fruit
router.post("/", userController.auth, fruitCtrl.createFruit);

// Updates a fruit
router.put("/:id", userController.auth, fruitCtrl.updateFruit);

// Displays a fruit
router.get("/:id", userController.auth, fruitCtrl.showFruit);

// Deletes a fruit
router.delete("/:id", userController.auth, fruitCtrl.deleteFruit);
```

### The /vegetable path controls everything Vegetable related:

```javascript
// List of all non organic vegetables
router.get("/notorganic", userController.auth, vegetableCtrl.indexNotOrganic);

// List of all organic vegetables
router.get("/organic", userController.auth, vegetableCtrl.indexOrganic);

// Creates a vegetable
router.post("/", userController.auth, vegetableCtrl.createVegetable);

// Updates a vegetable
router.put("/:id", userController.auth, vegetableCtrl.updateVegetable);

// Displays a vegetable
router.get("/:id", userController.auth, vegetableCtrl.showVegetable);

// Deletes a vegetable
router.delete("/:id", userController.auth, vegetableCtrl.deleteVegetable);
```

### The /protein path controls everything Protein related:

```javascript
// List of all non organic proteins
router.get("/notorganic", userController.auth, proteinCtrl.indexNotOrganic);

// List of all organic proteins
router.get("/organic", userController.auth, proteinCtrl.indexOrganic);

// Creates a protein
router.post("/", userController.auth, proteinCtrl.createProtein);

// Updates a protein
router.put("/:id", userController.auth, proteinCtrl.updateProtein);

// Displays a protein
router.get("/:id", userController.auth, proteinCtrl.showProtein);

// Deletes a protein
router.delete("/:id", userController.auth, proteinCtrl.deleteProtein);
```

### The /dessert path controls everything Dessert related:

```javascript
// list of all nasty desserts
router.get("/notdelicious", userController.auth, dessertCtrl.indexNotDelicious);

// List of all delicious desserts
router.get("/delicious", userController.auth, dessertCtrl.indexDelicious);

// Creates a dessert
router.post("/", userController.auth, dessertCtrl.createDessert);

// Updates a dessert
router.put("/:id", userController.auth, dessertCtrl.updateDessert);

// Displays a dessert
router.get("/:id", userController.auth, dessertCtrl.showDessert);

// Deletes a dessert
router.delete("/:id", userController.auth, dessertCtrl.deleteDessert);
```

### The /beverage path controls everything Beverage related:

```javascript
// List of all warm beverages
router.get("/notcold", userController.auth, beverageCtrl.indexNotCold);

// List of all cold beverages
router.get("/cold", userController.auth, beverageCtrl.indexCold);

// Create a beverage
router.post("/", userController.auth, beverageCtrl.createBeverage);

// Update a beverage
router.put("/:id", userController.auth, beverageCtrl.updateBeverage);

// Display a beverage
router.get("/:id", userController.auth, beverageCtrl.showBeverage);

// Delete a beverage
router.delete("/:id", userController.auth, beverageCtrl.deleteBeverage);
```

### The /meal path controls everything Meal related:

```javascript
// List of all not ready to eat meals
router.get("/notreadytoeat", userController.auth, mealCtrl.indexNotReadyToEat);

// List of all ready to eat meals
router.get("/readytoeat", userController.auth, mealCtrl.indexReadyToEat);

// Creates a meal
router.post("/", userController.auth, mealCtrl.createMeal);

// Updates a meal
router.put("/:id", userController.auth, mealCtrl.updateMeal);

// Displays a meal
router.get("/:id", userController.auth, mealCtrl.showMeal);

// Deletes a meal
router.delete("/:id", userController.auth, mealCtrl.deleteMeal);
```

Here are examples of the data returned from the request you make:

User:

```JSON
{
    "name": "Christopher",
    "email": "clflem@yahoo.com",
    "password": "123"
}
```

Fruit:

```JSON
{
    "name": "Apple",
    "quantity": 1,
    "isOrganic": true,
    "isRipe": true,
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4d313fe410649487b1a3",
    "createdAt": "2024-02-03T14:26:57.715Z",
    "updatedAt": "2024-02-03T14:26:57.715Z",
    "__v": 0
}
```

Vegetable:

```JSON
{
    "name": "Celery",
    "dippingSauce": "Ranch",
    "quantity": 1,
    "isOrganic": true,
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4d833fe410649487b1a9",
    "createdAt": "2024-02-03T14:28:19.849Z",
    "updatedAt": "2024-02-03T14:28:19.849Z",
    "__v": 0
}
```

Protein:

```JSON
{
    "proteinSourceName": "Chicken",
    "specialRequests": "Beer",
    "quantity": 1,
    "isOrganic": true,
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4dcc3fe410649487b1ad",
    "createdAt": "2024-02-03T14:29:32.836Z",
    "updatedAt": "2024-02-03T14:29:32.836Z",
    "__v": 0
}
```

Dessert:

```JSON
{
    "name": "Carrot Cake",
    "quantity": 1,
    "isSliced": true,
    "isDelicious": true,
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4e1a3fe410649487b1b1",
    "createdAt": "2024-02-03T14:30:50.352Z",
    "updatedAt": "2024-02-03T14:30:50.352Z",
    "__v": 0
}
```

Beverage:

```JSON
{
    "name": "Apple Juice",
    "quantity": 1,
    "isCold": true,
    "isLargeCup": true,
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4e5d3fe410649487b1b7",
    "createdAt": "2024-02-03T14:31:57.083Z",
    "updatedAt": "2024-02-03T14:31:57.083Z",
    "__v": 0
}
```

Meal:

```JSON
{
    "specialRequests": "Extra Plates and Napkins",
    "isReadyToEat": true,
    "is$20Each": true,
    "quantity": 5,
    "fruit": "65be4d313fe410649487b1a3",
    "vegetable": "65be4d833fe410649487b1a9",
    "protein": "65be4dcc3fe410649487b1ad",
    "dessert": "65be4e1a3fe410649487b1b1",
    "beverage": "65be4e5d3fe410649487b1b7",
    "user": "65be4ce73fe410649487b19e",
    "_id": "65be4f983fe410649487b1bf",
    "createdAt": "2024-02-03T14:37:12.827Z",
    "updatedAt": "2024-02-03T14:37:12.827Z",
    "__v": 0
}
```
