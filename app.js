const express = require('express')
const app = express()
var session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/'

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
    try {
        //Mongostore for storing sessions in mongodb
        const store = new MongoDBStore({
                uri: uri,
                databaseName:'sessions',
                collection: 'allsessions'
            }, function (err)               
            {
                console.log(err);
            }
        ) 
        
        //for connecting mongodb to store data
        client = new MongoClient(uri);
        await client.connect();
        // db = client.db("sessions")
        // val = client.db("sessions").collection("allsessions").find({});
        // console.log(val.toArray())
        // console.log(db);
        await listDatabases(client);
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/gfg', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
    secret: "secret key",
    resave: false,
    secure:true,
    saveUninitialized: false,
    cookie: {
        maxAge: 15*60 *1000,
    },
    store:store
}))
app.use('/routes', require('./routes'));
app.get('/',async function (req, res) {
    if (req.session.view)
    {
        // console.log(req.session);
        // let v = await db.collection('users').insertOne({name:'rahul'});
        // console.log(v.insertedId)
        // let val = client("sessions").collection("allsessions").find({});
        req.session.view++;
        res.send('Hello ' + req.session.view);
    }
    else {
        req.session.view = 1;
        res.send('Hello initialised');
    }
})

    } catch (e) {
        console.error(e);
    }
}
try {
    main();
}
catch (err)
{
    console.log(err);
}
app.listen(3000);