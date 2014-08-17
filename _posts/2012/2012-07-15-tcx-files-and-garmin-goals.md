---
date: 2012-07-15 23:22:05
layout: post
publish: true
tags: [tcx, hrm, goal, xml]
title: TCX Files and Garmin Goals

---


I'm partway through writing a workout planning tool: it's web-based, similar to [Garmin Connect](http://connect.garmin.com), but hopefully with a better interface. I want to be able to create workouts, but I'm really happy with [Strava](http://strava.com) for my activity tracking.

Part of the appeal is being able to export the data to my Garmin Forerunner HRM: this really is one of those 'scratch my own itch' tools. So, I've had to learn a bit about the Garmin `TCX` format. There is [documentation](http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd): it is just an XML file that matches the desired schema.

I've made a lot of progress with the workout creation, and even exporting this to `TCX`. Today, I decided to work on the Goal planning.

Some Garmin HRMs have a neat feature where you can set goals, which the watch will track as you work out. Thus, you could decide you want to run 50km in a given week, and it will show you how far along that goal you are, and how much time you have remaining. However, there is no way on the Forerunner 405cx to set goals on the device, nor with Garmin Training Center, and you have to use Garmin Connect.

The thing is, this part of the `TCX` file is undocumented. It is stored in the `<Extensions>` section, and here is my plan to document it a little better.

The basic structure of the file is:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<TrainingCenterDatabase 
  xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.garmin.com/xmlschemas/ActivityGoals/v1 
  http://www.garmin.com/xmlschemas/ActivityGoalExtensionv1.xsd 
  http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 
  http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd">

  <Folders/>

  <Author xsi:type="Application_t">
    <!-- Application info goes here -->
  </Author>

<Extensions>
  <ActivityGoals xmlns="http://www.garmin.com/xmlschemas/ActivityGoals/v1">
    <!-- List of goals goes here -->
  </ActivityGoals>
</Extensions>
{% endhighlight %}

We are only interested in what happens in the list of goals.

Mostly, a goal is fairly simple:

{% highlight xml %}
<ActivityGoal Current="0.0000000" Measure="DistanceMeters" Sport="All" Target="1000.0000000">
  <Name>Run 1km</Name>
  <Period Recurrence="Once">
    <StartDateTime>2012-07-15T00:00:00Z</StartDateTime>
    <EndDateTime>2012-07-21T23:59:59Z</EndDateTime>
  </Period>
</ActivityGoal>
{% endhighlight %}

From this we can see the following fields:

* `Current` The amount of `Measure` that has been completed.
* `Measure` The type of goal. Allowable values are: `DistanceMeters`, `TimeSeconds`, `Calories` and `NumberOfSessions`.
* `Sport` You may limit the goal to activities of a given sport. Allowable values are: `All`, `Running`, `Biking` and `Other`. Note that Garmin Connect will allow you to choose other sports, however, the value will effectively be cast to one of these. Note also that these are the exact same values that are valid for a Workout sport type (with the addition of `All`).
* `Target` What the actual target is.
* `Name` The name of this goal. This will not be displayed on a Forerunner 405cx: not sure about other devices.
* `Period Recurrence` At this stage, I'm not sure what other values than `Once` are permitted, but I will be investigating this: this could turn out to be a really nice way to have a repeating weekly goal.
* `StartDateTime`, `EndDateTime` happy to see these in ISO8601 format. Not surprised by that, as the Activity spec stuff (as well as Workout scheduling) is also all in ISO8601.

I do have a couple of comments so far: the HRM watches are essentially timezone aware, and they pull their time from the GPS satellites. I wonder if goals will then respect this: I'm at +0930: if I set a goal to end at `2012-07-21T23:59:59Z`, will it finish at that time (which is a UTC timestamp), or will it finish at midnight local time? Can you set goals that finish at other times than midnight?

Initial experiments appear to show *no*. Setting a time other than `23:59:59` means that the goal is not shown on the device. I don't see this as a big disadvantage. Testing the timezone-ness of the period is harder: I need to wait until midnight to do so!

Secondly, what values are valid for the recurrence period? This requires some experimentation.

It appears to accept a value of `Weekly`, but as to if this actually does anything, I'm yet to discover. Considering it has an explicit `StartDateTime` and `EndDateTime`, unless the watch extrapolates and updates it, I'm not expecting it to do anything. Certainly, setting an `EndDateTime` in the past, and choosing `Weekly` does not appear to have any effect. Again, I'm going to have to wait until midnight clicks over to test this properly. Hopefully, it will update the start and finish times, and reset the current amount.

Also of interest: Garmin Connect sends through a `Dummy <X>goal` for every goal `Measure` you do not provide a goal for. However, this is not necessary: removing all but the goals you want to use from the generated TCX file does not prevent sending it to the device, but having an invalid `Author` block does prevent it from sending.
  
The Forerunner 405cx will only display one goal of each type (`Measure`). I believe it shows only the one that is closest to expiring.

When the Garmin agent sends the data to the watch, it removes it from the filesystem. This prevents it being re-sent. When data is recieved from the watch, it appears re-create the activity file from the current goals set up in Garmin Connect. This kind-of makes sense, but is annoying, as any goals that have been set up in Garmin Connect will override the goals created elsewhere.

In practice, it means that in order to send goal data to the device, you must first download the relevant activities, and calculate just how much of each goal has been completed. I was hoping to be able to avoid this: if the watch sent us the goal `Current` figure, then we could just load this, and apply any changes to targets, without affecting the current value. However, with my device, at least, `ActivityGoals` are `InputToUnit` only. At least, if you have no goals in Garmin Connect, it doesn't send back bogus (dummy) goal data!