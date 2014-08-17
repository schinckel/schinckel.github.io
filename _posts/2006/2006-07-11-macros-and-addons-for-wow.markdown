--- 
wordpress_id: 911
layout: post
title: Macros and Addons for WoW
time: "23:37:57"
date: 2006-07-11 23:37:57
tags: 
- wow
wordpress_url: http://schinckel.net/2006/07/11/macros-for-wow/
---
With the weekly downtime, I get an opportunity to have a look at stuff outside of the game world. I've started using CTMods, and now I'm going to look into some macro and Add-On stuff: Note that these are at this stage untested, and will remain so until at least 11 am PDT! 

  * Killing Totems and Wards. `/target Totem /cast Moonfire(Rank 1)` or even better `/script r=Spell_Rank; if (UnitName("target") ~=nil) and (string.find(UnitName("target"),"Totem"))~=nil then CastSpellByName("Moonfire(Rank 1)") else CastSpellByName("Moonfire(Rank "..r..")"); end`
  * Self-Cast Innervate. `/script CastSpellByName("Innervate", true)`
  * Cast Innervate and Whisper to that target. `/cast Innervate /script msg="Innervate cast on you, mana regen @ 400% for 20 seconds."; SendChatMessage(msg, "WHISPER", "Common", UnitName("target"));`
  * Self-Cast Heal. `/script CastSpellByName("Healing Touch", true)`
  * Announcing Heals in Party/Raid Chat. `/cast Healing Touch /script smsg="Casting Healing Touch on %t in 4 sec..."; if ( GetNumRaidMembers() > 0 ) then SendChatMessage(smsg,"RAID") elseif (GetNumPartyMembers() > 0 ) then SendChatMessage(smsg,"PARTY") end`
  * Self Bandage. 
  * Change Detail Settings: ie. for IronForge. Need to find a way to do this using /script, so I can test for the current mode, and set it to the opposite, so I can use one macro to just switch. HighRes: /z SetFarclip(777) /z SetWorldDetail(2) /z SetBaseMip(1) MediumRes: /z SetFarclip(477) /z SetWorldDetail(1) /z SetBaseMip(1) LowRes: /z SetFarclip(177) /z SetWorldDetail(0) /z SetBaseMip(0) 
  * Change Viewport Resolution when Fullscreen/Windowed Mode changed. Combine these two parts... /script SetCVar("gxWindow", 1 - GetCVar("gxWindow")); /console reloadui Work out the values required for the args... /script currentRes = GetCurrentResolution(); if (currentRes == 3) then SetScreenResolution(15); SetCVar("gxWindow", 0); SetMultisampleFormat(16); else SetCVar("gxWindow", 1); SetScreenResolution(3); SetMultisampleFormat(1); end; 
  * Nature's Swiftness/Heal. `/cast Nature's Swiftness /script SpellStopCasting() /cast Healing Touch`
  * Mounting Steed. `/s Bubbles, faithful steed, I need you now. /script UseContainerItem(4,4) /e summons her Striped Nightsaber.` The arguments are: Bag # (right to left, Backpack is 0), Slot # (left-right, top-bottom). 
  * Use off-hand item. 
