---
layout: post
title: Best Practices for Linux Server Security Hardening
author: Ryan Miller
comments: true
tags:
- Linux
- Security
- Hardening
---

# Linux Server Hardening Best Practices
This article references many security hardening tips and best practices I've found online and wanted to compile in one place. References [here](https://support.rackspace.com/how-to/linux-server-security-best-practices/), and here.
## User Management
By default, the root user is created as the first user on every Linux system. Since every Linux system has a root user, this is a universally known account to attack, especially against hackers who are trying to SSH into your server. Bad actors already know half the information they need (username) in order to access the most powerful account on the system.  
For this reason we want to disable `root` access via Secure Shell (SSH).  
In it's place, we'll want to create a secondary user with a different set of login credentials which will be used to access via SSH.
### Adding user
For Debian and Ubuntu® operating systems, add a user by following these steps.
Create a new user and set their password:
```
useradd {username} passwd {password}
```
Give the new user sudo permissions for privileged operations on the system. This user is the primary user for logging in remotely and making changes to the server. Use one of the following methods to implement sudo permissions for the user.
Add the user to the admin user group:
```
usermod -aG admin {username}
```
modify the sudoers file to give the user sudo permissions.
```
visudo
```
Once in the sudoers file, add the following line directly after `root ALL=(ALL:ALL) ALL`
```
{username}     ALL=(ALL:ALL) ALL
```

### Password Strength
- Use a minimum password length of 12 to 14 characters.
- Include lowercase and uppercase letters, numbers, and symbols, if permitted.
Generate passwords randomly.
- Avoid using the same password for multiple user accounts.
- Avoid using information that is or might become publicly associated with the user or the account.
- Avoid using information that the user’s colleagues or acquaintances might know to be associated with the user.
- Do not use passwords that consist of weak components.
## SSH
For a login method that is more secure than using a password, create an SSH key pair to use with the user that you previously created. These instructions work with any Linux distribution.
### Generate an SSH key pair
Run the following command to generate a key pair
```
ssh-keygen -b 4096 -t rsa
```
This operation creates two files. The default names are id_rsa for your private key and id_rsa.pub for your public key.
After you have created the key pair on your local computer, upload the public key to your remote server for the user that you created previously.
```
ssh-copy-id -i ~/.ssh/id_rsa.pub {username}@{remotePublicIPAddress}
```
Connect to the remote server by using ssh {username}@{remotePublicIPAddress} and run the following command to verify that no extra keys were added that you do not expect:
```
cat .ssh/authorized_keys
```

At this point, you have added ssh-key and password authentication for the user. The next section goes over optional steps on how to disable password authentication.
## Password Strength