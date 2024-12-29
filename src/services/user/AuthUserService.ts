import { JwtPayload, sign, verify } from "jsonwebtoken";
import prisma from "../../database";
import AuthUserRequest from "../../models/user/requests/AuthUserRequest";
import { compareHash, generateHash } from "../../utils/hashProvider";
import { AuthUserResponse } from "../../models/user/responses/user/AuthUserResponse";
import Nodemailer from "nodemailer";

class AuthUserService{
    async authUser({email, password}: AuthUserRequest) : Promise<AuthUserResponse> {

        email = email.trim();
        password = password.trim();

        if(!email || !password){
            throw new Error("Missing parameters");
        }

        const userLogin = await prisma.login.findFirst({
            where:{
                email: email
            }
        })


        if(!userLogin){
            throw new Error("Email/Senha incorretos");
        }

        const passwordMatch = await compareHash(password, userLogin.password);

        if(!passwordMatch){
            throw new Error("Email/Senha incorretos");
        }

        const user = await prisma.user.findUnique({
            where:{
                id: userLogin.userId
            }
        })
        
        const token = sign(
        {
            name: user.name,
            email: userLogin.email,
            id: user.id
        },
        process.env.JWT_SECRET as string,
        {
            subject: user.id.toString(),
            expiresIn: "30d"
        });

        const response = new AuthUserResponse();

        response.id = user.id;
        response.name = user.name;
        response.email = userLogin.email;
        response.token = token;

        return response;
    }

    async resetPasswordRequest({email}) : Promise<void> {
        email = email.trim();

        if(!email){
            throw new Error("Missing parameters");
        }

        const userLogin = await prisma.login.findFirst({
            where:{
                email: email
            },
            include:{
                user: true
            }
        })


        if(!userLogin){
            throw new Error("Email não encontrado");
        }

        const token = sign(
            {
                email: userLogin.email,
                id: userLogin.id
            },
            process.env.JWT_SECRET as string,
            {
                subject: userLogin.id.toString(),
                expiresIn: "1h"
            });

        const transporter = Nodemailer.createTransport({
            host: 'smtp.resend.com',
            secure: true,
            port: 465,
            auth: {
              user: 'resend',
              pass: process.env.RESEND_EMAIL_PASSWORD,
            },
          });
        
          const info = await transporter.sendMail({
            from: 'onboarding@resend.dev',
            to: userLogin.email,
            subject: 'Alteraçao de senha',
            html: `
            <div style="background-color: #1e88e5; padding: 20px; font-family: Arial, sans-serif; margin-bottom: 20px;">
                InvestTrack
            </div>
            <h1 style="font-family: Arial, sans-serif; margin-bottom: 20px;">Olá, ${userLogin.user.name}!</h1>
            <p style="font-family: Arial, sans-serif; margin-bottom: 20px;"> Recebemos sua solicitação para alterar a senha. Clique no link abaixo para resetar sua senha</p>
            <a href="http://localhost:4200/reset-password?token=${token}">Resetar senha</a>`,
          });
        
    }

    async resetPassword({password, token}) : Promise<void> {
        password = password.trim();
        token = token.trim();

        if(!password || !token){
            throw new Error("Missing parameters");
        }

        const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log(decoded);

        const userLogin = await prisma.login.findUnique({
            where:{
                id: decoded.id
            }
        })

        if(!userLogin){
            throw new Error("Token inválido");
        }

        const passwordHashed = await generateHash(password);

        await prisma.login.update({
            where:{
                id: userLogin.id
            },
            data:{
                password: passwordHashed
            }
        });
            
    }
        
}

export default AuthUserService;