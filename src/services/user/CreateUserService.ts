
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserResquest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({ name, email, password }: UserResquest){

        //verificar se ele enviou um email
        if(!email){
            throw new Error("Email inválido.")
        }
        //verificar se esse email já existe no cadastro
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("E-mail já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }