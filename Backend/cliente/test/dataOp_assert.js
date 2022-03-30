var assert    = require("chai").assert;
var dataOp = require("../data/dataOp");
describe("Encryption Password: ", function() {
 describe("Check encryptPassword Function: ", function() {
 it("Check the returned value using: assert.equal(value,'value'): ", function() {
 result   = dataOp.encryptPassword("micontra@secreta");
 assert.equal(result, "0db2b499f8f701b2a3564b1d4ba607a6");
 });
 it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
 result   = dataOp.encryptPassword("micontra@secreta");
 assert.typeOf(result, "string");
 });
 }); 
});
