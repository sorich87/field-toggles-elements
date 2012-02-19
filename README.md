Field Toggles Elements
==================================================

Sometimes you want to hide form fields or other HTML elements on the page
based on the value of some form fields.
Field Toggles Elements is a jQuery plugin that allows you to do that
without writing a bunch of javascript code.

Basic example
--------------------------------------

Show all the `p` elements and hide all the `span` elements on the page when
the value entered in a text input is 'test'.

```javascript
$("input[type='text']").fieldTogglesElements({
  values: 'test',
  forTrue: 'p',
  forFalse: 'span'
});
```
