--- 
wordpress_id: 594
layout: post
title: Gravatar Smarty Modifier
time: "12:16:10"
date: 2005-12-22 12:16:10
tags: 
- blogsome
- php
- smarty-templates
wordpress_url: http://schinckel.net/2005/12/22/smarty-modifiers/
---
I wrote a Gravatar modifier for Smarty: `{$comment->comment_author_email|gravatar:"default":     size:"rating":border}` For example, to use no default image, and limit the size to 40x40 pixels, you'd use: `{$comment->comment_author_email|gravatar:"":"40":"":""}` Notice the double quotes where the argument is missing, and that (in this version) you actually need to include all of the arguments. (I've updated this, but haven't tested it fully yet). Anyway, here's the code: 
    
{% highlight php linenos %}
    <?php
    /**
     * Smarty plugin
     * @package Smarty
     * @subpackage plugins
     */
    
    
    /**
     * Smarty gravatar plugin
     *
     * Type:     modifier<br>
     * Name:     gravatar<br>
     * Author:   Matt Schinckel<br>
     *           mailto:matt@schinckel.net<br>
     *           aim:mschinckel<br>
     *           http://schinckel.net<br>
     * Purpose:  convert email address to gravatar
     * @param string
     * @return string
     */
    function smarty_modifier_gravatar($email, $default=false, $size=false, $rating=false, $border=false)
    {
        $gravurl = "<img src='http://www.gravatar.com/avatar.php?gravatar_id=".md5($email);
        if ($default)
        {
            $gravurl = $gravurl."&amp;default=".urlencode($default);
        }
        if ($size)
        {
            $gravurl = $gravurl."&amp;size=".$size;
        }
        if ($rating)
        {
            $gravurl = $gravurl."&amp;rating=".$rating;
        }
        if ($border)
        {
            $gravurl = $gravurl."&amp;border=".$border;
        }
        return $gravurl."' alt='Gravatar Image' />";
    }
    
    ?>
{% endhighlight %}
