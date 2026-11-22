import{mkdirSync as A,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of R(I).sort()){
const P=F(J(I,d,'program.bin')),N=F(J(I,d,'input.bin')),n=P.length,D=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256);
let S=0,c=0,q=0,t=0,j=0,e=0,a=0,s='';
run:for(;;){
if(t==1e6){e=10;break}
if(q<0||q>=n){e=9;break}
const o=P[q];
if(!(o<8||o>15&&o<35||o>47&&o<53||o>63&&o<66||o>79&&o<84)){e=5;break}
const m=o==1?1:o==2?4:o>47&&o<52?2:0;
if(q+m>=n){e=9;break}
t++;
const x=q+1+m,k=o==7?3:o==5||o==6||o==65||o>15&&o<35&&o!=23&&o!=27?2:o<3||o==48||o==51||o==52||o==82?0:1;
if(S<k){e=2;break}
if(S==256&&(o==1||o==2||o==4||o==6||o==82)){e=3;break}
q=x;
switch(o){
case 0:break run;
case 1:D[S++]=(P[x-1]<<24)>>24;break;
case 2:D[S++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:S--;break;
case 4:D[S]=D[S-1];S++;break;
case 5:a=D[S-1];D[S-1]=D[S-2];D[S-2]=a;break;
case 6:D[S]=D[S-2];S++;break;
case 7:a=D[S-3];D[S-3]=D[S-2];D[S-2]=D[S-1];D[S-1]=a;break;
case 23:D[S-1]=-D[S-1]|0;break;
case 27:D[S-1]=~D[S-1];break;
case 48:case 49:case 50:
a=((P[x-2]|P[x-1]<<8)<<16)>>16;
if(o==48||(o==49)==(D[--S]==0))q=x+a;
break;
case 51:if(c==64){e=7;break run}K[c++]=x;q=P[x-2]|P[x-1]<<8;break;
case 52:if(!c){e=8;break run}q=K[--c];break;
case 64:a=D[S-1];if(a<0||a>255){e=6;break run}D[S-1]=M[a];break;
case 65:a=D[S-1];if(a<0||a>255){e=6;break run}M[a]=D[S-2];S-=2;break;
case 80:if(s.length+(''+D[S-1]).length>65536){e=11;break run}s+=D[--S];break;
case 81:if(s.length>65535){e=11;break run}s+=String.fromCharCode(D[--S]&255);break;
case 82:D[S++]=j<N.length?N[j++]:-1;break;
case 83:e=D[--S]&255;break run;
default:
const b=D[S-1],u=D[S-2];
let r=0;
if(o==16)r=(u+b)|0;else if(o==17)r=(u-b)|0;else if(o==18)r=Math.imul(u,b);
else if(o<23){if(!b){e=4;break run}r=o==19?(u/b)|0:o==20?(u%b)|0:o==21?((u>>>0)/(b>>>0))|0:(u>>>0)%(b>>>0)|0}
else if(o==24)r=u&b;else if(o==25)r=u|b;else if(o==26)r=u^b;
else if(o==28)r=u<<(b&31);else if(o==29)r=u>>(b&31);else if(o==30)r=(u>>>(b&31))|0;
else if(o==32)r=u==b?1:0;else if(o==33)r=u<b?1:0;else r=(u>>>0)<(b>>>0)?1:0;
S-=2;D[S++]=r;
}
}
A(J(O,d),{recursive:true});
W(J(O,d,'stdout.bin'),Buffer.from(s,'latin1'));
W(J(O,d,'exit.txt'),e+'\n');
}
