---
layout: post
title: Handy tips for Linux server administration
author: Ryan Miller
comments: true
tags:
- Linux
- Command line
- CI/CD
- Create React App
---

### I bought a Linux server this weekend
I purchased a cheap refurbished Dell desktop recently to act as my home server - host my project apps, run CI/CD, and a database. This weekend I installed Ubuntu server on it, plugged in a hardwire connection to my router and fired her up.
  
This post

Jenkins up and running
install docker, 
- add docker group
- add jenkins user to group

Logging into the mongo shell
```
mongo -u ryan -p secretPassword 123.45.67.89/admin
```
### Filesystem
#### List available storage volumes
Tree listing of available storage
```
lsblk
```
#### Mount a Filesystem
This command will mount
```
sudo mount /dev/path/to/device /mnt/path/to/desired/mountpoint 
```
#### System backup and restore
There's a very good [thread](https://ubuntuforums.org/showthread.php?t=35087) that describes how easy a Linux backup is. Unlike Windows, you can just copy over 
```
tar cvpzf backup.tgz \
    --exclude=/proc \
    --exclude=/lost+found \
    --exclude=/backup.tgz \
    --exclude=/mnt \
    --exclude=/sys \
    /
```

### Crontab

### Bash
Sometimes you'll want to append a date
```
#/bin/bash
now=$(date +"%m_%d_%Y")
echo "Filename : /nas/backup_$now.sql"
```
this will output as `Filename : /nas/backup_04_27_2010.sql`