--- 
wordpress_id: 1196
layout: post
title: Move to NearlyFreeSpeech nearly complete.
time: "15:00:25"
date: 2007-07-14 15:00:25
tags: 
- blogging
- php
wordpress_url: http://schinckel.net/2007/07/14/move-to-nearlyfreespeech-nearly-complete/
---
Well, I've moved over from Blogsome to NearlyFreeSpeech.net It's very cool, and looks to be pretty cheap. I might have a high bandwidth bill for the last two days as I had to keep uploading SQL dump files (much faster than editing using nano over ssh!). When I imported all of my comments, the posts weren't updated with the number of comments they each had, so I needed to run the following PHP script: 
    
{% highlight php linenos %}
    <?php  
    require_once('admin.php');  
    
    echo "Approving comments...";  
    
    // Approve all comments  
    
    $wpdb->query("UPDATE $wpdb->comments SET comment_approved = '1'");  
    
    echo "Updating post counts...";  
    
    // Populate comment_count field of posts table  
    
    $comments = $wpdb->get_results( "SELECT comment_post_ID, COUNT(*) as c FROM $wpdb->comments WHERE comment_approved = '1' GROUP BY comment_post_ID" );  
    
    if( is_array( $comments ) ) {  
    
    foreach ($comments as $comment) {  
    
    $wpdb->query( "UPDATE $wpdb->posts SET comment_count = $comment->c WHERE ID = '$comment->comment_post_ID'" );  
    
    }  
    
    }  
    
    echo "Done.";  
    
    ?>
{% endhighlight %}
