const Comment=require('../models/comment');

const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post)
       
        if (post){
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
                //handle error
            post.comments.push(comment);
            post.save()
    
            res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}
// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }
// const Comment=require('../models/comment');

// const Post=require('../models/post');

// module.exports.create=function(req,res){
//     Post.findById(req.body.post).then((post)=>{
//         if (post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             }).then((comment)=>{
//                 //handle error
//                 post.comments.push(comment);
//                 post.save()

//                 res.redirect('/');
//             })
//         }
//     })
// }
module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id)
        if (comment.user==req.user.id){
            let postId=comment.post;

            comment.deleteOne(comment);
            let post=await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
            return res.redirect('back')
                
        }else{
            return res.redirect('back')
        }
    }catch(err){
        console.log('Error',err)
    }
    
}