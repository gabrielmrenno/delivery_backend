import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Verify if the username is already registered -> if not exists, throw a error
        const client = await prisma.clients.findFirst({
            where: {
                username: username
            }
        })

        if (!client) {
            throw new Error("Username or password incorrect");
        }

        // verify password (encrypted) is matching with db -> if not, throw a error
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password incorrect");
        }

        // generate token using JWT
        // method sign:
        const token = sign({ username }, "0c4fab6f57f53ea4402a1c17638bb69c", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;
    }
}