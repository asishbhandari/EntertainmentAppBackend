const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

// configure chai to use chai-http to make api request
const expect = chai.expect;
chai.use(chaiHttp);

// user routes
describe("User Routes", () => {
  it("get user information", async () => {
    // token should be changed accordingly
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRmYzhhNjdlODU0ZjZhYjNhOTJhMCIsImVtYWlsIjoic2FuamlAZ21haWwuY29tIiwiaWF0IjoxNzEzNzAwMDAwfQ.oKlxgNLAD0Sqo_jopuVcDhcUta1qhMt-qoEocoQnsKI";
    const res = await chai
      .request(app)
      .get("/v1/user/info")
      .set("Authorization", `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });
});
