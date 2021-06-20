const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

// Now create a web serverusing express is to run express as a function and set the result incide variable.
const app = express();
app.use(bodyParser.json());
// Now initialize mongoose database.
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); // second paramenteer after URL is the bunch of options, to difine for better connnection to database.
// now we have copnnected to the mongodb.

// define your product model
const Product = mongoose.model(
    "products", 
    new mongoose.Schema({
    _id: {type: String , default: shortid.generate},
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))
// we have done with creating product model


// define end point
app.get("/api/products", async (req, res)=>{
    const products = await Product.find({});
    res.send(products); // sending back to client
})
// this API return the list of product. but for now we dont havr any product
// lets creare
// Now 
//creaing a new product
app.post("/api/products", async (req, res)=>{  //we used HTTP post method 
    const newProduct = new Product(req.body) // created product
    const savedProduct = await newProduct.save(); // saving to the database
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct);
})


// now last step to express server
// to listen to port and launch the server
const port = process.env.PORT || 5000; // process.env.PORT provides us the port number
app.listen(port, ()=> console.log('server at http://localhost:5000'))

//now we have created a express and mongodb server

// now we will use the mongodb and postman