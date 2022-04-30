// A simple water shader. (c) Ajarus, viktor@ajarus.com.
//
// Attribution-ShareAlike CC License.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2      u_resolution;           // viewport resolution (in pixels)
uniform float     u_time;                 // shader playback time (in seconds)
uniform float     u_delta_time;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     u_channel_rime[4];       // channel playback time (in seconds)
uniform vec3      u_channel_resolution[4]; // channel resolution (in pixels)
uniform vec4      u_mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform samplerXX u_Channel0..3;          // input channel. XX = 2D/Cube
uniform vec4      u_date;                 // (year, month, day, time in seconds)
uniform float     u_sampleRate;           // sound sample rate (i.e., 44100)

const float PI = 3.1415926535897932;

// play with these parameters to custimize the effect
// ==================================================

//speed
const float speed = 0.2;
const float speed_x = 0.3;
const float speed_y = 0.3;

// refraction
const float emboss = 0.50;
const float intensity = 2.4;
const int steps = 8;
const float frequency = 6.0;
const int angle = 7; // better when a prime

// reflection
const float delta = 60.;
const float gain = 700.;
const float reflectionCutOff = 0.012;
const float reflectionIntensity = 200000.;

// ===================================================


  float col(vec2 coord,float time)
  {
    float delta_theta = 2.0 * PI / float(angle);
    float col = 0.0;
    float theta = 0.0;
    for (int i = 0; i < steps; i++)
    {
      vec2 adjc = coord;
      theta = delta_theta*float(i);
      adjc.x += cos(theta)*time*speed + time * speed_x;
      adjc.y -= sin(theta)*time*speed - time * speed_y;
      col = col + cos( (adjc.x*cos(theta) - adjc.y*sin(theta))*frequency)*intensity;
    }

    return cos(col);
  }

//---------- main
 //out vec4 Color, in vec2 fragCoord 

void main( )
{
    float time = u_time*1.3;

vec2 p = (fragCoord.xy) / u_resolution.xy, c1 = p, c2 = p;
float cc1 = col(c1,time);

c2.x += u_resolution.x/delta;
float dx = emboss*(cc1-col(c2,time))/delta;

c2.x = p.x;
c2.y += u_resolution.y/delta;
float dy = emboss*(cc1-col(c2,time))/delta;

c1.x += dx*2.;
c1.y = -(c1.y+dy*2.);

float alpha = 1.+dot(dx,dy)*gain;
	
float ddx = dx - reflectionCutOff;
float ddy = dy - reflectionCutOff;
if (ddx > 0. && ddy > 0.)
	alpha = pow(alpha, ddx*ddy*reflectionIntensity);
	
vec4 col = texture(iChannel0,c1)*(alpha);
fragColor = col;
}
