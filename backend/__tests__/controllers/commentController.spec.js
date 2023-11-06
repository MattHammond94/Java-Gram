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
let testComment;

describe('/api/comment - Endpoint', () => {

  beforeAll(async () => {
    await testDatabaseConnector();

    await User.create({
      username: 'AUser', 
      email: 'user2@gmail.com', 
      password: 'Password123!'
    });

    postUser = await User.findOne({ username: 'AUser' });

    await Comment.create({
      caption: 'This is a test comment',
      user: postUser
    })
    
    testComment = await Comment.findOne({ caption: 'This is a test comment' })

    token = jwt.sign({ userId: postUser._id }, process.env.JWT_SECRET);
  });

  beforeEach(async() => {
    await testDatabasePostsTruncator();
  });

  afterAll(async () => {
    await testDatabaseCommentTruncator();
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('When a user is not logged in they cannot use any comment endpoints', () => {
    test('/new', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });

    test('/:id - DELETE', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });

    test('/:id - PUT', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });
  });

  describe('/new - Endpoint', () => {
    test('Creates a new comment', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .set('Cookie', `jwt=${token}`)
      .send({ caption: 'Caption for new comment', user: postUser });
      expect(response.status).toBe(201);
      expect(response.body.caption).toBe('Caption for new comment');
      expect(response.body.user.username).toBe('AUser');
    });
  });

  describe('/:id - PUT Endpoint', () => {
    test('Successfully updates a comment', async () => {
      const response = await supertest(app)
      .put(`/api/comments/${testComment._id}`)
      .set('Cookie', `jwt=${token}`)
      .send({ caption: 'This is an updated caption for a comment' });
      expect(response.body.caption).toBe('This is an updated caption for a comment');
      expect(response.status).toBe(200);
    });

    // test('If the comment does not belong to the user then an error should be returned', () => {

    // });
  });

  describe('/:id - DELETE Endpoint', () => {
    test('successfully deletes a comment', async () => {
      const response = await supertest(app)
      .delete(`/api/comments/${testComment._id}`)
      .set('Cookie', `jwt=${token}`)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Comment successfully deleted');
    });

    // test('If the comment does not belong to the user then an error should be returned', () => {

    // });
  });
});