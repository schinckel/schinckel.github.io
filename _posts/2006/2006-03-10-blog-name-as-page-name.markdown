--- 
wordpress_id: 741
layout: post
title: Blog name as Page name
time: "09:32:28"
date: 2006-03-10 09:32:28
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/03/10/blog-name-as-page-name/
---
[Nardac][1], a new [Blogsome ][2]user, tried out my [Page Templates ][3]hack, and asked the following question: 

> ![Gravatar Image][4]
> 
> I’m having a hard time getting the pages to work. I think I’ve followed your instructions to a tee… but well… hmmm… can you take a look?  
the page in question is [http://nardac.blogsome.com/nardac/][5]

I looked, and what is occurring is that his normal blog index page is appearing. So I tried the same with my blog: [http://schinckel.net/schinckel/][6] - I know I don't have a Page with this name, so I was interested to see what occurred. It too showed my index page. Looking down the bottom, I see the arguments that are passed to the server, and in this case, only the blog name is being sent (_wpblog=schinckel_). So, it seems that a page with the same name as the blog name cannot be used. I suspect this has something to do with the HTTP Rewrite Rules, but I'm not sure. I don't see it as a big issue, anyway. **Workaround:** Don't use your blog's name as a Page name. 

   [1]: http://nardac.blogsome.com
   [2]: http://www.blogsome.com
   [3]: http://schinckel.net/2005/08/31/blogsome-page-templates/
   [4]: http://www.gravatar.com/avatar.php?gravatar_id=cc828e708c875e63ba711a43a527368a&default=http%3A%2F%2Fschinckel.net%2Fimages%2FNoGravatar.gif&size=40
   [5]: http://nardac.blogsome.com/nardac/
   [6]: http://schinckel.net/schinckel/

