import * as express from 'express'
import  routerMiddleware from './ticketsRoutes/ticketsRoutes'
import * as dotenv from 'dotenv'
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()

dotenv.config()
const port = process.env.PORT

const jsonParseMiddleware = express.json()
app.use(jsonParseMiddleware)
app.use(routerMiddleware)


const options={
  definition:{
      openapi:'3.0.0',
  info:{
  title:'node js api project for employee managaement',
  version:'1.0.0'
  },
  servers:[
      {
         url: 'http://localhost:3000/'
      }
  ]
  },
  apis:['./src/index.ts'] 
  }

  const swaggerSpec=swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**

 * @swagger
 *  components:
 *      data:
 *          TicketsDetails:
 *              type: object
 *              properties:
 *                  passangerDetails:
 *                      type: array
 *                  bookingId:
 *                      type: string
 *                  source:        
 *                      type: string
 *                  destination:
 *                      type: string'
 *                  category:
 *                      type: string
 *                  totalfare:
 *                      type: number
 *                  status:
 *                      type: string                      
 *                  comments:
 *                      type: string
 *                  ownerId:
 *                      type: string
 *                  DepartureTime:
 *                      type: Date
 *                  bookedOn:
 *                      type: Date
 *                  modifiedOn:
 *                      type: Date
 *              
 */


/**

 * @swagger
 * /createTickets:  
 *  post:
 *     summary: this api is used to check post method
 *     description: this api is used to check if patch method is working or not
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/TicketsDetails'
 *     responses:
 *          200:
 *              description: To test post method
 */

/**

 * @swagger
 * /getTickets:  
 *  get:
 *     summary: this api is used to check get method
 *     description: this api is used to check if get method is working or not
 *     responses:
 *          200:
 *              description: To test Get method
 */

/**

 * @swagger

 * /getProp/{id}:  
 *  get:
 *     summary: this api is used to check get method by id
 *     description: this api is used to check if get by id method is working or not
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID required
 *           schema:
 *             type: string
 *     responses:
 *          200:
 *              description: To test Get method
 */


 /**

 * @swagger
 * /updateTickets/{id}:  
 *  patch:
 *     summary: this api is used to check patch method
 *     description: this api is used to check if patch method is working or not
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID required
 *           schema:
 *             type: string
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/TicketsDetails'
 *     responses:
 *          200:
 *              description: To test post method
 */


 
/**

 * @swagger

 * /cancelTickets/{id}:  
 *  delete:
 *     summary:  this api is used to check delete method
 *     description: this api is used to check if post method is working or not
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true,
 *          description: Num Id Req
 *          schema:
 *             type: string
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/data/TicketsDetails'
 *     responses:
 *          200:
 *              description: To test delete method
 */

 function listen(port) {
  
  app.listen(port, () => {
      console.log(`app listening in http://localhost:${port}`)
  }).on('error', function (err) {
      if(err) {
          console.log(`Port ${port} is busy, trying with port`);
      } 
  });
}

listen(port);