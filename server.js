//initialize app
const express = require("express");
const app = express();

const jsxEngine = require("jsx-view-engine"); //require view engine
const mongoose = require("mongoose"); //require mongoose db
require("dotenv").config(); //require .env file

//method-override package: for spoofing HTTP methods
const methodOverride = require("method-override");

//adding view templating engine
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//middleware
//body parser
app.use(express.urlencoded({ extended: true }));

//use methodOverride package for adding a query parameter to the delete form named _method
app.use(methodOverride("_method"));

//db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//models
const Fruit = require("./models/fruits.js");
const Vegetable = require("./models/vegetables.js");

//routes
app.get("/", (req, res) => {
  res.send("Welcome to Fruits and Vegetables App");
});
//fruits routes

//fruits seed route
app.get("/fruits/seed", (req, res) => {
  Fruit.create([
    {
      name: "grapefruit",
      color: "pink",
      readyToEat: true,
    },
    {
      name: "grape",
      color: "purple",
      readyToEat: false,
    },
    {
      name: "avocado",
      color: "green",
      readyToEat: true,
    },
  ])
    .then(() => {
      res.redirect("/fruits");
    })
    .catch((err) => {
      console.log(err);
    });
});

//fruits index
app.get("/fruits/", async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", { fruits: fruits });
  } catch (error) {
    console.error(error);
  }
});

//fruits new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

//fruits delete
try {
  app.delete("/fruits/:id", async (req, res) => {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits"); //redirect back to fruits index
  });
} catch {
  console.log("something went wrong...");
}

//fruits update
app.put("/fruits/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedFruit) => {
      console.log(updatedFruit);
      res.redirect(`/fruits/${req.params.id}`); //redirect to the Show page
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//fruits create
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if ready to eat is checked by user
      req.body.readyToEat = true; //do some data correction
    } else {
      //if ready to eat is not checked by user
      req.body.readyToEat = false; //do some data correction
    }

    //store new fruit in cloud db
    await Fruit.create(req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

//fruits edit
app.get("/fruits/:id/edit", async (req, res) => {
  await Fruit.findById(req.params.id)
    .then((foundFruit) => {
      res.render("./fruits/Edit", {
        fruit: foundFruit, //pass in the foundFruit so we can use it to populate the form
      });
    })
    .catch((err) => {
      res.send({ msg: err.message });
    });
});

//fruits show
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    res.render("fruits/Show", { fruit: fruit });
  } catch (error) {
    console.log(error);
  }
});

//vegetables routes
//vegetables seed route
app.get("/vegetables/seed", async (req, res) => {
  await Vegetable.create([
    {
      name: "vegetable1",
      color: "vegetableColor1",
      readyToEat: true,
    },
    {
      name: "vegetable2",
      color: "vegetableColor2",
      readyToEat: false,
    },
    {
      name: "vegetable3",
      color: "vegetableColor3",
      readyToEat: true,
    },
  ])
    .then(res.redirect("/vegetables/"))
    .catch((err) => {
      console.log(err);
    });
});

//vegetables index
app.get("/vegetables/", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", { vegetables: vegetables });
  } catch (error) {
    console.error(error);
  }
});

//vegetables new
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//vegetables delete
try {
  app.delete("/vegetables/:id", async (req, res) => {
    await Vegetable.findByIdAndRemove(req.params.id);
    res.redirect("/vegetables"); //redirect back to vegetables index
  });
} catch {
  console.log("something went wrong...");
}

//vegetables update
app.put("/vegetables/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Vegetable.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedVegetable) => {
      console.log(updatedVegetable);
      res.redirect(`/vegetables/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//vegetables create
app.post("/vegetables", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if ready to eat is checked by user
      req.body.readyToEat = true; //do some data correction
    } else {
      //if ready to eat is not checked by user
      req.body.readyToEat = false; //do some data correction
    }

    //store new vegetable
    await Vegetable.create(req.body);

    res.redirect("/vegetables");
  } catch (error) {
    console.log(error);
  }
});

//vegetables edit
app.get("/vegetables/:id/edit", async (req, res) => {
  await Vegetable.findById(req.params.id)
    .then((foundVegetable) => {
      res.render("./vegetables/Edit", {
        vegetable: foundVegetable, //pass in the foundVegetable so we can use it to populate the form
      });
    })
    .catch((err) => {
      res.send({ msg: err.message });
    });
});

//vegetables show
app.get("/vegetables/:id", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);

    res.render("vegetables/Show", { vegetable: vegetable });
  } catch (error) {
    console.log(error);
  }
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening");
});
