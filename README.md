# techDegreeProject_08

Here is what verion I am using.

Node version v6.15.0,
NPM version 3.10.10
Gulp version 3.9.1

Assignment:

1) You'll be required to set up a Gulp build process to prepare the website for deployment.
2) The build process must fulfill the following criteria.
3) Concatenate and minify the JavaScript files
4) Compile SCSS in CSS in a concatenated and minified file
5) Generate JavaScript and CSS source maps
6) Compress any JPEG or PNG files

All output for the build process should be in a dist folder for distribution or deployment.


Run npm install to install all dependencies.

Run gulp scripts to concatenate, minify, and copy all js files into an all.min.js then copied to the dist/scripts folder also the source map will also generate.

Run gulp styles to compile the SCSS files into CSS, then concatenate and minify into an all.min.css file then copied to the dist/styles folder also the source map will also generate.

Run gulp images command to optmize the size of the project's JPEG and PNG files, then copy to the dist/content folder.

Run gulp clean command to delete all files and folder in the dist folder.

Run gulp build command to clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.

Run gulp command to run the build task and serve my project using the local web server.

Extra Credit

When I run the default gulp command, it should continuously watch for the changes to any .scss file in my project. When there is a change to one of the .scss files, the gulp styles command is run and the files are compiled, concatenated, and minified to the dist folder


