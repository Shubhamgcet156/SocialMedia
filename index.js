const express=require('express');
const app=express();
const port=3000;


//use express router
app.use('/',require('./routers'))



app.listen(port,function(err){
    if (err){
        console.log(`Error on running server:${err}`)
    }
    console.log(`Server is running on port:${port}`)
});