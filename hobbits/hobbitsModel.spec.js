const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");
describe("testing server", () => {
  describe("testing GET / ", () => {
    test("should return hobbits and res.status(200)", () => {
      // make a request to  get to the / endpoint on the server
      return request(server) // return the async call to let jest know to wait for the data
        .get("/")
        .then((res) => {
          // assert that the HTTP status code is 200
          expect(res.status).toBe(200);
        });
    });
  });
  describe("POST /hobbits", () => {
    beforeEach(async () => {
      await db("hobbits").truncate(); // emptys the table and resests the id back to 1
    });
    test("should return 201 on success ", () => {
      return request(server)
        .post("/hobbits")
        .send({ name: "BOB" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });

    test("should return Hobbit created Successfully ", async () => {
      request(server)
        .post("/hobbits")
        .send({ name: "Alex" })
        .then((res) => {
          expect(res.body.message).toBe("Hobbit created successfully");
        });
    });
  });
});
