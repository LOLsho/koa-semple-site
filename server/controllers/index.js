const data = require('../lib/data');
const imagePicDir = './assets/img/products/';
const validators = require('../lib/validators');

module.exports.get = (ctx, next) => {
    data.read('skills', 'skills', (error, skills) => {
      if (error) {
        ctx.status = 500;
        console.log('Error reading file');
      } else {
        const products = [];
        data.list('products', (error, listProducts) => {

            let productsLength = listProducts.length;

          if (productsLength === 0) {
            ctx.render('pages/index', {
              age: skills.age,
              concerts: skills.concerts,
              cities: skills.cities,
              years: skills.years,
            });
          } else {
            if (!error) {
              listProducts.forEach((product) => {
                data.read('products', product, (error, product) => {
                  if (!error) {
                    productsLength--;
                    products.push({
                      name: product.name,
                      price: product.price,
                      src: imagePicDir + product.image
                    });
                    if (productsLength <= 0) {
                        // console.log('ctx - ', ctx);
                        // console.log('skills - ', skills);
                        // console.log('products - ', products.length, products);

                      ctx.render('pages/index', {
                        age: skills.age,
                        concerts: skills.concerts,
                        cities: skills.cities,
                        years: skills.years,
                        products: products
                      });

                    }
                  } else {
                    console.log(error);
                  }
                });
              });
            } else {
                console.log(error);
            }
          }
        });
      }
  });
};

module.exports.post = (ctx, next) => {
  console.log('in post');
  let userData = ctx.request.body;

  console.log('userData - ', userData);
  let name = typeof userData.name === 'string' && userData.name.trim().length > 0 ? userData.name : false;
  let email = validators.email(userData.email) ? userData.email : false;
  let message = typeof userData.message === 'string' && userData.message.trim().length > 0 ? userData.message : false;

  if (name && email && message) {
    let dataToSave = {name, email, message};

    data.create('messages', Date.now().toString(), dataToSave, (error) => {
      if (!error) {
        ctx.status = 200;
        ctx.redirect('/');
      } else {
        console.log(error);
      }
    });
  } else {
    console.log('Incorrect data received!');
  }
};