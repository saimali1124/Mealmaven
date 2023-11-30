const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  email: 
  { type: String, 
    required: true },
  title: 
  { type: String, 
    required: true },
  content: 
  { type: String, 
    required: true },
  category: 
  { type: String, 
    required: true },
    
    imagePath: { type: String, 
      required: true },
        
    author: { type: String, 
      required: true },
      date: { type: String, 
        required: true },
      



  });

const Blog = mongoose.model('BLOG', blogSchema);
module.exports = Blog;