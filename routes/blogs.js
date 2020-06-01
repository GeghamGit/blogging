const express = require('express');
const router = express.Router();

const blogsController = require('../controllers/BlogsController');

router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getBlogById);
router.post('/send-email', blogsController.sendEmail);
router.post('/', blogsController.createBlog);
router.put('/:id', blogsController.updateBlog);
router.delete('/:id', blogsController.deleteBlog);

module.exports = router;
