const express=require('express');
const app=express();
const port=3000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'))

app.use(expressLayouts);
//extract style and script form sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router
app.use('/',require('./routers'));

app.set('view engine','ejs');
app.set('views','./views')



app.listen(port,function(err){
    if (err){
        console.log(`Error on running server:${err}`)
    }
    console.log(`Server is running on port:${port}`)
});