const express = require('express');
const router = express.Router();

const blogsController = require('../controllers/BlogsController');

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
router.get('/', blogsController.getAllBlogs);

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
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/:id', blogsController.getBlogById);

/**
 * @swagger
 * /blogs/send-email:
 *  post:
 *    summary: Send test email
 *    tags:
 *      - Blogs
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *          example: {
 *            "email": "test@email.ru",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/send-email', blogsController.sendEmail);

/**
 * @swagger
 * /blogs:
 *  post:
 *    summary: Create new rental
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
 *            - price
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            author:
 *              type: string
 *          example: {
 *            "name": "Գեղամ",
 *            "description": "Բլոգի մանրամասն նկարագրությունը",
 *            "image": "base 64 image data",
 *            "author": "author id",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/', blogsController.createBlog);

/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    summary: Update rental
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
 *            author:
 *              type: string
 *          example: {
 *            "name": "Գեղամ",
 *            "description": "Բլոգի մանրամասն նկարագրությունը",
 *            "image": "base 64 image data",
 *            "author": "author id",
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.put('/:id', blogsController.updateBlog);

/**
 * @swagger
 * /blogs/{id}:
 *  delete:
 *    summary: Delete rental
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
router.delete('/:id', blogsController.deleteBlog);

module.exports = router;
