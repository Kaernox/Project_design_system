## Welcome to Akkurate-Design-System

Akkurate-Design-System is a module for AngularJS which contains directives and filters.
Directives were created using Bootstrap 4 CSS framework.

## Usage

You simply have to inculde our module into your controller's dependencies and include our module's file ( dist/akkurate-design-system.js ) in your project.
In our example, we created another module named 'AkkurateDesignSystem' to test our components module, you can change that with your module's name :
     `angular.module('AkkurateDesignSystem', ['akkurate-design-system'])`
Feel free to change the source code of the components.html file to see how our directives react.

## Our module's dependencies
Your index file must have the following scripts included in order for our module to be fully functional

        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
         integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

        <!-- Popper.js  -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
         integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

        <!-- Bootstrap JS -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
         integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

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

This project includes a live example to help you test all our directives, to test our project, after you download it, go to the project folder and simply run the following command  :

     bower install

Then host the project into any server (we used MAMP), go to the home page and then go to the components page to see all the components we have to offer.

## Source

Our source files are included in a folder named src, feel free to modify them as you see fit.
Then you can regenerate the module's file using **Gulp**, to do that, you first must have **Gulp** installed in your machine, then you must install it's dependencies :

    npm install
Then simply run :

    gulp
This will generate the normal and the minified version of our module, a file containing only the template cache and a generated css file from sass source. This command must be executed whenever you modify any file within the **src** folder.

## Package content
        ├── dist
        │   ├── akkurate-design-system.css
        │   ├── akkurate-design-system.css
        │   ├── akkurate-design-system.min.css
        │   └── akkurate-design-system.templates.css
        ├── docs
        │   ├── components.html
        │   └── home.html
        ├── manifest
        ├── sass
        │   ├── base
        │   │   └── *.sass
        │   ├── components
        │   │   └── *.sass
        │   └── *.sass
        ├── src
        │   ├── directives
        │   │   └── *.js
        │   ├── filters
        │   │   └── akk-filters.js
        │   └── templates
        │       ├── includes
        │       ├── modals
        │       │   └── *.html
        │       ├── overload
        │       │   └── datepicker
        │       │        └── *.html
        │       └── *.html
        ├── bower.json
        ├── gulpfile.js
        ├── index.html
        ├── package.json
        ├── README.md
        └── script.js
