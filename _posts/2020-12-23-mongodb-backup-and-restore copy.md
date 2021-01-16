---
layout: post
title: Mongodb Backup and Restore
author: Ryan Miller
comments: true
tags:
- Mongodb
- Backup
- Restore
---

# Overview
This post will cover the basics of a "backup and restore" strategy for Mongodb using `mongodump` and `mongorestore`. This strategy is useful for my smaller projects, and should not be used for sharded instances (version 4.2+).

## Mongodb backup
The `mongodump` command is a simple command used to backup the data from a running mongod instance. There are multiple ways to use it. If accessing a locally running instance of mongod, simply run:
```
mongodump -u usernamehere -p passwordhere
```
This will create a new `dump/` directory from wherever the location where command was run. This will overwrite an existing directory by that name in this location if one exists. If you want to specify a different output directory you may use the `--out` flag (e.g. `--out=/path/to/dir`).  

If you are running on a non-standard port (different than 27017), then you'll need to include a `--port=X` flag. The `-u` and `-p` flags are only required if authentication is active on your database(s).  

Now what if you're trying to backup a remote database? In this case we'll have to pass a couple extra parameters:
```
mongodump --host= --port=27017 -u usernamehere -p passwordhere
```
  
Finally, if you want to limit the data included in the dump, you can specify a particular database and/or collection using the following flags:
```
mongodump --collection=myCollection --db=test
```

## Mongodb restore
The `mongorestore` utility connects to a locally running `mongod` and can restore a binary backup created by `mongodump`. By default, mongorestore looks for a database backup in the `./dump/` directory, but can also accept a parameter with a filepath for a differently named directory you may want to restore from.  

`mongorestore` can create a new database or add data to an existing database. However, mongorestore performs inserts only and does not perform updates. That is, if restoring documents to an existing database and collection and existing documents have the same value _id field as the to-be-restored documents, mongorestore will not overwrite those documents.

You must use the `--db` option to specify the database name to restore into if you are restoring a single BSON file. The /database specified in the connection string will only be used as the authentication database in this case.
You must use the `--db` option to specify the database name to restore into if you are restoring a single BSON file. The /database specified in the connection string will only be used as the authentication database in this case.

Of course, `mongorestore` can also be run on a remote host via  
```
mongorestore --host=mongodb1.example.net --port=3017
```
If restoring to an instance that enforces access control, include the `-u` and the `--authenticationDatabase` as well. Omit the `-p` option to have mongorestore prompt for the password:
```
mongorestore --host=mongodb1.example.net --port=3017 -u=user  --authenticationDatabase=admin ./dump
```
