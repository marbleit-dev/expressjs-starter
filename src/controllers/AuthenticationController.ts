/**
 * @file Dispatcher for authentication related requests.
 * @author Marble IT
 */
import express from 'express';
import AuthenticationService from '../services/AuthenticationService';
import { processError } from '../utils/processError';

class AuthenticationController {
    public async generateToken(req: express.Request, res: express.Response) {
        try {
            const accessToken = await AuthenticationService.generateToken(req.body.email, req.body.password);

            res.send({ data: accessToken, success: true });
        } catch (error) {
            processError(error, res);
        }
    }
}

export default new AuthenticationController();
