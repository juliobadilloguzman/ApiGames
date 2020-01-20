//Server
import express, { Application } from 'express';

//Middlewares
import morgan from "morgan";
import cors from "cors";

//Routes
import indexRoutes from "./routes/indexRoutes";
import gamesRoutes from "./routes/gamesRoutes";

export class Server{

    private app: Application;
    
    constructor(private port?: Number | String){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(): void{
        this.app.set('port', this.port || process.env.port || 3000)
    }

    middlewares(): void{
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/games',gamesRoutes);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}