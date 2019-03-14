process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
var expect = chai.expect

chai.use(chaiHttp)

function importTest (name, path) {
  describe(name, function () {
    require(path)
  })
}

describe('loading express', function () {
  before(function (done) {
    setTimeout(() => {
      done()
    }, 3000)
  })

  after(function () {
    server.close()
  })

  describe('API test', () => {
    var url = 'https://www.amazon.com/Acer-Predator-Overclockable-Aeroblade-PH315-51-78NP/dp/B07CTHLX8C?pd_rd_w=Vm9er&pf_rd_p=85b74fa7-5d47-4cd4-8b58-ed5106efdef0&pf_rd_r=GG9WZXRKFFZSKS8G0Q2C&pd_rd_r=e7e6bd35-6482-4fec-b5b5-a738ecdb3fb2&pd_rd_wg=Sho62&ref_=pd_gw_unk'
    var newUrl
    it('must generate a short url', done => {
      chai
        .request(server)
        .post('/')
        .send({
          url
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          expect(res.body.url).to.be.a('string')
          newUrl = res.body.url
          done()
        })
    })

    it('must exist previous url generated', done => {
      chai
        .request(newUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          done()
        })
    })
  })
})
