function hue(on, contentType) {
    var hueRotate = 0;
    var grayscale = 0;
    var brightness = 1;
    var saturation = 1;
    switch (contentType) {
        case "words":
            // hueRotate = 45;
            brightness = 4.5;
            saturation = .7
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
        case "events":
            hueRotate = 320;
            break;
        default:
            break;
    }
    hoverEvent(on);
    document.querySelector('#bg').style.filter = on ?
        `hue-rotate(${hueRotate}deg) grayscale(${grayscale}) drop-shadow(-13px 8px 4px #000) brightness(${brightness}) saturate(${saturation})` :
        "hue-rotate(0deg) drop-shadow(-13px 8px 4px #000)";
    document.querySelector('#contentType').innerText = contentType ? contentType : "Hover post for insight"
    document.querySelector('#mobileContentType').innerText = contentType ? contentType :
        "Hover post for insight"
}