import jwt from 'jsonwebtoken';
import { createConnection } from '../core/BaseRepositoryPtz';
import { log } from '../index';
import * as SeedRepository from '../users/UserRepository';
import { TOKEN_SECRET } from './../config/constants';
const expiresIn = 1000; // seconds
function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
async function authenticateUserPtz(req, res) {
    try {
        const user = req.body;
        const authUser = await SeedRepository.authenticateUserPtz(user);
        if (!authUser)
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        const token = jwt.sign(user, TOKEN_SECRET, {
            expiresIn // expires in 60 seconds
        });
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
            expiresIn
        });
    }
    catch (e) {
        log(e);
        res.send({ message: 'AUTH_CONTROLLER _|_' });
    }
}
async function seedUsers(req, res) {
    try {
        const result = await createConnection();
        res.send({ message: 'Sedado' });
    }
    catch (e) {
        log(e);
        res.send({ error: 'error in your request' });
    }
}
async function createUser(req, res) {
    try {
        const user = req.body;
        const result = await SeedRepository.createUser(user);
        res.send({ message: result });
    }
    catch (e) {
        log(e);
        res.send({ message: e });
    }
}
export { seedUsers, createUser, authenticateUserPtz, verifyToken };
//# sourceMappingURL=UserApp.js.map