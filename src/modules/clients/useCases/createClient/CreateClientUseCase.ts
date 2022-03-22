import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient"

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient) {
        // verify if client exists already (username = username (parameter)) -> mode: "insensitive" is to ignore lower and uppercase
        const userExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if (userExists) {
            throw new Error("User Already exists");
        }

        // encrypt the password before put in db
        // use hash() method from bcrypt, passing password and salt = 10 (default value to make hashPassword stronger)
        const hashPassword = await hash(password, 10);

        // save user in db, with password encrypted
        const user = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return user;
    }
}