(function ($, app) {

  var Scrollopotamus = function () {

  }
  
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
      calf.init();
      this.calves.push(calf);
    },
    Calf: function (el, options) {
      var el = $(el);
          options.stick = options.stick || function() {},
          options.unstick = options.unstick || function() {};
      this.el = el;
      this.el.bind('stick', options.stick.proxy(this));
      this.el.bind('unstick', options.unstick.proxy(this));
    }
  };

  Scrollopotamus.prototype.Calf.prototype = {
    offsetTop: 0,
    scrollTop: 0,
    init: function() {
      console.log('init');
      this.offsetTop = this.el.offset().top;
      this.scroll(window.scrollY);
      return this;
    },
    scroll: function(scrollTop) {
      if (this.scrollTop < this.offsetTop && scrollTop >= this.offsetTop) {
        this.stick()
      } else if (this.scrollTop >= this.offsetTop && scrollTop < this.offsetTop) {
        this.unstick();
      }
      this.scrollTop = scrollTop;
      return this;
    },
    stick: function() {
      this.el.trigger('stick');
      return this;
    },
    unstick: function() {
      this.el.trigger('unstick');
      return this;
    }
  };

  app.scrollopotamus = new Scrollopotamus();

}(jQuery, app.vg));
