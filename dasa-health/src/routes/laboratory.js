const Router = require('express');

const LaboratoryController = require('../api/controllers/LaboratoryController');
const schemaValidate = require('../api/middlewares/validates/schemaValidate');
const schemas = require('../api/middlewares/validates/laboratorySchemaValidate');

const routes = Router();

/**
 * @swagger
 * /api/v1/laboratory:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Returns all laboratories
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.get('/', LaboratoryController.index);

/**
 * @swagger
 * /api/v1/laboratory:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Create a new laboratory
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
 *            name:
 *              type: string
 *            address:
 *              type: string
 *            active:
 *              type: boolean
 *          required:
 *           - name
 *           - address
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.post('/', schemaValidate(schemas.create, 'body'), LaboratoryController.store);

/**
 * @swagger
 * /api/v1/laboratory/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Update a specific laboratory
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            address:
 *              type: string
 *            active:
 *              type: boolean
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.put('/:id', schemaValidate(schemas.update, 'body'), LaboratoryController.update);

/**
 * @swagger
 * /api/v1/laboratory/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Delete a specific laboratory
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.delete('/:id', LaboratoryController.destroy);

/**
 * @swagger
 * /api/v1/laboratory/toggle-status/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Toggle status a specific laboratory
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.get('/toggle-status/:id', LaboratoryController.toggleStatus);

module.exports = routes;
