# Cicero Writing App
## Overview
Cicero is an easy-to-use and flexible online writer for authors and writers. It offers a full host of tools and functionality with the goal of never getting in the way of the user's creativity.

Cicero is great for both novice and advanced writers who have different workflows and writing styles. Cicero embodies the principle that the software you use should never get in the way of what matters most: writing a creative story.

Below you will find a transparent overview into how Cicero was created, my personal process, and justification for engineering decisions. Be warned, the below section is intended for developers and covers a lot of technical jargon.

**Current Project Progress: 5%**

## Project Overview
Cicero runs on the ever-popular MERN stack which utilizes:
* **MongoDB** - NoSQL database that stores data using documents (JSON).
* **Express.JS** - A Node framework that facilitates faster communication between client and server alongside Node.JS.
* **React.JS** - Frontend JavaScript library that acts as the backbone of Cicero's UI.
* **Node.JS** - A server enviroment that handles the backend communication between our client and server.

Cicero also utilizes a few powerful secondary libraries such as:
* **TypeScript** - A superset of JavaScript that offers a range of extra type checking and type extensions. Great for writing code that is more explicit.
* **Anime.JS** - Lightweight animation library that supports Cicero's frontend with fluid and modern animations.
* **Phosphor Icons** - A nice third-party icon library. Delivers great looking icons for Cicero's UI.

Alongside those, we are using some extra packages for Cicero's backend:
* **Body-parser** - This package parses the body of HTTP requests giving us more information about the request and the user.
* **Bcrypt** - This package makes working with passwords a little more secure and simple. Uses password hatching.
* **Cors** - This package allows us to utilize CORS requests with the **cross-origin resource sharing** protocol. Basically, it allows us to specify which resources from an origin outside of our server are permitted to load.
* **Nodemon** - This package allows for automatic restarting of our node app/server whenever we make changes to the server file. Simple and clean.

> NOTE: Some extra tools were used for specific features and testing capabilities. One such tool is **Postman** which allows us to simulate HTTP requests to ensure our API's are working correctly.

The frontend UX/UI was designed from the ground up using **Affinity Designer** and **Figma**. A great deal of planning and research was carried out to ensure the final product was user friendly and competitive with similar software. A more in-depth overview of the UX/UI design process for this project can be found on my [portfolio](http://marioferrera.com).

## The Backend
For Cicero, I chose to start with engineering the backend before the frontend. The reasoning behind this is that it is better to have the backend set up early to create room for testing data manipulation later on.

First, we need to setup the project infrastructure by creating the directory, installing packages with NPM, and creating the node/express app within the server.js file entrypoint. This will get us up and running so we can test our routing handlers with HTTP requests using postman. I also get our database setup with MongoDB and connect it to our server.

Next, we start defining the actual router API's that handle typical HTTP requests (GET, PUT, DELETE, etc.). Routing is the equivalent of a team of post office workers who handle the process of receiving a request to send a package (request), verifying and shipping the request (controller), and ensuring that the package passes some benchmarks before being shipped off (models).

The core components are as follows:
- **Models** - These .js files define the structure of data coming into the database. Using a schema, the model ensures that no data is added to a path in the DB without meeting certain structural requirements.
- **Controllers** - These .js files handle the actual process of making a request through a router. Controllers contain various functions for each type of request (get, delete, etc.) and often utilize a model.
- **Routes** - These .js files hold the top-level routers for a collection. The relative controller functions get plugged into this file which creates a fully-functional router.

### Route Creation

The first routing handler group we will work on is Documents. **Documents** in this enviroment refer to the pages that the user fills with text and then uploads to the database so they can be opened and closed at will. This concept can be translated to personal software where data moves through the user's hard drive rather than a database.

The process is as follows:
- Setup our schema and model for what a document should contain. In this case, we laid out some document info at the top as well as the structure of each document using HTML elements.
- Setup controllers for each CRUD operation. We cover everything from creating a document to deleting multiple documents based on a query.
- Assign our controllers to each route in our router file. These contain the directory of our documents based on the REST methodology.

We also did the same thing with the user routes. Here we setup user registration and login which also utilized bcrypt for password hashing and jsonwebtoken for authentication. Here's why we used these two libraries.
- **bcrypt** - This offers the ability to hash or encrypt the user's password when registering. To ensure that a user's password is protected, in the event of any leaks, we use this encryption on the passwords.
- **jsonwebtoken** - This handles how we differentiate between user sessions. Basically, in order to show the correct data for the correct user, we attach a unique web token to a specific user account. Then when a user logs in with that accounts credentials they get access to that unique session and its web token—i.e. they can see all the documents attached to that user.

## Developer Checklist
### Backend
- [X] Setup temp. database with MongoDB.
- [X] Define base models and schema for major data using Mongoose.
- [X] Setup routing handlers + controllers for HTTP requests.
  - [X] Document (page) routing handlers.
  - [X] User Login and Registration routing handlers.
- [ ] Implement user authentication and sessions.
- [ ] Create a secure API for handling the request of sensitive information for use on server.
- [ ] Define a potential theshold for data or artificial limit to take into account database storage limitations.
### Frontend (React)
- [ ] Build out header bar component.
- [ ] Build out canvas/writer section component.
- [ ] Build out left sidebar component.
- [ ] Build out right sidebar component.
- [ ] Build out left dropdown menu component.
- [ ] Build out modals and popup setting components.
- [ ] Build out homepage with secondary pages.
- [ ] Setup hooks, states, and other functionality for mutable data.
- [ ] Setup stylesheets and major styling for app. 
### Accessibility
- [ ] Implement accessibility for visually-impaired users.
- [ ] Implement accessibility for hearing-impaired users.
- [ ] Implement contrast and color tweaks, as needed, for colorblind users.
- [ ] Implement accessibility within navigation.
### SEO
- [ ] TBD