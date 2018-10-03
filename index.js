require('dotenv').config()
var MongoClient = require('mongodb').MongoClient
var legit = 0
global.db

MongoClient.connect(process.env.MongoURL,{useNewUrlParser:true},(err,db)=>{
    if(err) throw err
    global.db = db
    var User = db.db('TDNchat').collection('User')
    User.find({status:2}).toArray((err,res)=>{
        if(err) throw err
        processArray(res)
        console.log(legit)
    })
})

async function processArray(res) {
    var dem = 0
    var User = global.db.db('TDNchat').collection('User')
    res.forEach(async UserA => {
        legit++
        User.findOne({'_id':UserA.connect},(err,UserB)=>{
            if(err) throw err
            if(UserB.status != 2){
                console.log("--------------------------------")
                console.log('FOUND!:', UserB._id)
                console.log(UserA)
                console.log(UserB)
                User.updateOne({"_id":UserA._id},{$set: {"status": 0,"connect":""}},err=>{
                    if(err) throw err
                    else{
                        console.log("Success updating A", UserA._id, UserA.name)
                        dem++
                    }
                })
            }
        })
    })
}