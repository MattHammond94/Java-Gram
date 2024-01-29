import { 
  // testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser,
  testDatabaseCommentTruncator
} from "../config/testSetup.js";

import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import Comment from "../../models/commentModel.js";
import app from "../../app.js";
import supertest from "supertest";

import jwt from 'jsonwebtoken';

let token;
let altToken;
let differentUser;
let differentComment;
let postUser;
let testComment;
let testPost;

describe('/api/comment - Endpoint', () => {
  beforeAll(async () => {
    // await testDatabaseConnector();

    await User.create({
      username: 'AUser', 
      email: 'user2@gmail.com', 
      password: 'Password123!'
    });

    await User.create({
      username: 'A Different User', 
      email: 'diffuser@gmail.com', 
      password: 'Password123!'
    });

    postUser = await User.findOne({ username: 'AUser' });
    differentUser = await User.findOne({ username: 'A Different User' });

    await Post.create({
      image: 'A different image for a different post',
      imageCloudId: 'Test',
      caption: 'A caption for a test post',
      user: postUser._id
    });

    testPost = await Post.findOne({ image: 'A different image for a different post' });

    await Comment.create({
      caption: 'This is a test comment',
      user: postUser,
      postId: testPost._id
    });

    await Comment.create({
      caption: 'This is a different comment',
      user: differentUser,
      postId: testPost._id
    });
    
    testComment = await Comment.findOne({ caption: 'This is a test comment' });
    differentComment = await Comment.findOne({ caption: 'This is a differnt comment' });

    token = jwt.sign({ userId: postUser._id }, process.env.JWT_SECRET);
    altToken = jwt.sign({ userId: differentUser._id }, process.env.JWT_SECRET);
  });
  
  afterAll(async () => {
    await testDatabasePostsTruncator();
    await testDatabaseCommentTruncator();
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('When a user is not logged in they cannot use any comment endpoints', () => {
    test('/new', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser, postId: testPost._id });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });

    test('/:id - DELETE', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser, postId: testPost._id });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });

    test('/:id - PUT', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .send({ caption: 'Caption for new comment', user: postUser, postId: testPost._id });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized without a token');
    });
  });

  describe('/new - Endpoint', () => {
    test('Creates a new comment', async () => {
      const response = await supertest(app)
      .post(`/api/comments/new`)
      .set('Cookie', `jwt=${token}`)
      .send({ caption: 'Caption for new comment', user: postUser, postId: testPost._id });
      expect(response.status).toBe(201);
      expect(response.body.caption).toBe('Caption for new comment');
      expect(response.body.user.username).toBe('AUser');
    });
  });

  describe('/update - PUT Endpoint', () => {
    test('Successfully updates a comment', async () => {
      const response = await supertest(app)
      .put(`/api/comments/update`)
      .set('Cookie', `jwt=${token}`)
      .send({ caption: 'This is an updated caption for a comment', id: testComment._id });
      expect(response.status).toBe(200);
      expect(response.body.caption).toBe('This is an updated caption for a comment');
    });

    // test('If the comment does not belong to the user then an error should be returned', () => {

    // });
  });

  describe('/:id - DELETE Endpoint', () => {

    // This test will now require an actual post to be mocked 

    test('successfully deletes a comment', async () => {
      const response = await supertest(app)
      .delete(`/api/comments/${testComment._id}`)
      .set('Cookie', `jwt=${token}`)
      expect(response.status).toBe(200);
      expect(response.body).toBe(testComment._id.toString());
    });

    // test('If the comment does not belong to the user then an error should be returned', async () => {
    //   expect(response.body.message).toBe('Cannot delete a comment if user did not post it');
    //   expect(response.status).toBe(400);
    // });

    test('If an incorrect ID param is passed the correct error should be returned', async () => {
      const response = await supertest(app)
      .delete(`/api/comments/InvalidId`)
      .set('Cookie', `jwt=${token}`)
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Not a valid ID parameter');
    });
  });
});