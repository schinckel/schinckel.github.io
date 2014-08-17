--- 
wordpress_id: 521
layout: post
title: XMLRPC Escaped Quotes
time: "21:39:00"
date: 2005-10-25 21:39:00
tags: 
- blogsome
- php
wordpress_url: http://schinckel.net/2005/10/25/xmlrpc-escaped-quotes/
---
For some time, since the XMLRPC file was updated, posting to Blogsome via the XMLRPC interface has been broken. It works, but extraneous slashes are inserted before quotes and apostrophes. I've been lucky enough to get my dirty little mitts on the source code, on a test server, and have come up with what may be a fix.  The good folks at Blogsome (I think) replaced the dodgy, broken version of XMLRPC.php with one that prevented some problems with a security hole. However, this version of the file came from a more recent WordPress installation. The version of WP-Âµ that Blogsome uses may not have actually been vulnerable to the problem that the XMLRPC file could have caused, because of this code: 
    
{% highlight php linenos %}
        // Do some escapes for safety
        $post_title = $wpdb->escape($post_title);
        $post_name = sanitize_title($post_title);
        $post_excerpt = $wpdb->escape($post_excerpt);
        $post_content = $wpdb->escape($post_content);
        $post_author = (int) $post_author;
{% endhighlight %}
    

However, the new XMLRPC file also escapes everything. So everything gets escaped twice, causing the quotes to be double-escaped. So, I replaced the above code with the code from the new version: 
    
{% highlight php linenos %}
        // Get the basics.
        $post_content    = apply_filters('content_save_pre',   $post_content);
        $post_excerpt    = apply_filters('excerpt_save_pre',   $post_excerpt);
        $post_title      = apply_filters('title_save_pre',     $post_title);
        $post_category   = apply_filters('category_save_pre',  $post_category);
        $post_status     = apply_filters('status_save_pre',    $post_status);
        $post_name       = apply_filters('name_save_pre',      $post_name);
        $comment_status  = apply_filters('comment_status_pre', $comment_status);
        $ping_status     = apply_filters('ping_status_pre',    $ping_status);
{% endhighlight %}
    

My test blog (which isn't available to the public, as it's on another server) seems to be coping well with this, I think I'll publish a heap of entries to it and see how it holds up. I'm hoping that Ronan will be able to have a look over these changes, and hopefully we'll see the Quote Escape bug gone, for good, very soon! **Update:** Apparently I didn't do enough checking. The filters that are called don't actually exist, so no escaping is done. That will teach me for going off half cocked. I will try to implement the new filters used by this version of the code, but we'll see. 
