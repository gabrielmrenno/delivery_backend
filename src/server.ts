import express from 'express';

import { routes } from "./routes";

const app = express();

app.use(express.json());

app.listen(3333, () => console.log("Server is running"));

app.use(routes);