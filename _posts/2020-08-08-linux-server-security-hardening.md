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

#### Limit permissions of background programs by setting ownership
Linux permissions are very useful to control the damage of hacks and misbehavior. For this reason we want to use dedicated users to run programs that operate in the background (daemons) and execute requests coming through the network or other communication means. For example, the database daemon mysqld runs as a dedicated user and group `mysql:mysql` and the data files of the database (`/var/lib/mysql/*`) belong to `mysql:mysql`.  
Note that the daemon executable and other static data and configuration files that are used but should not be modified by the daemon must not belong to the dedicated user; they should be owned by `root:root`, like most program and configuration files. This will prevent an attacker from affecting the process itself and/or the configuration.  
If you have a program that cannot be owned by root but must run with extra privileges, check [this answer](https://unix.stackexchange.com/a/29165) on Stack Exchange for a detailed explaination.

#### Prevent `root` access to SSH
One great example of a daemon to protect is SSH. By default, the root user is created as the first user on every Linux system. Since every Linux system has a root user, this is a universally known account to attack, especially against hackers who are trying to SSH into your server. Bad actors already know half the information they need (username) in order to access the most powerful account on the system.  
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

#### Changing default SSH Port
When connected to the internet, a server is reachable by malicious actors online. Exposing your system's SSH access to them is dangerous, so one common strategy is to obfuscate your SSH access by changing the default SSH port on the syetem. Malicious scripts online frequently check port 22, but it is much less common for them to test every single port on every single machine, this would simply be impractical. For this reason, changing the default SSH port is a solid security measure. To do it, change edit the SSH config using this command:
```
vi /etc/ssh/sshd_config
```
Find the commented line that specifies `port: 22`, and uncommonent it, replacing it with your desired port (try not to use some variation of 22, e.g. 222 or 2222). Next ensure that you open this port in your firewall if not already (assume the new default ssh port is 1111).
```
ufw allow 1111/tcp
```

#### Generate an SSH key pair
For a login method that is more secure than using a password, create an SSH key pair to use with the user that you previously created. These instructions work with any Linux distribution.
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

## Firewalls
On my Ubuntu server system, it's a smart idea to setup firewall rules. Firewall rules are applied to server ports. Each port can be opened or closed depending on whether you want traffic to flow through it, and each port can also enforce a set of rules (e.g. IP whitelists). Consider opening a port for applicatons like:
- SSH
- Web server
- FTP  

I'll be documenting firewall commands for Ubuntu [UFW](https://help.ubuntu.com/community/UFW).
To turn UFW on with the default set of rules:
```
sudo ufw enable
```
To enable traffic to port 22 (common for SSH), use
```
ufw allow 22/tcp
```
To check the status of UFW:
```
sudo ufw status verbose
```
The output should be like this:
```
youruser@yourcomputer:~$ sudo ufw status verbose
[sudo] password for youruser:
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing)
New profiles: skip
```