const User=require('../models/user');

//lets keep it same as before
module.exports.profile=function(req,res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile',{
            title:'Home',
            profile_user:user
        });
    })
    
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
            return res.redirect('back')
        })
    }else{
        return res.status(401).send('Unauthorized')
    }
    
}


//rendered the sign up page
module.exports.signUp=function(req,res){
    if (req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codial | sign Up"
    });
}

//rendered the sign in page
module.exports.signIn=function(req,res){
    if (req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codial | Sign In"
    })
}


//get sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        // console.log('hii')
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then((user)=>{
        if (!user){
            User.create(req.body).then((user)=>{
                return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log('Error in creating page');
                return
            })
            // User.create(req.body,function(err,user){
            //     if(err){console.log('Error in creating the page');return}
                
            //     console.log('baba');
            //     return (res.redirect('/users/sign-in'))
            // })
        }else{
            return res.redirect('back');
        }

    }).catch((err)=>{
        console.log('Error while sign up');
        return
    });
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){console.log('Error while sign up'); return};

    //     if (!User){
    //         User.create(req.body,function(err,user){
    //             if(err){console.log('Error in creating the page');return}

    //             return res.redirect('/users/sign-in')
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
    //Todo later
}
//sign in and create an create an session for user
module.exports.createSession=function(req,res){
    req.flash('success','Logged In Successfully');
    //Todo Later
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
//     req.logout();
//     return res.redirect('/');
//
    req.logout(function(err) {
        req.flash('success','You have Logged out');
        if (err) { return next(err); }
        return res.redirect('/');
    });
 }