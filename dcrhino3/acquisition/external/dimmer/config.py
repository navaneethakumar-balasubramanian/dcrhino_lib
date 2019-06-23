#!/usr/bin/env python3

# command to backlight or xbacklight or acpilight
backlight_cmd = "/usr/bin/xbacklight"

# milliseconds to switch brightness, xbacklight time
xb_time = 5000

# steps to change brightness, xbacklight steps
xb_steps = 5 * 25

# ignores brightness changes when the difference
# is under threshold
update_threshold = 5

# seconds, time between photo detection
sleep = 5

# if brightness=0 should be blocked
block_zero_brightness = False

#screen name
display = "eDP-1"

#calibration offset
offset = 25
