const exp=require("express")
const user=exp.Router();

const bs=require("body-parser")
user.use(bs.json());
// import bycript
const bycript=require("bcrypt")

//  import mongodb
const mongo = require("mongodb").MongoClient
url="mongodb://anil:anil@cluster0-shard-00-00-evfjd.mongodb.net:27017,cluster0-shard-00-01-evfjd.mongodb.net:27017,cluster0-shard-00-02-evfjd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
var dbo;
var collectiondb;
mongo.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(req,client)=>{
dbo=client.db("sample");
collectiondb=dbo.collection("samplecol")
});
// post to database

user.post('/create',(req,res)=>{
    console.log("connitnggg",req.body);
    
    collectiondb.find({email:req.body.email}).toArray((err,dataArray)=>{
        console.log("printinggg",req.body);
        
        if(err){
            console.log(err);
        }
        else if(dataArray.length!=0){
            res.json({message:"unsuccess"})
        }
        else{
            bycript.hash(req.body.password,9,(err,hased)=>{
                console.log(req.body);
                
                if(err){
                    console.log("some errors",err);
                }
                else{
                    req.body.password=hased
                    collectiondb.insertOne(req.body,(err,success)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.json({message:"success"})
                        }
                    })
                }
            })
        }
    })
})

// login to campare
user.post('/login',(req,res)=>{
    console.log(req.body);
collectiondb.find({email:req.body.username}).toArray((err,dataArray)=>{
    if(err){
        console.log("Error During Collection",err);
    }
    else if(dataArray.length==0){
        res.json({message:"unsuccess"})
    }
    else{
            bycript.compare(req.body.password,dataArray[0].password,(err,result)=>{
                console.log(req.body);
                
                if(err){
                    console.log("some errors",err);
                }
                else if(result==false){
                    res.json({message:"invalid password"})
                }
                else{ 
    
                    res.json({message:"success"})
                    
                }

    
            })

        
       
       
    }

})
})


// get data
user.get('/test',(req,res)=>{
    collectiondb.find().toArray((err,dataArray)=>{
        if(err){
            console.log(err);
        }
        else if(dataArray.length==0){
            res.json({message:"unsuccess"})
        }
        else{
            res.json({message:dataArray})
        }
    })

})

// deleting method

user.delete('/delet/:password',(req,res)=>{
    collectiondb.find({password:req.params.password}).toArray((err,dataArray)=>{
        if(err){
            console.log(err);
        }
        else if(dataArray.length==0){
            res.json({message:"unsuccess"})
        }
        else{
            collectiondb.deleteOne({password:req.params.password},(err,success)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.json({message:"success"})
                }
            })
        }
    })
})


// update method

user.put('update',(req,res)=>{
    collectiondb.find({fullname:req.body.fullname}).toArray((err,dataArray)=>{
        if(err){
            console.log(err);
        }
        else if(dataArray.length==0){
            res.json({message:"unsuccess"})
        }
        else{
            collectiondb.update({fullname:req.body.fullname},{$set:{email:req.body.email}},(err,success)=>{
                if(err){
                    console.log(err);
                    
                }
                else{
                    res.json({message:"success"})
                }
            })
        }


    })
})


module.exports=user;