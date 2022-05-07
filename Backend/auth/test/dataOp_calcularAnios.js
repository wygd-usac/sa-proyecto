var assert    = require("chai").assert;
var dataOp = require("../data/dataOp");
describe("Calculo de años: ", function() {
 describe("Check calcularAnios Function: ", function() {
 it("Check the returned value using: assert.equal(value,'value'): ", function() {
 result   = dataOp.calcularAnios('2000/09/26');
 assert.equal(result, 21);
 });
 it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
 result   = dataOp.calcularAnios('2000/09/26');
 assert.typeOf(result, "number");
 });
 }); 
});
