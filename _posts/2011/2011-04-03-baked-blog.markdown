---
layout: post
title: Baked Blog
date: 2011-04-03 20:27:46
time: "20:27:46"
tags: 
- blog
- jekyll
---

So, it looks like I've taken the route that quite a few others are taking lately. Although not really based on the post by Brent Simmons: [A plea for baked weblogs][1], it probably got me thinking. Marco Arment also talked about this concept in a couple of episodes of [Build and Analyze][2], one of which I haven't even listened to yet.

More though, it was wanting to really be in control of what goes on the site. I moved the data from Blogger to Blogsome ages ago, and then onto a self-hosted WordPress installation. I never managed to keep the installation updated, and was forced to use PHP if I wanted to change the look.

So, this re-publish, using [Jekyll][3], was a way to simplify the design, and generally clean everything up. I managed to pull all of the posts down using the Jekyll-WordPress tool, although since I had a very old WordPress installation, I needed to tweak the script somewhat. Mainly that was to get the tags and categories. The database structure they had to associate them was royally fucked. Eventually I got there, though.

I designed the layout myself, with a real focus on simplicity. It's probably not quite finished, but tweaking will happen. I have a few custom (based on others work) Jekyll plugins: notably I have a generators that create the yearly/monthly/daily archives, and the tag pages. I override the highlight template tag to cache the pygments output, and add a filename if it is included. 

I probably would have not had the permalinks the way I do if I had started from scratch, but didn't really want to break incoming links. I also need to find any more missing images, and incorrectly indented code blocks.

What I haven't done yet is get my workflow complete. I would like to be able to edit a post in my iPad (when it arrives), or from any DropBox linked computer, and when I mark it as publish, it automatically moves it to the `_posts/` folder in the Jekyll directory, runs `jekyll`, and then deploys the data to the site. This script can take care of the file naming, from the date and the title in the yaml header, or the file modification date/time if none provided in the header. It would be nice to come up with some workflow for creating new files, but I think I'd have to write my own app for that to work on iPad.

I do have a deployment script, which just uses `rsync` to copy changed files:

{% highlight bash linenos %}
#! /bin/bash
rsync -rcvuzm --delete /path/to/site/_site/ user@host:
{% endhighlight %}

I think I may create a new TextMate jekyll bundle, as the one that exists (a) cannot be installed properly from GetBundles, and (b) is missing some features. Like creating a new post, publish and deploy.

Finally, I am a bit peeved at how long it takes to build the jekyll site. With around 1500 posts, it takes about 4 minutes to generate the files. This is caching the pygments files, but the markdown files need to be re-read each time, as the several pages will change if a new post is added. That is, the index, any paginated root pages, plus all archives for the current year, and any tag pages with tags the same as the new post has. Jekyll currently recreates all pages.

  [1]: http://inessential.com/2011/03/16/a_plea_for_baked_weblogs
  [2]: http://5by5.tv/buildanalyze
  [3]: http://jekyllrb.com
  