const express = require('express');
// const { Db } = require('mongodb');
const User = require('./model');
const router = express.Router();

router.get('/yes', async(req, res, next) => {
    let result = await client.db("blockchain").collection('newcollection').insertOne({ goodboy: "badboy" });
    console.log(result.insertedId);
    res.send("yes");
});

router.get('/create', async (req, res, next) => {
    res.send("create");  
})
//for mongoose
// router.get('/create', async (req, res, next) => {
//     let result = new User({
//         username: (new Date().getMinutes).toString(),
//         password: 'password',
//         type: 'type',
//         department:'department'
//     });
    
//     const out = await result.save();
//     console.log(out);
//     res.send(result);
// })

module.exports = router;