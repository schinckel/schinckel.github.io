--- 
wordpress_id: 962
layout: post
title: Scripting iTunes 7
time: "17:53:33"
date: 2006-09-15 17:53:33
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2006/09/15/scripting-itunes-7/
---
There are a few new things in AppleScript support for iTunes 7. 

_artwork:_ 

**downloaded** (boolean, r/o) : was this artwork downloaded by iTunes? 

_playlist:_ 

**special kind** (none/Audiobooks/folder/Movies/Music/Party Shuffle/Podcasts/Purchased Music/TV Shows/Videos, r/o) : special playlist kind

_track:_  
**episode ID** (Unicode text) : the episode ID of the track  
**episode number** (integer) : the episode number of the track  
**gapless** (boolean) : is this track from a gapless album?  
**season number** (integer) : the season number of the track  
**skipped count** (integer) : number of times this track has been skipped  
**skipped date** (date) : the date and time this track was last skipped   
**show** (Unicode text) : the show name of the track   
**video kind** (none/movie/music video/TV show) : kind of video track 

Most of these are expected with the addition of the new features: gapless playback and TV/Movie support. At least now we can programmatically change the tags for TV shows. There are two there that are quite interesting: **skipped count**/**date**. 

They are available as columns in the list views too, I just hadn't noticed them yet. Now it will be possible to have smart playlist additions like: `skipped count < 2`.
