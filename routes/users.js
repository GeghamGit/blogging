const express = require('express');
const router = express.Router();
const user = require('../controllers/UsersController');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const authUser = require('../middlewares/authUser');

/**
 * @swagger
 * /auth/:
 *  get:
 *    summary: Get all users
 *    description:
 *      "Ստանում ենք բոլոր օգտատերերին"
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/', authUser, user.getUsers);

/**
 * @swagger
 * /auth/{id}:
 *  get:
 *    summary: Get user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
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
router.get('/:id', authUser, user.getUserById);

/**
 * @swagger
 * /auth/create:
 *  post:
 *    summary: Create new user
 *    tags:
 *      - Users
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            surname:
 *              type: string
 *            lastName:
 *              type: string
 *            nickName:
 *              type: string
 *            address:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *          example: {
 *            "firstName": "Գեղամ",
 *            "surname": "Հարությունյան",
 *            "lastName": "Թաթոս",
 *            "nickName": "Գեղամ94",
 *            "address": "Գյումրի",
 *            "email": "Your email",
 *            "password": "Your password"
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/create', user.createUser);

/**
 * @swagger
 * /auth/login{id}:
 *  post:
 *    summary: Log in user
 *    tags:
 *      - Users
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *          example: {
 *            "email": "Your email",
 *            "password": "Your password"
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/login', user.loginUser);

/**
 * @swagger
 * /auth//email/verify:
 *  post:
 *    summary: Log in user
 *    tags:
 *      - Users
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *          example: {
 *            "email": "Your email",
 *            "password": "Your password"
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get('/email/verify', verifyEmailTemplate.verifyEmail);

module.exports = router;
