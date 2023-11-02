import Comment from '../../models/commentModel.js';
import User from '../../models/userModel.js';
import { testDatabaseConnector, 
  testDatabaseCommentTruncator,
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

describe('Comment Model', () => {
  const newUser = new User({
    email: 'afakeemail@fakemailz.com',
    username: "VirgilVanDijk",
    password: "password123"
  });

  const newComment = new Comment({
    caption: 'This is a comment',
    user: newUser
  });

  it('Should have a caption attribute', () => {
    expect(newComment.caption).toBe('This is a comment');
  });

  it('Should have a user object related to it to showcase who posted the comment', () => {
    expect(newComment.user).toBe(newUser);
    expect(newComment.user.username).toBe('VirgilVanDijk');
  });

  it("Should be able to save a new comment in the database", async() => {
    await testDatabaseConnector();
    await testDatabaseCommentTruncator();
    await testDatabaseUsersTruncator();
    await newUser.save();
    const savedComment = await newComment.save();

    const comment = await Comment.findOne({ _id: savedComment._id });
    const foundUser = await User.findOne({ username: 'VirgilVanDijk' })

    expect(comment.caption).toBe('This is a comment');
    expect(comment.createdAt instanceof Date).toBe(true);
    expect(comment.user).toEqual(foundUser._id);

    await testDatabaseConnectionCloser();
  });
});
