precision mediump float;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;



// float drawCircle(vec2 position, vec2 centre) {
// 	return distance(position, centre);
// }



void main() {

//line step(0.99,1.0-abs(vUv.x-0.5))
//circle step(0.4,length(vUv-0.5)) 1st method
//circle drawCircle(vUv,vec2(0.5)) 2nd method

	gl_FragColor = vec4(vec3(), 1.0);
}

//vec3 hold x,y,z vec2 x,y ..vec4 stores floating points ..more 
//ivec3, bvec2, dvec3, uvec3

//so we can write above code as this also 
// vec4 color= vec4(1.0, 0.0, 0.0, 1.0);
//gl_fRagcolor= color;    we can call vec3 a constructor.
//set color as color.x =0 or 1 ...not ok
// color.x=0.0 or 0. or 0.f or 1.f or 1.2f  .... ok
// color.x = color.r , color.y= color.g ...as we have rgba for 4 points
//color.rg= vec2(1,0);   color.rgb=vec3(1,1,0);

//swizzle masking
//e.g1  .vec3 color= vec3(1,0,1);
// gl..flfs= vec4(color.xxy,1)= vec4(vec3(1,1,0),1); as color.xyx= vec3(1,0,1) 

//......we dont have mod operator i.e. % in glsl .....
//insead we can use mod() ... input should be float

///vimp fn ..... clamp()   
//3 inputs 1st a num and 2nd & 3rd is range ...if num is in range o/p is the num
/// if num is not in range ..if below than 2nd (low) input is o/p ..if above range than 3rd i/p wil be the o/p 

//step , smoothstep, fract

//desmos site

//attribute support in vertex shaders only
//vUv goes from left bottom 0,0 to right top 1,1;
//length() is non signed but distance() is signed