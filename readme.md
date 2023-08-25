# Cicero Writing App
## Overview
Cicero is an easy-to-use and flexible online writer for authors and writers. It offers a full host of tools and functionality with the goal of never getting in the way of the user's creativity.

Cicero is great for both novice and advanced writers who have different workflows and writing styles. Cicero embodies the principle that the software you use should never get in the way of what matters most: writing a creative story.

Below you will find a transparent overview into how Cicero was created, my personal process, and justification for engineering decisions. Be warned, the below section is intended for developers and covers a lot of technical jargon.

**Current Project Progress: 20%**

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
* **Slate** - A WYSIWYG framework that powers Cicero's editor and writing functionality. This library is open source under the MIT license and is in beta. Please include the LICENSE file and refer to the documentation for any issues that may arise.

Alongside those, we are using some extra packages for Cicero's backend:
* **Body-parser** - This package parses the body of HTTP requests giving us more information about the request and the user.
* **Bcrypt** - This package makes working with passwords a little more secure and simple. Uses password hatching.
* **Cors** - This package allows us to utilize CORS requests with the **cross-origin resource sharing** protocol. Basically, it allows us to specify which resources from an origin outside of our server are permitted to load.
* **Nodemon** - This package allows for automatic restarting of our node app/server whenever we make changes to the server file. Simple and clean.

> NOTE: Some extra tools were used for specific features and testing capabilities. One such tool is **Postman** which allows us to simulate HTTP requests to ensure our API's are working correctly.

The frontend UX/UI was designed from the ground up using **Affinity Designer** and **Figma**. A great deal of planning and research was carried out to ensure the final product was user friendly and competitive with similar software. A more in-depth overview of the UX/UI design process for this project can be found on my [portfolio](http://marioferrera.com).

Lastly, to touch on methodologies for our codebase. For CSS, we are using the **BEM methodology** which places an emphasis on Blocks, Elements, and Modifiers in our naming scheme. It can be distilled into these core principles:
* **Blocks** - Standalone entity that is meaningful by itself. I.e. header, footer, container, checkbox, etc.
* **Elements** - A child of a block that is semantically tied to its parent block. Use double hyphen or underscores to seperate elements from blocks. i.e. menu item, list item, header title, header paragraph, etc.
* **Modifiers** - A modifier keyword attached to a block or element. Use these to change the state or appearance of something. If the previous element uses underscores then use double hyphen here otherwise use single hyphen. i.e. color red, fixed, disabled, checked, etc.

#####  BEM Naming Tips
* Avoid naming your blocks according to their content. Try to be generic for blocks that can be reused. For example, let's say we have a block that represents a list's content. On one of the pages we might display "**.news .news-list**", but on the other we might display "**.products**", so reusing blocks with the name "**.news-list**" with "**.products**" inside isnt very nice. In this case a simple class like "**.list**" will be enough.
* If something can be reused, make it a block, not an element.
* For boolean modifiers, the value is not included in the name.

`` 
.block__element-name--modifier {} 
``

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

## The Frontend
### Gettings Started
To start the react app, we can use:

``
npm start
``

To test the react app, we can use:

``
npm test
``

To build/compile the react app, we can use:

``
npm run build
``

### Building the Writer Canvas
The concept of making a writer within an html document/webpage is a unqiue one. The common method seems to be using the following parts:
* **ContentEditable Attribute** - This attribute is applied to the wrapping section div element. This allows all of the children's text values to be editable. We want a buffer between the editable section and the content, we also want to have it so when we clear all of the lines it does not remove the first p tag.
* **Element Nodes** - Next, we want proper typewriter functionality where pressing enter creates a new line with a new p tag. Heading tags can also be created with shortcuts or a nice little popup. Alternatively, we can create our own markdown-type script that converts content into the correct element tag based on symbols (#, *, etc.).
* **Slate** - We will be using slate to implement this functionality. Refer to documentation for more information.

Trying to make content editable:
+ Section content is wrapped in div and set to content editable.
+ When we press enter, we create a new p tag.
+ When we press backspace, we delete text from the p tag.
+ When we press backspace in an empty p tag, it deletes the p tag and reverts to the previous element.
+ When we press backspace on an empty p tag that is the only p tag in the container: we are not allowed to delete the p tag.

## Developer Checklist
### Backend
- [X] Setup temp. database with MongoDB.
- [X] Define base models and schema for major data using Mongoose.
- [X] Setup basic routing handlers for HTTP requests.
  - [X] Document (page) routing handlers.
  - [X] User Login and Registration routing handlers.
  - [X] User Account Deletion routing handlers.
- [X] Implement user authentication middleware via web tokens.
- [ ] Implement user access and request authentication using JWT and cookies.
- [ ] Create a secure API for handling the request of sensitive information for use on server.
- [ ] Define a potential theshold for data or artificial limit to take into account database storage limitations.
### Frontend (React)
#### Writer
- [X] Build top navigation bar component.
- [X] Build canvas/writer section component.
- [X] Build type options component.
- [X] Build left sidebar component.
- [X] Build right sidebar component.
- [X] Build left dropdown menu component.
- [ ] Build modals and popup setting components.
- [ ] Engineer solution for creating a WYSIWYG writer within canvas using contenteditable and other functionality.
- [ ] Enhance writer functionality to include things like inline tabbing, structure for headings and paragraphs, and others.
- [ ] Setup hooks, states, and other functionality for mutable data.
- [ ] Define stylesheets for components.
#### Account + Extra
- [ ] Build homepage with secondary pages for product.
- [ ] Build user login page with authentication.
- [ ] Build user account page.
- [ ] Setup stylesheets and major styling for app. 
### Accessibility
- [ ] Implement accessibility for visually-impaired users.
- [ ] Implement accessibility for hearing-impaired users.
- [ ] Implement contrast and color tweaks, as needed, for colorblind users.
- [ ] Implement accessibility within navigation.
### SEO
- [ ] TBD