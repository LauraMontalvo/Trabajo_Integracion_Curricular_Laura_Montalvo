const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/user/new', UserController.createUser);
    
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/user/:id',UserController.getUser);
    app.put('/api/user/:id/',UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
}