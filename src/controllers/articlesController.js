import db from "../db.js";

export async function getArticles(req, res){
    try {
        const articleCollection = await db.collection("articles");
        const article = await articleCollection.find({}).sort({_id:-1}).limit(1).toArray();
        res.status(200).send(article[0]);   
    } catch (error) {
        console.log("Deu ruim pra inserir a sugestão no banco", error);
    }
}

export async function setArticles(req,res){
    const article = req.body;

    try {
        const articleCollection = await db.collection("articles")
        articleCollection.insertOne(
            {
                title: article.title, 
                content: article.content,
                product_id: article.product_id, 
                date: Date.now()
            }
        );
        res.sendStatus(201)    
    } catch (error) {
        console.log("Deu ruim pra inserir a sugestão no banco", error)
    }
}
