import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const dbConnect = require("./utils/database");

dotenv.config();

const app: Express = express();
const port: Number = (process.env.PORT) ? Number(process.env.PORT) : 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});


dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}).catch((error: any) => console.log(error));

