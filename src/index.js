import './style/main.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * GUI Controls
 */
// import * as dat from 'dat.gui'
// const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

//texture loader
const texLoader = new THREE.TextureLoader()
texLoader.crossOrigin = "Anonymous"
const photoMe = texLoader.load('https://i.ibb.co/tb5xcvy/photo.jpg')
const textMe = texLoader.load('https://i.ibb.co/qNCp73S/text.png')
//--------------------------------------------------//

//Sphere1
const sphere1geometry = new THREE.SphereGeometry(15, 12, 6)
const sphere1material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, wireframe: true} )
const sphere1 = new THREE.Mesh( sphere1geometry, sphere1material )

//sphere2
const sphere2geo = new THREE.SphereGeometry(13, 12, 6)
const sphere2mat = new THREE.MeshNormalMaterial({flatShading: true, side: THREE.DoubleSide})
const sphere2 = new THREE.Mesh(sphere2geo, sphere2mat)
//star
const starGeo = new THREE.BufferGeometry()
const starCnt = 4000
const posArray = new Float32Array(starCnt * 3)

for(let i = 0; i < starCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 75
}

starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const starMat = new THREE.PointsMaterial({
  size: 0.005
})
const star = new THREE.Points(starGeo, starMat)

//yourphoto
const photoGeo = new THREE.PlaneGeometry ( 3, 3 )
const photoMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide, map: photoMe})
const photo = new THREE.Mesh( photoGeo, photoMat )
photo.position.x = -1.5

//your Profile
const textGeo = new THREE.PlaneGeometry(3, 5)
const textMat = new THREE.MeshBasicMaterial({color: 0x282929, side: THREE.DoubleSide, transparent:true, opacity: 1.5, map: textMe})
const text = new THREE.Mesh(textGeo, textMat)
text.position.x = 2.5



//lighting
const ambientLight = new THREE.AmbientLight(0xffffff)

//group
const aboutMeGroup = new THREE.Group()
aboutMeGroup.add(text, photo) 

//add Things here
scene.add(ambientLight, sphere1, sphere2, star, aboutMeGroup)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 50
scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.autoRotate = true
// // controls.enableZoom = false
// controls.enablePan = false
// controls.dampingFactor = 0.05
// controls.maxDistance = 1000
// controls.minDistance = 30
// controls.touches = {
//   ONE: THREE.TOUCH.ROTATE,
//   TWO: THREE.TOUCH.DOLLY_PAN,
// }
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//cameracontrol
const aboutMe = document.querySelector('section')
const header = document.querySelector('header')
const back = document.querySelector('#back')

function aboutMeCamera() {
  camera.position.setLength(7)
  if (aboutMe.style.display === 'none') {
    aboutMe.style.display = 'block'
    header.style.display = 'block'
    back.style.display ='none'
  }
  else {
    aboutMe.style.display ='none'
    header.style.display ='none'
    back.style.display='inline-flex'
  }
}
function backCamera() {
  camera.position.setLength(50)
  if (back.style.display === 'none') {
    aboutMe.style.display ='none'
    header.style.display = 'none'
    back.style.display = 'inline-flex'
  }
  else {
    aboutMe.style.display = 'block'
    header.style.display ='block'
    back.style.display = 'none'
  }
}

back.onclick = backCamera
aboutMe.onclick = aboutMeCamera

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //animation
    sphere1.rotation.y += 0.001
    sphere1.rotation.z += 0.001
    sphere1.rotation.x += 0.001

    sphere2.rotation.y += 0.001
    sphere2.rotation.z += 0.001
    sphere2.rotation.x += 0.001

    star.rotation.y += -0.0011
    star.rotation.x += 0.0011
    star.rotation.z += -0.0011

  // Update controls
  // controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
