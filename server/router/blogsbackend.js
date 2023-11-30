
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();
const Blog=require("../models/blogschema")
const ObjectId = require('mongodb').ObjectId;




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.post("/uploadblog", upload.single('image'), async (req, res) => {
  const { title, content, category,email,author } = req.body;
  const imagePath = req.file.path; // path where the image is saved



const currentDate = new Date();
const date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

  const newBlog = new Blog({
    email , 
    title,
    content,
    category,
    imagePath,
    author,
    date
  });
  

  try {
    const result = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: result });
  } catch (error) {
    res.status(500).json({ message: 'Blog not created successfully', error: error.message });
  }
});




  

  
 
router.get('/getblogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Error fetching blogs');
  }
});

router.get('/getarticle/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).send('Error fetching blog');
  }
});


router.get("/search", async (req, res) => {
  const query = req.query.query.toLowerCase();
  const categoryFilter = req.query.category || null; //  category filter

  let searchCondition = {};

  if (categoryFilter==="Fitness" || categoryFilter==="Food" || categoryFilter==="Lifestyle" ) {
    // search only in the provided category
    searchCondition = {
      $and: [
        { title: { $regex: query, $options: "i" } },
        { category: categoryFilter },
      ],
    };
  } else if(categoryFilter==="abc") {
    // search in both title and category
    searchCondition = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
  }

  

  try {
    const filteredBlogs = await Blog.find(searchCondition);
    res.json(filteredBlogs);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blogsByEmail/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const blogs = await Blog.find({ email }); 
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete an article by ID
router.delete("/deletearticle/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Blog.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
