import { CommonRoutesConfig } from './CommonRoutes';
import express from 'express';

export class ApiDocRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ApiDocRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/debug/router`)
            .get((req: express.Request, res: express.Response) => {
                let route, data, routeArray:any = [];

                this.app._router.stack.forEach(function(middleware: any){
                    if(middleware.route){
                        data = {
                            "path":middleware.route.path, 
                            "methods":middleware.route.methods
                        }
                        routeArray.push(data);
                    } 
                });
                res.send(routeArray)
            });
    
        return this.app;
    }
}