const data = require('../lib/data');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');



module.exports.get = (ctx, next) => {
    ctx.render('pages/admin');
};

module.exports.upload = (ctx, next) => {
    let userData = ctx.request.body;
    let file = ctx.request.files;

    let name = typeof userData.name === 'string' && userData.name.trim().length > 0 ? userData.name.trim() : false;
    let price = typeof userData.price === 'string' && userData.price.trim().length > 0 && + +userData.price >= 0
        ? userData.price.trim() : false;


    if (name && price && file) {
        let dataToSave = {
            name,
            price,
            image: file.photo.name
        };

        data.create('products', name, dataToSave, (error) => {
            if (error) {
                data.update('products', name, dataToSave, (error) => {
                    if (!error) {
                        ctx.status = 200;
                        ctx.redirect('/');
                    } else {
                        console.log(error);
                    }
                });
            } else {
                console.log(error);
            }
        });

    } else {
        console.log('Incorrect data received!');
    }
};

module.exports.skills = (ctx, next) => {
  let skills = ctx.request.body;
  console.log(skills);
  let age = typeof skills.age === 'string' && +skills.age >= 1 ? skills.age : false;
  let concerts = typeof skills.concerts === 'string' && +skills.concerts >= 1 ? skills.concerts : false;
  let cities = typeof skills.cities === 'string' && +skills.cities >= 1 ? skills.cities : false;
  let years = typeof skills.years === 'string' && +skills.years >= 1 ? skills.years : false;

  if (age && concerts && cities && years) {
    let dataToSave = { age, concerts, cities, years };
    data.update('skills', 'skills', dataToSave, (error) => {
      if (!error) {
          ctx.redirect('/');
      } else {
        console.log('error - ', error);
        ctx.status = 500;
        ctx.body = {
          message: "Error updating the skills file"
        };
      }
    });
  } else {
      ctx.status = 400;
      ctx.body = {
          message: "The incorrect data received. Lowest number of skill is 1"
      };
  }
};
