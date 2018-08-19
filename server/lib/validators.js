const validators = {};

validators.email = (email) => {
    return typeof email === 'string' && email.length >= 6;
};

validators.password = (password) => {
    return typeof password === 'string' && password.length >= 6;
};



module.exports = validators;