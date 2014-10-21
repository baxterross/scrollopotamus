Scrollopotamus
==============
A super-lightweight Javascript scrollspy

## Implementation
```
scrollopotamus.init().listen($('#element'), [
  {
    name: 'tripwire',
    point: function() {
      return this.el.offset().top;
    },
    down: function() {
      this.el.addClass('fixed');
    },
    up: function() {
      this.el.removeClass('fixed);
    }
  }
]);
```

- In the 'stick' and 'unstick' methods, 'this' is an Scrollopotamus.Calf object which wraps the DOM element being manipulated.
- 'this.el' is a reference to the element passed as the first arguement to the 'listen' method.
- 'listen' may be called before or after 'init', it will function identicallly
- the 'init' and 'listen' methods should be called at or after DOMReady
- Scrollopotamus requires JQuery, future versions may remove this dependency
