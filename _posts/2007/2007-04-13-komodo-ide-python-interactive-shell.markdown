--- 
wordpress_id: 1126
layout: post
title: Komodo IDE Python Interactive Shell
time: "00:40:29"
date: 2007-04-13 00:40:29
tags: 
- python
- komodo
wordpress_url: http://schinckel.net/2007/04/13/komodo-ide-python-interactive-shell/
---
The python interactive shell on Komodo is pretty cool. I'd like it to be a bit more responsive, but I can't really put my finger on what's going on. I did notice, with python 2.5 that it pops up this traceback on a Ctrl-D: 
    
{% highlight pytb linenos %}
    Traceback (most recent call last):
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/bin/pydbgp", line 270, in <module>
        sys.exit( main(sys.argv) )
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/bin/pydbgp", line 264, in main
        client.runInteractive()
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/pythonlib/dbgp/client.py", line 1893, in runInteractive
        self.cmdloop()
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/pythonlib/dbgp/client.py", line 2025, in cmdloop
        self.onecmd(data)
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/pythonlib/dbgp/client.py", line 2145, in onecmd
        self.socket.send_response(str(ex))
      File "/Applications/Komodo IDE.app/Contents/SharedSupport/dbgp/pythonlib/dbgp/client.py", line 1745, in send_response
        self._socket.send('%d\0%s\0' % (l, response))
    AttributeError: 'NoneType' object has no attribute 'send'
{% endhighlight %}
