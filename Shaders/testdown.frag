// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

  uniform sampler2D u_tex0;
  uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 pos = (gl_FragCoord.xy/u_resolution);
    pos = pos-0.5;
    pos.x = pos.x * u_resolution.x/u_resolution.y;
    
    vec2 normMouse = u_mouse.xy/u_resolution;

    float angle = atan(pos.y,pos.x);
    float r = sin((angle*2.)*u_time + normMouse.x*10.+u_time*2.);
    
    float dist = length(pos);
    float g = sin(dist*25.-normMouse.x*10.-u_time);
    
    float b = cos((angle*1.)+normMouse.y*10.+u_time*20.*sin(dist*1.));
    vec4 color = texture2D(u_tex0,pos);
    color = vec4(b,0,b,1);
    
    gl_FragColor = color;
}

