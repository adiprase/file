;
  (function(document, window, index) {
    &#39;use strict&#39;;

    var elSelector = &#39;.header&#39;,
      elClassHidden = &#39;header--hidden&#39;,
      throttleTimeout = 100,
      element = document.querySelector(elSelector);

    if (!element) return true;

    var dHeight = 0,
      wHeight = 0,
      wScrollCurrent = 0,
      wScrollBefore = 0,
      wScrollDiff = 0,

      hasElementClass = function(element, className) {
        return element.classList ? element.classList.contains(className) : new RegExp(&#39;(^| )&#39; + className + &#39;( |$)&#39;, &#39;gi&#39;).test(element.className);
      },
      addElementClass = function(element, className) {
        element.classList ? element.classList.add(className) : element.className += &#39; &#39; + className;
      },
      removeElementClass = function(element, className) {
        element.classList ? element.classList.remove(className) : element.className = element.className.replace(new RegExp(&#39;(^|\\b)&#39; + className.split(&#39; &#39;).join(&#39;|&#39;) + &#39;(\\b|$)&#39;, &#39;gi&#39;), &#39; &#39;);
      },

      throttle = function(delay, fn) {
        var last, deferTimer;
        return function() {
          var context = this,
            args = arguments,
            now = +new Date;
          if (last &amp;&amp; now &lt; last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
              last = now;
              fn.apply(context, args);
            }, delay);
          } else {
            last = now;
            fn.apply(context, args);
          }
        };
      };

    window.addEventListener(&#39;scroll&#39;, throttle(throttleTimeout, function() {
      dHeight = document.body.offsetHeight;
      wHeight = window.innerHeight;
      wScrollCurrent = window.pageYOffset;
      wScrollDiff = wScrollBefore - wScrollCurrent;

      if (wScrollCurrent &lt;= 0) // scrolled to the very top; element sticks to the top
        removeElementClass(element, elClassHidden);

      else if (wScrollDiff &gt; 0 &amp;&amp; hasElementClass(element, elClassHidden)) // scrolled up; element slides in
        removeElementClass(element, elClassHidden);

      else if (wScrollDiff &lt; 0) // scrolled down
      {
        if (wScrollCurrent + wHeight &gt;= dHeight &amp;&amp; hasElementClass(element, elClassHidden)) // scrolled to the very bottom; element slides in
          removeElementClass(element, elClassHidden);

        else // scrolled down; element slides out
          addElementClass(element, elClassHidden);
      }

      wScrollBefore = wScrollCurrent;
    }));