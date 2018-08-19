const validators = require('../lib/validators');

module.exports.post = (ctx, next) => {

    let userData = ctx.request.body;
    let email = validators.email(userData.email) ? userData.email : false;
    let password = validators.password(userData.password) ? userData.password : false;
    let mockUser = {email: 'banano-palma@inbox.ru', password: '123123'};

    if (email && password) {
        if (email === mockUser.email && password === mockUser.password) {
            ctx.session.isAuthorized = true;
            ctx.redirect('/admin');
        } else {
            ctx.status = 401;
            ctx.body = {
                message: 'Wrong email or password'
            };
        }
    } else {
        ctx.status = 400;
        ctx.body = "The incorrect data received";
    }
};

module.exports.get = (ctx, next) => {
    ctx.render('pages/login');
};