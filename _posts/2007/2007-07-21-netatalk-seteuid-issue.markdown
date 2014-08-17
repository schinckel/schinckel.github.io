--- 
wordpress_id: 1213
layout: post
title: netatalk seteuid issue
time: "22:27:05"
date: 2007-07-21 22:27:05
tags: 
- linux
wordpress_url: http://schinckel.net/2007/07/21/netatalk-seteuid-issue/
---
I'm having one small issue with netatalk. Every now and then I can no longer connect to the server, and I am seeing the following in `/var/log/syslog`: 
    
    Jul 21 21:25:49 localhost afpd[3345]: server_child[1] 19040 exited 1
    Jul 21 21:25:49 localhost afpd[19041]: ASIP session:548(5) from 192.168.1.76:50047(7)
    Jul 21 21:25:49 localhost afpd[3345]: server_child[1] 19041 done
    Jul 21 21:25:51 localhost afpd[3686]: Warning: No CNID scheme for volume /home/installers. Using default.
    Jul 21 21:25:51 localhost afpd[3686]: seteuid failed Operation not permitted
    Jul 21 21:25:51 localhost afpd[3686]: Fatal error: cannot open CNID or invalid CNID backend for /home/installers: cdb

Restarting netatalk fixes the issue immediately. I have no idea what this problem means. It seems to happen after the server has been up for a while. The log from a successful connect looks more like: 
    
    Jul 21 21:46:54 localhost afpd[19109]: server_child[1] 19889 exited 1
    Jul 21 21:46:54 localhost afpd[19890]: ASIP session:548(5) from 192.168.1.76:50066(7)
    Jul 21 21:46:54 localhost afpd[19109]: server_child[1] 19890 done
    Jul 21 21:46:56 localhost afpd[19120]: Warning: No CNID scheme for volume /home/media/music. Using default.
    Jul 21 21:46:56 localhost afpd[19120]: Setting uid/gid to 1001/1001
    Jul 21 21:46:56 localhost afpd[19120]: ipc_write: command: 2, pid: 19120, msglen: 24
    Jul 21 21:46:56 localhost afpd[19109]: ipc_read: command: 2, pid: 19120, len: 24
    Jul 21 21:46:56 localhost afpd[19109]: Setting clientid (len 16) for 19120, boottime 46A193BC
    Jul 21 21:46:56 localhost afpd[19109]: ipc_get_session: len: 24, idlen 16, time 46a193bc

But the uid/gid isn't always the same. It appears to depend on the permissions of the share. I wonder if I need to change a setting in the `netatalk` settings so it doesn't require the `seteuid`. 
