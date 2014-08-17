--- 
wordpress_id: 1164
layout: post
title: Enable Concurrent Sessions on XP
time: "21:17:35"
date: 2007-06-10 21:17:35
tags: 
- software
wordpress_url: http://schinckel.net/2007/06/10/enable-concurrent-sessions-on-xp/
---
  1. Open Registry Editor (Start, Run, regedit).
  2. Navigate to: `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control \TerminalServer\Licensing Core`.
  3. Create a new `REG_DWORD` value named `EnableConcurrentSessions`.
  4. Set the value to `1`.
  5. Exit the editor.

(via joe boy) 
