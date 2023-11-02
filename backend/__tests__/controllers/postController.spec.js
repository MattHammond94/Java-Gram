import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import app from "../../app.js";
import supertest from "supertest";

import jwt from 'jsonwebtoken';

let token;
let postUser;

describe("/api/users - Endpoint", () => {
  beforeAll(async () => {
    await testDatabaseConnector();

    await User.create({
      username: 'AnotherUser', 
      email: 'user2@gmail.com', 
      password: 'Password123!'
    });

    postUser = await User.findOne({ username: 'AnotherUser' });

    token = jwt.sign({ userId: postUser._id }, process.env.JWT_SECRET);
  });

  beforeEach(async() => {
    await testDatabasePostsTruncator();
  });

  afterAll(async () => {
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('Create post - /new endpoint', () => {
    describe('When a user is logged in they can create a post', () => {
      test("Returns the correct status code", async () => {
        let response = await supertest(app)
          .post("/api/posts/new")
          .set('Cookie', `jwt=${token}`)
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.statusCode).toBe(201);
      });
    
      test("The response body contains the correct information", async () => {
        let response = await supertest(app)
          .post("/api/posts/new")
          .set('Cookie', `jwt=${token}`)
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.body._id).not.toBeNull();
        expect(response.body.user).toBe('AnotherUser');
      });
    });

    describe('When a user is not logged in they cannot create a post', () => {
      test("Returns the correct status code", async () => {
        let response = await supertest(app)
          .post("/api/posts/new")
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.statusCode).toBe(401);
      });

      test("Returns an unauthorized error message", async () => {
        let response = await supertest(app)
          .post("/api/posts/new")
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.body.message).toBe('Unauthorized without a token');
      });
    });
  });

  // describe('Get post - GET /:id endpoint', () => {

  // });
});