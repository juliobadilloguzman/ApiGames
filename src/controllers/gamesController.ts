import { Request, Response } from 'express';

import pool from '../database';

class GamesController{

    public async getGames(req: Request, res: Response){

        await pool.query('SELECT * FROM game', (err, result) => {

            if (err) 
                throw err;

            res.json(result);

        });
    
    }
 
    public async getGame(req: Request, res: Response): Promise<any>{

        const id = req.params.id; 

        await pool.query('SELECT * FROM game WHERE id = ?', [id], (err, result) => {

            if (err) 
                throw err;

            if(result.length > 0){
                res.json(result);
                
            }else{
                res.status(404).json({message: "Game not founded"});
            }

            
           
            
        });
    }

    public async createGame(req: Request, res: Response): Promise<void>{

        await pool.query('INSERT INTO game SET ?', [req.body]);

        res.json({message: 'Game created'});
    }

    public async updateGame(req: Request, res: Response):Promise<void>{

        const id = req.params.id;

        await pool.query('UPDATE game SET ? WHERE id = ?', [req.body, id]);

        res.json({message: 'Game updated'});
        
    }

    public async deleteGame(req: Request, res: Response): Promise<void>{
        
        const id = req.params.id;

        await pool.query('DELETE FROM game WHERE id = ?', [id]);

        res.json({message: 'Game deleted'});

    }

    public async searchGame(req: Request, res: Response): Promise<any>{

        const busqueda = req.params.busqueda;

        await pool.query(`SELECT * from game WHERE title LIKE '%${busqueda}%'`,[busqueda], (err, result) => {

            if (err) 
                throw err;

            if(result.length > 0){
                res.json(result);
                
            }else{
                res.status(404).json({message: "Game not founded"});
            }

        });

        

    }

}

const gamesController = new GamesController();
export default gamesController;