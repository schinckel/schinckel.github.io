--- 
wordpress_id: 1654
layout: post
title: Run Prolog Program
time: "20:35:34"
date: 2009-04-26 20:35:34
tags: 
- general
- prolog
- textmate
wordpress_url: http://schinckel.net/2009/04/26/run-prolog-program/
---
In the continuing effort to do 'productive' tasks, but not actually the project I am supposed to be working on, I present a TextMate command to run the current prolog file, with nice HTML output, and input via a dialog box.
    
{% highlight ruby linenos %}
    #! /usr/bin/env ruby
    
    require ENV["TM_SUPPORT_PATH"] + "/lib/tm/executor"
    
    command = [ENV["TM_PROLOG"] || "swipl", "-s", ENV["TM_FILEPATH"]]
    two_line = false
    
    welcome = /^(Welcome to SWI-Prolog)|(Copyright )|(SWI-Prolog comes with)|(and you are welcome)|(Please visit)|(For help, use)/
    
    TextMate::Executor.run(command) do |str, type|
      if type == :err
        if two_line
          two_line = false
          # this line is part of the previous message
          "#{str}</div>"
        # Is this a warning line?
        elsif str =~ /(Warning):\s(.*):(\d+):/
          warn, file, line = $1, $2, $3
          filename = file.split('/')[-1]
          two_line = true
          file_link = "<a class=\"near\" href=\"txmt://open?line=#{line}&url=file://#{file}\">#{filename}</a>"
          "<div class=\"#{warn}\">#{warn}: #{file_link}, line #{line}:"
        elsif str =~ /(ERROR):\s(.*):(\d+):(\d+):\s(.*)/
          file, line, char, message = $2, $3, $4, $5
          filename = file.split('/')[-1]
          file_link = "<a class=\"near\" href=\"txmt://open?line=#{line}&column=#{char}&url=file://#{file}\">#{filename}</a>"
          "<div class=\"err\">ERROR: #{file_link}, line #{line}, col #{char}: #{message}</div>"
        elsif str =~ /ERROR:\s(.*)/
          message = $1
          "<div class=\"test fail\">ERROR: #{message}</div>"
        elsif str =~ /%\s(.*)\scompiled\s(.*)\ssec,\s(.*)\sbytes/
          file, time, length = $1, $2, $3
          filename = file.split('/')[-1]
          file_link = "<a class=\"near\" href=\"txmt://open?url=file://#{file}\">#{filename}</a>"
          "<div class=\"test ok\"> #{file_link} (#{length} bytes) compiled in #{time} sec.</div>"
        elsif str =~ welcome
          "<span class=\"copyright\" style=\"font-size:xx-small;\">#{str}</span> "
        else
          "<div class=\"output\">#{str}</div>"
        end
      else
        "<div class=\"output\">#{str}</div>"
      end
    end
{% endhighlight %}
    
