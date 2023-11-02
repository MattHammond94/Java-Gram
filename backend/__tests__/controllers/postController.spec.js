import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import app from "../../app.js";
import supertest from "supertest";

describe("/api/users - Endpoint", () => {
  beforeAll(async () => {
    await testDatabaseConnector();
  });

  beforeEach(async() => {
    await testDatabasePostsTruncator();
  });

  afterAll(async () => {
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('/new - endpoint', () => {
    test("The response code is 201", async () => {
      await supertest(app)
        .post('/api/users/new')
        .send({ username: 'AnotherUser', email: 'user2@gmail.com', password: 'Password123!' })
        const postUser = await User.findOne({ username: 'AnotherUser' });
      let response = await supertest(app)
        .post("/api/posts/new")
        .send({ image: 'Anothers', caption: 'Caption for post', user: postUser._id });
      expect(response.statusCode).toBe(201);
    });
  });
});