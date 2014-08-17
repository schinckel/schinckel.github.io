--- 
wordpress_id: 1669
layout: post
title: View man pages in Preview
time: "23:16:01"
date: 2009-12-23 23:16:01
tags: 
- bash
- macos-x
wordpress_url: http://schinckel.net/2009/12/23/view-man-pages-in-preview/
---
It's not a new concept, but here is my take on it:
    
{% highlight bash linenos %}
function man {
    # We can get the actual path to the man command here, so we can override
    # it with our function name.
    MAN=`which man`
    # Change these two if you are not on OS X.
    CACHE_DIR="${HOME}/Library/Caches/manpages"
    OPEN="open"
    
    # If we don't have any arguments, use the nice man error message
    if [ ! $1 ]; then
        $MAN
        return
    fi
    
    # If we have an argument that clashes with what we are wanting to be
    # able to do, pass the whole command through.
    for ARG in $*; do
        case $ARG in 
            -[dfkKwtWP])
                $MAN $*
                return;;
        esac
    done
    
    # Make sure our cache directory exists.
    mkdir -p $CACHE_DIR
    # Get the man page(s) that match our query.
    MAN_FILES=`$MAN -w $*`
    for MAN_FILE in $MAN_FILES; do
        # Get the name of the man file, and the section.
        MAN_PAGE=`basename "$MAN_FILE" | cut -d \. -f 1-2 | sed 's/\./(/' | sed 's/$/)/'`
        # Our PDF will be in this location
        PDF_FILE="${CACHE_DIR}/${MAN_PAGE}"
        
        # If we actually have a man file that matches
        if [ -n "$MAN_FILE" ]; then
            # See if the man file is newer than our cached PDF, and if it is,
            # then generate a new PDF. This works even if $PDF_FILE does not
            # exist.
            if [ $MAN_FILE -nt $PDF_FILE ]; then
                $MAN -t $* | pstopdf -i -o "$PDF_FILE"
            fi
            # Then display the file.
            $OPEN "$PDF_FILE"
        fi
    done
}
{% endhighlight %}
    
