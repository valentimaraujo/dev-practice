const Router = require('express');

const ExamController = require('../api/controllers/ExamController');
const schemaValidate = require('../api/middlewares/validates/schemaValidate');
const schemas = require('../api/middlewares/validates/examSchemaValidate');

const routes = Router();

/**
 * @swagger
 * /api/v1/exam:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Returns all exams
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.get('/', ExamController.index);

/**
 * @swagger
 * /api/v1/exam:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Create a new exam
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
routes.post('/', schemaValidate(schemas.create, 'body'), ExamController.store);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Update a specific exam
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
routes.put('/:id', schemaValidate(schemas.update, 'body'), ExamController.update);

/**
 * @swagger
 * /api/v1/exam/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Delete a specific exam
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
routes.delete('/:id', ExamController.destroy);

/**
 * @swagger
 * /api/v1/exam/toggle-status/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Toggle status a specific exam
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
routes.get('/toggle-status/:id', ExamController.toggleStatus);

/**
 * @swagger
 * /api/v1/exam/associate/{id_exam}/{id_laboratory}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Associates an active exam with an active laboratory
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id_exam
 *        in: path
 *        required: true
 *        type: integer
 *      - name: id_laboratory
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.get('/associate/:id_exam/:id_laboratory', ExamController.associate);

/**
 * @swagger
 * /api/v1/exam/associate/{id_exam}/{id_laboratory}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Deletes a specific association between exam and laboratory
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id_exam
 *        in: path
 *        required: true
 *        type: integer
 *      - name: id_laboratory
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.delete('/associate/:id_exam/:id_laboratory', ExamController.associateDestroy);

module.exports = routes;
