(function ($, app) {

  var Scrollopotamus = function () {}

  Scrollopotamus.prototype = {
    calves: [],
    init: function() {
      $(window).bind('scroll', this.scroll.proxy(this));
      $(window).bind('resize', this.resize.proxy(this));
    },
    scroll: function() {
      for (var i = 0; i < this.calves.length; i++) {
        this.calves[i].scroll.proxy(this.calves[i])(window.scrollY);
      }
    },
    resize: function() {
      for (var i = 0; i < this.calves.length; i++) {
        this.calves[i].init.proxy(this.calves[i])();
      }
    },
    listen: function(el, options) {
      var calf = new this.Calf(el, options);
      this.calves.push(calf);
    }
  };

  Scrollopotamus.prototype.Calf = function (el, points) {
    if (el.length == 0)
      return;
    this.el = $(el);
    this.points = points;
    this.init()
  };
  Scrollopotamus.prototype.Calf.prototype = {
    scrollTop: 0,
    init: function() {
      this.points = this.points.map(function(point) {
        point._point = point.point.call(this);
        return point;
      }, this);
      this.scroll(window.scrollY);
      return this;
    },
    scroll: function(scrollTop) {
      this.points.map(function(point) {
        console.log('this.scrollTop', this.scrollTop, 'point._point', point._point, 'scrollTop', scrollTop);
        if (this.testOrdering(this.scrollTop, point._point, scrollTop)) {
          point.down.call(this);
        } else if (this.testOrdering(scrollTop, point._point, this.scrollTop)) {
          point.up.call(this);
        }
      }, this);
      this.scrollTop = scrollTop;
      return this;
    },
    testOrdering: function(/* polymorphic */) {
      var points = arguments,
          previous = points[0];
      for (var i = 0; i < points.length; i++) {
        if (previous > points[i]) {
          return false;
        } else {
          previous = points[i];
        }
      }
      return true;
    }
  };

  app.scrollopotamus = new Scrollopotamus();

}(jQuery, app.vg));
