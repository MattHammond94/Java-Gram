import Post from '../../models/postModel.js';
import User from '../../models/userModel.js';
import Comment from '../../models/commentModel.js';
import { testDatabaseConnector, 
  testDatabasePostsTruncator,
  testDatabaseConnectionCloser
} from "../config/testSetup.js";

describe ('Post Model', () => {
  const newUser = new User({
    email: "AFakeEmail@tiscali.net",
    username: "fakeUsername",
    password: "password123"
  })
  
  const anotherUser = new User({
    email: "anotherone@fake.net",
    username: "AnotherFakeUser420",
    password: "passwords"
  })

  const newPost = new Post({
    image: 'This is a new image',
    caption: 'This is a caption',
    user: newUser,
  });

  const newComment = new Comment({
    caption: 'This is a comment',
    user: anotherUser
  })

  const anotherPost = new Post({
    image: 'This is another image',
    caption: 'This is another caption',
    user: newUser,
    comments: [newComment],
    likedBy: [newUser, anotherUser]
  });

  it('Should have an image property stored as a string', () => {
    expect(newPost.image).toBe('This is a new image')
  });

  it('Should have a caption property', () => {
    expect(newPost.caption).toBe('This is a caption')
  });

  it('Should have a user document attached as a property.', () => {
    expect(newPost.user).toBe(newUser);
  });

  it('Should have a comments property that is defaulted to an empty array', () => {
    expect(Array.isArray(newPost.comments)).toBe(true);
    expect(newPost.comments.length).toBe(0);
  });

  it('Should have a likedBy property which also returns an empty array', () => {
    expect(Array.isArray(newPost.comments)).toBe(true);
    expect(newPost.comments.length).toBe(0);
  });

  it('Should be able to access any comments within the comments array', () => {
    expect(anotherPost.comments.length).toBe(1);
    expect(anotherPost.comments[0]).toBe(newComment);
    expect(anotherPost.comments[0].caption).toBe('This is a comment');
  });

  it('Should be able to access the userInfo of a user that has liked the post', () => {
    expect(anotherPost.likedBy.length).toBe(2);
    expect(anotherPost.likedBy[1]).toBe(anotherUser);
    expect(anotherPost.likedBy[1].username).toBe('AnotherFakeUser420');
  });

  it("Should be able to save a new post in the database", async() => {
    await testDatabaseConnector();
    await testDatabasePostsTruncator();
    await newPost.save();

    const savedPost = await Post.findOne({ image: 'This is a new image' });

    expect(savedPost).not.toBeNull();
    expect(savedPost.createdAt instanceof Date).toBe(true);
    expect(savedPost.caption).toBe('This is a caption');

    await testDatabaseConnectionCloser();
  });
});