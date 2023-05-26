const Post=require('../models/post');
const User=require('../models/user')

module.exports.home=async function(req,res){
    // Post.find({}).then((posts)=>{
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts:posts
    //     });
    // }).catch((err)=>{
    //     console.log('Error while posting')
    // })
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        
        let users= await User.find({})
        return res.render('home',{
            title:'Codial | Home',
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}
    
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts:posts
    //     });

    // console.log(req.cookies);
    // res.cookie('user_id',25);
    
