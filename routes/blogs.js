const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/BlogsController');
const authUser = require('../middlewares/authUser');

/**
 * @swagger
 * /blogs/:
 *  get:
 *    summary: Get all blogs
 *    description:
 *      "Ստանում ենք բոլոր բլոգները"
 *    tags:
 *      - Blogs
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/', authUser, blogsController.getAllBlogs);

/**
 * @swagger
 * /blogs/my-blogs:
 *  get:
 *    summary: Get own blogs
 *    description:
 *      "Ստանում ենք սեփական բլոգները"
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: id
 *        description: "Սա բլոգի id-ն է"
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            author:
 *              type: string
 *          example: {
 *            "author": "user id",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/my-blogs', authUser, blogsController.getAllMyBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *    summary: Get blog by id
 *    description:
 *      "Ստանում ենք բլոգ ըստ id-ի"
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: id
 *        description: "Սա բլոգի id-ն է"
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: string
 *          example: {
 *            "id": "blog id",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/:id', authUser, blogsController.getBlogById);

/**
 * @swagger
 * /blogs/create:
 *  post:
 *    summary: Create new blog
 *    description:
 *      "Ստեղծում ենք նոր բլոգ"
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *          example: {
 *            "name": "Գեղամ",
 *            "description": "Բլոգի մանրամասն նկարագրությունը",
 *            "image": "base 64 image data",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/create', authUser, blogsController.createBlog);

/**
 * @swagger
 * /blogs/update:
 *  put:
 *    summary: Update glog
 *    description:
 *      "Փոփոխում ենք բլոգը"
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *          example: {
 *            "name": "Գեղամ",
 *            "description": "Բլոգի մանրամասն նկարագրությունը",
 *            "image": "base 64 image data"
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.put('/:id', authUser, blogsController.updateBlog);

/**
 * @swagger
 * /blogs/{id}:
 *  delete:
 *    summary: Delete blog
 *    description:
 *      "Հեռացնում ենք նշված բլոգը"
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            author:
 *              type: string
 *          example: {
 *            "name": "John",
 *            "description": "Բլոգի մանրամասն նկարագրությունը",
 *            "image": "base 64 image data",
 *            "author": "author id",
 *          }
 *    responses:
 *      200:
 *        description: Success delleting
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.delete('/:id', authUser, blogsController.deleteBlog);

module.exports = router;
