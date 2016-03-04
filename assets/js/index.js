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

document.addEventListener('DOMContentLoaded', pullPullQuotes());




