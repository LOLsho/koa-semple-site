
const fs = require('fs');
const path = require('path');


const lib = {};

lib.baseDir = path.join(__dirname, '../data/');



lib.create = function (directoryName, fileName, data, callback) {
    fs.open(lib.baseDir + directoryName + '/' + fileName + '.json', 'wx', function (err, fileDescriptor) {
        if(!err && fileDescriptor) {
            let stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, function (err) {
                if(!err) {
                    fs.close(fileDescriptor, function (err) {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to the new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};



lib.read = function (directoryName, fileName, callback) {
    fs.readFile(lib.baseDir+directoryName+'/'+fileName+'.json', 'utf8', function (err, data) {
        if (!err && data) {
            let parsedData;
            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                parsedData = {};
            }
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    });
};



lib.update = function (directoryName, fileName, data, callback) {
  fs.open(lib.baseDir+directoryName+'/'+fileName+'.json', 'r+', function (err, fileDescriptor) {

        if (!err && fileDescriptor) {
            let stringData = JSON.stringify(data);

            fs.truncate(fileDescriptor, function (err) {
                if (!err) {
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file updating, it may not exist yet');
        }
    });
};



lib.delete = function(directoryName, fileName, callback) {
    fs.unlink(lib.baseDir+directoryName+'/'+fileName+'.json', function (err) {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

lib.list = function (dir, callback) {
    fs.readdir(lib.baseDir + dir + '/', function (err, data) {
        if (!err && data && data.length > 0) {
            const trimmedFileNames = [];
            data.forEach(function (fileName) {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        } else {
            callback(err, data);
        }
    });
};



module.exports = lib;

