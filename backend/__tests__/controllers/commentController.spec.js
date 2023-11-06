import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser,
  testDatabaseCommentTruncator
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import Comment from "../../models/commentModel.js";
import app from "../../app.js";
import supertest from "supertest";

import jwt from 'jsonwebtoken';

let token;
let postUser;
let testPost;

describe('/api/comment - Endpoint', () => {

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
    await testDatabaseCommentTruncator();
  });

  afterAll(async () => {
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('/new - Endpoint', () => {
    test('Creates a new comment', () => {
      const response = supertest(app)
      .post("/api/comment/new")
      .set('Cookie', `jwt=${token}`)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Comment added')
    });
  });
});