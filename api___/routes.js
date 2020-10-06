const controller = require('./controller');
const checkToken = require('../middlewares/checkToken');
// const getFromCache = require('../middlewares/');
// const cache = (req, res, next) => {
//     console.log('in cache');
//     next();
// }

module.exports = (app) => {
    app.route('/auth/getToken').get(controller.auth.getToken);
    app.route('/user').get(checkToken, controller.user.getUsers);
    app.route('/user').post(checkToken, controller.user.postUser);
    // app.route('/user').patch(checkToken, controller.user.updateUser);
    // app.route('/user').delete(checkToken, controller.user.deleteUser);
}