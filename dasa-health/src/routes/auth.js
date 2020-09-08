const Router = require('express');

const AuthController = require('../api/controllers/AuthController');

const routes = Router();

/**
 * @swagger
 * /api/v1/user/authentication:
 *  post:
 *    tags:
 *      - User
 *    summary: Logs in a user
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *          required:
 *           - username
 *           - password
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.post('/authentication', AuthController.auth);

module.exports = routes;
