var mongo = require('mongodb');
var DB = null;
var dbURL = 'mongodb://localhost:27017/database';


exports.connect = function(cb) {
if(DB==null){
mongo.connect(dbURL, function (err, db) {
if (err) {
console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
// We are connected. smile emoticon
console.log('Connection established to', dbURL);
DB=db;

cb(db);

}
});
}

};
exports.db = function() {
if (DB === null) throw Error('DB Object has not yet been initialized');
return DB;
};


exports.clearDB = function(done) {
DB.listCollections().toArray().then(function (collections) {
collections.forEach(function (c) {
DB.collection(c.name).removeMany();
});
done();
}).catch(done);
};
