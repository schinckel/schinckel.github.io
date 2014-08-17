--- 
wordpress_id: 862
layout: post
title: Performancing Stats for Blogsome
time: "18:39:07"
date: 2006-04-17 18:39:07
tags: 
- blogsome
- smarty-templates
- performancing-metrics
wordpress_url: http://schinckel.net/2006/04/17/performancing-stats-for-blogsome/
---
This post is a Blogsome specific post with information gleaned from [HOWTO: Wordpress Visitor Count Plugin Using Metrics API][1]. If you aren't using Blogsome, then you'll be better off visiting there. If you are using Performancing Metrics as your system for tracking usage patterns, you may wish to have a counter of some sort. It's possible to do this, safely and securely with just a little bit of Smarty.  First, you'll need to get your current Performancing Authorisation Key. This will not change unless you change your password, so keep that in mind if this stops working at some stageâ€¦ To get your API key, you'll need to visit a URL like the following, but with your username and password. http://performancing.com/perfstats/api.php?action=getauth&uid;=some+user&pwd;=mypass If you put this into a Firefox address bar, it will display the XML, but the only part we need is the part inside the `<auth>` tags. Don't give this to anyone, else they can see all of your Performancing stats. You can now use this key to get some stats. As a test, we'll get the basic stats of your blog. Copy and paste the URL below, and insert it into the address bar. Then, replace KEY with your authorisation key, and schinckel with your blogsome ID: 
    
    http://performancing.com/perfstats/api.php?action=getvisitorstats&auth;=KEY&blog;_domain=schinckel.net

You'll be presented with some XML that looks like: 
    
{% highlight xml linenos %}
    <response>
        <request>
            <auth>KEY</auth>
            <blog_domain>schinckel.net</blog_domain>
            <action>getvisitorstats</action>
        </request>
        <ChartURL>
            http://performancing.com/perfstats/api.php?action=getchart&blog_domain=schinckel.net&dtype=visitor_stats&ctype=line&m=today&d1=2006-04-17&d2=
        </ChartURL>
        <Visits>20</Visits>
        <AverageVisitsPerDay>20.0000</AverageVisitsPerDay>
        <AverageVisitLength>517.9500</AverageVisitLength>
        <RepeatVisitors>0</RepeatVisitors>
    </response>
{% endhighlight %}

You can then use the ChartURL to see a nice graph, something like: ![Performancing Stats][2] If this doesn't work, then check your API key, and all of the URLs you've typed in so far. Now, let's imagine we just want a counter for total blog views. The URL will need to look a bit like (I've broken it onto seperate lines first to help you understand it): http://performancing.com/perfstats/api.php?action=getvisitorstats &auth;=_KEY_&blog;_domain=_blogname_.blogsome.com&m;=date_range &d1;=_start_date_&d2;=_end_date_ We'll look at how to get the current date a bit later: for now, put a date at some point in the future. Mine, sans the authorisation key was: http://performancing.com/perfstats/api.php?action=getvisitorstats&auth;=KEY&blog;_domain=schinckel.net&m;=date_range&d1;=2006-01-01&d2;=2007-01-01 Which generated the following XML: 
    
{% highlight xml linenos %}
    <response>
        <request>
            <auth>KEY</auth>
            <blog_domain>schinckel.net</blog_domain>
            <action>getvisitorstats</action>
        </request>
        <ChartURL>
            http://performancing.com/perfstats/api.php?action=getchart&blog_domain=schinckel.net&dtype=visitor_stats&ctype=line&m=date_range&d1=2006-01-01&d2=2007-01-01
        </ChartURL>
        <Visits>9204</Visits>
        <AverageVisitsPerDay>271.3529</AverageVisitsPerDay>
        <AverageVisitLength>289.5818</AverageVisitLength>
        <RepeatVisitors>242</RepeatVisitors>
    </response>
{% endhighlight %}

It's possible to use the `{fetch file="URL" assign="stats"}` to grab this data and store it in a variable, so the whole lot isn't displayed. You may have noticed that the Auth Key is included in the response! Now, the only bit we are really interested in is the 
    
{% highlight xml linenos %}
    <Visits>9204</Visits>
{% endhighlight %}

section, so we need some way to extract this. Smarty allows for Regular Expressions, and we want to use one that will match everything up to and including _<Visits>_, and discard this. We'll want to repeat that with _</Visits>_ onwards. Due to a limitation, we'll need three regexes, since there are newlines in there that much with the simlest method. 
    
   {% highlight smarty linenos %}
    {$stats|regex_replace:"/[\r\t\n]/":""|regex_replace:"/.*<Visits>/":""|regex_replace:"/<\/Visits>.*/":""}{% endhighlight %}
   

Thus, my final data is: 
    
    {% highlight html+smarty linenos %}
    <li>{fetch file="http://performancing.com/perfstats/api.php?action=getvisitorstats&auth=KEY&blog_domain=schinckel.net&m=date_range&d1=2006-01-01&d2=2007-01-01" assign="stats"}
        {$stats|regex_replace:"/[\r\t\n]/":""|regex_replace:"/.*<Visits>/":""|regex_replace:"/<\/Visits>.*/":""} Post views.
    </li>
{% endhighlight %}
    
Of course, that's with a hard-coded finish date. What if we want to finish on today? Again, there's a way to do it in $smarty: `{$smarty.now|date_format:"%Y-%m-%d"}` To add this to the end of the URL, use: 
    
{% highlight smarty linenos %}
    {assign var="URL" value="http://performancing.com/perfstats/api.php?action=getvisitorstats&auth=KEY&blog_domain=schinckel.net&m=date_range&d1=2006-01-01&d2="}
    {assign var="today" value=$smarty.now|date_format:"%Y-%m-%d"}
    {fetch file=$URL|cat:$today assign="stats"}
{% endhighlight %}

It's also simple to get a current day's post hit count, using _single_date_ instead of _date_range_. I'll leave that one up to you. 

   [1]: http://performancing.com/node/1831
   [2]: http://performancing.com/perfstats/api.php?action=getchart&blog_domain=schinckel.net&dtype=visitor_stats&ctype=line&m=today&d1=2006-04-17&d2=

