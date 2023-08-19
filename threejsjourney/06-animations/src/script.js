import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */

const clock = new THREE.Clock();

const renderLoop = () => {
    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime;

    mesh.position.z = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop);
}

renderLoop();

