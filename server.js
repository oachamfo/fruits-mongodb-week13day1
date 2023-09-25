//initialize app
const express = require("express");
const app = express();

const jsxEngine = require("jsx-view-engine"); //require view engine
const mongoose = require("mongoose"); //require mongoose db
require("dotenv").config(); //require .env file

//include the method-override package place this where you instructor places it
const methodOverride = require("method-override");

//adding view templating engine
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//middleware
//body parser
app.use(express.urlencoded({ extended: true }));

//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));

//models
const Fruit = require("./models/fruits.js");

//routes

//fruits routes

//seeds route
app.get("/fruits/seed", (req, res) => {
  Fruit.create(
    [
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
    ],
    (err, data) => {
      res.redirect("/fruits");
    }
  );
});
//index
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", { fruits: fruits });
  } catch (error) {
    console.error(error);
  }
});

//new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

//delete
try {
  app.delete("/fruits/:id", async (req, res) => {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits"); //redirect back to fruits index
  });
} catch {
  console.log("something went wrong...");
}

//update
app.put("/fruits/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedFruit) => {
      console.log(updatedFruit);
      res.redirect(`/fruits/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//create
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }

    //syntax if array was being used instead of db where fruits points to array
    // fruits.push(req.body);

    //store new fruit in cloud db and console.log new fruit
    console.log(await Fruit.create(req.body));

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

//edit
app.get("/fruits/:id/edit", async (req, res) => {
  await Fruit.findById(req.params.id)
    .then((foundFruit) => {
      res.render("./fruits/Edit", {
        fruit: foundFruit, //pass in the found fruit so we can prefill the form
      });
    })
    .catch((err) => {
      res.send({ msg: err.message });
    });
});

//show
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    res.render("fruits/Show", { fruit: fruit });
  } catch (error) {
    console.log(error);
  }
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening");
});

//db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
