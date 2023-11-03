function hue(on, contentType) {
    var hueRotate = 0;
    var grayscale = 0;
    switch (contentType) {
        case "words":
            hueRotate = 45;
            break;
        case "link-dump":
            hueRotate = 246;
            grayscale = .9;
            break;
        case "music":
            hueRotate = 180;
            break;
        case "tutorial":
            hueRotate = 90;
            break;
        default:
            break;
    }
    hoverEvent(on);
    document.querySelector('#bg').style.filter = on ?
        `hue-rotate(${hueRotate}deg) grayscale(${grayscale}) drop-shadow(-13px 8px 4px #000)` :
        "hue-rotate(0deg) drop-shadow(-13px 8px 4px #000)";
    document.querySelector('#contentType').innerText = contentType ? contentType : "Hover post for insight"
    document.querySelector('#mobileContentType').innerText = contentType ? contentType :
        "Hover post for insight"
}