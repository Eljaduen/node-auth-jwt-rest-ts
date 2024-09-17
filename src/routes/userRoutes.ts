import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/usersController';

const router = express.Router();

const autenticateToken = (req: Request, res: Response, next: NextFunction):any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No autorizado'})
    }

    jwt.verify(token, process.env['JWT_SECRET'], (err, decoded):any=> {
        if (err) {
            return res.status(403).json({ error: 'No tienes acceso a este curso'})
        }

        next();
        // return true
    })
    // return true
 };

router.post('/', autenticateToken, createUser )
router.get('/', autenticateToken, getAllUsers )
router.get('/:id', autenticateToken, getUserById )
router.put('/:id', autenticateToken, updateUser )
router.delete('/:id', autenticateToken, deleteUser )


export default router;
