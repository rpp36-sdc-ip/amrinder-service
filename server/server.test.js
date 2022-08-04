var app = require('./server.js');
var req = require('supertest');

describe("Initial tests", () => {
  it("should respond with test get request ", async() => {
    var res = await req(app).get("/test");
    expect(res.body).toEqual({getTest: 'passed'});
    expect(res.body.getTest).toEqual('passed');
  });

  it("should respond with test post request ", async() => {
    var res = await req(app).post("/test");
    expect(res.body).toEqual({postTest: 'passed'});
    expect(res.body.postTest).toEqual('passed');
  });
});