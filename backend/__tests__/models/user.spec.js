import User from "../../models/userModel.js";
import { testDatabaseConnector, 
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
} from "../../../testSetup.js";

describe("User model", () => {
  const user = new User({
    email: "AFakeEmail@tiscali.net",
    username: "fakeUsername",
    password: "password123",
  });

  it("Should have an email address", () => {
    expect(user.email).toEqual("AFakeEmail@tiscali.net");
  });

  it("Should have a password", () => {
    expect(user.password).toEqual("password123")
  })

  it("Should have a username", () => {
    expect(user.username).toEqual("fakeUsername")
  });

  it("Should be created with a default empty array for followers", () => {
    expect(user.followers.length).toBe(0)
  });

  it("Should be created with a default empty array for following", () => {
    expect(user.following.length).toBe(0)
  });

  it("Should return undefined for all attributes which are not required or a default", () => {
    expect(user.profilePicture).toBe(undefined)
    expect(user.firstName).toBe(undefined)
    expect(user.lastName).toBe(undefined)
    expect(user.dateOfBirth).toBe(undefined)
  });

  it("Should be able to save a new user in the database", async() => {
    await testDatabaseConnector();
    await testDatabaseUsersTruncator();
    await user.save();

    const savedUser = await User.findOne({ username: user.username });

    expect(savedUser).not.toBeNull();
    expect(savedUser.email).toEqual("AFakeEmail@tiscali.net");

    await testDatabaseConnectionCloser();
  });
});