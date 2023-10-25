import User from "../../models/userModel.js";
import mongoose from "mongoose";

describe("User model", () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // beforeAll(async () => {
  //   await mongoose.connection.collections.users.drop();
  // });

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

  it("Should be able to create a new user in the database", async() => {

    const connected = await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to the test database @: ${connected.connection.host}`)

    await mongoose.connection.collections.users.drop();

    const newUser = await User.create({
      email: "fake@tiscali.net",
      username: "fakes",
      password: "password1234"
    });

    const savedUser = await User.findOne({ username: newUser.username });

    expect(savedUser).not.toBeNull();
    expect(savedUser.email).toEqual("fake@tiscali.net");
  });
});