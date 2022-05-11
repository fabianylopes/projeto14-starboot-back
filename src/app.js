import express, { json } from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(json());

app.post('/coffees', async (req, res) =>{
    const coffee = req.body
    try {
        const coffeeCollection = await db.collection("products")
        coffeeCollection.insertOne(coffee)
        res.sendStatus(200)
    } catch (error) {
        console.log("Deu ruim pra inserir o café no banco", error)
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(('Running on ' + port));
});

