import express from 'express';
import { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { routes } from "./routes";

const app = express();

app.use(express.json());

app.listen(3333, () => console.log("Server is running"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "internal Server Error"
    })
})

app.use(routes);