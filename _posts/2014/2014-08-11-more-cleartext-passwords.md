---
date: 2014-08-11 22:45:00
layout: post
publish: true
tags: [security, plain-text]
title: More Cleartext Passwords
---


Update: I've since heard back from my health insurer. They are working to mitigate the risks outlined in the complaint below.

As such, and as an indicator of good faith on my behalf, I've removed links and mentions of them. Should they _not_ follow through, this post will be restored, and more venom added!

* * *

More plain-text-shenanigans.

I complained some time ago to my health insurer:

> I’m writing to complain again about your security practices.

> You clearly store passwords in plain text: evidenced by the fact that the password reset process sends me my _actual_ password, instead of doing a password reset, like every responsible company does.

> Given the recent spate of security breaches, you really should consider improving this.

I received the following reply:

> Dear Mr Schinckel,

>Thank you for your email. Your feedback regarding the security of our Online Member Services has been noted.

>Please rest assured that as a fund, we ensure that we adhere to the Privacy Act. The security of our members and their information is paramount to us, and systems operate in accordance with relevant legislation and guidelines. Our systems and processes are regularly reviewed and audited to ensure full adherence.

I didn't do anything about it, but the [email I received today](http://schinckel.net/2014/08/11/plain-text-bad-news/) made me think about it again.

So, here is the content of my complaint to them.

* * *

Consider this a formal complaint.

It also occurs to me that what you are claiming in your privacy policy is false.

[link to privacy policy, and content of privacy policy removed]

You clearly have not taken "reasonable steps to protect all personal information … from unauthorised access". A simple, very reasonable step would be to store only hashes of passwords, generated using a per-password salt, instead of storing passwords in clear text.

Your storage of passwords in clear text, and then the further sending of those over email, which is inherently not encrypted, means that _any_ administrator of any mail server between your server and the recipient would be able to view the username and password of a member, and masquerade as them.

Even if you encrypted passwords in a manner that means you were able to recover them, in order to send them over email, means that you are still open to attackers appropriating passwords, either in transit, or after gaining access to your systems. This includes having an encrypted database, or encrypted columns within the database.

You clearly have not ensured "that appropriate technical and organisational security measures, consistent with standard industry practice, are in place to attempt to safeguard the security…", as what your password recovery feature indicates, you are storing passwords in clear text. As a professional Web Developer, I can assure you this is not in line with best practices with regard to software development.

Your claim of non-responsibility "for any breach of security caused by third parties" is laughable, given that any attacker that gains access to your member database automatically has access to all details of all members, and can store passwords, and access those member’s details at any time in the future unless they change their passwords.

You state that "[redacted] does not use any form of encryption … to protect information a member sends from their computer … and emails". Did it not occur to you that the same is true of the reverse? That information you send over email is likewise not encrypted?


Claiming that your systems operate "in accordance with relevant legislation" is a cop-out. All it does is show that the legislation is out of date.


Please take my complaints seriously. Please fix your security.


Matt.