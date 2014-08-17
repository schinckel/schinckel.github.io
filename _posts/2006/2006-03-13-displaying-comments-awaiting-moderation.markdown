--- 
wordpress_id: 754
layout: post
title: Displaying Comments awaiting Moderation
time: "12:56:44"
date: 2006-03-13 12:56:44
tags: 
- blogsome
- php
wordpress_url: http://schinckel.net/2006/03/13/displaying-comments-awaiting-moderation/
---
It's a neato feature to be able to show a reader the comment they have just posted, but which is awaiting moderation before it it displayed to everyone else. Newer versions of Wordpress can do this, and many templates also have this feature built in, but it does not work on Blogsome. The code that grabs the Comment data is found, in Blogsome, in `wp-inst/wp-comments.php`: 
    
{% highlight php linenos %}
        $query = "SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND comment_approved = '1' ORDER BY comment_date";
        $comments = $wpdb->get_results( $query );
{% endhighlight %}
    

This code was fairly easy to find, but the equivalent code in Wordpress was a bit tricker. Eventually, I found it in `wp-includes/comment-functions.php`: 
    
{% highlight php linenos %}
        if ( is_single() || is_page() || $withcomments ) :
            $req = get_settings('require_name_email');
            $comment_author = isset($_COOKIE['comment_author_'.COOKIEHASH]) ? trim(stripslashes($_COOKIE['comment_author_'.COOKIEHASH])) : '';
            $comment_author_email = isset($_COOKIE['comment_author_email_'.COOKIEHASH]) ? trim(stripslashes($_COOKIE['comment_author_email_'.COOKIEHASH])) : '';
            $comment_author_url = isset($_COOKIE['comment_author_url_'.COOKIEHASH]) ? trim(stripslashes($_COOKIE['comment_author_url_'.COOKIEHASH])) : '';
        if ( empty($comment_author) ) {
            $comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND comment_approved = '1' ORDER BY comment_date");
        } else {
            $author_db = addslashes($comment_author);
            $email_db  = addslashes($comment_author_email);
            $comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND ( comment_approved = '1' OR ( comment_author = '$author_db' AND comment_author_email = '$email_db' AND comment_approved = '0' ) ) ORDER BY comment_date");
        }
{% endhighlight %}
    

I had to modify the code somewhat, but here is the code I have put on the private Blogsome test server: 
    
{% highlight php linenos %}
        $comment_author = isset($_COOKIE['comment_author_'.COOKIEHASH]) ? trim(stripslashes($_COOKIE['comment_author_'.COOKIEHASH])) : '';
        $comment_author_email = isset($_COOKIE['comment_author_email_'.COOKIEHASH]) ? trim(stripslashes($_COOKIE['comment_author_email_'.COOKIEHASH])) : '';
        $author_db = addslashes($comment_author);
        $email_db  = addslashes($comment_author_email);
        if ( empty($comment_author) ) {
            $query = "SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND comment_approved = '1' ORDER BY comment_date";
            $comments = $wpdb->get_results( $query );
        } else {
            $comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND ( comment_approved = '1' OR ( comment_author = '$author_db' AND comment_author_email = '$email_db' AND comment_approved = '0' ) ) ORDER BY comment_date");
            $comments = $wpdb->get_results( $query );
        }
{% endhighlight %}

It could probably be tweaked (for instance, moving the addslashes() calls to within the else block would save a couple of CPU cycles when no author is set), but it works!. You need to have the following in your Comments Template: 
    
{% highlight html+smarty linenos %}
    {if $comment->comment_approved == "0"}
        <p>Your Comment is awaiting Moderation.</p>
    {/if}
{% endhighlight %}
    

I'm also going to style the comment box a little differently for unmoderated comments. 
