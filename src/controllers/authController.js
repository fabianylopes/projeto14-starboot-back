import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from "../db.js";

export async function setSignUp(req, res){
    const customer = req.body;

    try {
        const passwordHashed = bcrypt.hashSync(customer.password, 10);

        await db.collection('customers').insertOne({
            ...customer,
            password: passwordHashed
        });

        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res,sendStatus(500);
    }
}

export async function setSignIn (req, res){
    const { email, password } = req.body;
                
    const customer = await db.collection('customers').findOne({ email });
    if(!customer){
        return res.sendStatus(401);
    }
    
    const name = customer.name;
    
    const rightPassword = bcrypt.compareSync(password, customer.password);
    if(rightPassword){
        const token = uuid();
        
        await db.collection('session').insertOne({ token, customerId: customer._id});
        return res.send({token, name});
    }
        
    res.sendStatus(401);
}