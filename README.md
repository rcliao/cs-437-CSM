Project CSM
===========

#### Setup Testing Environment:

Steps by steps in windows(sorry, I only have microsoft):

1. open "commmand prompt"

2. direct yourself to this folder (example: c:/user/[username]/cs-437-CSM)

3. type in
> node scripts/web-server.js

4. open browser and type in
> localhost:8000/app/index.html

note:
if you have any question on setting up environment, please feel free to post it on group or email me in person; I will go over it with you in person.

#### File structure:

* app/
> this is where we store all our pages, css, and javascripts files

    * app/css
    > store css files

    * app/img
    > store images

    * app/js
    > store java scripts

    * app/lib
    > where we store all our libraries (e.g. angularjs)

    * app/partials
    > where partials pages should be stored (we will store all routing pages)

    all other static pages should be here.

* scriptes/
> this is an easy setup for our testing environment by using node.js
