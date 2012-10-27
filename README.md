# flystyler library for Titanium Alloy
=========

## Overview

This cool tool allows you to update your UI styles on the fly while you're running the app.

## Usage

1. Copy flystyler.js into your app/lib directory
2. require flystyler in any view you want to dynamically style
3. init flystyler with the url of the dynamic stylesheet and your root view

## Usage Example

Require and init flystyler in your controller (in this case createConfiguration.js) with one step like this:

	require("flystyler").init("http://localhost/~treinberger/createConfiguration.tss", $.winCreateConfiguration);

That's it. Of course, you'll need to have a (local) webserver serving the style document, e.g. "createConfiguration.tss".

If you change the document on the webserver, the corresponding view will change its design within two seconds.

Please note: currently, the view styles aren't reset to default values, so e.g. if as a first step change the property "left" of a view to "20dp" and then remove the property, the assignment "left:'20dp'" will apply for the view unless you explicitly change it to another value.

## Moarrr

Should you have an questions or suggestions, send me an [e-Mail](mailto:treinberger@appcelerator.com).