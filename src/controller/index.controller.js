const openai = require('../helpers/openai')
const { creatingPost, readingPost } = require('../services/indexServices')
const cloudinary = require('../helpers/cloudinary')

const indexController = {
    home: async (req, res) => {
        try {
            res.status(200).send('DALL-E Online')
        } catch (err) {
            res.status(500).send('Some Wrong happened')
        }
    },
    postPrompt: async (req, res) => {
        try {
            const { prompt } = req.body
            const airesponse = await openai.createImage({
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'b64_json'
            })
            const image = airesponse.data.data[0].b64_json
            res.status(200).json({ photo: image })

        } catch (err) {
            res.status(500).send(err)
        }
    },
    storingPost: async (req, res) => {
        try {
            const { name, prompt, photo } = req.body
            const photoUrl = await cloudinary.uploader.upload(photo)
            const newPost = await creatingPost(name, prompt, photoUrl.secure_url)
            res.status(201).json({ success: true, data: newPost })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },
    storingGet: async (_, res) => {
        try {
            const result = await readingPost()
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }
}
module.exports = indexController