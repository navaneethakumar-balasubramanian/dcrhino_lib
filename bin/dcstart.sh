#!/bin/bash
export DISPLAY=:0.0
source /home/field/anaconda2/bin/activate py2; /usr/bin/lxterminal -e python /home/field/Documents/dcrhino_lib/bin/rhino_gui.py &
source /home/field/anaconda2/bin/activate py2; /usr/bin/lxterminal -e python /home/field/Documents/dcrhino_lib/bin/rhino_screen_dimmer.py &
