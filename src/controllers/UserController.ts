/**
 * @file Dispatcher for user related requests.
 * @author Marble IT
 */
import express from 'express';
import UserService from '../services/UserService';
import { processError } from '../utils/processError';

class UserController {
    public async getAll(req: express.Request, res: express.Response) {
        try {
            const users = await UserService.getAll();

            res.send({ data: users, success: true });
        } catch (error) {
            processError(error, res);
        }
    }

    public async get(req: express.Request, res: express.Response) {
        try {
            const user = await UserService.get(req.params.id);

            res.send({ data: user, success: true });
        } catch (error) {
            processError(error, res);
        }
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const user = await UserService.create({
                email: req.body.email,
                fullName: req.body.fullName,
                password: req.body.password,
                refreshToken: req.body.refreshToken,
                role: req.body.role,
            });

            res.send({ data: user, success: true });
        } catch (error) {
            processError(error, res);
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {
            const user = await UserService.update({
                email: req.body.email,
                fullName: req.body.fullName,
                id: req.params.id,
                password: req.body.password,
                refreshToken: req.body.refreshToken,
                role: req.body.role,
            });

            res.send({ data: user, success: true });
        } catch (error) {
            processError(error, res);
        }
    }

    public async delete(req: express.Request, res: express.Response) {
        try {
            await UserService.delete(req.params.id);

            res.send({ success: true });
        } catch (error) {
            processError(error, res);
        }
    }
}

export default new UserController();
