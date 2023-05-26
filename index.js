const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=3000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratgy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash= require('connect-flash');
const customMware= require('./config/middleware')

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(expressLayouts);
//extract style and script form sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views')


//mongo store is used to store the session cookie in db
app.use(session({
    name:'codial',
    //TODO change in sercret befre deployment in production
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1/test-app',
        autoRemove:'disabled'
       }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routers'));

app.listen(port,function(err){
    if (err){
        console.log(`Error on running server:${err}`)
    }
    console.log(`Server is running on port:${port}`)
});