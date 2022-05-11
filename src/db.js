import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from 'chalk'
dotenv.config();

let db = null; 

try {
    const client = new MongoClient(process.env.MONGO_URI)
    client.connect()
    db = client.db("Starboot")
    console.log(chalk.greenBright("Mongo atlas is now connected to this project"))
} catch (error) {
    console.log(chalk.redBright("Failure to connect to Mongo"), error)
}


export default db;

