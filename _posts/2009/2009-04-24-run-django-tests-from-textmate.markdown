--- 
wordpress_id: 1652
layout: post
title: Run Django Tests from TextMate
time: "17:58:40"
date: 2009-04-24 17:58:40
tags: 
- general
- testing
- textmate
- django
wordpress_url: http://schinckel.net/2009/04/24/run-django-tests-from-textmate/
---
It would be cool to be able to run my Django tests from within TextMate.

Update: this version will run just the tests from the active file, if there are any. Otherwise, it runs all of the tests in the whole project.

Here is a Command to do just that:
    
{% highlight ruby linenos %}
    #! /usr/bin/env ruby
    
    command = [ENV["TM_PYTHON"] || "python", "-u", "#{ENV['TM_PROJECT_DIRECTORY']}/manage.py", "test", "--noinput"]
    
    File.open(ENV['TM_FILEPATH']) do |f|
      f.readlines.each do |line|
        if line =~ /class (.*)\(.*TestCase\):/
          test_case = $1
          app_name = ENV['TM_FILEPATH'].split(ENV['TM_PROJECT_DIRECTORY'])[1].split('/')[1]
          test_name = "#{app_name}.#{test_case}"
          command << test_name
        end
      end
    end
    
    require ENV["TM_SUPPORT_PATH"] + "/lib/tm/executor"
    
    ENV["PYTHONPATH"] = ENV["TM_BUNDLE_SUPPORT"] + (ENV.has_key?("PYTHONPATH") ? ":" + ENV["PYTHONPATH"] : "")
    
    TextMate::Executor.run(command) do |str, type|
      if type == :err
        if str =~ /\A[\.EF]*\Z/
          str.gsub!(/(\.)/, "<span class=\"test ok\">\\1</span>")
          str.gsub!(/(E|F)/, "<span class=\"test fail\">\\1</span>")
          str + "<br/>\n"
        elsif str =~ /\A(FAILED.*)\Z/
          "<div class=\"test fail\">#{htmlize $1}</div>\n"
        elsif str =~ /\A(OK.*)\Z/
          "<div class=\"test ok\">#{htmlize $1}</div>\n"
        elsif str =~ /^(\s+)File "(.+)", line (\d+), in (.*)/
          indent = $1
          file   = $2
          line   = $3
          method = $4
          indent += " " if file.sub!(/^\"(.*)\"/,"\1")
          url = "&url=file://" + e_url(file)
          display_name = file.split('/').last 
          "#{htmlize(indent)}<a class=\"near\" href=\"txmt://open?line=#{line + url}\">" +
            (method ? "method #{method}" : "<em>at top level</em>") +
            "</a> in <strong>#{display_name}</strong> at line #{line}<br/>\n"
        end
      end
    end
{% endhighlight %}
    
