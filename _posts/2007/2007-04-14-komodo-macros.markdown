--- 
wordpress_id: 1129
layout: post
title: Komodo Macros
time: "00:27:38"
date: 2007-04-14 00:27:38
tags: 
- python
- komodo
wordpress_url: http://schinckel.net/2007/04/14/komodo-macros/
---
I've been working on a few little macros for Komodo. I'm planning to build a more cohesive set as I use the editor more. 

### Export HTML Tools.

The first is Copy As HTML Snippet. This gets an HTML representation of the current document and it's syntax styling, and stores this in the Clipboard. There are two related tools: Export As HTML, and Export Selection as HTML. They save either the whole file, or the current selection. They create a new file, rather than store the data in the Clipboard. Each to her own. The code for each: (recursion: uses the macro to get the code of the macro...) 

#### Copy As HTML Snippet.

{% highlight python linenos %}
from komodo import components, document  
from xpcom.server import UnwrapObject  
import re  
  
# Get the current buffer, and an html representation.  
buf = UnwrapObject(document.ciBuf)  
html = buf.to_html(False,False,None,True,True)  
# Remove some debugging code left by the developers.  
html = html.replace('onmouseover="show_class(event.target);"','')  
html = html.replace("'","&#039;")  
html = re.sub('SCE_P_.*? ','',html)  
  
# Put it into the clipboard,  
ch = components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(components.interfaces.nsIClipboardHelper)  
ch.copyString(html)
{% endhighlight %}

#### Export As HTML

{% highlight python linenos %}
import komodo  
komodo.view.setFocus()  
komodo.doCommand("cmd_exportHTML")
{% endhighlight %}

#### Export Selection As HTML

{% highlight python linenos %}
import komodo  
komodo.view.setFocus()  
komodo.doCommand("cmd_exportHTMLSelection")
{% endhighlight %}

You can get a Project (mutliple part packages are broken on export for me at the moment) with all three macros from: [HTML Export Tools][1]. 

### Java Development Tools

This will eventually, I hope, become a more useful set of tools, perhaps being replaced by better interaction with, for example, Komodo's native debugger. At the moment, debugging requires knowledge of the specific debugging commands. However, I am confident I can use the inbuilt Breakpoint structure to create breakpoints easily, and step through code. 

#### Build & Execute

This macro calls a Command, at the moment, after saving the file. 

{% highlight python linenos %}
import komodo  
komodo.view.setFocus()  
komodo.doCommand('cmd_save')  
try:  
    komodo.findPart('command', 'Java Build & Execute', '*').invoke()  
except:  
    from xpcom import components  
    wwatch = components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(components.interfaces.nsIWindowWatcher)  
    prompt = wwatch.getNewPrompter(wwatch.activeWindow)  
    prompt.alert("Execution Error", "Unable to find 'Java Build & Execute'")  
{% endhighlight %}


#### Java Build & Execute

This is a Command, with the following in the Command: section `if test “%F” -nt “%b.class”; then { javac “%F” ; if test “$?” == “0”; then java -classpath . “%b”; fi; } else java -classpath . “%b”; fi` This should all be on the same line. In the Start in: box, insert %D 

#### Java Build & Debug

Basically the same as the above, but with java replaced by jdb: `if test “%F” -nt “%b.class”; then { javac “%F” ; if test “$?” == “0”; then jdb -classpath . “%b”; fi; } else jdb -classpath . “%b”; fi` Start in: must be %D The project containing all of these can be found at [Java Tools][2]. 

### Python Tools

My python tools are a bit simple at this stage - after all, there's already a fair bit of stuff in there to work with python! I do have a couple of bits that are useful. The Run Command... dialog is okay, but I always forget to save the document before running it, so I have two pairs of tools, one to Save and Run the file, and the other to Save and Run the file interactively. They are basically the same, with the difference of one command line switch, and the name of the command in the macro. 

#### Save and Run Current Script

{% highlight python linenos %}
import komodo  
komodo.view.setFocus()  
komodo.doCommand('cmd_save')  
try:  
    komodo.findPart('command', 'Run Current Python File', '*').invoke()  
except:  
    from xpcom import components  
    wwatch = components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(components.interfaces.nsIWindowWatcher)  
    prompt = wwatch.getNewPrompter(wwatch.activeWindow)  
    prompt.alert("Execution Error", "Unable to find 'Run Current Python File'")  
{% endhighlight %}


I've put a nice icon on it, which you can get by right-clicking on the following image, and downloading it. ![][3]

#### Run Current Python File

This is a fairly simple one, there's really only one trick. `python -u “%F”` And %D in Start in:, as before. The `-u` tells the interpreter not to buffer input and output. 

#### Save and Run Interactively/Run Current Python File Interactively

Just add the word Interactively in the two places in the macro, and add -i in just before the -u in the command. Simple! 

#### Execute Selection

Another simple one, this is just a `python -u` command that has the Pass selection as input box checked. 

#### Execute All

A simple macro that selects all before running the above command. I may try to improve it so it re-selects the initial selection after. Maybe. I just used the macro builder to create this one. Cmd-A, then click on the Execute Selection tool. As before, get all of them from [Python Tools][4]. 

[The Closest Thing To Crazy][5] • [Katie Melua][6] • [Call Off The Search][7] ★★★★★

   [1]: http://files.schinckel.net/HTML_Export_Tools.kpf
   [2]: http://files.schinckel.net/Java_Tools.kpf
   [3]: /images/pythonogo16.png
   [4]: http://files.schinckel.net/Python_Tools.kpf
   [5]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=The+Closest+Thing+To+Crazy&artistTerm=Katie+Melua
   [6]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Katie+Melua
   [7]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Call+Off+The+Search&artistTerm=Katie+Melua

