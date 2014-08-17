---
date: 2012-01-11 20:51:08
layout: post
publish: true
tags: [jekyll, textmate, markdown, liquid-template]
time: '20:51:08'
title: Highlight 'highlight' blocks in Markdown/Textmate

---


The other day, I mentioned that I had Marked.app nicely handling my ``{{ "{% highlight "}} %}`` blocks, and syntax highlighting them. In passing at the end, I mentioned that TextMate was still formatting them as if they were Markdown.

Now, one way around this is to indent them, but then within the code block they are indented further, and that offends my sensibilities.

Now, within TextMate, syntax highlighting is based on scopes, so to do what I want (which is the same as how HTML may have CSS or JS embedded in it), we just need a language grammar pattern that matches, and applies the relevant scope.

TextMate 2 has even nicer features, where you can set the scope (but not, as it turns out, include rules) dynamically based on a match in the pattern.

Anyway, on to the rules.

Rather than edit the Markdown rules, I wanted to just inject the language grammars in from a bundle of my own, but had no luck with this. Instead, I decided to extend the Jekyll bundle.

This is what I wanted to put in the patterns (simplified a little):

{% highlight text linenos %}
{
  begin = '{{ "\{% highlight (.*)( linenos)? }} "%\}\n';
  end = '{{ "\{% endhighlight }} "%\}\n';
  name = 'source.$1.embedded.html.markdown';
  patterns = ( { include = 'source.$1'; } );
}
{% endhighlight %}

However, as I mentioned above, the expression on line 5 does not actually include `source.js` patterns in this case.

Instead, I needed to have a seperate pattern for each language I wanted to include patterns from. Since mostly I work in python, html and javascript, for now those ones will do.

Oh, and the last thing is that html needs to include `text.html.basic`.

You can see my fork at [jekyll-tmbundle](https://github.com/schinckel/jekyll-tmbundle). The current code is:

<script src="https://gist.github.com/1594034.js?file=file.plist"></script>