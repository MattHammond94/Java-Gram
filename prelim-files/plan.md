## Initial Thoughts

> As this project is completely full stack, has much more features and a larger backend than my previous two projects I need to spend more time organising how to approach the build and completing recipes for both the frontend and backend to visualise and see how the project will be completed.

> I will work from my 'design-diagram' in this folder to help me visualise as I work out the functionality of this application.

> I can also use Instagram itself as a reference point when I need some guidance or inspiration. 

> Using the landing page and sign-up/login process that the user would encounter initially as a starting point. From here I can start to plan the user experience/journey to help me plan how to resolve potential issues. 

> After completing a walkthrough (Youtube tutorial with Traversy Media) on how to store a web token in a HTML only cookie for secure log in. I will need to amend it slightly for how I want my app to not only look but work and I will need to add input validation and also E2E testing but I will use this approach as a template for the log in process. This approach works and is the most secure login system I have used so far as HTML only cookies cannot be accessed/tampered with using JS in the browser.

> Everything will be designed desktop first to avoid getting bogged down in responsiveness. I will build on a XL screen on my local and once happy with everything can start to make pages responsive.


### Other Notes

> Now I have experience deploying a frontend, I need to check if the backend is deployed seperately or both are deployed together. Worthwhile looking into this sooner than later to prevent issues down the line when project grows to a certain size.  

> TESTING! - This needs to be tested (Been slacking on testing recently.) As the frontend will be scaffolded with Vite. I have looked into using Vitest for the frontend unit testing and seems relatively easy to implement. Backend I can stick to jest. and I should aim to reach 95% test coverage on the backend. E2E and Integration testing for the frontend should all be able to be handled by the React Testing Library(RTL) But this will likely be implemented and configured as I start to build the frontend out further. Whilst I maintain that TDD is the best approach and an approach I find really useful for problem solving, its an approach that is most helpful when I know what I'm doing. I am still learning and would prefer to spend more time learning and resolving issues that develop the project further than having to spend time learning testing syntax.

### Login/user information

> A user can register with just a username, email and password. Their initial profile picture will be stored in the public folder and auto assigned until the user adds their own img. Further information on the user will be stored (First name, last name, DOB etc) and this can be updated from their own user page via patch req to backend.

> Alternatively the signup page can be a selection of cards that can be navigated to by small circle icons at the bottom of each card highlighting which stage you are at.(Likely 3 cards initial info, personal info, img.) This is common on a lot of sites at signup stage, however I would like the signup to be very simple and easy for the user so will likely go with the first approach where the user can add aditional information IF they want to. Things like age restricted content are features that I am not looking to implement for this project. 

> IF I am sending a signup confirmation email OR further emails to users then I can simply check if a `firstName` attr exists for said user and if not then use the `username` as a title. 

> Each user will have their own user page that showcases a gallery of their own images/POSTS, This is a good opportunity to look into using SLUGS as the user page would likely be `/user/:id` the :id = _id stored in mongoDB users collection. An easier approach would be to make the userpage go to `/user/username` as each username will need to be unique anyway.

### Posts 
> Initially ALL existing POSTS will be displayed on the FEED page assuming there will be very few posts. As the app grows and changes, ONLY POSTS that belong to USERS which are followed by LOGGED IN USER will be shown in that USERS FEED.

> In terms of upscaling this is a good chance to look into pagination and where this is handled(frontend or back?) - I won't want a mass of posts being fetched all at once when a user reaches the feed page after logging in so pagination will need to be utilised to prevent issues. 

> Posts will need to have a timestamp as they will be ordered on the feed as such. 

> HANDLING MANY IMGZ!? - Images can be stored as BASE64 in MongoDB but likely be stored in cloudinary and only the ref will be stored in Mongo due to imgs being a large data type. (May need to prevent the upload of an image that exceeds a certain size.)

> Each post will need a user _id to identify who the post belongs to. Will also need an array of likes from which we can display the first two users who liked the post and the rest would be array.length -2 (As instagram does.) Can use this same attr to manage if a post has been liked by a specific user. That user would in turn see a different icon on said post.

> Comments - Comments will also be an array type - Can A user comment on a comment? 

## Feed Page Design 

> Having only touched on context a little in previous projects and generally being a user that prefers night mode I want to use a day/night mode toggler to adjust the context. This will also allow me to play with two different variant designs on the frontend. (This component can persist throughout each page if possible and importantly if looks good.)

> Initially the ability to add a profile picture will be here and can be accessed by clicking on the icon(placeholder profile picture) in the top left of the screen which onClick allows user to upload a photo to cloudinary. This img will be stored to the `USER` in mongoDB.

> From the feed page is where POSTS will be created from by the logged in user. 

## User Page

> Only once the login/signup and feed page are implemented successfully will I start to look into further functionality here. The backend (to allow a user to patch/update their information) will already be built but I want the rest to be functional, tested and completed before moving any further.

> Once the above is completed I will look into further user features and add to the plan from here.
