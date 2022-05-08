const express = require('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.port || 5000;
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

    app.get('/inventoryitem',async(req,res)=>{
      const query={};
      const cursor=inventoryCollection.find(query)
      const inventory=await cursor.toArray()
      res.send(inventory)
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