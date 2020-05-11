---
layout: post
title: Docker, Jenkins, and Continuous Deployment on Windows
author: Ryan Miller
comments: true
tags:
- Docker
- Jenkins
- CI/CD
- Create React App
---

### Setting up a local Jenkins Instance using Docker

[Here is a great guide](https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/) that I'm following while writing this post.

```
docker container run --name jenkins-docker --rm --detach --privileged --network jenkins --network-alias docker --env DOCKER_TLS_CERTDIR=/certs --volume jenkins-docker-certs:/certs/client --volume jenkins-data:/var/jenkins_home --volume "/c/Users/rmill/Documents/Code":/home docker:dind   
```

```
docker container run --name jenkins-blueocean --rm --detach --network jenkins --env DOCKER_HOST=tcp://docker:2376 --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 --volume jenkins-data:/var/jenkins_home --volume jenkins-docker-certs:/certs/client:ro --volume "/c/Users/rmill/Documents/Code":/home --publish 8080:8080 --publish 50000:50000 jenkinsci/blueocean
```


```
docker container exec -it jenkins-blueocean bash
```

Crypto Bot Intsall
Get MongodbOn Linux
```
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-org 
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enabled mongod
```
