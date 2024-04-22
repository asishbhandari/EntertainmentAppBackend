const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

// configure chai to use chai-http to make api request
const expect = chai.expect;
chai.use(chaiHttp);

// authentication routes
describe("Authentication Routes", () => {
  it("should sign up a new user", async () => {
    const userData = {
      email: "test1@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const res = await chai.request(app).post("/v1/auth/signup").send(userData);

    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("message")
      .that.equals(" user Added to database");
  });

  it("should log in an existing user", async () => {
    const userData = {
      email: "test1@example.com",
      password: "password123",
    };

    const res = await chai.request(app).post("/v1/auth/login").send(userData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("access_token");
    expect(res.body).to.have.property("email").that.equals(userData.email);
  });
});
