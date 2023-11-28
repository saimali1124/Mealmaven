const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  userEmail: 
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
  imageData: 
  { type: Buffer } // storing image as binary datas
});

const Blog = mongoose.model('BLOG', blogSchema);
module.exports = Blog;