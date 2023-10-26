import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import app from "../../app.js";
import supertest from "supertest";

describe("/api/users - Endpoint", () => {
  beforeAll(async () => {
    await testDatabaseConnector();
  });

  beforeEach(async() => {
    await testDatabaseUsersTruncator();
  });

  afterAll(async () => {
    await testDatabaseConnectionCloser();
  });

  const user = new User({
    username: "Mr Test",
    email: "test@email.com",
    password: "password123"
  });

  describe("/new - Endpoint", () => {

    describe("When body params are correctly provided a new user should be created", () => {

      test("The response code is 201", async () => {
        let response = await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password });
        expect(response.statusCode).toBe(201);
      });

      test("The response body is correct", async () => {
        let response = await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password })
        expect(response.body._id).not.toBeNull();
        expect(response.body.email).toBe("test@email.com");
        expect(response.body.username).toEqual("Mr Test");
      });
    });

    describe("When a user is created a token should be generated and stored in cookies", () => {

      test("There is a jwt stored in a http only cookie", async () => {
        let response = await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password })
        expect(response.header["set-cookie"]).not.toBeNull();
      });
    });

    describe("When the body contains existing details", () => {
      
      test("The response code is 400", async () => {
        await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password });
        let secondResponse = await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password });
        expect(secondResponse.statusCode).toBe(400);
      });

      test("The response body should show an error message when user inputs an existing username", async () => {
        await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password });
        let secondResponse = await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: "differentemail@email.com", password: user.password });
        expect(secondResponse.body.message).toBe("A user already exists with these details");
      });

      test("The response body should show the same error message when user inputs an existing email address", async () => {
        await supertest(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password });
        let secondResponse = await supertest(app)
          .post("/api/users/new")
          .send({ username: "A different username", email: user.email, password: user.password });
        expect(secondResponse.body.message).toBe("A user already exists with these details");
      });
    });


  });
});
