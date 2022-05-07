const Posts = require('../models/posts');

class PostsController {

    async create(req, res) {
        try {
            const post = new Posts(req.body);
            await post.save()
        
            return res.status(201).send(post)
        } catch (error) {
            console.log(error)
            res.status(400).send({ error});                
        }
    }
    async find(req, res) {
        try {
            const author = req.query.author || null
            const isPublished = req.query.isPublished || null

            const where = {}
            if (author) where.author = author
            if (typeof isPublished == "boolean") where.isPublished = JSON.parse(isPublished)
            const posts = await Posts.findAll({where: where})
            return res.send(posts)
        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }
    }   

    async findById(req, res) {
        try {
            const post = await Posts.findOne({ where: { id: req.params.id } })
            if (!post) return res.status(404).send('ID not found')
            return res.send(post)    
        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }
    }
}

module.exports = new PostsController()