--- 
wordpress_id: 199
layout: post
title: Notification from AppleScript Studio
time: "19:27:19"
date: 2005-06-05 19:27:19
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/06/05/notification-from-applescript-studio/
---
Christoph asked me for some advice on how to get notification on iTunes track changes in a comment, I said I would write a bit of a tutorial on how I got it to work. First thing was to create an AppleScript Studio program - you will need to have the Developer Tools installed for this. Now, open the `main.m` file. It should look something like the following:
    
{% highlight objc linenos %}
    #import <mach-o/dyld.h>
        
    extern int _NSApplicationMain_(int argc, const char *argv[]);
        
    int main(int argc, const char *argv[])
    {
        if (NSIsSymbolNameDefined("_ASKInitialize"))
        {
        NSSymbol *symbol = NSLookupAndBindSymbol("_ASKInitialize");
        if (symbol)
        {
        void (*initializeASKFunc)(void) = NSAddressOfSymbol(symbol);
            if (initializeASKFunc)
        {
        initializeASKFunc();
        }
        }
        }
        
    return _NSApplicationMain_(argc, argv);
    }
{% endhighlight %}

The file needs to have the following elements. At the start, the following imports are required: 
    
{% highlight objc linenos %}
    #import <Foundation/NSDistributedNotificationCenter.h>
    #import <Foundation/NSString.h>
    #import <AppKit/NSAppleScriptExtensions.h>
{% endhighlight %}

This should be all of the imports that are required - although I also had stdio.h for a while for testing. After the declaration of the NSApplicationMain, I put the following in: 
    
{% highlight objc linenos %}
    @interface iTunesConnection : NSObject
     - (id) init;
    @end
    
    @implementation iTunesConnection
     - (id) init {
        NSDistributedNotificationCenter *nc = [NSDistributedNotificationCenter defaultCenter];
        [nc addObserver:self
               selector:@selector(updateNow:)
                   name:@"com.apple.iTunes.playerInfo"
                 object:nil];
    
        return self;
    }
    
     - (void) updateNow:(NSNotification *)notification {
        NSString *updateScript = [NSString stringWithFormat:@"tell application \nend tell"];
        NSAppleScript *as = [[[NSAppleScript alloc] initWithSource:updateScript] autorelease];
        [as executeAndReturnError:nil];
    }    
    @end
{% endhighlight %}

Copy and paste the stuff above - there is some that goes over the line in my browser, but it's all there if you drag out the selection. You may need to change a couple of things depending on what you want to do. For instance, the `@"tell application \nend tell" `section needs to be the applescript code that is run whenever a new iTunes track is started, or iTunes is paused. You could fit the entire application into this place, but what I did was have a hidden button that this script "presses", triggering the update process. Finally, I added the following declaration just after the first brace in the main function declaration: 
    
{% highlight objc linenos %}
    iTunesConnection *connection;
    connection = [[iTunesConnection **alloc**] init];
{% endhighlight %}

This gets everything running. I would suggest putting the following into the applescript string to test it and see that it works: 
    
{% highlight objc linenos %}
    @"tell application \"Finder\"\ndisplay dialog \"iTunes Changed\"\nend tell"
{% endhighlight %}

You need to have `\"` whenever your script would have a `"`, and `\n` wherever it would have a newline. 
