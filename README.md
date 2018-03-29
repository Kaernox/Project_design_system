## Welcome to Akkurate-Design-System

Akkurate-Design-System est un module AngularJS de directives et filtres.
Directives were created using Bootstrap 4 CSS framework.

## Usage

You simply have to inculde our module into your controller's dependencies and include our module's file ( dist/akkurate-design-system.js ) in your project.
Example : 
     `angular.module('todoApp', ['akkurate-design-system'])`

## Our module's dependencies
Your index file must have the following scripts included in order for our module to be fully functional

        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        
        <!-- Popper.js  -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        
        <!-- Bootstrap JS -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
        <!-- Angular him self, for a start -->
         <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
         
         <!-- Angular Sanitize -->
        <script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>

        <!-- Angular Notification -->
        <script src="bower_components/angular-ui-notification/dist/angular-ui-notification.min.js"></script>

        <!-- Angular Bootstrap UI -->
        <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>

        <!-- Angular Gettext -->
        <script src="bower_components/angular-gettext/dist/angular-gettext.min.js"></script>

        <!-- Angular Colorpicker -->
        <script src="bower_components/tinycolor/dist/tinycolor-min.js"></script>
        <script src="bower_components/angular-color-picker/dist/angularjs-color-picker.min.js"></script>
        
		<!-- Our module -->
        <script src="dist/akkurate-design-system.min.js"></script>
	    
	    <!-- Your scripts goes here -->
        <script src="your-script.js"></script>

 
## Live Example

This project includes a live example to help you test all our directives, to test our project, download it, go to the project folder and simply do  :

     bower install


## Source

Our source files are included in a folder named src, feel free to modify them as you see fit.
Then you can regenerate the module's file using Gulp, to do that, you first must have Gulp installed in your machine, then you must install it's dependencies :

    npm install
Then simply run : 

    gulp
This will generate the normal and the minified version of our module.