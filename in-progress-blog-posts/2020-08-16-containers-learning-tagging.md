---
layout: post
title: Containers Learning - Tagging
author: Ryan Miller
comments: true
tags:
- Docker
- Containers
---

# Docker Tagging
Docker tags convey useful linformation about a specific image version. They are aliases to the ID of the image which often look like this `e1377ac21d65`. Like a git tag, to refer to a git commit, they are more human readable.  
Docker tags come into play in several scenarios, mainly when:
1. Building an image, e.g.
```
docker build -t username/image_name:tag_name .
```
2. Explicitly tagging an image through the tag command.
```
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```
  
Okay, so what is the first command doing you may ask? In it, we are having Docker build a new image for us based on the Dockerfile in the current working directory (hence the `.` at the end of the command which can be changed if we want to pickup a Docker file in another directory). 
The `-t` option is used to tag the image. In this example, we use `username/image_name` for specifying the name of the image. Which is a convention to avoid tagging the image again when needing to push it to a registry.