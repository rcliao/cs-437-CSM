Project CSM
===========

#### Setup Testing Environment:

Steps by steps in windows(sorry, I only have microsoft):

* note: before start the following steps, please download the [node.js](http://nodejs.org) first; then download the content of github
    * there are a few ways to download from github, first using git bash
    * i think you can also click on "zip" button and it will be downloaded automatically
    * if you have trouble getting environment done, please post on group as soon as possible, I'm willing to help
* once you are done with downloading the above things (node.js) you can do the following thing to test the environment

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
