---
layout: post
title: Tips for Linux server administration
author: Ryan Miller
comments: true
tags:
- Linux
- Command line
- CI/CD
- Create React App
---

### Tips for Linux Server Administration
I purchased a cheap refurbished Dell desktop recently to act as my home server - host my project apps, run CI/CD, and a database. This weekend I installed Ubuntu server on it, plugged in a hardwire connection to my router and fired her up.

### System Resources and Processes
##### View running processes
```
htop
```
##### View Processor Info
```
cat /proc/cpuinfo
```
##### View memory info
```
cat /proc/meminfo
```

### Filesystem
#### List available storage volumes
Tree listing of available storage
```
lsblk
```
#### Mount a Filesystem
This command will mount a filesystem temporarily:
```
sudo mount /dev/path/to/device /mnt/path/to/desired/mountpoint 
```
If you also want automatic mounting after a reboot we must edit the the `fstab` file by using this command:
```
sudo vi /etc/fstab
```
Once open, you can place your cursor on a new line of the file and specify the mount you want using this format:
```
/dev/sdb1 /mtn/data ext4 defaults 0 2
```
An explaination of the fields can be found on the [fstab man page](https://man7.org/linux/man-pages/man5/fstab.5.html). In this example, we specify
1. source
1. target
1. filesystem type
1. mount option (defaults: rw, suid, dev, exec, auto, nouser, async)
1. speficy which filesystems need to be dumped (zero is default - don't dump)
1. used to determine boot order. Root filesystem should be 1. If not root, should be 2.

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

### Tmux
#### Working with Panes
Create a new pane to the right
```
Ctrl+b %
```
Create a new pane to the bottom
```
Ctrl+b "
```
Remove current pane
```
exit
```
Switch to left pane
```
Ctrl+b <-
```
Switch to right pane
```
Ctrl+b <-
```
#### Working with Windows
Create a new window
```
Ctrl+b c
```
Switch to another window
```
Ctrl+b 0
```
#### Attaching and detaching
Detach
```
Ctrl+b d
```
View running tmux sessions
```
tmux ls
```
Attach to session 0
```
tmux  attach -t 0
```
Rename session from `0` to `git`
```
tmux rename-session -t 0 git
```