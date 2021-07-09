function previousElementSibling( elem ) {
  do {
    elem = elem.previousSibling;
  } while ( elem && elem.nodeType !== 1 );
  return elem;
}

function pullPullQuotes(){
  var pullquotes = document.getElementsByClassName('pullquote');
  for (var i = 0; i < pullquotes.length; i++) {
    var el = pullquotes[i];
    for (var i = 0; i < 10; i++){
      if (el.parentNode.nodeName == "P"){
        var parentParagraph = el.parentNode;
        break;
      }
    }
    if (previousElementSibling(parentParagraph).nodeName == "P"){
      parentParagraph = previousElementSibling(parentParagraph);
    }
    var newEl = el.cloneNode(true);
    newEl.classList.add('pullquote--pulled');
    newEl.classList.remove('pullquote');
    parentParagraph.insertBefore(newEl, parentParagraph.firstChild);
  }
}

var images = document.querySelectorAll('.kg-gallery-image img');
images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
})

document.addEventListener('DOMContentLoaded', pullPullQuotes());


// Code for members notifications
// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var action = getParameterByName('action');
var stripe = getParameterByName('stripe');
document.addEventListener("DOMContentLoaded", function(event) {

  // These classes can be used to show success notifications for each action.

  var notifications = document.getElementById("notifications");
  notifications.onclick = function(e){
    notifications.hidden = true;
    notifications.style.display = "none";
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
  }
  if (action == 'subscribe') {
    document.body.classList.add("subscribe-success");
    notifications.innerHTML = "You've successfully subscribed to " + siteTitle;
  }
  if (action == 'signup') {
    window.location = '{{@site.url}}/signup/?action=checkout';
  }
  if (action == 'checkout') {
    document.body.classList.add("signup-success");
    notifications.innerHTML = "Great! Next, complete checkout for full access to " + siteTitle;
  }
  if (action == 'signin') {
    document.body.classList.add("signin-success");
    notifications.innerHTML = "Welcome back! You've successfully signed in.";
  }
  if (stripe == 'success') {
    document.body.classList.add("checkout-success");
    notifications.innerHTML = "Success! Your account is fully activated, you now have access to all content.";
  }
  if (stripe == 'billing-update-success') {
    document.body.classList.add("billing-success");
    notifications.innerHTML = "Success! Your billing info is updated.";
  }
  if (stripe == 'billing-update-cancel') {
    document.body.classList.add("billing-cancel");
    notifications.innerHTML = "Billing info update failed."
  }
  if (action || stripe) {
    notifications.hidden = false;
    notifications.style.display = "block";
    URLSearchParams.delete(action);
    URLSearchParams.delete(stripe);
  }
});


// Vanilla version of FitVids
// Licencened under WTFPL
// source: https://css-tricks.com/fluid-width-video/

// List of Video Vendors embeds you want to support
var players = ['iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="vimeo.com"]'];

// Select videos
var fitVids = document.querySelectorAll(players.join(","));

// If there are videos on the page...
if (fitVids.length) {
  // Loop through videos
  for (var i = 0; i < fitVids.length; i++) {
    // Get Video Information
    var fitVid = fitVids[i];
    var width = fitVid.getAttribute("width");
    var height = fitVid.getAttribute("height");
    var aspectRatio = height / width;
    var parentDiv = fitVid.parentNode;

    // Wrap it in a DIV
    var div = document.createElement("div");
    div.className = "video-wrapper";
    div.style.paddingBottom = aspectRatio * 100 + "%";
    parentDiv.insertBefore(div, fitVid);
    fitVid.remove();
    div.appendChild(fitVid);

    // Clear height/width from fitVid
    fitVid.removeAttribute("height");
    fitVid.removeAttribute("width");
  }
}
