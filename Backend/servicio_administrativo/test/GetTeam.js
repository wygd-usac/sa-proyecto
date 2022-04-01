let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://34.132.139.69:5000/esb/servicio_administrativo';

describe('Obtener todos los equipos: ',()=>{
    it('Debería retornar todos los equipos', (done) => {
    chai.request(url)
    .get('/team')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
});


describe('Obtener el equipo #5: ',()=>{
    it('Debería retornar los campos del equipo con el id 5', (done) => {
    chai.request(url)
    .get('/team?id=5')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body.data[0]).to.have.property('name').to.be.equal("Atletico de Madrid");
    expect(res).to.have.status(200);
    done();
    });
    });
   });
   
   
   