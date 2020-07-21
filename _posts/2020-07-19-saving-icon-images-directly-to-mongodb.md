---
layout: post
title: Saving and Retrieving image files to/from MongoDB
author: Ryan Miller
comments: true
tags:
- Images
- MongoDB
- File storage
---

# What are we doing?
Image -> Byte Array -> Byte String -> Image

# Preaparing MongoDB to recevie
1. Update Mongoose schema
What is a "Buffer" type?

# Saving Images to MongoDb
1. Get file from filesystem using fs and path
1. fs.readFile()
1. Send to DB

# Rendering back in React App
Now that image is in database as a "Buffer"
1. Get it out
1. Convert raw data array to base64 string with following function
1. Before it can be set as valid src to an image tag, must pre-pend with like this: `"data:image/png;base64,"+convertedImg"`
```
const toBase64 = (arr) => {
        let newArr = new Uint8Array(arr);
        return btoa(
            newArr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
```