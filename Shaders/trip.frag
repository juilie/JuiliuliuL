    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution; 

void main () {
    vec2 pos = (gl_FragCoord.xy/u_resolution);
    pos = pos-0.5;
    pos.x = pos.x * u_resolution.x/u_resolution.y;
    
    vec2 normMouse = u_mouse.xy/u_resolution;

    float angle = atan(pos.y,pos.x);
    float r = sin((angle*2.0)*u_time + normMouse.x*10.0+u_time*200.0);
    
    float dist = length(pos);
    float g = sin(dist*25.0-normMouse.x*10.0-u_time);
    
    float b = cos((angle*1.0)+normMouse.y*10.0+u_time*sin(dist*1.0)*10000.0);

    vec4 color = vec4(b,0,b,1);
    
    gl_FragColor = color;
}