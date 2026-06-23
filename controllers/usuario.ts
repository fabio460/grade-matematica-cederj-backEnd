type typeUsuario = {
    nome: string | null
    email: string | null
    senha: string | null
} 
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const setUsuario = async(req: Request, res: Response) => {
     const { nome, email, senha } = req.body as typeUsuario;
     if (!nome || !email || !senha) {
         return res.status(400).json({ error: 'Nome, email and password are required' });
     }
     try {
         const newUser = await prisma.usuario.create({
                data: { nome, email, senha }
         });
         res.status(201).json(newUser);
     } catch (error) {
         console.error('Error creating user:', error);
         res.status(500).json({ error: 'An error occurred while creating the user' });
     }  
}
export const getUsuario = async(req: Request, res: Response) => {
    try {
        const users = await prisma.usuario.findMany();  
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching the users' });
    }
}

export const getUsuarioById = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        const user = await prisma.usuario.findUnique({
            where: { id }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
}

export const updateUsuario = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { nome, email, senha } = req.body as typeUsuario;
    try {
        const updatedUser = await prisma.usuario.update({
            where: { id },
            data: { nome, email, senha } as any
        });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        await prisma.usuario.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
}