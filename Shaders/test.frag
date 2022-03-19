    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution; 
    
    void main() {
        vec2 mousePos = u_mouse.xy/u_resolution;
        vec2 normRes = gl_FragCoord.xy/u_resolution;
        gl_FragColor = vec4(normRes.x,normRes.y,mousePos.y,abs(sin(u_time)));
    }