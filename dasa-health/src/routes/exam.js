const Router = require('express');

const ExamController = require('../api/controllers/ExamController');
const schemas = require('../api/middlewares/validates/examSchemaValidate');
const schemaValidate = require('../api/middlewares/validates/schemaValidate');

const routes = Router();

/**
 * @swagger
 * /api/v1/exam/laboratories-by-exam:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Returns all laborarories by exam name
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: name
 *        required: true
 *        in: query
 *        schema:
 *          type: string
 *          example: RM - Ressonância Magnética
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.get('/laboratories-by-exam', ExamController.findLaboratoriesByExam);

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
 *              example: RM - Ressonância Magnética
 *            type:
 *              type: string
 *              enum: [analise clinica, imagem]
 *              example: analise clinica
 *            active:
 *              type: boolean
 *          required:
 *           - name
 *           - type
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.post('/', schemaValidate(schemas.create, 'body'), ExamController.store);

/**
 * @swagger
 * /api/v1/exam/lote:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Create exams in lote
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
 *              type:
 *                type: string
 *                enum: [analise clinica, imagem]
 *              active:
 *                type: boolean
 *            required:
 *              - name
 *              - address
 *          example:
 *            - name: ACIDO DELTA AMINOLEVULINICO; ALA-U
 *              type: analise clinica
 *              active: true
 *            - name: RM - Ressonância Magnética
 *              type: imagem
 *              active: true
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.post('/lote', ExamController.storeLote);

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
 *              example: RM - Ressonância Magnética
 *            type:
 *              type: string
 *              enum: [analise clinica, imagem]
 *              example: analise clinica
 *            active:
 *              type: boolean
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.put('/:id', schemaValidate(schemas.update, 'body'), ExamController.update);

/**
 * @swagger
 * /api/v1/exam/lote/update:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Update exams in lote
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
 *              name: ACIDO DELTA AMINOLEVULINICO; ALA-U
 *              type: analise clinica
 *              active: true
 *            - id: 2
 *              name: RM - Ressonância Magnética
 *              type: imagem
 *              active: true
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.put('/lote/update', ExamController.updateLote);

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
 * /api/v1/exam/lote/delete:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Exam
 *    summary: Delete exams in lote
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
routes.delete('/lote/delete', ExamController.destroyLote);

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
 *    summary: Associates an active exam with an active exam
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id_exam
 *        in: path
 *        required: true
 *        type: integer
 *      - name: id_exam
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
 *    summary: Deletes a specific association between exam and exam
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id_exam
 *        in: path
 *        required: true
 *        type: integer
 *      - name: id_exam
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: A successful response
 */
routes.delete('/associate/:id_exam/:id_laboratory', ExamController.associateDestroy);

module.exports = routes;
