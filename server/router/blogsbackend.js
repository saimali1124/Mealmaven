const express = require('express');
const multer = require('multer');

const router = express.Router();
const Blog = require('../models/blogschema');


// Set up multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadblog", upload.single('image'), async (req, res) => {
  const { title, content, category } = req.body;
  const imageBuffer = req.file.buffer; // Get the image buffer directly

  const newBlog = new Blog({
    userEmail: "user@example.com", // Replace with actual user email from session
    title: title,
    content: content,
    category: category,
    imageData: imageBuffer,
  });

  try {
    const result = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'Error saving blog', error: error.message });
  }
});




    

  router.get('/getblogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      const blogsToSend = blogs.map(blog => {
        return {
          ...blog._doc,
          imageData: blog.imageData ? `data:image/jpeg;base64,${blog.imageData.toString('base64')}` : null,
        };
      });
      res.json(blogsToSend);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).send('Error fetching blogs');
    }
  });
  


  
module.exports = router;
