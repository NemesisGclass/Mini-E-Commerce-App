const router = require('express').Router();
const Blog = require('../models/Blog');
const { verifyToken } = require('../middleware/auth');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, published = true } = req.query;
    const query = published === 'true' ? { published: true } : {};
    
    const blogs = await Blog.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
});

// Create a new blog (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    // Generate excerpt from content if not provided
    const content = req.body.content;
    if (!req.body.excerpt && content) {
      req.body.excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    }

    const blog = new Blog(req.body);
    await blog.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
});

// Update blog (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Generate excerpt from content if not provided
    const content = req.body.content;
    if (!req.body.excerpt && content) {
      req.body.excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
});

// Delete blog (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
});

module.exports = router;
