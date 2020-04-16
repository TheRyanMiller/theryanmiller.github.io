---
layout: post
title: Creating your own Certificate Authority
author: Ryan Miller
comments: true
tags:
- openssl
- Git Bash
- Certificate Authority
- TLS certs
---

### Starting Create React App with HTTPS enabled
it is possible to force Create React App projects to encrypt traffic by enforcing HTTPS. On Windows, this can be done by updating your `start` script in `package.json` to the following:  

`"start": "set HTTPS=true&&react-scripts start",`  
<br />
The scripts block in your package.json file should look like this.
<br />  
<div style="text-align:center"><img src="/static/img/blogimages/reactscripts.PNG" /><p style="width:450px; text-align:center; margin: auto"></p></div>
<br />  

This is effectively enabling HTTPS before kicking off your webpack start script. This will cause webpack create a certificate and load it into your webpack-dev-server ssl directory: `./node_modules/webpack-dev-server/ssl`.

Now, go ahead restart your React app and then navigate to it in your browser (this time making sure to prepend https, e.g. `https:/localhost:3000`). What do you see?
  
<br />  
<div style="text-align:center"><img src="/static/img/blogimages/invalidcert.PNG" /><p style="width:450px; text-align:center; margin: auto"></p></div>
<br />  

Like me, you probably got the same "Not Secure" error in your address bar noting that your connection is insecure. This is because even though webpack is passing the `server.pem` certificate it generated to your web browser, your web browser does not trust it because it is self-signed, and not signed by a trust CA.


### Creating your own Certificate Authority
For a local development environment, setting up your own  Certificate Authority is not always necessary. But HTTPS is not always necessary. But I'm interested

<div style="text-align:center"><img src="/static/img/blogimages/csr-to-ca-flow.PNG" /><p style="width:450px; text-align:center; margin: auto"></p></div>

https://jamielinux.com/docs/openssl-certificate-authority/sign-server-and-client-certificates.html

#### Cert must match common name
https://support.dnsimple.com/articles/what-is-common-name/
Chrome requires Subject Alt Name:
  
1. https://superuser.com/questions/1202498/create-self-signed-certificate-with-subjectaltname-to-fix-missing-subjectaltnam  

2. https://alexanderzeitler.com/articles/Fixing-Chrome-missing_subjectAltName-selfsigned-cert-openssl/

##### Create signing request  

```
winpty openssl req -config openssl.cnf  -key private/localhost.pem -new -sha256 -out csr/localhost.csr -extfile v3.ext
```

##### Sign cert request

```
winpty openssl ca -config openssl.cnf -extensions server_cert -days 100 -notext -md sha256 -in csr/localhost.csr -out certs/localhost.pem -extfile v3.ext

```



#### Sign dev server cert

C:\Users\rmill\Documents\Code\crypto-bot\client\node_modules\webpack-dev-server\ssl

#### Verify
winpty openssl verify -CAfile certs/ca.cert.pem -untrusted certs/crypto-bot-client.csr.pem
