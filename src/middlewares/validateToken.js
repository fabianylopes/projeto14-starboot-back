import { ObjectId } from "mongodb";
import db from "../db.js";
import chalk from 'chalk'
async function validateToken(req,res, next){
    
    /*
    Obter o token do header 
    Verificar token
    Next 
    */

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if(!token) return res.status(409).send("Token não foi enviado")

    try {
        const session = await db.collection("session").findOne({token})
        if (!session) return res.status(404).send('Token não encontrado')
    
        const bag_id = session.bag_id
    const bag = await db.collection("bag").findOne( {_id: new ObjectId(bag_id)})
    if (!bag) return res.status(404).send("Sacola não encontrada")

    res.locals.bag = bag  
    
    next()

    } catch (error) {
        console.log(chalk.red(error))
    }

}

export {validateToken}