/**
 * @file Defines all user related business logic.
 * @author Marble IT
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

import config from '../config';
import User from '../models/User';

class UserService {
    /**
     * Returns an array containing all users inside the db collection.
     */
    public async getAll(): Promise<Document[]> {
        return await User.find();
    }

    /**
     * Returns a document containing data of the requested user.
     * @param id Id of the wanted user.
     */
    public async get(id: string): Promise<Document> {
        return await User.findOne({ _id: id });
    }

    /**
     * Returns a document containing data of the requested user.
     * @param email Email of the wanted user.
     */
    public async getByEmail(email: string): Promise<Document> {
        return await User.findOne({ email });
    }

    /**
     * Returns a document containing data of the requested user.
     * @param refreshToken Refresh token of the wanted user.
     */
    public async getByRefreshToken(refreshToken: string): Promise<Document> {
        return await User.findOne({ refreshToken });
    }

    /**
     * Inserts a user into database.
     * @param user User that needs to be inserted.
     */
    public async create(user: any): Promise<Document> {
        return new Promise<Document>((resolve, reject) => {
            if (!user.email) return reject('E-mail is mandatory.');
            if (!user.fullName) return reject('Full name is mandatory.');
            if (!user.password) return reject('Password is mandatory.');
            if (!user.role) return reject('Role is mandatory.');

            bcrypt.genSalt(config.saltRounds, (saltError, salt) => {
                if (saltError) return reject('Salt error.');

                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if (hashError) return reject('Hash error.');

                    const refreshToken =
                        jwt.sign({ data: { email: user.email, fullName: user.fullName } }, config.secret);

                    user.refreshToken = refreshToken;
                    user.password = hash;
                    user.salt = salt;

                    User.create(user)
                        .then((data) => resolve(data))
                        .catch((error) => reject('User creation failed.'));
                });
            });
        });
    }

    /**
     * Updates all the data for the provided user.
     * @param user User object with new data applied.
     */
    public async update(user: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (user.password) {
                bcrypt.genSalt(config.saltRounds, (saltError, salt) => {
                    if (saltError) return reject('Salt error.');

                    bcrypt.hash(user.password, salt, (hashError, hash) => {
                        if (hashError) return reject('Hash error.');

                        user.password = hash;
                        user.salt = salt;

                        User.updateOne({ _id: user.id }, { $set: user }, { multi: true })
                            .then((data) => resolve(user))
                            .catch((error) => reject('User update failed.'));
                    });
                });
            } else {
                User.updateOne({ _id: user.id }, { $set: user }, { multi: true })
                    .then((data) => resolve(user))
                    .catch((error) => reject('User update failed.'));
            }
        });
    }

    /**
     * Removes a specific user from the db collection.
     * @param id Id of the user that needs to be removed.
     */
    public async delete(id: string): Promise<Document> {
        return await User.findByIdAndRemove(id);
    }
}

export default new UserService();
