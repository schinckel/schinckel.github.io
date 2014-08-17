--- 
wordpress_id: 1157
layout: post
title: XMLRPC errors, again
time: "16:30:51"
date: 2007-06-06 16:30:51
tags: 
- blogsome
wordpress_url: http://schinckel.net/2007/06/06/xmlrpc-errors-again/
---
I've had issues with uploading images from ecto to Blogsome, but I wasn't sure if it was an ecto or a Blogsome issue. It appears to be a Blogsome issue, which the following result from an attempted upload via MarsEdit tells me: 

RPC message sent: 2007-06-06 16:25:32 +0930  
URL: http://schinckel.net/xmlrpc.php  
Method name: metaWeblog.newMediaObject  
RPC reply received: 2007-06-06 16:25:58 +0930  
URL: http://schinckel.net/xmlrpc.php  
Method name: metaWeblog.newMediaObject  
Status code: 200  
Succeeded: NO  
--Fault Error--  
Fault code: -32601  
Fault string: server error. requested method metaWeblog.newMediaObject does not exist.  
Request text:  
<?xml version="1.0" encoding="utf-8"?>  
<methodCall>  
    <methodName>metaWeblog.newMediaObject</methodName>  
    <params>  
        <param>  
            <value><string>schinckel</string></value>  
            </param>  
        <param>  
            <value><string>schinckel</string></value>  
            </param>  
        <param>  
            <value><string>[password]</string></value>  
            </param>  
        <param>  
            <value>  
            <struct>  
            <member>  
            <name>bits</name>  
            <value><base64></base64></value>  
            </member>  
            <member>  
            <name>name</name>  
            <value><string>/kahll.jpg</string></value>  
            </member>  
            <member>  
            <name>type</name>  
            <value><string>image/jpeg</string></value>  
            </member>  
            </struct>  
            </value>  
            </param>  
        </params>  
    </methodCall>  
  
Response text:  
<?xml version="1.0"?>  
<methodResponse>  
  <fault>  
    <value>  
      <struct>  
        <member>  
          <name>faultCode</name>  
          <value><int>-32601</int></value>  
        </member>  
        <member>  
          <name>faultString</name>  
          <value><string>server error. requested method metaWeblog.newMediaObject does not exist.</string></value>  
        </member>  
      </struct>  
    </value>  
  </fault>  
</methodResponse>  
  


Oh, and I can't figure out how to retrieve categories via MarsEdit. Not that I'm unhappy with ecto, anyway. 
