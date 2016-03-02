var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');



before(function(done) {
//use this after you have completed the connect function
db.connect(function(db) {
done();
});
});
function cont(arr,ele){
for ( var i=0;i<arr.length;i++){
if (arr[i]===ele) return true;
}
return false;
}
describe("getElementByIndexElseRandom", function() {
var arr = [2, 4, 6, 22, 32];
it("should return a random element that is included in the array if we omit the index", function() {
var y=Quote.getElementByIndexElseRandom(arr);
var z=cont(arr,y);
assert.equal(z,true);
});
it("should return the first element if we also pass the index 0", function() {
var t =Quote.getElementByIndexElseRandom(arr,0);
assert.equal(t,arr[0]);
});
it("should return the last element if we also pass the index", function() {
var t =Quote.getElementByIndexElseRandom(arr,4);
assert.equal(t,arr[4]);
});
});
describe("getQuotesFromJSON", function() {
it("should return an array of 102 quote", function() {
var t =Quote.getQuotesFromJSON();
assert.equal(t.length,102);
});
it("first quote in the array's author should be Kevin Kruse", function() {
var t =Quote.getQuotesFromJSON();
var a=t[0].author;
assert.equal('Kevin Kruse',a);
});
});


describe('getQuoteFromDB', function() {
it('should return a random quote document', function(done) {
Quote.getQuotesFromDB(function(err, qs) {
assert.equal(null, err);
Quote.getQuoteFromDB(function(err, q) {
assert.include(qs, q);
assert.equal(null, err);
done();
})
})
});


describe("getQuoteFromJSON", function() {
it('should return a quote object with an author and text property', function() {
var quote =Quote.getQuoteFromJSON();
var x=(quote.author!==undefined) && (quote.text!==undefined);
assert.equal(x,true);
});
it('should return a random quote if index not specified', function() {
var quote =Quote.getQuoteFromJSON();
var x=cont(Quote.getQuotesFromJSON(),quote);
assert.equal(x,true);
});
it('should return the first quote if we pass 0', function() {
var quote =Quote.getQuoteFromJSON(0);
assert.equal(quote,Quote.getQuotesFromJSON()[0]);
});
});

//quotes collection should be called quotes
describe('seed', function() {
before(db.clearDB);
it('should populate the db if db is empty returning true', function(done) {
Quote.seed(function(err, seeded) {
assert.equal(null, err);
assert.equal(seeded, true);
done();
})
});
it('should have populated the quotes collection with 102 document', function(done) {
db.db().collection("quotes").count(function(err, c) {
assert.equal(null, err);
assert.equal(102, c);
done()
})
});
it('should not seed db again if db is not empty returning false in the callback', function(done) {
Quote.seed(function(err, seeded) {
assert.equal(null, err);
assert.equal(seeded, false);
done()
})
});
it('should not seed db again if db is not empty', function(done) {
db.db().collection("quotes").count(function(err, c) {
assert.equal(null, err);
assert.equal(102, c);
done()
})
});
});

describe('getQuoteFromDB', function() {
it('should return a random quote document', function (done) {
Quote.getQuotesFromDB(function (err, quotes) {
Quote.getQuoteFromDB(function (err1, quote) {
var f = false;
for (var i = 0; i < quotes.length; i++) {
if (quotes[i].author === quote.author && quotes[i].text === quote.text) {
f = true;
break;
}
}
assert(f, "the quote is not in the database");
done();
});
});
it('should return the first quote if passed 0 after callback', function(done) {
Quote.getQuotesFromDB(function(err, qs) {
assert.equal(null, err);
Quote.getQuoteFromDB(function(err, q) {
assert(qs[0].text=== q.text);
assert.equal(null, err);
done();
},0)
});
});
//});
//});