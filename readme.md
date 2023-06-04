# Cicero Writing App
## Overview
Cicero is an easy-to-use and flexible writing webapp for authors and writers. It offers a full host of tools and functionality that don't get in the way of the user's creativity. 

This means it's great for both beginner writers as well as advanced writers who have different workflows and writing styles.

## Project Deepdive
Cicero runs on the ever-popular MERN stack which utilizes:
* **MongoDB** for the backend and Database management.
* **Express.JS** for the communication between the frontend and backend (client & Server).
* **React.JS** for the frontend.
* **Node.JS** for communication functionality alongside Express. This also allows us to simulate server-client communication on our machine.

Alongside these, we are using some common packages for our website:
* **Body-parser** - This package allows us to  
* **Bcrypt** - This package makes working with passwords a little more secure and easier to work with.
* **Cors** - This package allows us to utilize CORS requests with the **cross-origin resource sharing** protocol. Basically, it allows us to specify which resources from an origin outside of our server are permitted to load.

The frontend UX/UI was fully designed from the ground up using **Affinity Designer** and **Figma**. Great analysis was carried to ensure the final product was user friendly and inline with similar competing software.

## Project Architecture
Looking over the project/file structure, you may notice a few elements:
* **Client** and **Server** Folders - These folders represent the frontend (Client) and backend (Server) of the website. For reference, the index.js file inside the server folder is the basis for the server.