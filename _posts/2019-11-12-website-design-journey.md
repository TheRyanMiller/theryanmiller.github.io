---
layout: post
title: Website Design Journey
author: Ryan Miller
comments: true
tags:
- React
- Bootstrap
- Wireframing
- Design
---
First thing's first: I'm not a designer. My approach to building sites has always been to start with the business logic and functionality, then worry about making it look pretty later. This philosophy has worked fine for my self-guided hobby projects, but what about working with a partner or team? 

Well, recently my girlfriend and I have decided to build an internet business together. It didn't take much time at all to learn that my old process of "keeping it all in my head" is completely unsustainable when working with someone else. For one, we need to be on the same page about the look and feel of the site. What are the key user flows and the accompanying UX? There's tons of key business decisions buried within these flows that our minds can better draw out when looking at a physical respresentation of the interface.

With this in mind, we are going to communicate our flows up front by building wireframes that allow minimal functionality. The purpose of the wireframes is to demonstrate bare-bones functionality and navigation. Enough to help the user imagine what a functional site would feel like. Wireframing is a big exercise in cost-benefit tradeoffs, so here are some guidelines to make sure we are getting the most out of our time:
- Should track happy path flow (avoid edgecase)
- Don't spend time coding validations or error states
- No backend connections (instead just use hardcoded or input-form data)
- Ensure that both the mobile and desktop styles and design are fleshed out

Rather than doing wireframes in a standalone tool, I will be doing it all in React and CSS. By doing this I hope most of my code, layouts, and styles will be portable to my app without any need for rework. Right now I've got a separate project stood up just to serve as a wireframe. I plan to use React-Bootstrap to aid in quicker design.

I hope to add more to this post and share experience as time goes on and I learn more.