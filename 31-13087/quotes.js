var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/se-assignment';
var db = require('./db');
var fs = require('fs');
var quotesList = require('../quotes.json');

var getQuotesFromJSON = function(cb) {
      return JSON.parse(fs.readFileSync('../quotes.json'));
     cb();
      
};



var getQuoteFromJSON = function(index){
  var x = getQuotesFromJSON();
  return getElementByIndexElseRandom(x,index);
}



var getElementByIndexElseRandom= function(array  ,index){
if(index=== undefined){
   return array[Math.floor(Math.random()*array.length)];
}else{
	return array[index];
} 
}

function seed(cb) {
db.db().collection("quotes").count(function(err, temp) {
        
if(temp != 0){
 cb(err, false)
      }else{
   db.db().collection("quotes").insert(quotesList, function(err, res) {cb(err, true)})
           
     }
    if(err)
            cb(err, temp)
    })
}

var getQuotesFromDB =module.exports.getQuotesFromDB =function(cb){

db.db().collection("quotes").find({}).toArray(function(err,db){
	cb(err,db);
})
 
}
var getQuoteFromDB = module.exports.getQuoteFromDB = function(cb,index){
getQuotesFromDB(function(err, docs){
var quote = getElementByIndexElseRandom(docs,index);
cb(err,quote);
	});
}

exports.seed=seed;

