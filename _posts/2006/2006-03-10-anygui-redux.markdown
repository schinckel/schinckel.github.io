--- 
wordpress_id: 743
layout: post
title: Anygui Redux
time: "21:57:38"
date: 2006-03-10 21:57:38
tags: 
- python
wordpress_url: http://schinckel.net/2006/03/10/anygui-redux/
---
Years ago, I was involved in the development of Anygui, a GUI development wrapper designed for [python][1]. Basically, it was supposed to be like anydbm is for accessing database modules from python. That is, it was intended to make it into the standard library, and use the best GUI available from it's list on a given system. I was responsible for the BeOS components, using Donn Cave's excellent [Bethon ][2]package. Today, I noticed a referer in my backend from someone searching for PyMail on Google. I had a look on Google as to what else is found on this search, and came across a site with the following content (I've reformatted it, since the site was gone, and this is from the cache): 
    
{% highlight python linenos %}
    #!/usr/bin/env python
    #pyMail 0.1 
    #my first program with python and anygui interface 
    #coded by teknux ~ teknux@ustc.edu 
    #2002/11/4 
    #copyright 2002 under GPL
    
    from anygui import *
    import smtplib 
    from email.MIMEText import MIMEText 
    import sys as sys
    
    #edit these fields with your informations
    mail_sender = "teknux@localhost"
    mail_from = "teknux@localhost" 
    
    #initialize window 
    app = Application() 
    win = Window(title="pyMail 0.1",size=(460,385)) 
    app.add(win) 
    opt = Options(left=5, width=21, height=30) 
    banner = Label(size=(70,25), position=(385,10), text="pyMail 0.1") 
    to = Label(opt, text="To:") 
    to_text = TextField(size=(230,25)) 
    win.add((to,to_text), position=(0,10), direction="right", space=5) 
    win.add(banner) subject = Label(size=(51,25), text="Subject:") 
    subject_text = TextField(size=(398,25)) 
    win.add((subject,subject_text), position=(0,45), direction="right", space=5) 
    body = TextArea(size=(450,250)) 
    win.add(body, position=(5,80)) 
    btn_send = Button(left=5, size=(100,30), text="Send message") 
    btn_exit = Button(left=5, size=(100,30), text="Exit") 
    status = Label(size=(240,25), text="...status...") 
    win.add((btn_send,btn_exit,status), position=(5,350), space=6) 
    
    def statbar(stat_msg):
        status.text = stat_msg status.refresh() 
    
    def sendmail(**args): 
        msg = MIMEText(body.text) 
        msg["Subject"] = subject_text.text 
        msg["From"] = mail_from 
        msg["To"] = to_text.text 
        mail_to = to_text.text 
        mail = smtplib.SMTP() 
        statbar("connecting to SMTP") 
        mail.connect() 
        statbar("sendin message") 
        mail.sendmail(mail_sender, mail_to, msg.as_string()) 
        statbar("done")
        mail.close() 
        
    def exit(**args): 
        sys.exit(2) 
        
    link(btn_exit, exit) 
    link(btn_send, sendmail) 
    app.run()
{% endhighlight %}
    
    

I don't have Anygui anymore, and the old site appears to be gone, so I can't test this out! I do love the cleanliness of this system, however. It's almost as easy to create a UI in this as in Interface Builder. Amd the coolest thing from my perspective was that this was so easy to implement in BeOS/Bethon. I did write a few of the modules for Donn, and these two bits were probably the first bits of Open Source code I wrote, and that other people might have used. 

   [1]: http://www.python.org/
   [2]: http://www.drizzle.com/~donn/Bethon.html

