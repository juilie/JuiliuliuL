#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;  

void main() {
    vec2 normRes = gl_FragCoord.xy/u_resolution;
    vec2 normMouse= u_mouse.xy/u_resolution;
    
	gl_FragColor = vec4(sin(u_time*100.0*mod(normRes.x,.2))*3.0,0, sin(u_time*100.0*mod(normRes.y,.2))*10.0,.5);
}