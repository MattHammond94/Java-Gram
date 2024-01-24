# Java-Gram!

**A clone of one of the lesser known social media platforms known as Instagram.**

## Running the application:

This project has now been deployed but please read below before accessing it through your browser:

**Deployed project:** https://java-gram-frontend.onrender.com

**<ins>!!IMPORTANT:</ins> Although this project has now been deployed, due to its use of HTTP only cookies for secure log in the website fails to work when being accessed through the Safari browser. I'm not going to judge you if you for not using Chrome however if you are planning on accessing the website through Safari you will need to turn off "Prevent Cross-Site Tracking" in order for the site to function as expected. This can be done by going to Safari => Settings => Privacy and un-checking the Prevent Cross-Site Tracking box.!!**

> More information on the above (if you care/use Safari(Why do you use Safari!?)): Safari does not allow cross domain cookies and as my frontend and backend have been deployed separately safari will not allow the generation of a http only cookie from a REQ sent from a different domain. A resolution to this would be hosting the backend and frontend on different subdomains of the same domain. This for me would mean overhauling and redeploying the project (unless I can find another solution in the meantime.)

**Deployed project:** https://java-gram-frontend.onrender.com

If you would prefer to run the program locally on a dev environment follow the steps below:

* ```git clone https://github.com/MattHammond94/Java-Gram.git```

* ```cd Java-Gram```

* ```npm install```

* ```cd frontend```

* ```npm install```

After the above steps have been completed you will need to add your own ENV variables to a .env file. The required environment variables are as below

from root run ```touch .env```

> in the .env files Add ENV variables for:
* NODE_ENV=development  => set NODE_ENV to development
* PORT= [Selected unique port number for DEV ENV]
* TEST_PORT= [Selected unique port number for test ENV]
* DB_URI= [URI for mongoDB database]
* TEST_DB_URI= [Seperate DB URI Also with mongo for testing]
* JWT_SECRET= [Chosen SECRET key for JWT's]

> Also Add Cloudinary API info as below after creating a cloudinary bucket
* CLOUDINARY_URL=  
* CLOUDINARY_NAME= 
* CLOUDINARY_API_KEY=
* CLOUDINARY_API_SECRET=

> Ensure you have added the .env file to your ```.gitignore```

Once the above is completed you can run ```npm run dev``` from root and this will run both your backend and frontend servers concurently locally - Note that the port for your backend server you will have defined in your PORT ENV variable. Your frontend port will be ```3000``` as set in the vite config but this can be altered if you prefer on ```line 13``` of ```vite.config.js```

## Build:

**<ins>Frontend:</ins>**

__Created using the Vite build tool with React as the chosen framework, using REDUX toolkit/RTK query for sending fetch REQ's__

__Tested with: Vitest and React Testing Library.__

**<ins>Backend:</ins>**

__Node/Express server utilising Cloudinary's API for storing image's__

__Tested with: Jest and Supertest__

## Testing: 

To run tests and view the test coverage you will need to first complete the instructions to ensure the appliction is successfully running on your local device. 

> Once completed to run the backend test framework(jest):

* ```cd backend```
* ```npm run test```
To view the backend test coverage run:
* ```npm run test-coverage```

For the frontend(vitest):

* ```cd frontend```
* ```npm run test```
For coverage run:
* ```npm run test-c```

## Personal review:

**<ins>Frontend</ins>**


The big thing I would like to change when next approaching the frontend regardless of the scale of project is taking the time to actually plan how the frontend will function. I made an extensive plan and approach for how I wanted the application to look and also what data I would require (thus informing which backend endpoints I would need to write before even starting the frontend.) and at the time I assumed this would be enough. But I quikcly realised through trial and error and building the application out that I was re-writing a lot of components but in different contexts. If I had taken the time to really consider how the frontend worked(As I had the backend) which elements were consitent throughout and what components needed what data my execution would have been faster and much cleaner. Doing a page by page breakdown of what components and data each page will require 
A good example of this would be in my current solution to the user page header component showcasing the amount of posts a user has. I eventually opted to pass state up and as a result of this there is a slight delay on this number being generated for each individual user. A simple enough fix is to move all the state up to the over arching parent(the UserPage component) but this now means a large overhaul which would have been resolved initially if I had considered the global state from the get go.
I also want to experiment using different packages/libraries for sending REQ's to the backend. I wanted to resolve the problem of having large bulks of logic in components for handling REQ's and abstracting them into different elements and whilst REDUX did exactly this, I found it quite annoying at times and maybe had more config to get used to initially than I ahd expected. There are many other packages for me to experiment with for me to find the sweet spot. Also in relation to this I kept finding myself second guessing my approach to handling if the REQ returned an error and I'm still not 100% confident all avenues have been accounted for which could prove problematic along the line. This DEFINITELY needs improving but also became something I was considering much more than on any other project because I was dealing with so many REQ's. Proper handling of errors is so important and this becomes so evident when you switch over the frontend and are manually testing the application as a user.
In terms of styling its very annoying having an existing application that already has a UI thats been built by developers(Who are likley much more experienced than myself) but also have tried and tested approaches to clean UI/UX design. I found myself regularly fiddling with moving elements around the page to find what was best before resorting to checking what the real instagram had done only to realise "OF COURSE THEY HAVE DONE IT THE BEST WAY THEY'RE INSTAGRAM - THEY GOTS THE INSTA-STRUCTURE DUDE." More time was spent on this than necessary. 
In my next project by more carefully planning the approach to the frontend I can resolve functionality issues faster and more efficently and then I can focus on developing something that looks more unique (and hopefully utilise some SASS in the process.)

**<ins>Backend</ins>**


Whilst building out the backend I found that



## V2/improvements:

> Features and improvements I would like to implement for V2

**<ins>Improvements:</ins>**


* General refactor - particularly of the frotend to make it more inline with SOLID principles.
* Refactor the userPage to move state to the top level. - Once this is done can use a single loader for both the Feed and Navbar components as opposed to two different Loaders.
* Comments are currently only visible through user page - Add comments to posts on the feed page. Comments section should be collapsable on click.
* Add another endpoint for storing a low res copy of an image on upload - Ref to this image will be added to the post document as "lowResCopy: <url>" and can be used as a placeholder whilst main image loads.
* Currently all images will be object fitted into the post container meaning landscape images are not suitable. Potentiall give the user options depending on the image's resolutions.
* Format the post captions to extend larger if over certain length (onClick function in component that sets the styling of the div as fit-content when .caption.length > set amount)
* Add "YOU" to post likes and followers/following sections. If logged in user has liked a post or follows selected user.
* Add a back button to the settings list in user page.
* Change the current feed page navbar - Change to actual nav element for better SEO/screen reading.
* Look into solution for Cross-Site-Tracking in Safari browsers.

**<ins>New features/learning opportunities:</ins>**


* Add notifications - Add a plan for how this will work from top to bottom, TDD the whole feature and add a frontend component diagram before writing any code on the frontend.

* Add pagination for posts on feed - App currently isn't handling a massive amount of data(Highly doubt it ever will) but its a good chance to learn pagination and seperate the feed into a multiple pages when there are over a set amount of posts (probably 10)

* Change the way the feed shows posts - Show only posts that belong to users that you follow.

* Email confirmations - I'm saving an email address on account creation but not doing anything with it. I would like multiple correspondence emails to be sent including a forgotten password email to allow the user to update their password externally.
