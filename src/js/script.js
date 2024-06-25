import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from 'dat.gui';
import burger from '../img/burger.jpg';
import cake from '../img/cheesecake.jpg';
import sushi from '../img/caifornia.jpg';
import star from '../img/star.jpg';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

//default it is false and 2 more step for shadow .receiveshadow and cast shadow 
renderer.shadowMap.enabled=true;  

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls(camera, renderer.domElement);

const axeshelper= new THREE.AxesHelper(4);
scene.add(axeshelper);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// const planeg=new THREE.PlaneGeometry(8,8);
// const planem= new THREE.MeshStandardMaterial({color:0xffffff,
// 	side:THREE.DoubleSide
// });
// const plane=new THREE.Mesh(planeg,planem);
// scene.add(plane);
// plane.rotation.x=-0.5*Math.PI;
// plane.receiveShadow=true;

const sphereg= new THREE.SphereGeometry(1,50,50);
const spherem=new THREE.MeshStandardMaterial({color:0xffbbdd,
	wireframe:false
}
	
);
const sphere= new THREE.Mesh(sphereg, spherem);
scene.add(sphere);
sphere.position.set(-2,2,0);
sphere.castShadow=true; //add castshadow to light also

//add light 
const ambientLight= new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight= new THREE.DirectionalLight(0xFFFFFF,0.8);
// scene.add(directionalLight);

// directionalLight.position.set(-7,9,5);
// directionalLight.castShadow=true;

// //to resize shadow camera box size
// directionalLight.shadow.camera.bottom=-1;

// const dLightHelper= new THREE.DirectionalLightHelper(directionalLight);
// scene.add(dLightHelper);

// //add shadowlighthelper
// const dShadowLightHelper= new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dShadowLightHelper);

//spotLight
const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-10,10,0);
spotLight.castShadow=true;
spotLight.decay=0.1;
spotLight.angle=0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//add fog
scene.fog=new THREE.Fog(0xFFFFFF, 0,200);
scene.fog=new THREE.FogExp2(0xFFFFFF, 0.01);

//change canvas bg color

renderer.setClearColor(0xacf3c3);
const textureLoader= new THREE.TextureLoader();
// scene.background=textureLoader.load(star);
// const cubeTextureLoader= new THREE.CubeTextureLoader();
// scene.background= cubeTextureLoader.load([burger, cake, sushi, burger, cake, sushi]);


//new cube 
const boxg = new THREE.BoxGeometry( 1, 1, 1 );
const boxm = new THREE.MeshBasicMaterial( );

const multiMaterial= [
	new THREE.MeshBasicMaterial({map: textureLoader.load(burger)}),
	new THREE.MeshBasicMaterial({map: textureLoader.load(sushi)}),
	new THREE.MeshBasicMaterial({map: textureLoader.load(cake)}),
	new THREE.MeshBasicMaterial({map: textureLoader.load(burger)}),
	new THREE.MeshBasicMaterial({map: textureLoader.load(burger)}),
	new THREE.MeshBasicMaterial({map: textureLoader.load(burger)})
]; //can add multitexture for cube
const box = new THREE.Mesh( boxg, multiMaterial );
// scene.add( box );
box.position.set(2,2,2);
// box.material.map= textureLoader.load(burger);



//shader class
const sphereShaderg= new THREE.PlaneGeometry(2,2);
const sphereShaderm=new THREE.RawShaderMaterial({
	vertexShader:vertexShader,
	fragmentShader:fragmentShader,
	wireframe:false
}
	
);
const sphereShader= new THREE.Mesh(sphereShaderg, sphereShaderm);
scene.add(sphereShader);
sphereShader.position.set(1,1,1);


//add color pallet for sphere
const gui= new dat.GUI();
const options={
 sphereColor:'#ffea00',
 wireframe:false,
 speed:0.01,
 angle:0.2,
 penumbra:0,
 intensity:1
}

gui.addColor(options,'sphereColor').onChange(function(e){
	sphere.material.color.set(e);
}); //to displaycolor pallet and change color of sphere accordingly


//add color pallet for wireframe of sphere
gui.add(options,'wireframe').onChange(function(e){
	sphere.material.wireframe=e;
})

camera.position.set(0,1,5);
orbit.update();

// gui.add(options,'speed',0,0.1);
// gui.add(options,'angle',0,1);
// gui.add(options,'penumbra',0,1);
// gui.add(options,'intensity',0,1);

// track mouse position
const mousePosition= new THREE.Vector2();
window.addEventListener('mousemove', function(e){
	mousePosition.x= (e.clientX/window.innerWidth)*2-1;
	mousePosition.y= -(e.clientY/ this.window.innerHeight)*2+1;
});
const rayCaster= new THREE.Raycaster();

let step=0;
let sphereId= sphere.id;
box.name='burgerBox';
console.log(box.name);
function animate() {

// 	cube.rotation.x += 0.01;
// 	// cube.rotation.y += 0.01;
// // to bounce ball
// 	step+=options.speed;
// 	sphere.position.y=4* Math.abs(Math.sin(step));
// 	//height * increasing value that is called speed

// 	spotLight.angle=options.angle;
// 	spotLight.penumbra=options.penumbra;
// 	spotLight.intensity=options.intensity;
// 	sLightHelper.update();   //never forget to add it

	// //mouse positioning
	// rayCaster.setFromCamera(mousePosition,camera);
	// const intersects= rayCaster.intersectObjects(scene.children);
	// // console.log(intersects);

	// //set color of object with id
	// for(let i=0; i<intersects.length; i++){
	// 	if(intersects[i].object.id === sphereId)
	// 		intersects[i].object.material.color.set(0xFF0000);
		
	// 	if(intersects[i].object.name === 'burgerBox'){
	// 		intersects[i].object.rotation.x += 0.01;
	// 	}
	// }

	renderer.render( scene, camera );

}



//mesh basic material does not get affected b light
