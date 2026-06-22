import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getUsuario } from './controllers/usuario.js';
const app = express();
const prisma = new PrismaClient();  
app.use(express.json());

app.get('/usuario', getUsuario);
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});