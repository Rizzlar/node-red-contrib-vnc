# node-red-contrib-vnc
Node-red node allowing control of a VNC Server

*N.B. This has been thrown together for a personal project and it's most-likely not efficent and doesn't have much error handling! I have released it as I cannot find VNC nodes elsewhere so it may be useful to others for similar purposes. I will try to release updates when time permits*


## Current Nodes
* **vnc-client** - Configuration node containing server details
* **info** - Gets server info (name, height and width)
* **keyboard** - Allows sending of key presses or strings to the remote server
* **mouse** - Allows sending of mouse movememnts and button presses to the remote server
* **clipboard** - Allows sending or receiving of clipboard to/from the remote server
* **screenshot** - Returns a screenshot from the remote server as a PNG buffer

## To-Do
* Change credentials to use Node's credentials functions
* Example flows to follow

## Pre-requesites
None!

## Credits
* **node-rfb2** - https://github.com/sidorares/node-rfb2
* **JIMP** - https://github.com/oliver-moran/jimp
