const Post = require("../models/Post");
const PostController ={
    async create(req,res){
        try {
            const post = await Post.create(req.params.body)
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    }, async getPostByUsername(req, res) {
        try {
            const post = await Post.aggregate([{
                    $match: {
                        author:req.params.author
                    }
                }, ])
                res.send(post)
        } catch (error) {
            console.log(error)
        }
    }, async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post borrado' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Hubo algún problema borrando el post deseado.' })
        }
    }, async update(req, res) {
        try {
          const post = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true })
          res.send({ message: "Post actualizado correctamente", post });
        } catch (error) {
          console.error(error);
        }
      },
      async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { reviews: { ...req.body, userId: req.user._id } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your review" });
        }
      }
    
    


}
module.exports = PostController;