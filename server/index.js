const PORT = 4005;
const Koa = require('koa');
app = new Koa();
const koaStatic = require('koa-static');
const errorHandler = require('./lib/error');

const session = require('koa-session');

const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: '../source/template', pretty: false, basedir: '../source/template', noCache: true, app: app // equals to pug.use(app) and app.use(pug.middleware)
});

app.use(koaStatic('../public'));

app.use(errorHandler);
app.on('error', (err, ctx) => {
    ctx.body = ctx.response.message;
});

const router = require('./routes/indexRoute');


app.keys = ['some secret hurr'];
app.use(session({
        maxAge: 1000 * 60,
        signed: false,
    }, app))
    .use(router.routes())
    .use(router.allowedMethods());


// const indexRoute = require('./routes/indexRoute');
// const loginRoute = require('./routes/loginRoute');
// const adminRoute = require('./routes/adminRoute');










// app.use(async (ctx, next) => {
//     ctx.body = 'Hello world!';
// });



app.use(router.routes());


app.listen(PORT, () => {
    console.log('Server is running on https://localhost:' + PORT);
});


// const isAdmin = (req, res, next) => {
//     if (req.session.isAdmin) {
//     return next();
//     }
//     res.status(307).redirect('/login');
// };
//
//
// app.use('/', indexRoute);
// app.use('/login', loginRoute);
// app.use('/admin', isAdmin, adminRoute);




