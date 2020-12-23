---
layout: post
title: MongoDB Security
author: Ryan Miller
comments: true
tags:
- openssl
- Git Bash
- Certificate Authority
- TLS certs
---

### Securing your MongoDb instance with user/password authentication
*Note: This article assumes use of a Windows machine*  
By default, there is no security enforced on a fresh install of MongoDB. While this may be convenient in some local development environments, it's unacceptable 
in most cases, especially in production. Luckily, enabling security is quite simple and only requires a few steps.  
1. Enter your mongo instance 
1. Create an administrator account (with global permissions).
1. Create a service account for our app (usually granted permissions to a single database)
1. Update your mongo config to enable authorization

Lets' get started.  
  
If for some reason you already have authentication enabled in your Mongo configuration, you'll want to disable it now so that you have permissions to create some users. Go ahead and restart your mongod service and use the `mongo` command to open an interactive session.  

Before creating our first user, it is important to know that MongoDB's security model exists at both a system/global level and also at an individual database level. So that means that we can create an administrator account to manage all databases globally, and then other accounts that are restricted to individual an database or databases.  
  
Each instance of MongoDB ships with a `admin` database. This database is reserved to store system collections and user authentication data, which includes usernames, passwords, and roles. When creating our administrator account, we must do it in here, so issue the following command to switch into it:
 
```
use admin
```
 
Now go ahead and create your administrator user with the command below (of course changing the user/pass to something more secure).
```
db.createUser(
      {
            user: "admin",
            pwd: "admin",
            roles: [
                  "userAdminAnyDatabase",
                  "dbAdminAnyDatabase",
                  "readWriteAnyDatabase"
	      ]
      }
)
```
The roles defined in this command will give us a user with full permissions in our instance of Mongo.
Now let's switch over to the database that we want to secure for our app called `MyApp`.
```
use MyApp
```
And now we can create a user with read/write permissions in that database.

```
db.createUser(
  {
    user: "myappuser",
    pwd: "password",
    roles: [ {role: "readWrite", db:"MyApp"} ]
  }
)
```  
  
> *The database where you create the user (in this example, `MyApp`) is that user’s authentication database. Although the user would authenticate to this database, the user can have roles in other databases; i.e. the user’s authentication database does not limit the user’s privileges.*

We now have two users: `admin` and `myappuser` created. One to be a global admin, and one to be the service account used by our application. With that part done, let's learn how to turn actually lock down our database so that these users become useful.

#### Enable Security on MongoDb
To enable security, we'll find the mongod configuration file (`mongod.cfg`) located in the /bin directory in the install root of our Mongo instance. In my case it is located here: `C:\Program Files\MongoDB\Server\4.0\bin`.  

Go ahead and copy and paste this snippet onto a new line
```
# Security
security:
  authorization: "enabled"
```
The line breaks and spacing here are important - otherwise mongo will not interpret it correctly. If you're curious what each line does, here ya go: The first line here is simply a comment. The second line denotes that we're about to define a security parameter. Finally, the third line (indented with two spaces) says that we are going to enable authorization when starting up mongod.

Woohoo! We're all configured! Now for our final act, we'll login. First, we'll try logging in with our limited account, so that we can see the effects. To do this we'll have to restart mongod if you haven't already - in order to pickup the new config.
  
Next, we can login to our service account in one step by issuing the following command. Make sure to include `--authenticationatabase MyApp` segment which indicates that this particular user is authorized specifically in the MyApp database, and not globally.

```
mongo -u myappuser -p password --authenticationDatabase MyApp
```
We should now have a session started up successfully. We can validate our permissions by issuing a command we know should succeed and another that we expect should fail. For example:
```
use myapp
db.testcollection.insert({test:"test"}) // should succeed
```
This account as read/write to this database so that command should succeed. Now try this one:
```
use testdb
db.testcollection.insert({test:"test"}) // should fail
```
We should see and "Unauthorized" error with the command above because it is attempt to create/operate on a collection (`testcollection`) that it doesn't have access to.

### Securing your Mongo DB to remote hosts
In this section we'll discuss how to connect to your database from a remote host (e.g. via SSH or a remote application server). The trick here is to allow access to the hosts we need, while also limiting access as much as possible so as not give hackers more opportunities than necessary (e.g. allowing full access to all hosts on the internet would be a bad idea). 
The way to set this up is to modify the mongo config. As we saw in the previous section, MongoDB's config file is located by default in `/etc/mongod.conf`. Scroll down far enough and you'll see a section for network interfaces.

```
# network interfaces
net:
  port: 27017
  bindIp: 192.168.1.99,127.0.0.1
```

In the config above, you will want to set the port that mongod will listen on, as well as the IPs that it will listen on separated by commas and no spaces. 
Note that these *are not* the IPs of remote hosts, but rather the listening interfaces on our server.
- 192.168.1.99 is the local IP of
- 127.0.0.1 is the loopback address which will allow connections from our server itself
In effect, this will allow any host who can speak to 192.168.1.99 interface (i.e. all other hosts on my LAN, for example 192.168.1.24, etc) to connect. However, it will not allow traffic from the broader internet to connect. If we wanted to allow that we could use either:
- `0.0.0.0` which effectively is an allow-all
- [insert public-facing internet IP, e.g. 44.45.66.18]  
Assuming you've updated your config, the final thing we need to do now is restart your mongod service using the `sudo service restart mongod` command, to allow the service to pickup your new configuration.

### References
- [Mongo Docs - create user](https://docs.mongodb.com/manual/reference/method/db.createUser/)
- [Stack Overflow - List users](https://stackoverflow.com/questions/32582244/how-to-list-all-users-in-the-mongo-shell)
- [Mongo Docs - manage users and roles](https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/#view-a-user-s-roles)

