var assert    = require("chai").assert;
var dataOp = require("../data/dataOp");
describe("Decode url: ", function() {
 describe("Check encryptPassword Function: ", function() {
 it("Check the returned value using: assert.equal(value,'value'): ", function() {
 result   = dataOp.urlDecoded("micontra%40secreta");
 assert.equal(result, "micontra@secreta");
 });
 it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
 result   = dataOp.urlDecoded("micontra%40secreta");
 assert.typeOf(result, "string");
 });
 }); 
});