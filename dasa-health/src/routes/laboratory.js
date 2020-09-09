const Router = require('express');

const LaboratoryController = require('../api/controllers/LaboratoryController');
const schemas = require('../api/middlewares/validates/laboratorySchemaValidate');
const schemaValidate = require('../api/middlewares/validates/schemaValidate');

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
 *              example: Delboni Auriemo
 *            address:
 *              type: string
 *              example: R. Brg. Gavião Peixoto, 360 - Lapa, São Paulo - SP, 05078-000
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
 * /api/v1/laboratory/lote:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Create laboratories in lote
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              active:
 *                type: boolean
 *            required:
 *              - name
 *              - address
 *          example:
 *            - name: Delboni Auriemo
 *              address: R. Brg. Gavião Peixoto, 360 - Lapa, São Paulo - SP, 05078-000
 *              active: true
 *            - name: Lavoisier - Laboratório de exames e de Imagem
 *              address: Av. Águia De Haia, 1751 - Arthur Alvim - São Paulo - Sp, 03694-000
 *              active: true
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.post('/lote', LaboratoryController.storeLote);

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
 *              example: Delboni Auriemo
 *            address:
 *              type: string
 *              example: R. Brg. Gavião Peixoto, 360 - Lapa, São Paulo - SP, 05078-000
 *            active:
 *              type: boolean
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.put('/:id', schemaValidate(schemas.update, 'body'), LaboratoryController.update);

/**
 * @swagger
 * /api/v1/laboratory/lote/update:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Update laboratories in lote
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              active:
 *                type: boolean
 *          example:
 *            - id: 1
 *              name: Delboni Auriemo
 *              address: R. Brg. Gavião Peixoto, 360 - Lapa, São Paulo - SP, 05078-000
 *              active: true
 *            - id: 2
 *              name: Lavoisier - Laboratório de exames e de Imagem
 *              address: Av. Águia De Haia, 1751 - Arthur Alvim - São Paulo - Sp, 03694-000
 *              active: true
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.put('/lote/update', LaboratoryController.updateLote);

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
 * /api/v1/laboratory/lote/delete:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Laboratory
 *    summary: Delete laboratories in lote
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: array
 *          items:
 *            type: integer
 *            format: int64
 *          example: [1, 2, 3]
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.delete('/lote/delete', LaboratoryController.destroyLote);

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
