# Cicero Writing App
## Overview
Cicero is an easy-to-use and flexible writing webapp for authors and writers. It offers a full host of tools and functionality that don't get in the way of the user's creativity. 

Cicero is great for both novice and advanced writers who have different workflows and writing styles. The software you use should never get in the way of what matters most: writing a creative story.

Below you will find an in-depth overview into how Cicero was created, my personal process, and justification for engineering decisions. Be warned, it is intended for developers and covers a lot of technical jargon.

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
I chose to begin this project by getting the backend server up and running. The reasoning behind this is that I believe it is better to have the backend set up early to give us room to test data manipulation with the frontend later on.

We begin by setting up our project, importing packages, and creating our node/express app within the server.js file. This will get us up and running so we can test our routing handlers with HTTP requests using postman.

## Developer Checklist
### Backend
- [ ] Setup routing handlers + controllers for HTTP requests.
- [ ] Setup database with MongoDB.
- [ ] Define base models and schema for major data using Mongoose.
- [ ] Create a secure API for handling the request of sensitive information for use on server.
- [ ] Define a potential theshold for data or artificial limit to take into account database storage limitations.
- [ ] Implement user accounts and authentication.
- [ ] Implement unique views and data depending on user account.
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