const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company.controllers.js');

/**
 * @swagger
 * /companies:
 *   get:
 *     description: Get a list of companies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of companies
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Company"
 *     tags:
 *       - Companies
 */

router.get('/', companyController.getCompanies);

/**
 * @swagger
 * /companies/{siren}:
 *   get:
 *     description: Get a specific company by siren
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: siren
 *         description: The siren of the company to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A company
 *         schema:
 *           $ref: "#/definitions/Company"
 *       404:
 *         description: Company not found
 *     tags:
 *       - Companies
 */
router.get('/:siren', companyController.filterCompaniesBySiren);
/**
 * @swagger
 * /:
 *  post:
 *    description: Add new companies
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              siren:
 *                type: string
 *              sector:
 *                type: string
 *              ca:
 *                type: string
 *              previousca:
 *                type: string
 *              margin:
 *                type: string
 *              previousmargin:
 *                type: string
 *              ebitda:
 *                type: string
 *              previousebitda:
 *                type: string
 *              loss:
 *                type: string
 *              previousloss:
 *                type: string
 *    responses:
 *      '201':
 *        description: A successful response
 *    tags:
 *     - Companies
 */
router.post('/', companyController.addCompanies);
/**
 * @swagger
 * /company/{siren}:
 *  put:
 *    description: Update the results of a company
 *    parameters:
 *    - name: siren
 *      in: path
 *      required: true
 *      description: The siren of the company
 *      type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ca:
 *                type: string
 *              previousca:
 *                type: string
 *              margin:
 *                type: string
 *              previousmargin:
 *                type: string
 *              ebitda:
 *                type: string
 *              previousebitda:
 *                type: string
 *              loss:
 *                type: string
 *              previousloss:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *    tags:
 *      - Companies
 * 
 */
router.put('/:siren', companyController.addNewResults);
/**
 * @swagger
 * /companies/{siren}:
 *   delete:
 *     description: Delete a company by siren
 *     parameters:
 *       - in: path
 *         name: siren
 *         required: true
 *         description: 
 *         type: string
 *     responses:
 *       200:
 *         description: Company delete succesfully 
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 *     tags:
 *      - Companies
 */
router.delete('/:siren', companyController.deleteCompany);
//sort routes

router.get('/name', companyController.sortCompaniesByName);
router.get('/sector', companyController.sortCompaniesBySector);
router.get('/siren', companyController.sortCompaniesBySiren);
router.get('/ca', companyController.sortCompaniesByCa);
router.get('/previousca', companyController.sortCompaniesByPreviousCa);
router.get('/margin', companyController.sortCompaniesByMargin);
router.get('/previousmargin', companyController.sortCompaniesByPreviousMargin);
router.get('/ebitda', companyController.sortCompaniesByEbitda);
router.get('/previousebitda', companyController.sortCompaniesByPreviousEbitda);
router.get('/loss', companyController.sortCompaniesByLoss);
router.get('/previousloss', companyController.sortCompaniesByPreviousLoss);
//filter routes
router.get('/:sector', companyController.filterCompaniesBySector);

module.exports = router;