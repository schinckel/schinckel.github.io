--- 
wordpress_id: 355
layout: post
title: Adium Plugin Scripts
time: "21:11:55"
date: 2005-08-15 21:11:55
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/08/15/adium-plugin-scripts/
---
Adium has great support for AppleScripts (or possibly other scripting languages), in that you define a string, and when this string is typed in as a message, the script is run, and the result is sent as the message instead. Thus, it's possible to write scripts that allow you to type in: `%_itunes` And a nicely formatted string, with the current iTunes song is sent to the person you are chatting to. This string can even have hyperlinks embedded in it, so if you were serving your iTunes library up, the person could click on it and download/stream it. The same for `%_safari`/`%_camino`, this can be set up to send a hyperlink with the current page, including the title. What is not clear from the internet is how to create these. It's really quite simple.  The scripts must live inside a package: under MacOS X packages are just folders with particular extensions. For instance, `Mail.app `is a folder, and it appears to the system/user as an application, or a particular type of package. Double-clicking on it will not opent he folder, but (in this case) run the application. AdiumScripts packages (with the extension `.AdiumScripts`) will install into your Library when you double-click them. So, the format must be as follows: 
    
    PluginName.AdiumScripts/
        Contents/
            Info.plist
            Resources/
                Script1Name.scpt
                Script2Name.scpt

The ScriptxName.scpt files must be valid AppleScripts, of the format: 

on substitute(arg)  --do stuff here return value end substitute

  
Where value is the value you want printed. You should format it with starting and closing html tags, and any html markup you want. If you want the user to be able to send an argument (`%command{argument}`), then include it as shown. Inside the `Info.plist `file, you need to have some important information. 
    
{% highlight xml linenos %}
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>CFBundleDevelopmentRegion</key>
        <string>English</string>
        <key>CFBundleGetInfoString</key>
        <string>Matt's Adium Scripts</string>
        <key>CFBundleIdentifier</key>
        <string>net.schinckel.AppName.scripts</string>
        <key>CFBundleInfoDictionaryVersion</key>
        <string>1.0</string>
        <key>CFBundleName</key>
        <string>bundleName</string>
        <key>CFBundlePackageType</key>
        <string>AdIM</string>
        <key>Scripts</key>
        <array>
            <dict>
                <key>File</key>
                <string>Script1Name</string>
                <key>Keyword</key>
                <string>/script1</string>
                <key>Title</key>
                <string>Menu Item 1</string>
            </dict>
            <dict>
                <key>File</key>
                <string>Script2Name</string>
                <key>Keyword</key>
                <string>%_script2</string>
                <key>Title</key>
                <string>Menu Item 2</string>
            </dict> </array>
        <key>Set</key>
        <string>Script Submenu</string>
    </dict>
    </plist>{% endhighlight %}

    

There are some bits of data you'll need to change: `Matt's Adium Scripts` should be a descriptive title for your Scripts. `com.schinckel.AppName.scripts` should be a unique identifier for your scripts. `bundleName` could be the name of your bundle. Realistically, these can be anything, although I suspect Adium will only allow one version of a script with a particular identifier, or bundle name. The next bits are the impart ones: `Script1Name` needs to be the name of a script, minus the `.scpt` extension. `/script1` is the keyword that will trigger this script to be called. And `Menu Item 1` is what will be written in the Scripts Sub Menu. It's possible to have multiple calls to the same script, each one just requires a duplicate dictionary entry, with a different Keyword string. For instance, I use `/camino` and `%_camino` to mean the same function, without requiring seperate scripts to be called. Finally, the `Script Submenu` value needs to be replaced by which Script Sub Menu you want the item to be placed under. For instance, there is already one called _System Statistics_, and _iTunes - Now Playing_. Using a value that doesn't appear already causes a new Sub Menu to be created. I'm not sure if there is a 'rule' against using `/command`, as most of the ones I've come across all use `%_command`. I find this too slow to type, and have adapted them accordingly. You will be able to do this also, now that you know how... 
