Project CSM
===========

#### Setup Testing Environment:

Steps by steps in windows(sorry, I only have microsoft):

* note: before start the following steps, please download the [node.js](http://nodejs.org) and [mongodb](http://www.mongodb.org/downloads) first; then download the content of github
    * there are a few ways to download from github, first using git bash or github software (which i went over it in class)
    	* for github, please click on synch to download the latest version
        * for git bash, please direct you to the folder(c:/user/[username]/cs-437-CSM) and type
	> git pull origin master
    * if you have trouble getting environment done, please post on group as soon as possible, I'm always willing to help
* once you are done with downloading the above things (node.js, mongodb, and github) you can do the following thing to test the environment

1. start the mongo server
    * by clicking on mongod.exe under mongo directive

2. open "commmand prompt"

3. direct yourself to this folder (example: c:/user/[username]/cs-437-CSM)

4. type in
> node server.js

* note: if you cannot run node.js due to lack of 'expresss' please do the following two steps
    1. type
> npm install express
    2. type
> npm install mongojs

5. open browser and type in
> localhost:8000/index.html

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
