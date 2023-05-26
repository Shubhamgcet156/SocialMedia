const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using password
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email:email}).then((user)=>{
            if (!user || user.password!=password){
                req.flash('error','Invalid Username/password')
                return done(null,false);
            }
            return done(null,user);
        }).catch((err)=>{
            // console.log('Error in finding user==>Passport');
            req.flash('error',err)
            return done(err);
        });
        // User.findOne({email:email},function(err,user){
        //     if(err){
        //         console.log('Error in finding user==>Passport');
        //         return done(err);
        //     }
        //     if (!user || user.password!=password){
        //         console.log('Invalid Username/password');
        //         return done(null,false);
        //     }
        //     return done(null,user);
        // })

    }
    
));

//serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        console.log('Error in finding user ==>  Passport');
        return done(err);
    });
    // User.findById(id,function(err,user){
    //     if(err){
    //         console.log('Error in finding user ==>  Passport');
    //         return done(err);
    //     }
    //     return done(null,user);
    // });
});

//if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in,then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    //if the user is not sign in
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the currecnt signIn user from the session cookie and we are just sending it to locals for the view
        res.locals.user=req.user;
    }
    next();

}

module.exports=passport;