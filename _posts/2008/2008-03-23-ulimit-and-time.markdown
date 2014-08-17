--- 
wordpress_id: 1383
layout: post
title: ulimit and time
time: "08:53:47"
date: 2008-03-23 08:53:47
tags: 
- python
- programming
wordpress_url: http://schinckel.net/2008/03/23/ulimit-and-time/
---
For a Uni project, I have to write the same algorithm different ways, and in different programming paradigms. I also need to collect data on the execution of said programs. Since some algorithms may run in large time on large data sets, I need to stop execution after 30 minutes of run time. And, since there needs to be between 50 and 64 runs of each data size, I wanted to automate the process.

Using the ``$ time `other-command` `` is the most obvious way to time execution of any command line application on any decent operating system. However, the time that comes with OS X is somewhat limited - from the man page:

**NAME**  


**time** -- time command execution

**SYNOPSIS**  


**time** \[-**lp**\] utility

It only has two options, and they aren't that useful. However, it is possible to use this command to time execution.

Because it outputs it's timings to stderr, then you need to do some tricky python to capture it and save it to a file. I used `sys.popen3()`, and then read from the stderr stream. Which worked okay, but there isn't really a way to stop execution after a certain time frame. You can try to use `TimeoutFunctionException` - which I can't remember where I got it from, but it's cool. It doesn't work in this case, since the `sys.popenX` calls run in a sub-process, and thus continue to run after the exception is raised. Fail.

About this time in my thought process, I came across a better time. GNU time allows you to select the output format (excellent, no need to parse the output quite so much!), and to output to a file instead of stderr/stdout (even better). It also allows to append to a file instead of overwriting, and some other cool stuff.

But it doesn't solve the issue of commands running too long. This was a killer, since the process continues to run, but worse than this, new processes are started. So the machine clogs to a virtual halt.

Then I came across `ulimit`. This handy tool can limit the resources a user or process is able to use.

`$ ulimit -t X; time -f %U -a -o {DATAFILE} {COMMAND} {ARGS} `  


This command will limit a command to X seconds (or slightly less, since the time command itself uses some time. It will then execute COMMAND, with arguments ARGS, and time the execution, appending the run time only, on a seperate line, to the file DATAFILE.

Note that this is no excuse for not using code profiling. I have already run `profile.run()` on my code to work out where the slowdowns are in the python versions, and then optimised them. This is more like the last phase, actual comparisons.
