import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group)


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material_RED = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material_BLUE = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const material_GREEN = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube1 = new THREE.Mesh(geometry, material_RED)
const cube2 = new THREE.Mesh(geometry, material_BLUE)
const cube3 = new THREE.Mesh(geometry, material_GREEN)

cube1.position.set(2, 2, -1)
cube1.rotation.set(0.25, .25, 0.3)
cube2.rotation.set(1, .25, 0.3)

cube3.position.set(-2, -2, -1)
// mesh.rotateZ(Math.PI/4)
group.add(cube1)
group.add(cube2)
group.add(cube3)

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
camera.lookAt(group.position)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)