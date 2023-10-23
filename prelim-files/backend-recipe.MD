# Java-Gram Backend Design Recipe

## 1. User Stories/specification:

> As a user
> I want to securely log in and out my own Java-Gram account

> As a User
> Once logged in, I want to see a feed of all posts in reverse chronological order from the date of which the post was made.

> As a User
> I want to be able to make posts myself

> As a User 
> I want to be able to display who I am with a profile picture

### Databse/Document Relationships:

I will be using mongoDB mostly due to working with MERN alot recently and I find it much more forgiving when I need to make changes further down the line. 

A USER can have many POSTS
A POST belongs to a USER

USER:
firstName - String - Not Requied
lastName - String - Not Required
profilePicture: - BASE64 or String type - Not Required
dateOfBith: Date - Not Required
username: String - Required - UNIQUE
emailAddress: Required - UNIQUE
password: String - HASHED USING BCRYPT

Timestamps: - Will Add timestamps - This will allow me track when a user updates/sends a patch but will also allow a record of when user registered (This is a nice feature to send anniversary messages/keep a log of how long user has been active.)

POSTS:
img: BASE64 or String type - Required
user: String - The _id of the user who posted the POST
likedBy: Array - an Array of all USERS who liked POST
Comments: Array - An array of COMMENTS 

Timestamps: Date - required - Will show when post was created - Will be formatted on post by DateFNS

COMMENTS: 
postId: String - The _id of the POST this COMMENT belongs to
user: String - The _id of the user who posted the COMMENT
content: String - The comment message itself

Timestamps: - Required - Will be formatted by dateFNS to show when comment was made
