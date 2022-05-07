var assert    = require("chai").assert;
var dataOp = require("../data/dataOp");
describe("Encode url: ", function() {
 describe("Check encryptPassword Function: ", function() {
 it("Check the returned value using: assert.equal(value,'value'): ", function() {
 result   = dataOp.urlEncoded("micontra@secreta");
 console.log(result);
 assert.equal(result, "micontra%40secreta");
 });
 it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
 result   = dataOp.urlEncoded("micontra@secreta");
 assert.typeOf(result, "string");
 });
 }); 
});
