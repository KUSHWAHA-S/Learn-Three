attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
void main() {

    vPosition= position;
    vNormal= normal;
    vUv=uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

//attribute
//uniform


//step(edge, vuv.x)    ... return vUv.x>= edge ? 1:0;  gives hard edge 
//smoothstep(min, max,vUv.x); same as step but not direct jump just a smooth graph
//length(vuv)...going fro 0 to 1
//fract(vuv.x *10)....i/p=1.2  o/p= 0.2   gives after decimal number but in float
//mod of 1 is fract.... fract(vuv.x*10)= mod(vuv.x *10.0 ,1.0)
//mix()
//dot(vecA, vecB)   ..casts shadow of A on b 
//can't modify a varying