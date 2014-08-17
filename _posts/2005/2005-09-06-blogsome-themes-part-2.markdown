--- 
wordpress_id: 404
layout: post
title: Blogsome Themes, Part 2.
time: "12:54:18"
date: 2005-09-06 12:54:18
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/09/06/blogsome-themes-part-2/
---
In the last post in this series, we learned how to upload images, and modify the StyleSheet so that these images were referenced by that. What we need to do now is to start putting the rest of the files into the right places. Before we can do this, we need to learn two things: 

  * How the WordPress Template system and Loop 'work'.
  * How Smarty Tags are created from a PHP function call.

We might start with the second one, just to be creative! 

### Smarty and PHP

PHP is a language used mainly in web page design and layout. It provides the ability to have complex, dynamic pages that are generated on-the-go. It is, however, a fully fledged language, and if someone has unfettered access to it on a server, they could do stuff that could bring the whole server down. This is usually not a problem for a blog, where you host your own server, or pay someone to host it for you. However, services that offer free blog hosting are perhaps more likely to be targetted, perhaps accidentally, perhaps deliberately, bu badly formed or malicious PHP code. Smarty Tags are a way to get around this. Basically, it's a different way to write PHP code, designed to be used in template files. The syntax is very simple to understand: mostly you'll come across things such as `{bloginfo show='description'}`. This was the last thing in my clipboard, it would, when placed in a template, display the Description (or Tagline, as Blogsome calls it) in the page. The first thing you'll notice is that it is wrapped in curly brackets. Any Smarty Code must be wrapped in these for it to be interpreted: otherwise it will just be displayed as text. The second notable part is the function name. In this case, `bloginfo`. You can almost always find out more about a function call from the WordPress Codex. The final part is the argument. In this example, there is one argument, called `show`, with the value `'description'`. This is where Smarty and PHP diverge: Smarty parameters or arguments must be named. Most of the pages in the Codex on Template Tags will give you a list of the arguments and their possible values. Lets see a couple more examples: One tag you will certainly need to use in your template is [the_content][1]. This will insert the text from an entry into the page. According to the Codex, it's form is: 
    
{% highlight php linenos %}
    <?php the_content('more_link_text', strip_teaser, 'more_file'); ?>
{% endhighlight %}

Now, because we are going to be using Smarty, we can make it look much nicer. The simplest version will be: `{the_content}` But, if we want to change the <!--more--> text, we'll need to pass a value to the more_link_text argument: `{the_content more_link_text='<BR /><BR />Read More'` (Two line breaks, followed by the text Read Moreâ€¦ will appear whenever the <!--more--> quicktag is used in any entry: this will only apply on an index page, the full entry will be shown on the individual page). Our last example will be to use the the_time tag. This will display the time and/or date of the post, depending on the argument that is given. 
    
{% highlight php linenos %}
    <?php the_time('format'); ?>
{% endhighlight %}

You can see that the argument name appears to be format, however, it's really d. This took me some time to figure out, and I only discovered it because I was using a previous Blogsome template to crib from. The value needs to be a valid PHP date format string. `{the_time d='D j M Y'}` Will give Mon 7 Jul 2020, or whatever the post date is. If you put a value in, and get only the time back (ie, 2:36pm), and this was not what you asked for, the argument or value may be incorrect. Okay, that's all I'm going to write about how to get from PHP to Smarty: by all means read the Smarty Documentation if you don't yet understand! 

### WordPress Templates

WordPress is pretty flexible in terms of template filenames, but generally there will be seven or so: 

  * `index.php` • The main template file. Gets called when an index page is requested (such as the main page of the site).
  * `sidebar.php` • Contains the data that will go into the menu that usually appears on the side of a blog. Will be inserted when get_sidebar(); is called in PHP code.
  * `header.php`, `footer.php` • Contains the data that tells the top or bottom of the page what to look like.
  * `post.php` • The specific layout instructions for a post view.
  * `comments.php` • Will only be included if comments are active on the post.
  * `page.php` • For Page layout, rather than Posts. New to WordPress 1.5

The reason the files are split up is that this means they can be re-used: header and footer will be used at the top/bottom of post and page, as well as index, and sidebar will probably be used in several places as well. The problem with Blogsome is that there are only four files that can be edited: and one of them is the StyleSheet, which we have already done! So, we need to squeeze six or seven files into three. The easiest way to go is to understand that `post.php` needs to be placed into `post.html`, and `comments.php` needs to go into `comments.html`, and everything else needs to go into `index.html`. However, we cannot just copy and paste the data, we need to convert it. Before you start, it's a good idea to make a copy of the data in each of the Blogsome files, so you can see how the theme that was there was doing it, and that should give you some ideas as to how might be a good way to do it yourself. We'll start with post.html: it's probably the simplest. 
    
{% highlight php linenos %}
    <p class="post-date"><?php the_time('D j M Y'); ?></p>
    <div class="post-info"><h2 class="post-title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link: <?php the_title(); ?>"><?php the_title(); ?></a></h2>
    Posted by <?php the_author(); ?> under <?php the_category(' , '); ?><?php edit_post_link('(edit this)'); ?><br/><?php comments_popup_link('No Comments', '1 Comment', '[%] Comments'); ?>&nbsp;</div>
    <div class="post-content">
        <?php the_content(); ?>
        <div class="post-info">
            <?php wp_link_pages(); ?>                                           
        </div>
        <!--
            <?php trackback_rdf(); ?>
        -->
        <div class="post-footer">&nbsp;</div>
    </div>
{% endhighlight %}

This is the code that Patricia created for Connections, the theme I use. Let us try to understand the code so we can Smarty-fy it. The first line is the post date, using one of the tags we looked at before. The next two lines contain all of the post meta-data: it's permalink, categories and so on. From there we have some layout tags (everything with a div is an HTML construct to divide the page up nicely), and then the actual content. This is followed by the link pages (Next/Previous Pages of a multi-page post), and then the Trackback info. Then we have the post footer (different to the footer.php I mentioned above!), and that's about it. Do notice that the div tags that are opened on this page are all closed on this page: that makes it much easier to validate code. I also tend to indent my code so it's clearer to follow, but that's probably because I'd rather be coding in python. Convert all of your PHP function calls to the relevant Smarty Code: basically replace `<?php` by `{`, and `?>` by `}`, and the arguments as discussed above. Remember to check the Codex if you run into trouble. Here's what I changed mine into: 
    
{% highlight html+smarty linenos %}
    <p class="post-date">{the_time d= 'D j M Y'}</p>
    <div class="post-info"><h2 class="post-title"><a href="{the_permalink}" rel="bookmark" title="Permanent Link: {the_title}">{the_title}</a></h2>
    Posted by {the_author} under {the_category}{php edit_post_link}<br/>{comments_popup_link zero='No Comments' one='1 Comment' more='[%] Comments'}&nbsp;</div>
    <div class="post-content">
        {the_content}
        <div class="post-info">
            {wp_link_pages}                                         
        </div>
        <!--
            {trackback_rdf}
        -->
        <div class="post-footer">&nbsp;</div>
    </div>
{% endhighlight %}

You can repeat these instructions with comments.php. There is some more stuff there that might require a bit of explanation, but have a crack. You should now be able to see some of your handiwork on any posts that are already in your blog. Now is a chance to check that out, and see if there are any inconsistencies that need to be ironed out. 

   [1]: http://codex.wordpress.org/Template_Tags/the_content

