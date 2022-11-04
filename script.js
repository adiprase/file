/* Delete ?m=1 */ var uri = window.location.toString();if (uri.indexOf("?m=1","?m=1") > 0) {var clean_uri = uri.substring(0, uri.indexOf("?m=1"));window.history.replaceState({}, document.title, clean_uri);}

/* Header Hide Down */ var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementByClass("HD-2 header").classList.remove('show');
    }
    else { document.getElementByClass("HD-2 header").classList.add('show');
    }
    prevScrollpos = currentScrollPos;
  }

