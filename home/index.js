let words = ['aquatipode', 'julipode', 'coalition', 'access', 'pode central', 'podiverse', 'blogipode', 'welcome', 'blue dish', 'pcotandy',
    'fediverse', 'pcotandy', 'webmain', 'brattleboro', 'decentralize', 'sumj', 'sunpode', 'wisdomoc', 'half moon', 'middleoak', 'middlemoon',
    'opus impetus', 'synchip', 'julite', 'insight', 'juiliul', 'idle hour', 'tandy', 'yamaha slg', 'web services', 'music', 'contact', 'javascript',
    'html', 'css', 'nano', 'tandypod', 'deep blue', 'deeno+me', 'activitypub', 'cybre.space', 'cybernetics', 'webring', 'resonance', 'resound', 'arrange',
    'balearic', 'classical', 'jazz', 'easy listening', 'research', 'study', 'gibbous  moon', 'soundcanvas', 'mc-505', 'x3d', 'soothing', 'green deck',
    'pink cube', 'digicd', 'tandylinx', 'preset'
]

let wrapper = document.querySelector('#wrapper');
const mousePosText = document.getElementById('mouse-pos');
let mousePos = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', (event) => {
    mousePos = {
        x: event.clientX,
        y: event.clientY
    };
});

setTimeout(() => {
    setInterval(() => {

        setTimeout(() => {
            let x = document.createElement('div');
            x.style.position = "absolute";
            x.style = `position: absolute; top: ${Math.random() * innerHeight}px; left: ${Math.random() * innerWidth}px;`;
            x.innerText = words[Math.floor(Math.random() * words.length)];
            x.style.fontSize = `${Math.random()*20+20}pt`
            x.className = "random auto"
            x.tabIndex = '-1'
            wrapper.appendChild(x)
            setTimeout(() => {
                x.remove()
            }, 2000);
        }, Math.random * 10000);

    }, 200);
}, 500);