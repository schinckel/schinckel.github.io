---
date: 2014-01-25 12:20:54
layout: post
publish: true
tags: [python, coverage, drone.io, pillow, PIL]
title: Generating Coverage Badges

---

  
Drone.io is a pretty neat (free for open-source projects) continuous integration server. The best feature from my perspective is that it works with BitBucket repositories.

It's pretty nice having status badges indicating if a build is passing or failing, but even better is also getting a coverage report.

I've been using django-coverage for this, and ages ago manually created a set of drone.io style badges, and added a patch to copy the relevant file across. But then, shortly after, drone.io changed their status badge format. I never got around to redoing my badges, as it was pretty time consuming.

Enter Pillow.

{% highlight python %}
from PIL import Image, ImageDraw, ImageFont

SIZE = (95, 18)

BACKGROUND = hex_colour('#4A4A4A')
SUCCESS = hex_colour('#94B944')
WARNING = hex_colour('#E4A83C')
ERROR = hex_colour('#B10610')

# You may need a different font filename if you aren't on a Mac
FONT = ImageFont.truetype(size=10, filename="/Library/Fonts/Arial.ttf")
FONT_SHADOW = hex_colour('#525252')

PADDING_TOP = 3

def build_image(percentage, colour):
    # Create a brand-new Image object, with the background
    # as the main badge colour.
    image = Image.new('RGB', SIZE, color=BACKGROUND)
    drawing = ImageDraw.Draw(image)
    
    # Write the word 'coverage' in our specified font.
    # Fake a text-shadow by drawing the text twice.
    # TODO: Make the text-shadow better.
    drawing.text((8, PADDING_TOP+1), 'coverage', font=FONT, fill=FONT_SHADOW)
    drawing.text((7, PADDING_TOP), 'coverage', font=FONT)
    
    # Do the percentage text.
    # TODO: Make the text-shadow better.
    # TODO: Make the text centred in the coloured box.
    drawing.rectangle([(55, 0), SIZE], colour, colour)
    drawing.text((63, PADDING_TOP+1), '%s%%' % percentage, font=FONT, fill=FONT_SHADOW)
    drawing.text((62, PADDING_TOP), '%s%%' % percentage, font=FONT)

{% endhighlight %}

Creating the required RGB tuple from a hex colour is also fairly easy:

{% highlight python %}
def hex_colour(hex):
    if hex[0] == '#':
        hex = hex[1:]
    return int(hex[:2], 16), int(hex[2:4], 16), int(hex[4:6], 16)
{% endhighlight %}

Finally, you can just generate an image for every percentage point, and save them:

{% highlight python %}

SUCCESS_CUTOFF = 85
WARNING_CUTOFF = 45

# range(101) -> [0, 1, 2, ..., 99, 100]
for i in range(101):
    file = open('%i.png' % i, 'wb')
    
    if i < WARNING_CUTOFF:
        build_image(i, ERROR).save(file)
    elif i < SUCCESS_CUTOFF:
        build_image(i, WARNING).save(file)
    else:
        build_image(i, SUCCESS).save(file)

{% endhighlight %}

It's not quite perfect: that isn't quite the font they use, but it will do for now.