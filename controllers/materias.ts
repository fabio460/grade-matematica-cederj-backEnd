import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import { DisciplinaType } from '../lista.js';
const prisma = new PrismaClient();

export const getDisciplinas = async(req: Request, res: Response) => {
    try {
        const disciplinas = await prisma.disciplina.findMany();
        res.json(disciplinas);
    } catch (error) {
        console.error('Error fetching disciplinas:', error);
        res.status(500).json({ error: 'An error occurred while fetching the disciplinas' });
    }    
}

export const getDisciplinaById = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        const disciplina = await prisma.disciplina.findUnique({
            where: { id }
        });
        if (!disciplina) {
            return res.status(404).json({ error: 'Disciplina not found' });
        }
        res.json(disciplina);
    } catch (error) {
        console.error('Error fetching disciplina:', error);
        res.status(500).json({ error: 'An error occurred while fetching the disciplina  ' });
    }
}

export const setDisciplina = async(req: Request, res: Response) => {
    const { nome, codigo_disciplina, tipo, carga_horaria, periodo, grupo, semestre, horario, preRequisitos, disciplinaId, periodoId } = req.body as DisciplinaType;
    if (!nome) {
        return res.status(400).json({ error: 'Nome is required' });
    }
    try {
            const newDisciplina = await prisma.disciplina.create({
            data: { nome, codigo_disciplina, tipo, carga_horaria, periodo, grupo, semestre, horario, preRequisitos, disciplinaId, periodoId } as any
        });
        res.status(201).json(newDisciplina);
    } catch (error) {
        console.error('Error creating disciplina:', error);
        res.status(500).json({ error: 'An error occurred while creating the disciplina' });
    }
}

export const updateDisciplina = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { nome, codigo_disciplina, tipo, carga_horaria, periodo, grupo, semestre, horario, preRequisitos, disciplinaId, periodoId } = req.body as DisciplinaType;
    try {
        const updatedDisciplina = await prisma.disciplina.update({
            where: { id },
            data: { nome, codigo_disciplina, tipo, carga_horaria, periodo, grupo, semestre, horario, preRequisitos, disciplinaId, periodoId } as any
        });
        res.json(updatedDisciplina);
    } catch (error) {
        console.error('Error updating disciplina:', error);
        res.status(500).json({ error: 'An error occurred while updating the disciplina' });
    }
}

export const deleteDisciplina = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        await prisma.disciplina.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting disciplina:', error);
        res.status(500).json({ error: 'An error occurred while deleting the disciplina' });
    }
}