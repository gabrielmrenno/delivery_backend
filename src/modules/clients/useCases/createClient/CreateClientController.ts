import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
    async handle(req: Request, res: Response): Promise<Response> {
        // To take data from HTTP requisition
        const { username, password } = req.body;

        // to instance UseCase and after call execute, passing data
        const createClientUseCase = new CreateClientUseCase();
        const result = await createClientUseCase.execute({ username, password });

        // return result to see the new user created
        return res.json(result);
    }
}