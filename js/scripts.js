$(document).ready(function() {
    $.ajax('../config/main.json').done(function (main) {
        var languageLinks = document.getElementById('language');
        var availableLanguages = main.languages;
        var lang = window.location.pathname.substr(1, 2);
        for (i=0; i<availableLanguages.length; i++) {
            var a = document.createElement('a')
            a.setAttribute('id', availableLanguages[i])
            a.setAttribute('href', `/${availableLanguages[i]}/index.html`)
            a.innerHTML = availableLanguages[i].toUpperCase()
            if (availableLanguages[i] == lang) {
                a.className = 'isDisabled'
            }
            languageLinks.appendChild(a)
            if (availableLanguages.length - i > 1) {
                var separator = document.createElement('span');
                separator.innerHTML = ' / ';
                languageLinks.appendChild(separator);
            }
        }
        var characterTemplate = $("#handlebars-wholeContent").html();
        var compiledCharacterTemplate = Handlebars.compile(characterTemplate);
        $.ajax(`../config/${lang}.json`).done(function (config) {
            var headData = document.getElementById("title");
            headData.innerHTML = config.person.firstname_lastname + ' | ' + config.documentName;
            document.documentElement.setAttribute('lang', lang);
            document.querySelector('meta[name="robots"]').setAttribute("content", config.metaRobots);
            document.querySelector('meta[name="description"]').setAttribute("content", config.metaDescription);
            document.querySelector('meta[name="keywords"]').setAttribute("content", config.metaKeywords);
            document.querySelector('meta[name="viewport"]').setAttribute("content", config.metaViewport);
            document.querySelector('meta[name="author"]').setAttribute("content", config.metaAuthor);
            document.querySelector('meta[property="og:image"]').setAttribute("content", config.metaogImage);
            document.querySelector('link[rel="stylesheet"]').setAttribute("href", config.linkBootstrap);
            document.querySelector('link[type="text/css"]').setAttribute("href", config.cssStyle);
            document.querySelector('link[rel="shortcut icon"]').setAttribute("href", config.favicon);
            document.querySelector('link[hreflang="pl"]').setAttribute("href", config.hreflang1);
            document.querySelector('link[hreflang="en"]').setAttribute("href", config.hreflang2);
            $(".wholeContent").html(compiledCharacterTemplate(config));
        });
    });
});

