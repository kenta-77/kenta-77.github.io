(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{5206:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/main",function(){return r(9580)}])},1625:function(e,n,r){"use strict";r.d(n,{Z:function(){return j}});var i=r(5893),t=r(204),l=r(3100),s=r(4418),c=r(5034),a=r(5675),x=r.n(a),o=r(1664),h=r.n(o),p=r(9603),d=r(9417);function u(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(t.k,{minWidth:"max-content",alignItems:"center",gap:"2",bg:"teal.400",opacity:"0.9",color:"#ffff",h:"50px",w:"100vw",children:[(0,i.jsx)(l.xu,{pl:"35px",_hover:{color:"gray.100"},children:(0,i.jsx)(h(),{href:"/",children:(0,i.jsx)(s.X,{fontSize:38,fontWeight:"bold",children:"FaMo"})})}),(0,i.jsx)(c.L,{}),(0,i.jsx)(l.xu,{w:"50px",children:(0,i.jsx)(h(),{href:"/",children:(0,i.jsx)(p.G,{icon:d.wp6,fontSize:"30px",color:"RGBA(0, 0, 0, 0.80)"})})}),(0,i.jsx)(l.xu,{w:"50px",children:(0,i.jsx)(h(),{href:"/main",children:(0,i.jsx)(p.G,{fontSize:"30px",icon:d.Z30,color:"RGBA(0, 0, 0, 0.80)"})})}),(0,i.jsx)(l.xu,{mr:"25px",position:"relative",w:"38px",h:"38px",children:(0,i.jsx)(h(),{href:"https://github.com/kenta-77/Mosaic_app",children:(0,i.jsx)(x(),{src:"./github-mark.png",alt:"",width:100,height:100})})})]})})}function j(e){let{children:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(u,{}),(0,i.jsx)("main",{children:n})]})}},9580:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return F}});var i=r(5893),t=r(1664),l=r.n(t),s=r(7294),c=r(8433),a=r(7304),x=r(5675),o=r.n(x),h=r(9222),p=r(3100),d=r(2560),u=r(204),j=r(1669),m=r(8911),g=r(7822),w=r(7754),f=r(295),b=r(1004),S=r(6005),v=r(9394),z=r(333),M=r(9558),k=r(4641),y=r(2428),C=r(6635),_=r(9603),A=r(9417),R=r(1731),N=r(9583),V=r(1625);function F(){let[e,n]=(0,s.useState)(""),[r,t]=(0,s.useState)(""),x=e=>{let{src:n}=e;return"".concat(n)},[F,L]=(0,s.useState)({mosaic_type:"0",strength:"1"}),[O,U]=(0,s.useState)([{value:"1",label:"1"},{value:"2",label:"2"}]),[E,G]=(0,s.useState)(","),[I,Z]=s.useState(!1),[P,q]=(0,s.useState)(),[B,X]=(0,s.useState)(),[D,J]=(0,s.useState)("10"),[T,K]=(0,s.useState)(),[W,Y]=(0,s.useState)(!1),$=(0,s.useRef)(null),H=(0,s.useRef)(null),Q=(0,s.useRef)(null),ee=(0,s.useRef)(null),en=e=>{for(var n=window.atob(e.replace(/^.*,/,"")),r=new Uint8Array(n.length),i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return new Blob([r.buffer],{type:"image/jpeg"})},er=async e=>{if(!e.target.files[0]){K(!1),Y(!1),H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue();return}K(!0),Y(!1),q(!0),H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue();let r=e.target.files[0],i=new FormData;i.append("image",r),i.append("strength","1");let t=await c.Z.post("https://mosaic-app.herokuapp.com/mosaics/rectangle/",i,{headers:{"Content-Type":"multipart/form-data","X-Api-Key":"s0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg","Access-Control-Allow-Origin":"*"}}),l=en(t.data.image[1]),s=URL.createObjectURL(l),a=t.data.active_number[0];J(t.data.max_strength[0]);for(let e=0;e<Number(a);e++)0==e?U(n=>[{value:"".concat(e),label:"".concat(e+1)}]):U(n=>[...n,{value:"".concat(e),label:"".concat(e+1)}]);n(s),q(!1)},ei=async()=>{if(!$.current)return;H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue(),G(","),X(!0);let e=new FormData;e.append("image",$.current.files[0]),e.append("mosaic_type",String(F.mosaic_type)),e.append("strength",String(F.strength)),e.append("rect_number",E);let n=await c.Z.post("https://mosaic-app.herokuapp.com/mosaics/",e,{headers:{"content-type":"multipart/form-data","X-Api-Key":"s0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg","Access-Control-Allow-Origin":"*"}}),r=en(n.data.image[1]),i=URL.createObjectURL(r);t(i),Y(!0),X(!1)},et=e=>{L({...F,mosaic_type:String(e)})},el=e=>{e.value,L({...F,mosaic_type:String(e.value)})},es=e=>{L({...F,strength:String(e)})},ec=e=>{let n="";e.map(e=>{n=e.value+","+n,G("".concat(n))})},ea=()=>{$.current.click()},ex=async()=>{let e=document.createElement("a");document.body.appendChild(e),e.download="sample.jpg",e.href=r,e.click(),e.remove(),URL.revokeObjectURL(r)},eo=e=>{let{option:n}=e;return(0,i.jsx)(p.xu,{children:(0,i.jsx)(o(),{src:n.label,alt:"stamp",width:30,height:30})})};return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(d.x,{theme:R.Z,children:[(0,i.jsx)(V.Z,{children:" "}),(0,i.jsxs)(u.k,{children:[(0,i.jsxs)(p.xu,{bg:"white",mt:"10px",ml:"3%",mr:"3%",width:"44%",height:"690px",rounded:"md",borderColor:"blackAlpha.50",children:[(0,i.jsx)(p.xu,{w:"200px",children:(0,i.jsxs)(j.g,{children:[(0,i.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"アップロード"}),(0,i.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"})]})}),(0,i.jsxs)(p.xu,{width:"150px",height:"40px",m:"8px",children:[(0,i.jsxs)(h.z,{onClick:ea,children:[(0,i.jsx)(_.G,{icon:A.r8p}),"Input Photo"]}),(0,i.jsx)("input",{hidden:!0,ref:$,type:"file",name:"image",accept:"image/*",onChange:er})]}),(0,i.jsx)(p.xu,{width:"100%",position:"relative",height:"300px",children:P?(0,i.jsx)(w.M,{h:"100%",children:(0,i.jsx)(f.$,{thickness:"5px",speed:"0.65s",emptyColor:"gray.200",color:"teal.500",size:"xl"})}):T?(0,i.jsx)(o(),{loader:x,src:e,alt:"input picture",unoptimized:!0,fill:!0,style:{objectFit:"contain"}}):(0,i.jsx)(w.M,{h:"100%",children:(0,i.jsx)(_.G,{icon:A.VmB,size:"3x"})})}),(0,i.jsxs)(p.xu,{width:"100%",height:"300px",rounded:"md",children:[(0,i.jsx)(w.M,{children:(0,i.jsx)(g.i,{w:"80%",borderColor:"gray",opacity:"1",p:"1"})}),(0,i.jsxs)(b.m,{variant:"soft-rounded",colorScheme:"green",onChange:e=>et(String(e)),children:[(0,i.jsx)(w.M,{pt:"2",children:(0,i.jsxs)(S.t,{children:[(0,i.jsx)(v.O,{fontSize:"13px",children:"モザイク"}),(0,i.jsx)(v.O,{fontSize:"13px",children:"ぼかし"}),(0,i.jsx)(v.O,{fontSize:"13px",children:"スタンプ"})]})}),(0,i.jsxs)(z.n,{children:[(0,i.jsx)(M.x,{children:(0,i.jsxs)(j.g,{spacing:"3%",align:"stretch",w:"100%",children:[(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"強さ"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(k.U,{spacing:2,w:"80%",children:(0,i.jsxs)(y.iR,{id:"slider",step:1,defaultValue:1,min:1,max:Number(D),colorScheme:"teal",onChange:e=>es(String(e)),onMouseEnter:()=>Z(!0),onMouseLeave:()=>Z(!1),children:[(0,i.jsx)(y.jz,{value:1,mt:"1",ml:"-2.5",fontSize:"11px",children:"低"}),(0,i.jsx)(y.jz,{value:Number(D)/2,mt:"1",ml:"-2.5",fontSize:"11px",children:"中"}),(0,i.jsx)(y.jz,{value:Number(D),mt:"1",ml:"-2.5",fontSize:"11px",children:"高"}),(0,i.jsx)(y.Uj,{children:(0,i.jsx)(y.Ms,{})}),(0,i.jsx)(C.u,{hasArrow:!0,bg:"teal.400",color:"white",placement:"top",isOpen:I,children:(0,i.jsx)(y.gs,{})})]})})}),(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",pt:"2",children:"加工しない人"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(p.xu,{w:"80%",children:(0,i.jsx)(a.ZP,{instanceId:"selectbox",ref:H,onChange:e=>{ec(e)},options:O,isMulti:!0})})}),T&&(0,i.jsx)(w.M,{w:"25%",pl:"10%",children:(0,i.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:ei,children:"加工する"})})]})}),(0,i.jsx)(M.x,{children:(0,i.jsxs)(j.g,{spacing:"3%",align:"stretch",w:"100%",children:[(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"強さ"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(k.U,{spacing:2,w:"80%",children:(0,i.jsxs)(y.iR,{id:"slider",step:1,defaultValue:1,min:1,max:Number(D),colorScheme:"teal",onChange:e=>es(String(e)),onMouseEnter:()=>Z(!0),onMouseLeave:()=>Z(!1),children:[(0,i.jsx)(y.jz,{value:1,mt:"1",ml:"-2.5",fontSize:"11px",children:"低"}),(0,i.jsx)(y.jz,{value:Number(D)/2,mt:"1",ml:"-2.5",fontSize:"11px",children:"中"}),(0,i.jsx)(y.jz,{value:Number(D),mt:"1",ml:"-2.5",fontSize:"11px",children:"高"}),(0,i.jsx)(y.Uj,{children:(0,i.jsx)(y.Ms,{})}),(0,i.jsx)(C.u,{hasArrow:!0,bg:"teal.400",color:"white",placement:"top",isOpen:I,children:(0,i.jsx)(y.gs,{})})]})})}),(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",pt:"2",children:"加工しない人"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(p.xu,{w:"80%",children:(0,i.jsx)(a.ZP,{instanceId:"selectbox",ref:Q,onChange:e=>{ec(e)},options:O,isMulti:!0})})}),T&&(0,i.jsx)(w.M,{w:"25%",pl:"10%",children:(0,i.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:ei,children:"加工する"})})]})}),(0,i.jsx)(M.x,{children:(0,i.jsxs)(j.g,{spacing:"2%",align:"stretch",w:"100%",children:[(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"種類"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(p.xu,{w:"80%",children:(0,i.jsx)(a.ZP,{instanceId:"selectbox",onChange:e=>{el(e)},options:[{value:"2",label:"/smiling_face_with_smiling_eyes_3d.png"},{value:"3",label:"/star_3d.png"},{value:"4",label:"/heart_suit_3d.png"}],formatOptionLabel:e=>(0,i.jsx)(eo,{option:e})})})}),(0,i.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"加工しない人"}),(0,i.jsx)(w.M,{children:(0,i.jsx)(p.xu,{w:"80%",children:(0,i.jsx)(a.ZP,{instanceId:"selectbox",ref:ee,onChange:e=>{ec(e)},options:O,isMulti:!0})})}),T&&(0,i.jsx)(w.M,{w:"25%",pl:"10%",children:(0,i.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:ei,children:"加工する"})})]})})]})]})]})]}),(0,i.jsxs)(p.xu,{bg:"white",mt:"10px",ml:"3%",mr:"3%",width:"44%",height:"690px",rounded:"md",borderColor:"blackAlpha.50",children:[(0,i.jsx)(p.xu,{w:"200px",children:(0,i.jsxs)(j.g,{children:[(0,i.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"ダウンロード"}),(0,i.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"})]})}),(0,i.jsx)(p.xu,{width:"100%",position:"relative",height:"300px",mt:"56px",rounded:"md",children:(0,i.jsx)(w.M,{h:"100%",position:"relative",children:B?(0,i.jsx)(w.M,{children:(0,i.jsx)(f.$,{thickness:"5px",speed:"0.65s",emptyColor:"gray.200",color:"teal.500",size:"xl"})}):W&&r?(0,i.jsx)(o(),{loader:x,src:r,alt:"input picture",unoptimized:!0,fill:!0,style:{objectFit:"contain"}}):(0,i.jsx)(w.M,{h:"100%",children:(0,i.jsx)(_.G,{icon:A.pkM,size:"3x"})})})}),(0,i.jsx)(w.M,{children:(0,i.jsx)(g.i,{w:"80%",borderColor:"gray",opacity:"1",p:"1"})}),(0,i.jsx)(w.M,{children:(0,i.jsx)(p.xu,{width:"80%",height:"100px",rounded:"md",children:(0,i.jsx)(p.xu,{w:"50%",mt:"10px",children:W?(0,i.jsxs)(h.z,{colorScheme:"teal",variant:"solid",onClick:ex,children:[(0,i.jsx)(_.G,{icon:A.ISu}),(0,i.jsx)(m.x,{m:"3px",children:"ダウンロード"})]}):(0,i.jsx)(p.xu,{})})})}),(0,i.jsx)(p.xu,{children:(0,i.jsxs)(j.g,{children:[(0,i.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"SHARE"}),(0,i.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"}),(0,i.jsx)(p.xu,{pt:"10px",children:(0,i.jsxs)(u.k,{children:[(0,i.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",color:"black",children:[" ",(0,i.jsx)(l(),{href:"https://twitter.com/compose/tweet",children:(0,i.jsx)(w.M,{h:"100%",w:"100%",children:(0,i.jsx)(o(),{src:"/Twitter.png",alt:"",width:100,height:100})})})]}),(0,i.jsx)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:(0,i.jsx)(l(),{href:"https://www.facebook.com/",children:(0,i.jsx)(w.M,{h:"100%",w:"100%",children:(0,i.jsx)(N.Am9,{color:"#1877F2",size:"50px"})})})}),(0,i.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:[" ",(0,i.jsx)(l(),{href:"https://www.instagram.com/",children:(0,i.jsx)(w.M,{h:"100%",w:"100%",children:(0,i.jsx)(o(),{src:"/Instagram.png",alt:"",width:100,height:100})})})]}),(0,i.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:[" ",(0,i.jsx)(l(),{href:"https://timeline.line.me/social-plugin/share?url=&text=",children:(0,i.jsx)(w.M,{h:"100%",w:"100%",children:(0,i.jsx)(o(),{src:"/LINE.png",alt:"",width:100,height:100})})})]})]})}),(0,i.jsx)(p.xu,{children:(0,i.jsx)(m.x,{size:"1px",m:"10px",children:"Copyright (c) 2019 Sefik Ilkin Serengil"})})]})})]})]})]})})}}},function(e){e.O(0,[976,445,742,194,774,888,179],function(){return e(e.s=5206)}),_N_E=e.O()}]);