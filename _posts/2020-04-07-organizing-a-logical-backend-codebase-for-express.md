---
layout: post
title: Finding a Logical Way to Organize Backend Codebase
author: Ryan Miller
comments: true
tags:
- Express
- NodeJs
- APIs
---

I've been learning about, and building several Node + React hobby projects over the past year with my eye mostly on the functionality. As projects have grown more complex, the organization and structure of my repository (or lack thereof) begins to show its warts - and makes a project nearly unapproachable to someone new.

The focus for this post will be specifically on my Node-js backend code which is currently looking like an mess. I drew my inspiration while reading [this article](https://www.toptal.com/nodejs/secure-rest-api-in-nodejs) and studying the accompanying linked [github repo](https://github.com/makinhs/rest-api-tutorial). Basically, this app is a simplified JWT authorization demo which allows showcases JWT token authorization combined with the power of Express middlewares to secure a rest API.

-- README.md
-- package.json
-- index.js
|-- authorization
|  |-- controllers
|  |  |-- authorization.controller.js
|  |-- middlewares
|  |  |-- verify.user.middleware.js
|  |-- routes.config.js
|-- common
|  |-- config
|  |  |-- env.config.js
|  |-- middlewares
|  |  |-- auth.permission.middleware.js
|  |  |-- auth.validation.middleware.js
|  |-- routes.config.js
|  |-- services
|  |  |-- mongoose.services.js
|-- users
|  |-- controllers
|  |  |-- users.controller.js
|  |-- models
|  |  |-- users.model.js
|  |-- routes.config.js

While this scheme isn't necessarily perfect, there are some nice takeaways that I can apply to the backend of my current project (crypto-bot), which is looking like a hot mess right now. I have all my express app logic and routing in a single file - which has worked for me on small projects, but it totally insane for more serious pieces of work.  

My needs for crypto-bot also get into "authentication", and not just "authorization" as this demo project addresses. So, rather than jumping right into crypto-bot refactoring, I'll first create a new proof-of-concept repo where I'll nail down my use case, expanding some functionality and a basic front-end that allows user registration and login. This mission-focused repo will hopefully become a template I can draw from in future projects. 

While working this, a couple key design principles that I'll be taking from the demo project here are... At the top level:

- Each entity gets a directory (with a controller, model, and config)
- A "common" directory is used to store commonly used project files and services (e.g. Mongo connection, environment variables)
- An "authorization" directory is used to cotain all authorization files and services for the app

Within directories:

- `routes.config.js` files define the middleware sequence for each route 
- controller files, e.g. `authorization.controller.js`, typically follow the middlewares and contain the logic for each endpoint