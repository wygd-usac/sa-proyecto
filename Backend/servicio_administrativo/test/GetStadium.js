let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://34.132.139.69:5000/esb/servicio_administrativo';

describe('Obtener todos los estadios: ',()=>{
    it('should get all stadiums', (done) => {
    chai.request(url)
    .get('/stadium')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
});


describe('Obtener el estadio #1: ',()=>{
    it('Debería retornar los campos del estadio con el id 1', (done) => {
    chai.request(url)
    .get('/stadium?id=1')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body.data[0]).to.have.property('id_Estadio').to.be.equal(1);
    expect(res).to.have.status(200);
    done();
    });
    });
   });
   
   
   