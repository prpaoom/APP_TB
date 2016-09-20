var KnownImageExtensions = {};
KnownImageExtensions["png"] = true;
KnownImageExtensions["jpg"] = true;
KnownImageExtensions["gif"] = true;

// TODO: portfolios
// TODO: youtube embeds

function playYoutube(play_id:any) {
    // Create an iFrame with autoplay set to true
    //var iframeUrl = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
    var iframeUrl = "https://www.youtube.com/embed/" + play_id + "?autoplay=1&autohide=1";
    if ($('#'+play_id).data('params')) {
        iframeUrl += '&' + $('#'+play_id).data('params')
    }

    // The height and width of the iFrame should be the same as parent
    var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframeUrl, 'width': $('#'+play_id).width(), 'height': $('#'+play_id).height()});

    // Replace the YouTube thumbnail with YouTube HTML5 Player
    $('#'+play_id).replaceWith(iframe);
}

interface YoutubeVideoIdExtractor {
    urlPrefix:string;
    (urlSuffix:string):string;
}
var youtubeComExtractor = <YoutubeVideoIdExtractor> function (urlSuffix:string) {
    var captured = /v=([^&]+)/.exec(urlSuffix)[1];
    return captured ? captured : null;
};
youtubeComExtractor.urlPrefix = "youtube.com/watch";

var youtubeExtractor = <YoutubeVideoIdExtractor> function (urlSuffix:string) {
    var idx1 = urlSuffix.indexOf("/");
    if (idx1 < 0) {
        return urlSuffix;
    } else if (idx1 > 0) {
        return urlSuffix.substring(0, idx1);
    }
    urlSuffix = urlSuffix.substr(1);
    var idx2 = urlSuffix.indexOf("/");
    if (idx2 < 0) {
        return urlSuffix;
    }
    return urlSuffix.substr(0, idx2);
};
youtubeExtractor.urlPrefix = "youtu.be";
var YOUTUBE_VIDEO_ID_EXTRACTORS:Array<YoutubeVideoIdExtractor> = [youtubeComExtractor, youtubeExtractor];

function findYoutubeVideoIdExtractor(url:string):YoutubeVideoIdExtractor {
    if (!url || url.length == 0) {
        return null;
    }
    if (url.indexOf("www.") == 0) {
        url = url.substring(4);
    }
    url = url.toLocaleLowerCase();
    for (var i = 0; i < YOUTUBE_VIDEO_ID_EXTRACTORS.length; i++) {
        var e = YOUTUBE_VIDEO_ID_EXTRACTORS[i];
        if (url.indexOf(e.urlPrefix) == 0) {
            return e;
        }
    }
    return null;
}

function replaceWithYoutubeEmbed(url:string, fallback:string) {
    var e = findYoutubeVideoIdExtractor(url);
    if (e == null) {
        return null;
    }
    var videoId = e(url.substr(e.urlPrefix.length));
    if (!videoId) {
        return fallback;
    }
    var style = "background-image: url(https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg);";
    var block = "<div id='" + videoId + "' class='youtube' style='" + style + "'>" + "<div class='play'></div></div>";
    //var script = "<script>$(document).delegate('#" + videoId + "', 'click', $site.Utils.playYoutube);</script>";
    return block; //+ script;
}

function getLinkReplacement(link:string):string {
    var lcLink = link.toLocaleLowerCase();
    var url = link;
    if (lcLink.indexOf("http://") == 0) {
        url = link.substr(7);
    } else if (lcLink.indexOf("https://") == 0) {
        url = link.substr(8);
    }
    var lcUrl = url.toLocaleLowerCase();
    var ext = lcUrl.split('.').pop();
    if (ext in KnownImageExtensions) {
        return "<a href='" + link + "' target='_blank'><img src='" + link + "' style='max-width: 400px; max-height: 300px;'></a>"
    }
    if (findYoutubeVideoIdExtractor(url) != null) {
        return replaceWithYoutubeEmbed(url, null);
    }
    return null;
}

function processMediaLinks(text:string):string {
    var res = text;
    var startIdx = res.indexOf("<a href=");
    while (startIdx >= 0) {
        var endIdx = res.indexOf("</a>", startIdx);
        if (endIdx < 0) {
            break;
        }
        var hrefStartIdx = startIdx + 9;
        var hrefEndIdx = res.indexOf('"', hrefStartIdx + 1);
        if (hrefEndIdx > 0) {
            var link = res.substring(hrefStartIdx, hrefEndIdx);
            var replacement = getLinkReplacement(link);
            if (replacement != null) {
                res = res.substring(0, startIdx) + replacement + res.substring(endIdx + 4);
                endIdx = startIdx + replacement.length;
            }
        }
        startIdx = res.indexOf("<a href=", endIdx);
    }
    return res;
}

export default {
    processMediaLinks: processMediaLinks,
    playYoutube: playYoutube
}