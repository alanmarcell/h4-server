import { createConnection } from '../core/BaseRepositoryPtz';
// import { DB_CONNECTION_STRING } from '../config/constants';
// import { getDb, getUserApp } from '../core/BaseRepositoryPtz';
import { log } from '../index';
async function seedUsers(req, res) {
    try {
        console.log('SEED_CONTROLLER');
        // const param: string = req.params.param;
        const res = await createConnection();
        console.log(res);
        // UserBusiness.findUser(param, (error, result) => {
        //   if (error) res.send({ error });
        //   else res.send(result);
        // });
    }
    catch (e) {
        log(e);
        res.send({ error: 'error in your request' });
    }
}
export { seedUsers };
//# sourceMappingURL=SeedController.js.map