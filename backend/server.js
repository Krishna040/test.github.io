
const express = require("express")
const app = express();
// import the user
 const user=require('./api/user')
//  const admin=require('./api/admin')

 app.use('/userapi',user)
//  app.use('/adminapi',admin)

//  import path
const path=require("path")
app.use(express.static(path.join(__dirname,"../dist/curdexmple")));
//  server connect
const port=1000;
app.listen(port,()=>{
    console.log("connectd the server");
    
})

