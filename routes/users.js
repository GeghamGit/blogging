const express = require('express');
const router = express.Router();
const user = require('../controllers/UsersController');
const auth = require('../utils/secureJwt');

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
router.get('/', user.getUsers);

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
router.get('/:id', user.getUserById);

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
 *            "email": "gegham94@gmail.com"
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
 * /auth/{id}:
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
 *            "email": "gegham94@gmail.com"
 *          }
 *    responses:
 *      200:
 *        description: Success response
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post('/login', auth.optional, user.loginUser);

// /**
//  * @swagger
//  * /auth/send-email:
//  *  post:
//  *    summary: Send test email
//  *    tags:
//  *      - Users
//  *    parameters:
//  *      - name: body
//  *        in: body
//  *        required: true
//  *        schema:
//  *          type: object
//  *          required:
//  *            - email
//  *          properties:
//  *            email:
//  *          example: {
//  *            "email": "test@email.ru",
//  *          }
//  *    responses:
//  *      200:
//  *        description: Success response
//  *      404:
//  *        description: Not found
//  *      500:
//  *        description: Server error
//  */
// router.post('/send-email', user.sendEmail);

module.exports = router;
