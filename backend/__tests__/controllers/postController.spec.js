import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import app from "../../app.js";
import supertest from "supertest";

import jwt from 'jsonwebtoken';

let token;
let postUser;
let testPost

describe("/api/users - Endpoint", () => {
  beforeAll(async () => {
    await testDatabaseConnector();

    await User.create({
      username: 'AnotherUser', 
      email: 'user2@gmail.com', 
      password: 'Password123!'
    });

    postUser = await User.findOne({ username: 'AnotherUser' });

    await Post.create({
      image: 'An image for a post',
      caption: 'A caption for a test post',
      user: postUser._id
    });

    testPost = await Post.findOne({ image: 'An image for a post' });
    
    token = jwt.sign({ userId: postUser._id }, process.env.JWT_SECRET);
  });

  beforeEach(async() => {
    await testDatabasePostsTruncator();
  });

  afterAll(async () => {
    await testDatabaseUsersTruncator();
    await testDatabaseConnectionCloser();
  });

  describe('When a user is not logged in they cannot use any of the api/posts endpoints', () => {
    describe('/new endpoint', () => {
      test('Returns the correct status code', async () => {
        let response = await supertest(app)
          .post('/api/posts/new')
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.statusCode).toBe(401);
      });
  
      test('Returns an unauthorized error message', async () => {
        let response = await supertest(app)
          .post('/api/posts/new')
          .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        expect(response.body.message).toBe('Unauthorized without a token');
      });
    });

    describe('/:id endpoints', () => {
      test('Cannot delete a post when user is not logged in', async () => {
        let response = await supertest(app)
          .delete(`/api/posts/${testPost._id}`)
        expect(response.body.message).toBe('Unauthorized without a token');
        expect(response.statusCode).toBe(401);
      });

      test('Cannot get a post when user is not logged in', async () => {
        let response = await supertest(app)
          .get(`/api/posts/${testPost._id}`)
        expect(response.body.message).toBe('Unauthorized without a token');
        expect(response.statusCode).toBe(401);
      });

      test('Cannot get a post when user is not logged in', async () => {
        let response = await supertest(app)
          .put(`/api/posts/${testPost._id}`)
        expect(response.body.message).toBe('Unauthorized without a token');
        expect(response.statusCode).toBe(401);
      });
    });

    describe('/all endpoint', () => {
      test('Returns the correct statusCode and message when a user is not logged in', async () => {
        let response = await supertest(app)
          .put('/api/posts/all')
        expect(response.body.message).toBe('Unauthorized without a token');
        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('When an incorrect param is passed to any of the /:id endpoints', () => {
    test('The correct error and response code are returned for the GET endpoint', async () => {
      let response = await supertest(app)
          .get('/api/posts/invalidId')
          .set('Cookie', `jwt=${token}`)
        expect(response.body.message).toBe('Not a valid ID parameter');
        expect(response.statusCode).toBe(400);
    });

    // test('The correct error and response code are returned for the DELETE endpoint', async () => {
    //   let response = await supertest(app)
    //       .delete('/api/posts/invalidId')
    //       .set('Cookie', `jwt=${token}`)
    //     expect(response.body.message).toBe('Not a valid ID parameter');
    //     expect(response.statusCode).toBe(400);
    // });

    // test('The correct error and response code are returned for the PUT endpoint', async () => {
    //   let response = await supertest(app)
    //       .put('/api/posts/notAValidId')
    //       .set('Cookie', `jwt=${token}`)
    //     expect(response.body.message).toBe('Not a valid ID parameter');
    //     expect(response.statusCode).toBe(400);
    // });
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
  });

  describe('Get post - GET /:id endpoint', () => {
    test('The correct status and response code are returned when getting a single post', async () => {
        await supertest(app)
        .post("/api/posts/new")
        .set('Cookie', `jwt=${token}`)
        .send({ image: 'Another', caption: 'Caption for post', user: postUser._id });
        const foundPost = await Post.findOne({ image: 'Another' })
        const finalResponse = await supertest(app)
        .get(`/api/posts/${foundPost._id}`)
        .set('Cookie', `jwt=${token}`)
        expect(finalResponse.body.image).toBe('Another');
        expect(finalResponse.body.caption).toBe('Caption for post');
        expect(finalResponse.body.comments.length).toBe(0);
        expect(finalResponse.body.likedBy.length).toBe(0);
        expect(finalResponse.body.user.username).toBe('AnotherUser');
        expect(finalResponse.status).toBe(200);
    });

    // test('Returns the correct details after an update/put has been completed', () => {

    // });

    test('An error is returned when the post does not exist in the database', async () => {
      const response = await supertest(app)
      .get(`/api/posts/${testPost._id}`)
      .set('Cookie', `jwt=${token}`)
      expect (response.body.message).toBe('Unable to retrieve post - This post has likely been deleted');
      expect (response.status).toBe(400);
    });
  });

  describe('Get all posts - GET /all endpoint', () => {
    test('Should return the correct response status', async () => {
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 1', caption: 'Caption for post 1', user: postUser._id });
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 2', caption: 'Caption for post 2', user: postUser._id });
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 3', caption: 'Caption for post 3', user: postUser._id });
      const response = await supertest(app)
      .get('/api/posts/all')
      .set('Cookie', `jwt=${token}`)
      expect(response.statusCode).toBe(200);
    });

    test('Should return an array of all created posts from database', async () => {
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 1', caption: 'Caption for post 1', user: postUser._id });
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 2', caption: 'Caption for post 2', user: postUser._id });
      await supertest(app)
      .post("/api/posts/new")
      .set('Cookie', `jwt=${token}`)
      .send({ image: 'post 3', caption: 'Caption for post 3', user: postUser._id });
      const response = await supertest(app)
      .get('/api/posts/all')
      .set('Cookie', `jwt=${token}`)
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);
      expect(response.body[1].caption).toBe('Caption for post 2');
      // expect(response.body[2].user.username).toBe('AnotherUser')
    });

    test('If no posts exist in databse an alert message should be returned', async () => {
      const response = await supertest(app)
      .get('/api/posts/all')
      .set('Cookie', `jwt=${token}`)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('There are currently no posts');
    });
  });
});