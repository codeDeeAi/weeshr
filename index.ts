import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const dbConnect = require("./utils/database");
const blogRoutes = require("./src/routers/v1/blogs/blog.router");
const authRoutes = require("./src/routers/v1/auth/auth.router");
const userRoutes = require("./src/routers/v1/user/user.router");

dotenv.config();

const app: Express = express();
const cors = require('cors')
const port: Number = (process.env.PORT) ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/', blogRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to Weeshr app Server' });
});

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}).catch((error: any) => console.log(error));

