--- 
wordpress_id: 937
layout: post
title: autoTorrent.py
time: "22:06:05"
date: 2006-09-01 22:06:05
tags: 
- python
- nslu2
wordpress_url: http://schinckel.net/2006/09/01/autotorrentpy/
---
I've written a bit of code that works to automatically start any number of torrents placed into a specific directory. The way it's set up at the moment is that it will only start the next one on the list, and you need to call it iteratively to start all of them. That's mainly because on my NSLU2 I get some CPU usage issues if I start more than one at a time. Just have this script called every 5 mins or so in a crontab, and it will start every .torrent added to the source directory. `*/5 * * * * root /path/to/script/autoTorrent.py` I could make a resident version, that uses a `time.sleep()` to call the main function every 5 minutes. Then this could be added to the `/opt/etc/init-d/` directory. 
    
    
{% highlight python linenos %}
    #! /usr/bin/env python
    
    import os, time
    
    # Any .torrent file placed in $base/source will be downloaded.  
    # When it's complete, it will be moved from $base/work to $base/target
    
    base_dir = "/home/user/torrent"
    source_dir = os.path.join(base_dir,"source")
    target_dir = os.path.join(base_dir,"target")
    work_dir = os.path.join(base_dir,"work")
    
    torrent_cmd = "enhanced-ctorrent"
    torrent_args = "-S localhost:2780 >/dev/null &"
    
    def getTorrents(path):
        os.chdir(path)
        data = os.popen("ls -1 *.torrent").read()
        torrents = data.split("\n")[:-1]
        for i in range(len(torrents)):
            torrents[i] = os.path.join(path, torrents[i])
        return torrents
    
    def getNewTorrents(path, oldTorrents):
        allTorrents = getTorrents(path)
        newTorrents = []
        for each in allTorrents:
            if each not in oldTorrents:
                newTorrents.append(each)
        return newTorrents
    
    def startTorrent(torrent):
        os.chdir(work_dir)
        cmd = " ".join((torrent_cmd, os.path.join(source_dir,torrent), torrent_args))
        os.system(cmd)
        #print cmd
    
    def getRunningTorrents():
        # do'h, ps on nslu2 is broken.  Had to install procps.
        cmd = "ps axwwo command | grep enhanced"
        data = os.popen(cmd).readlines()
        runningTorrents = []
        for each in data:
            if each.split()[0] == "enhanced-ctorrent":
               runningTorrents.append(each.split()[1])
        return runningTorrents
    
    def startIdleTorrents():
        torrents = getNewTorrents(source_dir, getRunningTorrents())
    
        # since we get some CPU usage issues on starting several torrents at the same time, 
        # just start the first torrent in the list.  Then we can rely on the idea we'll
        # be called by a cron-job or something to start the next.
        
        startTorrent(torrents[0])
    
    if __name__ == "__main__":
       startIdleTorrents()
{% endhighlight %}
    
    
