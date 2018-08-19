const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const path = require('path');


// Controllers
const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');



// Functions
const isAdmin = (ctx, next) => {
    if (ctx.session.isAuthorized) {
        console.log('authorized');
        next();
    } else {
        console.log('not authorized');
        ctx.redirect('/login');
    }
};
const changeFileName = (name, file) => {
    let index = file.path.indexOf('upload_');
    let cattedPath = file.path.slice(0, index);
    file.path = cattedPath + file.name;
};



// Routes
router.get('', indexController.get);
router.post('', koaBody(), indexController.post);


router.get('/login', loginController.get);
router.post('/login', koaBody(), loginController.post);

router.get('/admin', isAdmin, adminController.get);
router.post('/admin/skills', koaBody(), adminController.skills);
router.post('/admin/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(process.cwd(), '../public/assets/img/products'),
        keepExtensions: true,
        onFileBegin: changeFileName
    },
}), adminController.upload);



module.exports = router;


