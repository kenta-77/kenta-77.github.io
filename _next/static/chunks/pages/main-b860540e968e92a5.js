(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{5206:function(e,r,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/main",function(){return i(9580)}])},1625:function(e,r,i){"use strict";i.d(r,{Z:function(){return j}});var n=i(5893),l=i(204),t=i(3100),s=i(4418),c=i(5034),x=i(5675),a=i.n(x),o=i(1664),h=i.n(o),p=i(9603),d=i(9417);function u(){return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(l.k,{minWidth:"max-content",alignItems:"center",gap:"2",bg:"teal.400",opacity:"0.9",color:"#ffff",h:"50px",w:"100vw",children:[(0,n.jsx)(t.xu,{pl:"35px",_hover:{color:"gray.100"},children:(0,n.jsx)(h(),{href:"/",children:(0,n.jsx)(s.X,{fontSize:38,fontWeight:"bold",children:"FaMo"})})}),(0,n.jsx)(c.L,{}),(0,n.jsx)(t.xu,{w:"50px",children:(0,n.jsx)(h(),{href:"/",children:(0,n.jsx)(p.G,{icon:d.wp6,fontSize:"30px",color:"RGBA(0, 0, 0, 0.80)"})})}),(0,n.jsx)(t.xu,{w:"50px",children:(0,n.jsx)(h(),{href:"/main",children:(0,n.jsx)(p.G,{fontSize:"30px",icon:d.Z30,color:"RGBA(0, 0, 0, 0.80)"})})}),(0,n.jsx)(t.xu,{mr:"25px",position:"relative",w:"38px",h:"38px",children:(0,n.jsx)(h(),{href:"https://github.com/kenta-77/Mosaic_app",children:(0,n.jsx)(a(),{src:"./github-mark.png",alt:"",width:100,height:100})})})]})})}function j(e){let{children:r}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{}),(0,n.jsx)("main",{children:r})]})}},9580:function(e,r,i){"use strict";i.r(r),i.d(r,{default:function(){return F}});var n=i(5893),l=i(1664),t=i.n(l),s=i(7294),c=i(8433),x=i(7304),a=i(5675),o=i.n(a),h=i(9222),p=i(3100),d=i(2560),u=i(204),j=i(1669),m=i(8911),g=i(7822),w=i(7754),f=i(295),b=i(1004),S=i(6005),z=i(9394),M=i(333),v=i(9558),k=i(4641),y=i(2428),C=i(6635),_=i(9603),A=i(9417),R=i(1731),N=i(9583),V=i(1625);function F(){let[e,r]=(0,s.useState)(""),[i,l]=(0,s.useState)(""),a=e=>{let{src:r}=e;return"".concat(r)},[F,O]=(0,s.useState)({mosaic_type:"0",strength:"1"}),[L,U]=(0,s.useState)([{value:"1",label:"1"},{value:"2",label:"2"}]),[E,G]=(0,s.useState)(","),[I,Z]=s.useState(!1),[P,q]=(0,s.useState)(),[B,X]=(0,s.useState)(),[D,J]=(0,s.useState)("10"),[T,K]=(0,s.useState)(),[W,Y]=(0,s.useState)(!1),$=(0,s.useRef)(null),H=(0,s.useRef)(null),Q=(0,s.useRef)(null),ee=(0,s.useRef)(null),er=e=>{for(var r=window.atob(e.replace(/^.*,/,"")),i=new Uint8Array(r.length),n=0;n<r.length;n++)i[n]=r.charCodeAt(n);return new Blob([i.buffer],{type:"image/jpeg"})},ei=async e=>{if(!e.target.files[0]){K(!1),Y(!1),H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue();return}K(!0),Y(!1),q(!0),H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue();let r=e.target.files[0],i=new FormData;i.append("image",r),i.append("strength","1"),await c.Z.post("https://mosaic-app.herokuapp.com/mosaics/rectangle/",i,{headers:{"Content-Type":"multipart/form-data","X-Api-Key":"s0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg","Access-Control-Allow-Origin":"*"}}),q(!1)},en=async()=>{if(!$.current)return;H.current.clearValue(),Q.current.clearValue(),ee.current.clearValue(),X(!0);let e=new FormData;e.append("image",$.current.files[0]),e.append("mosaic_type",String(F.mosaic_type)),e.append("strength",String(F.strength)),e.append("rect_number",E);let r=await c.Z.post("https://mosaic-app.herokuapp.com/mosaics/",e,{headers:{"content-type":"multipart/form-data","X-Api-Key":"s0J3uSMD.3Fv3RqqJYiSpdrMLorUaFGBtNMP4AqVg","Access-Control-Allow-Origin":"*"}}),i=er(r.data.image[1]),n=URL.createObjectURL(i);l(n),Y(!0),X(!1)},el=e=>{O({...F,mosaic_type:String(e)})},et=e=>{e.value,O({...F,mosaic_type:String(e.value)})},es=e=>{O({...F,strength:String(e)})},ec=e=>{let r="";e.map(e=>{r=e.value+","+r,G("".concat(r))})},ex=()=>{$.current.click()},ea=async()=>{let e=document.createElement("a");document.body.appendChild(e),e.download="sample.jpg",e.href=i,e.click(),e.remove(),URL.revokeObjectURL(i)},eo=e=>{let{option:r}=e;return(0,n.jsx)(p.xu,{children:(0,n.jsx)(o(),{src:r.label,alt:"stamp",width:30,height:30})})};return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(d.x,{theme:R.Z,children:[(0,n.jsx)(V.Z,{children:" "}),(0,n.jsxs)(u.k,{children:[(0,n.jsxs)(p.xu,{bg:"white",mt:"10px",ml:"3%",mr:"3%",width:"44%",height:"690px",rounded:"md",borderColor:"blackAlpha.50",children:[(0,n.jsx)(p.xu,{w:"200px",children:(0,n.jsxs)(j.g,{children:[(0,n.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"アップロード"}),(0,n.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"})]})}),(0,n.jsxs)(p.xu,{width:"150px",height:"40px",m:"8px",children:[(0,n.jsxs)(h.z,{onClick:ex,children:[(0,n.jsx)(_.G,{icon:A.r8p}),"Input Photo"]}),(0,n.jsx)("input",{hidden:!0,ref:$,type:"file",name:"image",accept:"image/*",onChange:ei})]}),(0,n.jsx)(p.xu,{width:"100%",position:"relative",height:"300px",children:P?(0,n.jsx)(w.M,{h:"100%",children:(0,n.jsx)(f.$,{thickness:"5px",speed:"0.65s",emptyColor:"gray.200",color:"teal.500",size:"xl"})}):T?(0,n.jsx)(o(),{loader:a,src:e,alt:"input picture",unoptimized:!0,fill:!0,style:{objectFit:"contain"}}):(0,n.jsx)(w.M,{h:"100%",children:(0,n.jsx)(_.G,{icon:A.VmB,size:"3x"})})}),(0,n.jsxs)(p.xu,{width:"100%",height:"300px",rounded:"md",children:[(0,n.jsx)(w.M,{children:(0,n.jsx)(g.i,{w:"80%",borderColor:"gray",opacity:"1",p:"1"})}),(0,n.jsxs)(b.m,{variant:"soft-rounded",colorScheme:"green",onChange:e=>el(String(e)),children:[(0,n.jsx)(w.M,{pt:"2",children:(0,n.jsxs)(S.t,{children:[(0,n.jsx)(z.O,{fontSize:"13px",children:"モザイク"}),(0,n.jsx)(z.O,{fontSize:"13px",children:"ぼかし"}),(0,n.jsx)(z.O,{fontSize:"13px",children:"スタンプ"})]})}),(0,n.jsxs)(M.n,{children:[(0,n.jsx)(v.x,{children:(0,n.jsxs)(j.g,{spacing:"3%",align:"stretch",w:"100%",children:[(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"強さ"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(k.U,{spacing:2,w:"80%",children:(0,n.jsxs)(y.iR,{id:"slider",step:1,defaultValue:1,min:1,max:Number(D),colorScheme:"teal",onChange:e=>es(String(e)),onMouseEnter:()=>Z(!0),onMouseLeave:()=>Z(!1),children:[(0,n.jsx)(y.jz,{value:1,mt:"1",ml:"-2.5",fontSize:"11px",children:"低"}),(0,n.jsx)(y.jz,{value:Number(D)/2,mt:"1",ml:"-2.5",fontSize:"11px",children:"中"}),(0,n.jsx)(y.jz,{value:Number(D),mt:"1",ml:"-2.5",fontSize:"11px",children:"高"}),(0,n.jsx)(y.Uj,{children:(0,n.jsx)(y.Ms,{})}),(0,n.jsx)(C.u,{hasArrow:!0,bg:"teal.400",color:"white",placement:"top",isOpen:I,children:(0,n.jsx)(y.gs,{})})]})})}),(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",pt:"2",children:"加工しない人"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(p.xu,{w:"80%",children:(0,n.jsx)(x.ZP,{instanceId:"selectbox",ref:H,onChange:e=>{ec(e)},options:L,isMulti:!0})})}),T&&(0,n.jsx)(w.M,{w:"25%",pl:"10%",children:(0,n.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:en,children:"加工する"})})]})}),(0,n.jsx)(v.x,{children:(0,n.jsxs)(j.g,{spacing:"3%",align:"stretch",w:"100%",children:[(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"強さ"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(k.U,{spacing:2,w:"80%",children:(0,n.jsxs)(y.iR,{id:"slider",step:1,defaultValue:1,min:1,max:Number(D),colorScheme:"teal",onChange:e=>es(String(e)),onMouseEnter:()=>Z(!0),onMouseLeave:()=>Z(!1),children:[(0,n.jsx)(y.jz,{value:1,mt:"1",ml:"-2.5",fontSize:"11px",children:"低"}),(0,n.jsx)(y.jz,{value:Number(D)/2,mt:"1",ml:"-2.5",fontSize:"11px",children:"中"}),(0,n.jsx)(y.jz,{value:Number(D),mt:"1",ml:"-2.5",fontSize:"11px",children:"高"}),(0,n.jsx)(y.Uj,{children:(0,n.jsx)(y.Ms,{})}),(0,n.jsx)(C.u,{hasArrow:!0,bg:"teal.400",color:"white",placement:"top",isOpen:I,children:(0,n.jsx)(y.gs,{})})]})})}),(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",pt:"2",children:"加工しない人"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(p.xu,{w:"80%",children:(0,n.jsx)(x.ZP,{instanceId:"selectbox",ref:Q,onChange:e=>{ec(e)},options:L,isMulti:!0})})}),T&&(0,n.jsx)(w.M,{w:"25%",pl:"10%",children:(0,n.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:en,children:"加工する"})})]})}),(0,n.jsx)(v.x,{children:(0,n.jsxs)(j.g,{spacing:"2%",align:"stretch",w:"100%",children:[(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"種類"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(p.xu,{w:"80%",children:(0,n.jsx)(x.ZP,{instanceId:"selectbox",onChange:e=>{et(e)},options:[{value:"2",label:"/smiling_face_with_smiling_eyes_3d.png"},{value:"3",label:"/star_3d.png"},{value:"4",label:"/heart_suit_3d.png"}],formatOptionLabel:e=>(0,n.jsx)(eo,{option:e})})})}),(0,n.jsx)(m.x,{as:"b",color:"blackAlpha.600",fontSize:"17px",pl:"10%",children:"加工しない人"}),(0,n.jsx)(w.M,{children:(0,n.jsx)(p.xu,{w:"80%",children:(0,n.jsx)(x.ZP,{instanceId:"selectbox",ref:ee,onChange:e=>{ec(e)},options:L,isMulti:!0})})}),T&&(0,n.jsx)(w.M,{w:"25%",pl:"10%",children:(0,n.jsx)(h.z,{colorScheme:"teal",variant:"solid",onClick:en,children:"加工する"})})]})})]})]})]})]}),(0,n.jsxs)(p.xu,{bg:"white",mt:"10px",ml:"3%",mr:"3%",width:"44%",height:"690px",rounded:"md",borderColor:"blackAlpha.50",children:[(0,n.jsx)(p.xu,{w:"200px",children:(0,n.jsxs)(j.g,{children:[(0,n.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"ダウンロード"}),(0,n.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"})]})}),(0,n.jsx)(p.xu,{width:"100%",position:"relative",height:"300px",mt:"56px",rounded:"md",children:(0,n.jsx)(w.M,{h:"100%",position:"relative",children:B?(0,n.jsx)(w.M,{children:(0,n.jsx)(f.$,{thickness:"5px",speed:"0.65s",emptyColor:"gray.200",color:"teal.500",size:"xl"})}):W&&i?(0,n.jsx)(o(),{loader:a,src:i,alt:"input picture",unoptimized:!0,fill:!0,style:{objectFit:"contain"}}):(0,n.jsx)(w.M,{h:"100%",children:(0,n.jsx)(_.G,{icon:A.pkM,size:"3x"})})})}),(0,n.jsx)(w.M,{children:(0,n.jsx)(g.i,{w:"80%",borderColor:"gray",opacity:"1",p:"1"})}),(0,n.jsx)(w.M,{children:(0,n.jsx)(p.xu,{width:"80%",height:"100px",rounded:"md",children:(0,n.jsx)(p.xu,{w:"50%",mt:"10px",children:W?(0,n.jsxs)(h.z,{colorScheme:"teal",variant:"solid",onClick:ea,children:[(0,n.jsx)(_.G,{icon:A.ISu}),(0,n.jsx)(m.x,{m:"3px",children:"ダウンロード"})]}):(0,n.jsx)(p.xu,{})})})}),(0,n.jsx)(p.xu,{children:(0,n.jsxs)(j.g,{children:[(0,n.jsx)(m.x,{color:"blackAlpha.600",fontSize:"30px",children:"SHARE"}),(0,n.jsx)(g.i,{w:"80px",borderColor:"gray",opacity:"1"}),(0,n.jsx)(p.xu,{pt:"10px",children:(0,n.jsxs)(u.k,{children:[(0,n.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",color:"black",children:[" ",(0,n.jsx)(t(),{href:"https://twitter.com/compose/tweet",children:(0,n.jsx)(w.M,{h:"100%",w:"100%",children:(0,n.jsx)(o(),{src:"/Twitter.png",alt:"",width:100,height:100})})})]}),(0,n.jsx)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:(0,n.jsx)(t(),{href:"https://www.facebook.com/",children:(0,n.jsx)(w.M,{h:"100%",w:"100%",children:(0,n.jsx)(N.Am9,{color:"#1877F2",size:"50px"})})})}),(0,n.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:[" ",(0,n.jsx)(t(),{href:"https://www.instagram.com/",children:(0,n.jsx)(w.M,{h:"100%",w:"100%",children:(0,n.jsx)(o(),{src:"/Instagram.png",alt:"",width:100,height:100})})})]}),(0,n.jsxs)(p.xu,{position:"relative",w:"50px",h:"50px",mr:"10px",ml:"10px",children:[" ",(0,n.jsx)(t(),{href:"https://timeline.line.me/social-plugin/share?url=&text=",children:(0,n.jsx)(w.M,{h:"100%",w:"100%",children:(0,n.jsx)(o(),{src:"/LINE.png",alt:"",width:100,height:100})})})]})]})}),(0,n.jsx)(p.xu,{children:(0,n.jsx)(m.x,{size:"1px",m:"10px",children:"Copyright (c) 2019 Sefik Ilkin Serengil"})})]})})]})]})]})})}}},function(e){e.O(0,[976,445,742,194,774,888,179],function(){return e(e.s=5206)}),_N_E=e.O()}]);