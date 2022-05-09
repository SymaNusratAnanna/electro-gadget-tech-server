const express = require('express');
const cors = require ('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 7070;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jwcgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
try {
    await client.connect();
    const inventoryCollection=client.db('electroGadgettech').collection('inventoryitem');

//AUTH
app.post('/login', async(req, res)=>{
  const user= req.body;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1d'
  });
   res.send({accessToken});

})




    // inventoryitem API
    app.get('/inventoryitem',async(req,res)=>{
      const query={};
      const cursor=inventoryCollection.find(query)
      const inventory=await cursor.toArray()
      res.send(inventory)
    });

    app.get('/inventoryitem/:id', async(req,res)=>{
      const id= req.params.id;
      const query={_id: ObjectId(id)};
      const inventoryitem = await inventoryCollection.findOne(query);
      res.send(inventoryitem);
    });

    //post

    app.post('/inventoryitem', async(req, res)=>{
      const newInventory = req.body;
      const result = await inventoryCollection.insertOne(newInventory);
      res.send(result);
    })
}
finally{

}

}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Running electro gadget tech')
});

app.listen(port, ()=>{
    console.log('listening to port', port);
})