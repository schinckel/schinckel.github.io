--- 
wordpress_id: 1656
layout: post
title: Patch for Mercurial.tmbundle
time: "11:40:24"
date: 2009-04-27 11:40:24
tags: 
- general
- mercurial
- textmate
wordpress_url: http://schinckel.net/2009/04/27/patch-for-mercurialtmbundle/
---
{% highlight diff linenos %}
diff -r 5e13047a2284 Support/hg_commit.rb
    --- a/Support/hg_commit.rb	Mon Apr 27 11:38:15 2009 +0930
    +++ b/Support/hg_commit.rb	Mon Apr 27 11:39:00 2009 +0930
    @@ -79,7 +79,7 @@
       commit_paths_array = matches_to_paths(commit_matches)
       commit_status = matches_to_status(commit_matches).join(":")
       commit_path_text = commit_paths_array.collect{|path| path.quote_filename_for_shell }.join(" ")
    -  commit_args = %x{"#{commit_tool}" --status #{commit_status} #{commit_path_text} }
    +  commit_args = %x{"#{commit_tool}" --diff-cmd hg,diff --status #{commit_status} #{commit_path_text} }
     
       status = $CHILD_STATUS
       if status != 0
    
{% endhighlight %}
