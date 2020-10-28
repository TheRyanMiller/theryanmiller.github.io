---
layout: post
title: Experiments for Gaining Twitter Followers 
author: Ryan Miller
comments: true
tags:
- Twitter
---

# Building a Twitter Followership
Okay, so I built a Twitter bot and was feeling pretty good about myself. But despite how exciting it might've been for me to put it out into the wild for the world to see, it's debut landed with a thud: a very obvious "0" follower count. So how the heck do I get followers for this thing? 
  
Well, here's my plan.
1. Post a link to my Facebook to see how much traction I can get from my own personal social network.
1. Begin automatic monitoring of all Trump's tweets, and reply-tweet back to each one within the same minute
1. Repeat step #2, but for high profile Trump-related accounts (e.g. Mike Pence, Joe Biden, etc)
1. Repeat step #2, but for lower profile Trump-related accounts (the idea here is that my replies may be less drowned out than the replies in step 2)

Once I get this all setup, I will let the bot do it's work while I have _yet another script_ tracking my own accounts followers. This script will simply check my follower account at midnight each morning so that I can plot it later on.  
  
Stay tuned for results.

## Update: 7/15/2020
Results from step 1: A coupl weeks ago, I posted a link to my bot to my Facebook feed. Pretty much immediately I collected my first 14 total followers! Sadly, the number has not moved in almost 2 weeks.
In the mean time, have gone ahead and developed the code needed to reply-tweet other accounts the same minute that they tweet out. I designed it in a way that I can keep a list of "targetted tweeters" that I can add/remove from at any time.  
Just as an experiment I want to begin with _just_ Donald Trump and see what kind of performance I get after a week. 

## Update:  7/22/2020
A week has gone by of following just Donald Trump and I gained a few followers. Up from 14 to 22. I will now move on to step #3 of my experiment and add several new names to the list. I am trying to go for some folks that are pretty vocal about the president. Let's let this run for another week and see how it goes...
* @realDonaldTrump
* @gtconway3d
* @DonaldJTrumpJr
* @Susan_Hennessey
* @SethAbramson

## Update:  10/28/2020
Got some good news and some bad news. Good news: My bot lasted a couple weeks and gained up to 88 followers. Bad news: Twitter locked my bot account claiming that it was violating it's terms after making API calls ever minute or so, and replying so quickly to so many accounts.  
On the bot itself, I built a simple switch to disable all the reply-tweet functionaly and return it back to a boring bot which just fills its own timeline with daily tweet. For now that'll be good enough :).
