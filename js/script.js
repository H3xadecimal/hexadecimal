function loadContent(href, ex) {
    load('only-load', href);

    let links = document.getElementsByClassName('header')[0].getElementsByTagName('ul')[0].getElementsByTagName('a');

    for (var i in links) {
        let link = links[i];

        link.className = '';
   }

   Array.from(links).filter(e => e.href === href)[0].className = 'current';
}

function load(div, url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var elements = new DOMParser().parseFromString(request.responseText, 'text/html').firstChild;
                elements = Array.from(elements.children[1].children).filter(e => e.id === 'only-load')[0];
                document.getElementById(div).innerHTML = elements.innerHTML;
            } else {
                throw new Error('request machine 🅱roke: ' + request.status);
            }
        }
    }

    request.open('GET', url, true);
    request.send();
}

if (window.history && location.protocol !== 'file:') {
    var links = document.getElementsByClassName('header')[0].getElementsByTagName('ul')[0].getElementsByTagName('a');

    for (var i in links) {
        var link = links[i];

        link.onclick = function(e) {
            history.pushState(null, null, this.href);
            loadContent(this.href);

            e.preventDefault();
        }
    }

    window.addEventListener('popstate', function() {
        var link = location.pathname.replace(/^.*[\\/]/, '');
        loadContent(link);
    });
}

if (document.getElementsByClassName('ie-notif')[0]) {
    document.body.style.paddingLeft = '0';
    document.body.style.paddingRight = '0';
}