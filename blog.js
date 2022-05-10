let canvas = document.getElementById('bg');
let z = {};

z.three = {};
z.three.camera = new THREE.PerspectiveCamera(45, document.querySelector('#test').clientWidth /
    (.75 * document.querySelector('#test').clientWidth), 1, 500);
z.three.scene = new THREE.Scene();
z.three.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: document.querySelector('#bg')
});
z.three.light = new THREE.DirectionalLight(0xfdfdfd, .5);
z.three.light.position.set(2, 2, 1).normalize();
z.three.ambientLight = new THREE.AmbientLight(0x000022);
z.three.textureLoad = new THREE.TextureLoader();
let rotationSpeed = .01;

z.audio = {};
z.junk = {};

z.select = {};
z.select.image = '';
z.select.loaded = '';
z.select.hasLoaded = false;


async function hoverEvent(hovering) {
    rotationSpeed = hovering ? .075 : .01;
}

function animate() {

    requestAnimationFrame(animate);

    z.junk.torus.rotation.x += rotationSpeed;
    z.junk.torus.rotation.y += rotationSpeed;

    z.three.renderer.render(z.three.scene, z.three.camera);

    //Fix for load lag
    if (z.select.hasLoaded && z.select.loaded != z.select.image) {
        z.select.hasLoaded = false;
        hoverEvent(z.select.image);
    }
}

function setupWorld() {
    // const loader = new THREE.TextureLoader();
    var material = new THREE.MeshPhongMaterial({
        // light
        specular: 0xD76531,
        // intermediate
        color: 0xef8834,
        // dark
        emissive: 0x8c2317,
        shininess: 10,
        wireframe: false,
    });

    const color = 0xFFFFFF; // white
    const near = 10;
    const far = 100;

    const geometry = new THREE.TorusKnotGeometry(4.0, 4.0, 19, 10, 4, 2);

    z.junk.torus = new THREE.Mesh(geometry, material);
    z.three.scene.add(z.junk.torus);
    z.three.scene.add(z.three.light);
    z.three.scene.add(z.three.ambientLight);
}

function onWindowResize() {
    z.three.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    z.three.camera.updateProjectionMatrix();
    z.three.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function init() {
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    z.three.camera.position.z = 25;
    setupWorld();
    animate();
}
window.addEventListener('DOMContentLoaded', (e) => {
    init();
});