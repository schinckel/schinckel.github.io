--- 
wordpress_id: 1586
layout: post
title: Personal Password Management
time: "11:22:56"
date: 2008-11-14 11:22:56
tags: 
- general
- security
- passwords
wordpress_url: http://schinckel.net/2008/11/14/personal-password-management/
---
(*Note* This is an essay I wrote for a subject at Uni. It doesn't really draw any conclusions, because I don't think there is a solution to the problem of passwords, just yet!)

**OpenID, Biometrics and Passwords in the age of Internet Everywhere**

> "The best passwords are random sequences of symbols..."

The first computer systems had no need for security. Physical security was enough of a barrier. Indeed, the only truly secure systems today are not connected to the rest of the world, and have physical security measures in place to prevent access. Even the early generations of shared systems didn’t have passwords - it was just accepted that you wouldn’t look at data you weren’t supposed to, and the idea you might damage a system deliberately, well...

Obviously, those utopian days are past. Identity theft is a serious issue, and so is data theft. Passwords no longer protect just email, and being able to pretend you are someone you aren’t, but now passwords are used to get access to our finances. It takes only seconds for a disclosed banking password to result in all of a victim’s accounts being cleaned out.

Passwords are an obvious method of only allowing authorised users to access information or a system. By tying a username and password to a user’s “identity”, it suddenly becomes possible to allow access from anywhere in the world, safe in the knowledge that the access will not be misused, or if it is there will be a record of who accessed which data when.

But passwords are seriously flawed. To begin with, once a user’s password is compromised, the intruder, for all intents and purposes, _is_ that person. Putting this fact aside, passwords are still in much greater use than two-factor authentication methods, or any others available. Why? Simply because it is easy to store passwords. It is easy to enter them, with no special hardware required. And people are used to the idea of a password.

Another serious issue with passwords is that it is often very easy to guess a user’s password. A user may set their password to a pet or partner’s name, or a date that means something. Even if they choose a random dictionary word, it may be possible to use a brute-force method of guessing that password that can result in entry being obtained in a very short period of time. A further issue is that a user may use the same password (and perhaps even the same username) across a series of locations. An intruder need only discover the password on one site, and instantly they have access to several aspects of the victim’s identity. All of a sudden, it becomes hard to prove that the attacker is an attacker, and not the person who’s identity they have stolen.

So, the first way to “fix” passwords is to have a password that is made of totally random characters. Ideally, these characters should encompass both lower and upper case, numbers and symbols. For a password to be easily entered, the characters should all be easily typed in using a keyboard. Non-printable characters may make a good password from the security aspect, but they aren’t that useful from a user’s perspective.

But having random characters also means that the password is harder to memorise. Personally, I find that once a password has been typed in enough times it becomes muscle memory, rather than memorising the actual password, but it needs to be memorable to the extend that the muscle memory can be created. Several schemes have been used to make psuedo-words that are pronounceable, yet not dictionary words. Some examples of these can be seen below.

  * `DuenTr31`
  * `eNtaNs74`
  * `fablis86`
  * `LolvAR47`
  * `cArbEL30`
  * `ulawle83`

As can be seen, these words can all be pronounced. It would not take too much mental effort to memorise these words in order to use them for a password. Compare these to the following unpronounceable, yet more secure passwords:

  * `ZAy#km8*`
  * `gqVaw7#`
  * `gXTrUttf`
  * `rku7#xe`
  * `h9N#Ng`
  * `cjG-_56`

So, that’s the first problem solved. Create a different, secure password for each system or account you need to access. Of course, in reality, things are not quite so cut and dried. A system I access every day will quickly store its password in my muscle memory, but one I only access a handful of times per year, or worse yet, a site I hope I never need to access again, but may several years into the future? How can a regular person be supposed to remember all of these usernames and passwords?

And this problem is just compounded when sites and systems implement a “password freshness” system, where a password must be changed after a certain amount of time. This means that should an attacker obtain a list of encrypted passwords (since we don’t store passwords in plain text), then hopefully the users will have all changed their passwords by the time they brute-force the passwords. But it still just creates a huge cognitive load upon the user to generate and remember many, many passwords.

The solution I use, as a security conscious individual is to generate passwords as needed, and store them in a “Keychain”, which some Mac OS X includes as part of the core operating system. Applications can apply for access to a particular keychain username/password combination, which the user can then approve on a one-off basis, or every time the program requires the credentials. This works out as a highly secure, yet convenient method of protecting my identity. Besides, most of the sites I access are not on their own that “important”, other than my banking and email sites. To me, the biggest advantage is that the passwords I use at each site are different, and one of these being discovered does not make the remainder of my passwords compromised.

But it is not flawless. It works for me, because I store all of the passwords on virtually the only machine I use, my laptop. If an attacker was able to compromise my laptop, then they would (possible) obtain access to all of my passwords, as well as all of the other data on there. Encryption and personal laptop security can ameliorate this threat somewhat, but the danger still exists.

The other issue is that without the laptop, or at the very least access to the Keychain from some outside source, I do not know the passwords to all of these systems and sites. With a broken machine, I am no longer a first-class member of the digital community. Instead I am limited to sites that I know the passwords for, which are few and far between.

As soon as passwords are implemented as an authorisation system, some method of allowing people who cannot remember their passwords is usually implemented next. This is increasingly becoming a less secure situation, as was recently demonstrated in the lead-up to the US Elections (2008). With the increasing amount of information available about most people “on the internet”, questions that are often used as password reminders are often answered by information that can be searched for easily. A high profile person like Sarah Palin has a huge amount of information about them on a variety of websites, and one enterprising malefactor discovered that all of the information required to answer all of the secret questions on her email account was available.

The main alternative to Secret Questions involves the use of a link to reset a password, often which is sent via email. Email itself is somewhat insecure, without other protection in place, and it assumes the user has a valid email address.

The main software-only alternative to a password is a token-based approach. If you have a particular file, then that “proves” you are the person who owns that file. Clearly, this has the same implications about theft of that file or token that a password does. However, it has some other interesting aspects that are worth discussing.

The software token based system owes a large part of its efficacy and security to the discovery of Public Key cryptography, and the fact that some mathematical operations are easy to do in one direction, but extremely difficult to reverse. An example of this is that it is easy to multiply a group of prime numbers, but significantly harder to factorise the result.

Public Key cryptography relies on the asymmetry of operations, and uses a pair of matched keys. One of these is the private key, which must never be shared with others. The other is the public key, which is freely available. Typically, PK cryptography has been used to allow for secure message transmission, where a user encrypts a message using the public key, and only the holder of the private key can decrypt it. Similarly, the holder of a private key can encrypt a message, and then another user can use the public key to decrypt it, “proving” the private key holder sent the message. This process is called signing. An analogous process to signing can be used by a pair of keys located on different machines to allow for a user to log in seamlessly, without the need of a password. This is often used in Unix based machines to have SSH passwordless login, but is not generally suitable for general user consumption!

The whole Public Key infrastructure effectively sits on a house of cards, effectively. I can generate a key-pair, very simply, and say that these keys were created by any person I choose. For instance, I could create keys that looked like they were created by Barack Obama, and if anyone used the public key, they would (a) think they had encrypted messages for Obama’s eyes only, and (b) think that messages coming from me had come from Obama.

Clearly, what is needed is some sort of a process for indicating that keys are actually created by who they look like they are created by. Thawte, amongst other Certification Authorities, have built big business on just this idea. People and companies must pay to create certificates (or keys) saying who they are, and in theory the only way to get a certificate is to prove in the real world that that is indeed who you are.

Another token-based approach is to use a physical token. Several financial institutions have implemented systems where an account holder has not only a password, but also a device that has a number generator tied to an oscillator, the algorithm of which is also held at the server end. The clocks are deemed to be in sync, and when a login request is generated, it must also include the current number. The login server will only accept a request if it includes both the user’s password and the valid number.

The token aspect of these systems is intriguing, but is limited in the same way of a password or software token. Someone needs only to steal the token and they are granted access, and these types of systems are also vulnerable to a “man-in-the-middle” type phishing attack. Including a password (so-called two-factor authentication) slightly improves the security. It means that instead of just being “something you know”, or “something you have”, all of a sudden the attacker must have both of these.

The final word regarding security includes the third something: “something you are”. Biometric measures of identity assurance take a personal attribute, such as a scan of the retina, a fingerprint or some other aspect of “person-ness”, and compare this to a stored value. Early biometric systems used voice recognition, but until quite recently they were restricted to installation at physical locations, due mainly to cost. Recent developments have resulted in fingerprint scanners on laptops, amongst other things.

Having a biometric scanning device in a physical location is very good for preventing physical access. Several issues start to arise when you take the scanning device and place it in an insecure location. The first is that it suddenly becomes possible to do things like playing back a recording of a voiceprint, or holding a high resolution photograph of a face up to a camera. Hollywood

has also shown us that latent prints left on a fingerprint scanner can be turned into a fake finger, to bypass that aspect of biometrics. Even stealing someone’s retina is apparently enough to trick the sensor.

But these don’t even come close to the real potential of bypassing the security. If the raw data is sent by the sensor to the authentication server, then that raw data could be spoofed by a malicious person. If the scanner does the authentication too, then a device could be created which just passes a message that authentication was successful.

Biometrics are still expensive, still somewhat error prone, and not all that satisfying. So where does that leave us?

Authentication is an important problem. Passwords are fine when we only have one or two. But they don’t work when we have many, or we take shortcuts and use insecure passwords.

But what if we “outsource” the authentication? Increasingly, many websites and web-applications are moving away from a password-based login, to one using OpenID. OpenID is an open system that allows for identity to be “proven” without having to store or remember a whole stack of different passwords. To quote the OpenID website: “_For geeks, OpenID is an open, decentralized, free framework for user-centric digital identity.”_ It allows for technical users to “host” their own identity, and other users to use an OpenID provider to claim their identity, content and online persona.

OpenID is not a panacea. It still falls ill to the trust issue - I can have an OpenID and name it after anyone I want - but it does allow for me as an online citizen to say that each of these items of content were all created by the same person. At this stage OpenID seems limited to things like blogs and discussion boards, but at this stage, it seems unlikely to be secure enough to work as authentication for “real” systems such as banks.

Interestingly, the biggest feature of OpenID is also it’s biggest security risk: if your OpenID was compromised, then the attacker automatically gets access to all of the sites that use OpenID, without having to actually remember or enter the password! It’s like having used the same password in each case, only worse!

Passwords will stay with us, at least for the foreseeable future. The best we can do is hope that other Operating Systems will provide us with tools to help the user create and store multiple, secure passwords. A system to replace passwords will only work if users feel comfortable with it, and if it is more secure than passwords. At this stage, none of the potential solutions look like they check all of the boxes.

### Bibliography

  1. Attwood, Jeff (2008), _Coding Horror: OpenID: Does The World Really Need Yet Another Username and Password?_, [http://www.codinghorror.com/blog/archives/001121.html][1] \[accessed on 14/11/2008\].
  2. Lange-Hegermann, Stefan (2007), _SourceBricks Software - QuickPass_, [http://www.sourcebricks.com/page/quickpass.html?qpabout=true][2], \[accessed on 11/11/2008\].
  3. Lucas, Ivan (2007), _Password Recovery Speeds_, [http://www.lockdown.co.uk/?pg=combi&s=articles][3] \[accessed on 14/11/2008\].
  4. Luitjen, Erik, (2002), _Password-less login with ssh_, [http://ariadne.mse.uiuc.edu/Cluster/ssh_log_through.html][4] \[accessed on 11/11/2008\].
  5. OpenID Foundation, (2008), _OpenID » What is OpenID?_, [http://openid.net/what/][5], \[accessed on 11/11/2008\].
  6. Schneier, Bruce (2006), _Microsoft Anti-Phishing and Small Businesses_, [http://www.schneier.com/blog/archives/2006/12/microsoft_antip.html][6] \[accessed on 14/11/2008\].
  7. Schneier, Bruce (2006), _Schneier on Security: Real-World Passwords_, [http://www.schneier.com/blog/archives/2006/12/realworld_passw.html][7] \[accessed on 14/11/2008\].
  8. Schneier, Bruce (2006), _The Failure of Two-Factor Authentication_, [http://www.schneier.com/blog/archives/2005/03/the_failure_of.html][8] \[accessed on 14/11/2008\].
  9. Thawte, Inc (2008), _thawte - buy SSL certificates from thawte_, [https://www.thawte.com/ssl-digital-certificates/buy-ssl-certificates/index.html?click=main-nav-buy][9] \[accessed on 14/11/2008\].
  10. Zetter, K, (2008) _Palin E-Mail Hacker Says It Was Easy_, [http://blog.wired.com/27bstroke6/2008/09/palin-e-mail-ha.html][10], \[accessed on 11/11/2008\].

   [1]: http://www.codinghorror.com/blog/archives/001121.html
   [2]: http://www.sourcebricks.com/page/quickpass.html?qpabout=true
   [3]: http://www.lockdown.co.uk/?pg=combi&s=articles
   [4]: http://ariadne.mse.uiuc.edu/Cluster/ssh_log_through.html
   [5]: http://openid.net/what/
   [6]: http://www.schneier.com/blog/archives/2006/12/microsoft_antip.html
   [7]: http://www.schneier.com/blog/archives/2006/12/realworld_passw.html
   [8]: http://www.schneier.com/blog/archives/2005/03/the_failure_of.html
   [9]: https://www.thawte.com/ssl-digital-certificates/buy-ssl-certificates/index.html?click=main-nav-buy
   [10]: http://blog.wired.com/27bstroke6/2008/09/palin-e-mail-ha.html

