import './style.css'

import * as THREE from 'three'; 

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Always need the following 3 objects
//Scene 
//Camera 
//Renderer

//The following indented will make canvas full window size

  const scene = new THREE.Scene();
  // (75 = FOV,  Aspect Ratio based off user window, View Frustrum 
  const camera= new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, .01, 1000 );

  //which dom element to use which is canvas with id
  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#backgnd'),
  })

  //set pixel ratio to user window pixle ratio
  renderer.setPixelRatio(window.devicePixelRatio);

  //set it to a fill screen canvas by setting it to the window size 
  renderer.setSize(window.innerWidth, window.innerHeight);

  //position to move along the Z-axis
  camera.position.setZ(30);

  //pass the scene and camera to display
  renderer.render(scene, camera)


//Next we will Add and Obj to the screen

  //When creating an Obj you need 3 things 
    // 1) Geometry = the {x,y,z} point that make a shape
    // 2) Material = Wrapping paper for an obj
    // 3) Mesh = Geometry + Material

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

  //MeshBasicMaterial Requiers no light source  add   
  const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );

  const torus = new THREE.Mesh(geometry, material);
  
  scene.add(torus)

//Lighting

  //pointLight acts like a spotlight
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, 10)

  //ambientLight applies light everywhere evenly
  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

  //Places a wireFrame on the PointLight source
  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper)


//controls
  //enables user to look around
  const controls = new OrbitControls(camera, renderer.domElement);

//add randomly generated stars in background
function addStar(){

  const geometry = new THREE.SphereGeometry(.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} )
  const star = new THREE.Mesh(geometry, material);

  //fills an array with 3 values mapped to function that
  //randomly generates a number between -100 and 100
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  //sets the starts position to the randomly generated points
  star.position.set(x, y, z);
  scene.add(star)
}
//adds
Array(200).fill().forEach(addStar)





  //Function to automatically update and loop like frames in a game.
  function animate(){
    requestAnimationFrame(animate)
    
    torus.rotation.x += .01 ;
    torus.rotation.y += .005 ;
    torus.rotation.z += .01 ;

    controls.update();
    renderer.render(scene, camera);
  }


  animate()
