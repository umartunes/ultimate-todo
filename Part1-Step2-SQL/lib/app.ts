import express = require('express')
import bodyParser = require('body-parser')
import { Request, Response } from "express";

//Importing Routes class
import { todosRouters } from './routes/routes-todos';

//Importing MiddleWares
import responseTemplate from './middlewares/response-template';

class App {
    public server: express.Application;

    public todoRoute: todosRouters = new todosRouters();
    constructor() {
        this.server = express();
        this.configuration();
    }

    private configuration(): void {
        //Use Custom Middleware to get response template in all api routes
        this.server.use(responseTemplate);

        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
        
        //Handling CORS requests
        this.server.use((req: Request, res: Response, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });

        //Setting routes
        this.todoRoute.routes(this.server);
        this.server.get('/', (req: Request, res: Response) => {
            res.status(200).send("Root / Working...");
        })

        //Error Control
        this.server.use(function (err, req: Request, res: Response, next) {
            console.error(err);
            res.status(500).send('Something broke!');
        })
    }
}


export default new App().server