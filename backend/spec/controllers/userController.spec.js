import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import app from "../../app.js";
import request from "supertest";

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

      test("the response code is 201", async () => {
        let response = await request(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password })
        expect(response.statusCode).toBe(201)
      });

      test("the response body is correct", async () => {
        let response = await request(app)
          .post("/api/users/new")
          .send({ username: user.username, email: user.email, password: user.password })
        expect(response.body._id).not.toBeNull();
        expect(response.body.email).toBe("test@email.com")
        expect(response.body.username).toEqual("Mr Test")
      });
    });
  });
});
