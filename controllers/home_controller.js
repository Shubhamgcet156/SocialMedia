const Post=require('../models/post');

module.exports.home=function(req,res){
    // Post.find({}).then((posts)=>{
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts:posts
    //     });
    // }).catch((err)=>{
    //     console.log('Error while posting')
    // })
    Post.find({}).populate('user').exec().then((posts)=>{
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
        });
    }).catch((err)=>{
        console.log('Error while posting')
    })
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts:posts
    //     });
}
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
