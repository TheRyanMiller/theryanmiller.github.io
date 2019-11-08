---
layout: post
title: Building an Auto-Updating Live Local Music Calendar
author: Ryan Miller
comments: true
tags:
- React
- MongoDB
- Heroku
- Web Scraping
---
I wanted to challenge myself with a new project recently. Three interesting skills that I've had on my mind for a while have been React.js, Mongo DB, and web scraping. 
With limited exposure to each, I decided to work all three into a project idea I had to create an auto-updating local music calendar for Charleston. 
Basically, I pick my favorite local music venues in my city - Charleston, South Carolina - and use web scraping to parse data and aggregate all upcoming events into 
a single searchable Mongo database. I built a mobile-friendly front end for it all using React.

Some cool features I have added are abilities for users to
- Click an event to view event details (ticket price, event time, links, openers, etc)
- Peform social login (Facebook, Google, etc)
- Upvote individual events
- Save events to a list

I learned a lot along the way, like how to deploy a free app to Heroku, setup `https` for free using Cloudflare, build a REST API, and kickoff free background cron jobs on my Heroku server.
The site is currently deployed and viewable here: [chs-music.com](https://chs-music.com). Whether or not anybody will ever use it is a question I cannot answer, but it certainly has been a successful learning project and with all the free hosting options out there today, I'm amazed I could pull it all off at no cost at all (the only thing I paid for was the domain name).