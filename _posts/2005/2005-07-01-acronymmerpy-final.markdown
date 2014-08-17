--- 
wordpress_id: 256
layout: post
title: acronymmer.py final (?)
time: "21:01:13"
date: 2005-07-01 21:01:13
tags: 
- blogging
- python
- ecto
wordpress_url: http://schinckel.net/2005/07/01/acronymmerpy-final/
---
Taking into account the comments on PhotoMatt's [acronymit][1] page (where I shamelessly stole some ideas, including the list of words!), I've modified `acronymmer.py` so that it: 

  1. Does not apply `<acronym>` tags to instances that have been acronymmed already.
  2. Does not apply tags to instances that are inside `href` or `title` strings. 
  3. Does not save the file if no changes have been made.

Here it is, including my current acronym list. (I know some of these are Abbreviations, but ecto, and some browsers do not handle this tag). Also, this code needs to be re-pasted - I was trying to make it (XHTML) valid, and it's broken now. 
    
{% highlight python linenos %}
    #! /usr/bin/env python
        
    'A script for ecto that adds abbr and acronym tags to the text'
        
    acronyms = {
    'WYSIWYG' : 'what you see is what you get',
    'XHTML' : 'eXtensible HyperText Markup Language',
    'IIRC' : 'if I remember correctly',
    'HDTV' : 'High Definition TeleVision',
    'LGPL' : 'GNU Lesser General Public License',
    'MSDN' : 'Microsoft Developer Network',
    'WCAG' : 'Web Content Accessibility Guidelines',
    'SOAP' : 'Simple Object Access Protocol',
    'OPML' : 'Outline Processor Markup Language',
    'MSIE' : 'Microsoft Internet Explorer',
    'FOAF' : 'Friend of a Friend vocabulary',
    'GFDL' : 'GNU Free Documentation License',
    'XSLT' : 'eXtensible Stylesheet Language Transformation',
    'HTML' : 'HyperText Markup Language',
    'IMAP' : 'Internet Message Access Protocol',
    'RAID' : 'Redundant Array of Independent Disks',
    'MPEG' : 'Motion Picture Experts Group',
    'JPEG' : 'Joint Photographic Experts Group',
    'CSTA' : 'Central Scorpions Touch Association',
    'CDDB' : 'Compact Disc DataBase (Gracenote)',
    'XBMC' : 'Xbox Media Centre',
    'VNC' : 'Virtual Network Computing',
    'URL' : 'Uniform Resource Locator',
    'W3C' : 'World Wide Web Consortium',
    'MSN' : 'Microsoft Network',
    'USB' : 'Universal Serial Bus',
    'P2P' : 'Peer To Peer',
    'PBS' : 'Public Broadcasting System',
    'RSS' : 'Really Simple Syndication',
    'SIG' : 'Special Interest Group',
    'RDF' : 'Resource Description Framework',
    'AOL' : 'American Online',
    'PHP' : 'PHP Hypertext Processor',
    'SSN' : 'Social Security Number',
    'JSP' : 'Java Server Pages',
    'DOM' : 'Document Object Model',
    'DTD' : 'Document Type Definition',
    'DVD' : 'Digital Versatile Disc',
    'DNS' : 'Domain Name System',
    'CSS' : 'Cascading Style Sheets',
    'CGI' : 'Common Gateway Interface',
    'CMS' : 'Content Management System',
    'FAQ' : 'Frequently Asked Questions',
    'FSF' : 'Free Software Foundation',
    'API' : 'Application Interface',
    'PDF' : 'Portable Document Format',
    'IIS' : 'Internet Infomation Server',
    'XML' : 'eXtensible Markup Language',
    'XSL' : 'eXtensible Stylesheet Language',
    'GPL' : 'GNU General Public License',
    'KDE' : 'K Desktop Environment',
    'STB' : 'Set Top Box',
    'MP3' : 'Mpeg Layer 3',
    'PVR' : 'Personal (Digital) Video Recorder',
    'GUI' : 'Graphical User Interface',
    'CLI' : 'Command Line Interface',
    'AAC' : 'Advanced Audio Coding',
    'IE' : 'Internet Explorer',
    'CD' : 'Compact Disk',
    'GB' : 'Gigabyte',
    'MB' : 'Megabyte',
    'KB' : 'Kilobyte',
    'TV' : 'TeleVision',
    'PC' : 'Personal Computer',
    'NSLU2':'[Linksys] Network Storage Link (USB) 2.0'
    }
    
    
    import sys, re
    data = open(sys.argv[1]).read()
    olddata = data
    
    # replace only the first instance of each acronym/abbreviation
    for each in acronyms:
        d = re.search(r'(?!<.*(title|href)='*>)?\b%s\b(?!(.*'>|</acronym>))' % each, data)
        if d:
            data = data[:d.start()] + '<acronym title='' + \
                   acronyms[each] + '>' + \
                   each + '</acronym>' + data[d.end():]
        
    if data <> olddata:
        open(sys.argv[1],'w').write(data){% endhighlight %}

    

   [1]: http://photomatt.net/scripts/acronymit

