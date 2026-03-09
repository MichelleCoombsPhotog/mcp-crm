import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://cqtgwqovtyoqkjfyczpz.supabase.co";
const SB_KEY = "sb_publishable_sJ9AKzaPHzNxCtz61bFjSA_GpYyINmh";
const sb = createClient(SB_URL, SB_KEY);

const css=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Jost:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:#FAF7F4}
.rh:hover{background:#FAF7F4!important;cursor:pointer}
.ch:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(92,64,51,.1)!important}
.nb:hover{background:rgba(201,168,76,.12)!important}
@keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fi .25s ease}
@keyframes pu{0%,100%{opacity:1}50%{opacity:.3}}.pu{animation:pu 2s infinite}`;

const es="#2C1810",dk="#5C4033",br="#8B6F5C",ta="#C4B5A5",cr="#FAF7F4",sa="#E8DDD0",bo="#E8DDD0",wh="#FFFFFF",tl="#B0A498";
const go="#C9A84C",gl="#FBF3E0",ma="#C4A59A",ml="#F0E8E5",md="#9E7B72",gn="#5A7A5A",gnl="#EBF2EB",rd="#8B3A3A",bl="#3A5A7A",bll="#EBF0F5";
const D="'Playfair Display',serif",U="'Jost',sans-serif";

const getSun=(ds,lat=28.5,lng=-81)=>{
  const r=Math.PI/180,d=new Date(ds+"T12:00:00"),n=Math.floor((d-new Date(d.getFullYear(),0,0))/86400000);
  const B=360/365*(n-81)*r,EoT=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B),TC=4*lng+EoT,dec=23.45*Math.sin(B)*r;
  const HA=Math.acos(-Math.tan(lat*r)*Math.tan(dec))/r,rise=12-HA/15-TC/60,set=12+HA/15-TC/60;
  const fmt=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return`${hh%12||12}:${mm.toString().padStart(2,"0")} ${hh<12?"AM":"PM"}`};
  return{rs:fmt(rise),ss:fmt(set),rm:Math.round(rise*60),sm:Math.round(set*60)};
};
const m2t=m=>{const h=Math.floor(m/60),mm=m%60;return`${h%12||12}:${mm.toString().padStart(2,"0")} ${h<12?"AM":"PM"}`};
const BEACHES=["Cocoa Beach","New Smyrna","Daytona","St. Augustine","Canaveral"];
const isB=l=>BEACHES.some(b=>l?.toLowerCase().includes(b.toLowerCase()));
const SLEN={petite:25,signature:45,extended:60,large:30};
const getSlots=(ds,pid,loc)=>{
  const sun=getSun(ds),beach=isB(loc),len=SLEN[pid]||60;
  if(!beach){const sl=[];for(let m=sun.rm-30;m<=sun.sm;m+=15){const ideal=(m>=sun.rm-15&&m<=sun.rm+30)||(m>=sun.sm-len-15&&m<=sun.sm-len+15);sl.push({t:m2t(m),ideal,lbl:m<=sun.rm?"🌅":m>=sun.sm-len?"🌇":""});}return{sl,sun,beach};}
  return{sl:[...[-15,0,15].map(i=>({t:m2t(sun.rm+i-15),ideal:i===0,lbl:i===-15?"✨ Ideal":i===0?"🌅 Sunrise":""})),...[-len-15,-len].map(i=>({t:m2t(sun.sm+i),ideal:i===-len,lbl:i===-len?"✨ Ideal":""}))],sun,beach};
};

const PKGS=[
  {id:"petite",name:"Petite Session",price:497,dur:25,img:25,desc:"Up to 25 min · 25 edited images",pop:false},
  {id:"signature",name:"Signature Session",price:629,dur:45,img:40,desc:"Up to 45 min · 40 edited images",pop:true},
  {id:"extended",name:"Extended Session",price:897,dur:60,img:"ALL",desc:"60 min · ALL edited images",pop:false},
  {id:"large",name:"27–30 People",price:0,dur:30,img:"TBD",desc:"Large group — contact for pricing",pop:false},
];
const ADDONS=[{id:"raw",name:"Full Raw File Buyout",price:1497},{id:"prints",name:"Fine Art Print Set",price:297},{id:"album",name:"Mini Album 6x6",price:197}];
const EMAILS_D=[
  {id:"e1",name:"Auto Reply",subject:"Re: Your Photography Inquiry",trigger:"Immediately on lead added",body:"Hi {first_name}!\n\nThank you so much for reaching out!\n\nI'll be in touch within one business day with availability and your personalized proposal.\n\nWarmly,\nMichelle\nThe Collective | Michelle Coombs Photography"},
  {id:"e2",name:"MCP: Inquiry Response 2",subject:"Your Session — Quick Follow Up",trigger:"36 hrs after proposal sent (if not completed)",body:"Hi {first_name}!\n\nJust following up — your date is still available!\n\nTo reserve it: [Booking Proposal]\nQuick call instead? [Book a Call]\n\nWarmly, Michelle"},
  {id:"e3",name:"PORT INQ 03: Magic Email",subject:"Still thinking it over? ✨",trigger:"4 days after proposal sent (if not completed)",body:"Hi {first_name}!\n\nI still have your date held but can only hold it a couple more days.\n\nAny questions? Just reply or grab a call: [Book a Call]\n\nMichelle"},
  {id:"e4",name:"MCP | Thanks for Booking",subject:"🎉 You're officially booked!",trigger:"2 minutes after booking confirmed",body:"Hi {first_name}!\n\nYou're officially on my calendar and I'm SO excited!\n\n📅 {session_date} at {session_time}\n📍 {session_location}\n\nYour What to Wear Guide is on its way!\n\nSo excited,\nMichelle"},
  {id:"e5",name:"MCP | What to Wear Guide",subject:"What to Wear for Your Session 👗",trigger:"2 hours after booking confirmed",body:"Hi {first_name}!\n\n🎨 Choose 2-3 complementary colors\n👗 Avoid logos and busy patterns\n🌊 Flowy fabrics are great for beach sessions!\n\nFull guide: [Session Prep Guide]\n\nMichelle"},
  {id:"e6",name:"MCP | Session Details",subject:"Your Session is One Week Away! 📅",trigger:"1 week before shoot date",body:"Hi {first_name}!\n\n📅 {session_date} at {session_time}\n📍 {session_location}\n\n🌅 Please arrive 5-10 minutes early!\n\nSee you soon, Michelle"},
  {id:"e7",name:"MCP: Day-After Thank You",subject:"It was SO great to meet you! 🧡",trigger:"1 day after shoot date",body:"Hi {first_name}!\n\nYesterday was SO much fun! Expect your gallery in 2-3 weeks.\n\nA Google review means the world: [Leave a Review]\n\nWith love, Michelle"},
  {id:"e8",name:"MCP | Plant the Seed for Prints",subject:"Have you thought about wall art? 🖼️",trigger:"2 weeks after shoot date",body:"Hi {first_name}!\n\nHope you're loving your gallery!\n\nThese photos deserve to be on your walls 😊 Fine art prints, canvas wraps, and albums available. Just reply!\n\nMichelle"},
];
const CLIENTS_D=[
  {id:1,first:"Sarah",last:"Mitchell",email:"sarah@email.com",phone:"407-555-0101",type:"Family",status:"Active",date:"2026-05-15",loc:"New Smyrna Beach",pkg:"extended",notes:"Large family 22 people.",paid:897,bal:0,gallery:"",signed:true,wf:"s3"},
  {id:2,first:"Carmen",last:"Rodriguez",email:"carmen@email.com",phone:"407-555-0202",type:"Family",status:"Lead",date:"2026-04-10",loc:"Cocoa Beach",pkg:"signature",notes:"Family of 5.",paid:0,bal:629,gallery:"",signed:false,wf:"l1"},
  {id:3,first:"Emma",last:"Thornton",email:"emma@email.com",phone:"407-555-0303",type:"Portrait",status:"Completed",date:"2026-01-20",loc:"Disney's BoardWalk",pkg:"petite",notes:"Solo portrait.",paid:497,bal:0,gallery:"https://pictime.com/gallery/emma",signed:true,wf:"end"},
  {id:4,first:"Alex",last:"Patel",email:"alex@email.com",phone:"407-555-0404",type:"Engagement",status:"Proposal Sent",date:"2026-04-22",loc:"Cocoa Beach",pkg:"signature",notes:"Couple session.",paid:150,bal:479,gallery:"",signed:true,wf:"l3"},
  {id:5,first:"Jessica",last:"Huang",email:"jessica@email.com",phone:"407-555-0505",type:"Family",status:"Booked",date:"2026-03-27",loc:"New Smyrna Beach",pkg:"petite",notes:"Sunrise beach session.",paid:150,bal:347,gallery:"",signed:true,wf:"s1"},
];
const WX=[
  {date:"2026-03-27",client:"Jessica Huang",loc:"New Smyrna Beach",hi:76,lo:62,cond:"Partly Cloudy",pop:10,icon:"⛅"},
  {date:"2026-04-10",client:"Carmen Rodriguez",loc:"Cocoa Beach",hi:81,lo:68,cond:"Sunny",pop:5,icon:"☀️"},
  {date:"2026-05-15",client:"Sarah Mitchell",loc:"New Smyrna Beach",hi:88,lo:74,cond:"Scattered Showers",pop:35,icon:"🌦️"},
];
const LWF={id:"lead",name:"MCP Lead Workflow",ms:["Lead Added","Proposal Sent","Shoot Booked"],steps:[
  {id:"l1",mi:0,t:"Immediately",type:"email",a:"Send Email: Auto Reply"},
  {id:"l2",mi:0,t:"Immediately",type:"proposal",a:"Send Booking Proposal",appr:true},
  {id:"l3",mi:1,t:"36 hrs later",type:"email",a:"Inquiry Response 2",cond:"If not completed"},
  {id:"l4",mi:1,t:"4 days later",type:"email",a:"Magic Email",cond:"If not completed"},
  {id:"l5",mi:1,t:"6 days later",type:"status",a:"Status → Closed",cond:"If not completed"},
  {id:"l6",mi:2,t:"Immediately",type:"workflow",a:"Apply Shoot Workflow"},
]};
const SWF={id:"shoot",name:"Portrait Shoot Workflow",ms:["Applied","Shoot Date","Post-Shoot"],steps:[
  {id:"s1",mi:0,t:"2 min after",type:"email",a:"Thanks for Booking"},
  {id:"s2",mi:0,t:"2 hrs after",type:"email",a:"What to Wear Guide"},
  {id:"s3",mi:1,t:"1 week BEFORE",type:"email",a:"Session Details"},
  {id:"s4",mi:1,t:"1 day AFTER",type:"email",a:"Day-After Thank You"},
  {id:"s5",mi:2,t:"2 weeks after",type:"email",a:"Plant Seed for Prints"},
]};
const NAV=[{id:"dashboard",l:"Dashboard",i:"◈"},{id:"leads",l:"Leads",i:"📥"},{id:"clients",l:"Clients",i:"👥"},{id:"calendar",l:"Calendar",i:"📅"},{id:"invoices",l:"Invoices",i:"💳"},{id:"workflows",l:"Workflows",i:"⚡"},{id:"emails",l:"Email Templates",i:"✉️"},{id:"packages",l:"Packages",i:"🎯"},{id:"scheduler",l:"Scheduler",i:"🗓️"},{id:"galleries",l:"Galleries",i:"🖼️"},{id:"portal",l:"Client Portal",i:"🌐"},{id:"settings",l:"Settings",i:"⚙️"}];
const SC=s=>({Active:"green",Booked:"green",Completed:"gray",Lead:"gold","Proposal Sent":"blue",Closed:"red"}[s]||"gray");
const TK={green:{bg:gnl,tx:gn},red:{bg:"#F5EBEB",tx:rd},gold:{bg:gl,tx:go},blue:{bg:bll,tx:bl},mauve:{bg:ml,tx:md},gray:{bg:sa,tx:br}};
const Tag=({color,ch})=>{const s=TK[color]||TK.gray;return<span style={{background:s.bg,color:s.tx,fontSize:11,fontFamily:U,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 9px",borderRadius:20}}>{ch}</span>};
const Btn=({onClick,ch,v="p",sm,sx={}})=>{
  const s={p:{bg:es,tx:cr},m:{bg:ma,tx:wh},o:{bg:"transparent",tx:dk,border:`1px solid ${bo}`}}[v]||{bg:es,tx:cr};
  return<button onClick={onClick} className="bh" style={{background:s.bg,color:s.tx,border:s.border||"none",borderRadius:4,padding:sm?"5px 11px":"8px 18px",fontSize:sm?11:12,fontFamily:U,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"all .18s",...sx}}>{ch}</button>
};
const Card=({hover,sx={},children})=><div className={hover?"ch":""} style={{background:wh,borderRadius:10,border:`1px solid ${bo}`,transition:"all .2s",...sx}}>{children}</div>;
const H2=({children,action})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}><h2 style={{fontFamily:D,fontSize:20,color:es,fontWeight:400}}>{children}</h2>{action}</div>;
const Inp=({label,value,onChange,type="text",multi,rows=4,ph})=><div style={{marginBottom:11}}>
  {label&&<label style={{display:"block",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:br,marginBottom:3,fontFamily:U,fontWeight:600}}>{label}</label>}
  {multi?<textarea value={value} onChange={onChange} rows={rows} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:6,padding:"7px 10px",fontSize:12,fontFamily:U,color:es,outline:"none",resize:"vertical",background:cr}}/>
  :<input type={type} value={value} onChange={onChange} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:6,padding:"7px 10px",fontSize:13,fontFamily:U,color:es,outline:"none",background:cr}}/>}
</div>;
const WW=({shoot})=>{
  const sun=getSun(shoot.date),pc=shoot.pop>40?rd:shoot.pop>20?go:gn;
  return<Card hover sx={{padding:14,background:`linear-gradient(135deg,${shoot.pop>40?"#F9EDED":"#EDF2F8"},${wh})`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
      <div><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:2}}>Shoot Date</div>
        <div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.client}</div>
        <div style={{fontSize:12,color:br,fontFamily:U}}>{new Date(shoot.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
      </div>
      <div style={{textAlign:"right"}}><div style={{fontSize:26}}>{shoot.icon}</div><div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.hi}°</div></div>
    </div>
    <div style={{fontSize:12,color:br,fontFamily:U,marginBottom:7}}>{shoot.cond} · Low {shoot.lo}°</div>
    <div style={{display:"flex",justifyContent:"space-between",paddingTop:7,borderTop:`1px solid ${bo}`}}>
      {[["🌅",sun.rs,es],["🌧️",`${shoot.pop}%`,pc],["🌇",sun.ss,es]].map(([l,v,c],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:9,color:tl,fontFamily:U}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:c,fontFamily:U}}>{v}</div></div>)}
    </div>
  </Card>
};

export default function MCRM(){
  const [tab,setTab]=useState("dashboard");
  const [clients,setClients]=useState(CLIENTS_D);
  const [pkgs,setPkgs]=useState(PKGS);
  const [addons,setAddons]=useState(ADDONS);
  const [emails,setEmails]=useState(EMAILS_D);
  const [contract,setContract]=useState("PORTRAIT PHOTOGRAPHY AGREEMENT\nThe Collective | Michelle Coombs Photography\n\n1. SERVICES\nPortrait photography as outlined in selected package. Delivered via Pic-Time within 2–3 weeks.\n\n2. PAYMENT TERMS\n$150 non-refundable retainer due at booking. Balance due 72 hours before session.\n\n3. CANCELLATION\nReschedule once with 72+ hrs notice. <72 hrs forfeits retainer. Weather rescheduled free.\n\n4. INCLUDED\nHand-edited hi-res images (color + B&W), wardrobe guidance, posing direction, highlight film, Pic-Time gallery with unlimited downloads + 1-year backup.\n\n5. COPYRIGHT\nPhotographer retains copyright. Client granted personal use license.\n\n6. MODEL RELEASE\nClient grants permission for portfolio/marketing use unless privacy requested in writing.\n\n7. GOVERNING LAW: State of Florida.");
  const [selC,setSelC]=useState(null);
  const [selE,setSelE]=useState(null);
  const [selP,setSelP]=useState(null);
  const [selWF,setSelWF]=useState(null);
  const [modal,setModal]=useState(null);
  const [notif,setNotif]=useState(null);
  const [open,setOpen]=useState(true);
  const [nc,setNc]=useState({first:"",last:"",email:"",phone:"",date:"",loc:"",pkg:"signature",notes:""});
  const [pvDate,setPvDate]=useState("2026-04-15");
  const [pvPkg,setPvPkg]=useState("signature");
  const [pvLoc,setPvLoc]=useState("Cocoa Beach");
  const [search,setSearch]=useState("");
  const [selInv,setSelInv]=useState(null);
  const [editWF,setEditWF]=useState(false);
  const [wfSteps,setWfSteps]=useState({lead:[...LWF.steps],shoot:[...SWF.steps]});
  const [portalC,setPortalC]=useState(null);

  const toast=msg=>{setNotif(msg);setTimeout(()=>setNotif(null),3000)};

  useEffect(()=>{
    const load=async()=>{
      try{
        const[{data:cl},{data:pk},{data:ad},{data:em},{data:st}]=await Promise.all([
          sb.from("clients").select("*").order("created_at",{ascending:false}),
          sb.from("packages").select("*"),
          sb.from("addons").select("*"),
          sb.from("emails").select("*"),
          sb.from("settings").select("*"),
        ]);
        if(cl?.length)setClients(cl);
        if(pk?.length)setPkgs(pk.map(p=>({...p,desc:p.description||""})));
        else{await sb.from("packages").insert(PKGS.map(p=>({...p,description:p.desc})));setPkgs(PKGS);}
        if(ad?.length)setAddons(ad.map(a=>({...a,desc:a.description||""})));
        else{await sb.from("addons").insert(ADDONS.map(a=>({...a,description:""})));setAddons(ADDONS);}
        if(em?.length)setEmails(em);
        else{await sb.from("emails").insert(EMAILS_D);setEmails(EMAILS_D);}
        if(st?.length){const cv=st.find(s=>s.key==="contract");if(cv)setContract(cv.value);}
      }catch(e){console.log("DB load error",e);}
    };
    load();
  },[]);

  const rev=clients.reduce((s,c)=>s+c.paid,0);
  const out=clients.reduce((s,c)=>s+c.bal,0);
  const upcoming=clients.filter(c=>c.date>="2026-03-07"&&c.status!=="Completed").sort((a,b)=>a.date.localeCompare(b.date));

  const sidebar=()=><div style={{width:open?230:58,minHeight:"100vh",background:es,flexShrink:0,display:"flex",flexDirection:"column",transition:"width .22s",overflow:"hidden"}}>
    <div style={{padding:open?"22px 18px 14px":"22px 10px 14px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:30,height:30,borderRadius:"50%",border:`1.5px solid ${go}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:D,fontSize:10,color:go,fontWeight:700}}>MC</span></div>
      {open&&<div><div style={{fontFamily:D,fontSize:14,color:cr,lineHeight:1.2}}>The Collective</div><div style={{fontSize:9,letterSpacing:"0.12em",color:ta,textTransform:"uppercase",fontFamily:U}}>Studio CRM</div></div>}
    </div>
    <nav style={{flex:1,padding:"10px 0",overflowY:"auto"}}>
      {NAV.map(n=><button key={n.id} className="nb" onClick={()=>{setTab(n.id);setSelC(null);setSelE(null);setSelP(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:open?"10px 18px":"10px 14px",background:tab===n.id?"rgba(201,168,76,.14)":"transparent",borderLeft:`3px solid ${tab===n.id?go:"transparent"}`,border:"none",cursor:"pointer",transition:"all .14s",textAlign:"left"}}>
        <span style={{fontSize:15,flexShrink:0,width:18}}>{n.i}</span>
        {open&&<span style={{fontSize:13,fontFamily:U,fontWeight:tab===n.id?600:400,color:tab===n.id?go:ta,whiteSpace:"nowrap"}}>{n.l}</span>}
      </button>)}
    </nav>
    <button onClick={()=>setOpen(!open)} style={{padding:"10px",background:"transparent",border:"none",cursor:"pointer",color:ta,fontSize:13,textAlign:open?"right":"center",paddingRight:open?18:10}}>{open?"←":"→"}</button>
  </div>;

  const dashboard=()=><div className="fi">
    <H2>Good morning, Michelle ☀️</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:18}}>
      {[["💰","Revenue",`$${rev.toLocaleString()}`],["⏳","Outstanding",`$${out.toLocaleString()}`],["🌟","Active",clients.filter(c=>["Active","Booked","Proposal Sent"].includes(c.status)).length],["📥","New Leads",clients.filter(c=>c.status==="Lead").length]].map(([i,l,v])=><Card hover key={l} sx={{padding:15}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es,lineHeight:1}}>{v}</div></div>
          <span style={{fontSize:20}}>{i}</span>
        </div>
      </Card>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:18,marginBottom:18}}>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>☁️ Shoot Day Weather</div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>{WX.slice(0,2).map(w=><WW key={w.date} shoot={w}/>)}</div>
      </div>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>📅 Upcoming Sessions</div>
        <Card sx={{overflow:"hidden"}}>
          {upcoming.slice(0,4).map((c,i,arr)=>{const sun=getSun(c.date),p=pkgs.find(x=>x.id===c.pkg);return<div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",transition:"background .14s"}}>
            <div style={{width:36,height:36,borderRadius:7,background:es,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <div style={{fontSize:7,color:go,textTransform:"uppercase",fontFamily:U}}>{new Date(c.date+"T12:00:00").toLocaleString("default",{month:"short"})}</div>
              <div style={{fontSize:14,color:cr,fontWeight:700,fontFamily:D,lineHeight:1}}>{new Date(c.date+"T12:00:00").getDate()}</div>
            </div>
            <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.loc} · {p?.name}</div></div>
            <div style={{textAlign:"right"}}><Tag color={SC(c.status)} ch={c.status}/><div style={{fontSize:9,color:tl,fontFamily:U,marginTop:2}}>🌅 {sun.rs}</div></div>
          </div>})}
        </Card>
      </div>
    </div>
    <H2>Recent Leads</H2>
    <Card sx={{overflow:"hidden"}}>
      {clients.filter(c=>["Lead","Proposal Sent"].includes(c.status)).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",transition:"background .14s"}}>
        <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.type} · {c.date||"TBD"}</div></div>
        <Tag color={SC(c.status)} ch={c.status}/>
        <Btn sm v="m" ch="Send Proposal" onClick={e=>{e.stopPropagation();toast(`Proposal sent to ${c.first}! ✉️`)}}/>
      </div>)}
    </Card>
  </div>;

  const clientDetail=()=>{
    const c=selC,sun=c.date?getSun(c.date):null,p=pkgs.find(x=>x.id===c.pkg),wx=WX.find(w=>w.date===c.date);
    return<div className="fi">
      <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:18}}><button onClick={()=>setSelC(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button><h2 style={{fontFamily:D,fontSize:22,color:es,fontWeight:400}}>{c.first} {c.last}</h2><Tag color={SC(c.status)} ch={c.status}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:18}}>
        <div>
          <Card sx={{padding:18,marginBottom:14}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:11}}>Session Details</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              {[["Email",c.email],["Phone",c.phone],["Date",c.date||"TBD"],["Location",c.loc],["Package",p?.name||"—"],["Type",c.type]].map(([l,v])=><div key={l}><div style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:tl,fontFamily:U,marginBottom:1}}>{l}</div><div style={{fontSize:12,color:es,fontFamily:U}}>{v}</div></div>)}
            </div>
            {c.notes&&<div style={{marginTop:11,paddingTop:11,borderTop:`1px solid ${bo}`}}><div style={{fontSize:12,color:br,fontFamily:U,lineHeight:1.6}}>{c.notes}</div></div>}
          </Card>
          <Card sx={{padding:18,marginBottom:14}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:10}}>Financials</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
              {[["Price",`$${p?.price||0}`],["Paid",`$${c.paid}`],["Balance",`$${c.bal}`]].map(([l,v])=><div key={l} style={{textAlign:"center",padding:9,background:cr,borderRadius:7}}><div style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:tl,fontFamily:U,marginBottom:1}}>{l}</div><div style={{fontFamily:D,fontSize:17,color:es}}>{v}</div></div>)}
            </div>
          </Card>
          <Card sx={{padding:18}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>🖼️ Pic-Time Gallery</div>
            <input value={c.gallery} onChange={e=>setClients(cs=>cs.map(cl=>cl.id===c.id?{...cl,gallery:e.target.value}:cl))} placeholder="Paste Pic-Time URL…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:6,padding:"7px 10px",fontSize:12,fontFamily:U,color:es,outline:"none",background:cr,marginBottom:7}}/>
            {c.gallery&&<a href={c.gallery} target="_blank" rel="noreferrer"><Btn sm v="o" ch="Open Gallery →"/></a>}
          </Card>
        </div>
        <div>
          {wx&&<div style={{marginBottom:12}}><WW shoot={wx}/></div>}
          {sun&&<Card sx={{padding:14,marginBottom:12,background:`linear-gradient(135deg,#FAF3E0,${wh})`}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>🌅 Ideal Times</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <div><div style={{fontSize:9,color:tl,fontFamily:U}}>Sunrise</div><div style={{fontFamily:D,fontSize:17,color:es}}>{sun.rs}</div></div>
              <div><div style={{fontSize:9,color:tl,fontFamily:U}}>Sunset</div><div style={{fontFamily:D,fontSize:17,color:es}}>{sun.ss}</div></div>
            </div>
            {isB(c.loc)&&p&&<div style={{background:ml,borderRadius:7,padding:"7px 11px"}}>
              <div style={{fontSize:10,fontWeight:600,color:md,fontFamily:U,marginBottom:3}}>✨ Ideal Beach Start</div>
              <div style={{fontSize:13,color:dk,fontFamily:U}}>🌅 Morning: {m2t(sun.rm-15)}</div>
              <div style={{fontSize:13,color:dk,fontFamily:U}}>🌇 Evening: {m2t(sun.sm-p.dur)}</div>
            </div>}
          </Card>}
          <Card sx={{padding:14,marginBottom:12}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>⚡ Workflow Progress</div>
            {(()=>{const allSteps=[...LWF.steps,...SWF.steps];const ci=allSteps.findIndex(s=>s.id===selC.wf);const TC2={email:{c:bl,i:"✉️"},proposal:{c:"#6B3A7A",i:"📋"},workflow:{c:gn,i:"⚡"},status:{c:md,i:"🏷️"}};return<div style={{display:"flex",flexDirection:"column",gap:4}}>{allSteps.map((s,i)=>{const done=i<ci;const curr=i===ci;const st=TC2[s.type]||TC2.email;return<div key={s.id} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 7px",borderRadius:5,background:curr?ml:done?gnl:"transparent",opacity:i>ci+2?0.4:1}}>
              <div style={{width:14,height:14,borderRadius:"50%",background:curr?ma:done?gn:bo,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:7,color:wh}}>{done?"✓":curr?"●":""}</span></div>
              <div style={{flex:1}}><div style={{fontSize:12,color:es,fontFamily:U,fontWeight:curr?700:400}}>{s.a}</div><div style={{fontSize:9,color:tl,fontFamily:U}}>{s.t}</div></div>
              <span style={{fontSize:10}}>{st.i}</span>
            </div>})}</div>})()}
            <div style={{marginTop:9,display:"flex",gap:5}}>
              <select value={selC.wf||"l1"} onChange={async e=>{const upd={...selC,wf:e.target.value};setSelC(upd);setClients(cs=>cs.map(c=>c.id===upd.id?upd:c));await sb.from("clients").update({wf:e.target.value}).eq("id",upd.id);toast("Workflow step updated! ⚡");}} style={{flex:1,border:`1px solid ${bo}`,borderRadius:5,padding:"5px 7px",fontSize:11,fontFamily:U,color:es,outline:"none",background:cr}}>
                {[...LWF.steps,...SWF.steps].map(s=><option key={s.id} value={s.id}>{s.a}</option>)}
              </select>
            </div>
          </Card>
          <Card sx={{padding:14}}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>Quick Actions</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[["📋 Send Proposal","m"],["✉️ Send Email","o"],["📝 Contract","o"],["💳 Invoice","o"],["🌐 Client Portal","o"]].map(([l,v])=><Btn key={l} v={v} ch={l} onClick={()=>toast(`${l} — live when connected! 🚀`)}/>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  };

  const clientsList=()=>{
    const filt=clients.filter(c=>!search||`${c.first} ${c.last} ${c.email} ${c.phone}`.toLowerCase().includes(search.toLowerCase()));
    return<div className="fi">
    <H2 action={<Btn v="m" ch="+ Add Client" onClick={()=>setModal("nc")}/>}>Clients</H2>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name, email or phone…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:7,padding:"9px 14px",fontSize:12,fontFamily:U,color:es,outline:"none",background:wh,marginBottom:12}}/>
    <Card sx={{overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"7px 14px",borderBottom:`1px solid ${bo}`}}>
        {["Client","Type","Location","Date","Status","Balance"].map(h=><div key={h} style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600}}>{h}</div>)}
      </div>
      {filt.map((c,i)=><div key={c.id} className="rh" onClick={()=>setSelC(c)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"12px 14px",borderBottom:i<filt.length-1?`1px solid ${bo}`:"none",alignItems:"center",transition:"background .14s"}}>
        <div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:tl,fontFamily:U}}>{c.email}</div></div>
        <div style={{fontSize:13,color:br,fontFamily:U}}>{c.type}</div>
        <div style={{fontSize:13,color:br,fontFamily:U}}>{c.loc}</div>
        <div style={{fontSize:13,color:br,fontFamily:U}}>{c.date||"TBD"}</div>
        <Tag color={SC(c.status)} ch={c.status}/>
        <div style={{fontFamily:D,fontSize:13,color:c.bal>0?rd:gn}}>{c.bal>0?`$${c.bal}`:"✓"}</div>
      </div>)}
    </Card>
  </div>};

  const emailsTab=()=>{
    if(selE)return<div className="fi">
      <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:18}}><button onClick={()=>setSelE(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button><h2 style={{fontFamily:D,fontSize:20,color:es,fontWeight:400}}>Edit Template</h2></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        <Card sx={{padding:18}}>
          <Inp label="Template Name" value={selE.name} onChange={e=>setSelE({...selE,name:e.target.value})}/>
          <Inp label="Subject Line" value={selE.subject} onChange={e=>setSelE({...selE,subject:e.target.value})}/>
          <Inp label="Trigger" value={selE.trigger} onChange={e=>setSelE({...selE,trigger:e.target.value})}/>
          <Inp label="Email Body" value={selE.body} onChange={e=>setSelE({...selE,body:e.target.value})} multi rows={11}/>
          <div style={{fontSize:12,color:br,fontFamily:U,marginBottom:10,background:cr,padding:9,borderRadius:7,lineHeight:1.7}}>Merge tags: {"{first_name} {session_date} {session_time} {session_location}"}</div>
          <div style={{display:"flex",gap:7}}><Btn v="m" ch="Save" onClick={async()=>{setEmails(es=>es.map(e=>e.id===selE.id?selE:e));await sb.from("emails").upsert(selE);toast("Saved! ✓");setSelE(null)}}/><Btn v="o" ch="Cancel" onClick={()=>setSelE(null)}/></div>
        </Card>
        <Card sx={{padding:18}}>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:10}}>Preview</div>
          <div style={{background:cr,borderRadius:7,padding:14}}>
            <div style={{fontSize:13,fontWeight:600,color:es,fontFamily:U,marginBottom:9}}>{selE.subject}</div>
            <div style={{height:1,background:bo,marginBottom:9}}/>
            <div style={{fontSize:12,color:dk,fontFamily:U,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{selE.body.replace("{first_name}","Sarah").replace("{session_date}","May 15, 2026").replace("{session_time}","6:30 AM").replace("{session_location}","New Smyrna Beach")}</div>
          </div>
        </Card>
      </div>
    </div>;
    return<div className="fi">
      <H2 action={<Btn v="m" ch="+ New Template" onClick={()=>{const ne={id:Date.now().toString(),name:"New Template",subject:"",trigger:"",body:""};setEmails(es=>[...es,ne]);setSelE(ne)}}/>}>Email Templates</H2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
        {emails.map(e=><Card hover key={e.id} sx={{padding:14,cursor:"pointer"}} onClick={()=>setSelE({...e})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}><div style={{fontFamily:D,fontSize:17,color:es,flex:1,marginRight:7}}>{e.name}</div><Btn sm v="o" ch="Edit" onClick={ev=>{ev.stopPropagation();setSelE({...e})}}/></div>
          <div style={{fontSize:12,color:br,fontFamily:U,marginBottom:2}}>📧 {e.subject}</div>
          <div style={{fontSize:9,color:tl,fontFamily:U,fontStyle:"italic"}}>⏰ {e.trigger}</div>
        </Card>)}
      </div>
    </div>
  };

  const packagesTab=()=>{
    if(selP)return<div className="fi">
      <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:18}}><button onClick={()=>setSelP(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button><h2 style={{fontFamily:D,fontSize:20,color:es,fontWeight:400}}>Edit Package</h2></div>
      <Card sx={{padding:22,maxWidth:480}}>
        <Inp label="Name" value={selP.name} onChange={e=>setSelP({...selP,name:e.target.value})}/>
        <Inp label="Price ($)" value={selP.price} onChange={e=>setSelP({...selP,price:Number(e.target.value)})} type="number"/>
        <Inp label="Duration (min)" value={selP.dur} onChange={e=>setSelP({...selP,dur:Number(e.target.value)})} type="number"/>
        <Inp label="Images" value={selP.img} onChange={e=>setSelP({...selP,img:e.target.value})}/>
        <Inp label="Description" value={selP.desc} onChange={e=>setSelP({...selP,desc:e.target.value})} multi rows={2}/>
        <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",marginBottom:14}}>
          <div onClick={()=>setSelP({...selP,pop:!selP.pop})} style={{width:15,height:15,borderRadius:3,border:`2px solid ${selP.pop?go:bo}`,background:selP.pop?go:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{selP.pop&&<span style={{color:wh,fontSize:9}}>✓</span>}</div>
          <span style={{fontSize:11,fontFamily:U,color:dk}}>Mark as Most Popular</span>
        </label>
        <div style={{display:"flex",gap:7}}><Btn v="m" ch="Save" onClick={async()=>{const row={id:selP.id,name:selP.name,price:Number(selP.price),dur:Number(selP.dur),img:String(selP.img),description:selP.desc||"",pop:selP.pop||false};setPkgs(ps=>ps.map(p=>p.id===selP.id?selP:p));const{error}=await sb.from("packages").upsert(row);if(error)console.error("pkg save error",error);toast("Saved! ✓");setSelP(null)}}/><Btn v="o" ch="Cancel" onClick={()=>setSelP(null)}/></div>
      </Card>
    </div>;
    return<div className="fi">
      <H2 action={<Btn v="m" ch="+ Add Package" onClick={()=>{const np={id:Date.now().toString(),name:"New Package",price:0,dur:60,img:0,desc:"",pop:false};setPkgs(ps=>[...ps,np]);setSelP(np)}}/>}>Packages & Pricing</H2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11,marginBottom:22}}>
        {pkgs.map(p=><Card hover key={p.id} sx={{padding:18,position:"relative",overflow:"hidden"}}>
          {p.pop&&<div style={{position:"absolute",top:0,right:0,background:go,color:wh,fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 11px",fontFamily:U,fontWeight:700}}>Most Popular</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{p.name}</div><div style={{fontFamily:D,fontSize:21,color:dk,marginTop:1}}>${p.price.toLocaleString()}</div></div><Btn sm v="o" ch="Edit" onClick={()=>setSelP({...p})}/></div>
          <div style={{fontSize:13,color:br,fontFamily:U,lineHeight:1.6,marginBottom:7}}>{p.desc}</div>
          <div style={{display:"flex",gap:5}}><Tag color="gray" ch={`${p.dur} min`}/><Tag color="gray" ch={`${p.img} images`}/></div>
        </Card>)}
      </div>
      <H2 action={<Btn sm v="o" ch="+ Add" onClick={()=>setAddons(as=>[...as,{id:Date.now().toString(),name:"New Add-On",price:0}])}/>}>Add-Ons</H2>
      <Card sx={{overflow:"hidden"}}>
        {addons.map((a,i)=><div key={a.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<addons.length-1?`1px solid ${bo}`:"none"}}>
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{a.name}</div></div>
          <div style={{fontFamily:D,fontSize:15,color:dk}}>${a.price.toLocaleString()}</div>
          <Btn sm v="o" ch="Edit"/>
        </div>)}
      </Card>
    </div>
  };

  const workflows=()=>{
    const wf=selWF||LWF;
    const TC2={email:{bg:bll,c:bl,i:"✉️"},proposal:{bg:"#F0EBF5",c:"#6B3A7A",i:"📋"},workflow:{bg:gnl,c:gn,i:"⚡"},status:{bg:ml,c:md,i:"🏷️"}};
    return<div className="fi">
      <H2>Automation Workflows</H2>
      <div style={{display:"flex",gap:9,marginBottom:18}}>
        {[LWF,SWF].map(w=><button key={w.id} onClick={()=>setSelWF(w)} style={{padding:"7px 14px",borderRadius:7,border:`2px solid ${wf.id===w.id?es:bo}`,background:wf.id===w.id?es:wh,color:wf.id===w.id?cr:dk,fontFamily:U,fontSize:11,fontWeight:600,cursor:"pointer"}}>{w.name}</button>)}
      </div>
      <Card sx={{padding:20,marginBottom:18}}>
        <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:12}}>{wf.name}</div>
        <div style={{display:"flex",gap:0,marginBottom:18,overflowX:"auto"}}>
          {wf.ms.map((m,i)=><div key={m} style={{display:"flex",alignItems:"center"}}>
            <div style={{background:es,color:cr,borderRadius:20,padding:"4px 11px",fontSize:10,fontFamily:U,fontWeight:600,whiteSpace:"nowrap"}}>{m}</div>
            {i<wf.ms.length-1&&<div style={{width:25,height:2,background:bo,flexShrink:0}}/>}
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${wf.ms.length},1fr)`,gap:14}}>
          {wf.ms.map((m,mi)=><div key={m}>
            <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:7}}>{m}</div>
            {wf.steps.filter(s=>s.mi===mi).map(s=>{const st=TC2[s.type]||TC2.email;return<div key={s.id} style={{marginBottom:5}}>
              <div style={{fontSize:9,color:tl,fontFamily:U,textAlign:"center",marginBottom:1}}>⏱ {s.t}</div>
              <div style={{background:st.bg,borderRadius:6,padding:"7px 10px",borderLeft:`3px solid ${st.c}`}}>
                <div style={{display:"flex",gap:6,alignItems:"flex-start"}}>
                  <span style={{fontSize:12}}>{st.i}</span>
                  <div><div style={{fontSize:9,fontWeight:700,color:st.c,fontFamily:U,textTransform:"uppercase",letterSpacing:"0.07em"}}>{s.type}</div>
                    <div style={{fontSize:12,color:es,fontFamily:U}}>{s.a}</div>
                    {s.cond&&<div style={{fontSize:9,color:br,fontFamily:U,fontStyle:"italic"}}>↳ {s.cond}</div>}
                    {s.appr&&<div style={{fontSize:9,color:go,fontFamily:U}}>⚠ Needs approval</div>}
                  </div>
                </div>
              </div>
            </div>})}
          </div>)}
        </div>
      </Card>
      <H2 action={<Btn sm v="o" ch={editWF?"← Done Editing":"✏️ Edit Steps"} onClick={()=>setEditWF(!editWF)}/>}>Active Clients in Workflow</H2>
      <Card sx={{overflow:"hidden",marginBottom:14}}>
        {clients.filter(c=>!["Completed","Closed"].includes(c.status)).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",cursor:"pointer"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:gn,flexShrink:0}} className="pu"/>
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{[...LWF.steps,...SWF.steps].find(s=>s.id===c.wf)?.a||"Active"}</div></div>
          <Tag color={SC(c.status)} ch={c.status}/>
        </div>)}
      </Card>
      {editWF&&<Card sx={{padding:18}}>
        <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:11}}>✏️ Edit Workflow Steps — {wf.name}</div>
        <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:11}}>
          {(wf.id==="lead"?wfSteps.lead:wfSteps.shoot).map((s,i)=><div key={s.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:7,alignItems:"center",background:cr,borderRadius:6,padding:"7px 9px",border:`1px solid ${bo}`}}>
            <input value={s.a} onChange={e=>{const arr=wf.id==="lead"?[...wfSteps.lead]:[...wfSteps.shoot];arr[i]={...arr[i],a:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}} style={{border:`1px solid ${bo}`,borderRadius:4,padding:"4px 7px",fontSize:11,fontFamily:U,color:es,outline:"none",background:wh}}/>
            <input value={s.t} onChange={e=>{const arr=wf.id==="lead"?[...wfSteps.lead]:[...wfSteps.shoot];arr[i]={...arr[i],t:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}} style={{border:`1px solid ${bo}`,borderRadius:4,padding:"4px 7px",fontSize:11,fontFamily:U,color:es,outline:"none",background:wh}}/>
            <select value={s.type} onChange={e=>{const arr=wf.id==="lead"?[...wfSteps.lead]:[...wfSteps.shoot];arr[i]={...arr[i],type:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}} style={{border:`1px solid ${bo}`,borderRadius:4,padding:"4px 7px",fontSize:11,fontFamily:U,color:es,outline:"none",background:wh}}>
              {["email","proposal","workflow","status"].map(t=><option key={t}>{t}</option>)}
            </select>
            <button onClick={()=>{const arr=(wf.id==="lead"?[...wfSteps.lead]:[...wfSteps.shoot]).filter((_,j)=>j!==i);setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}} style={{background:"#F5EBEB",border:"none",borderRadius:4,padding:"4px 9px",cursor:"pointer",color:rd,fontSize:11}}>✕</button>
          </div>)}
        </div>
        <div style={{display:"flex",gap:7}}>
          <Btn sm v="o" ch="+ Add Step" onClick={()=>{const ns={id:Date.now().toString(),mi:0,t:"Immediately",type:"email",a:"New Step"};setWfSteps(wf.id==="lead"?{...wfSteps,lead:[...wfSteps.lead,ns]}:{...wfSteps,shoot:[...wfSteps.shoot,ns]});}}/>
          <Btn sm v="m" ch="Save Changes" onClick={()=>{toast("Workflow saved! ⚡");setEditWF(false);}}/>
        </div>
      </Card>}
    </div>
  };

  const scheduler=()=>{
    const ideal=getSlots(pvDate,pvPkg,pvLoc);
    return<div className="fi">
      <H2>Smart Scheduler</H2>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:18}}>
        <Card sx={{padding:18}}>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:11}}>🏖️ Beach Session Rules</div>
          <div style={{background:ml,borderRadius:7,padding:11,marginBottom:11}}><div style={{fontSize:13,fontWeight:700,color:md,fontFamily:U,marginBottom:4}}>✅ Beach times auto-restricted to:</div><div style={{fontSize:13,color:dk,fontFamily:U,lineHeight:1.9}}>🌅 <strong>Morning:</strong> Sunrise − 15 mins<br/>🌇 <strong>Evening:</strong> Sunset − session length<br/>🚫 <strong>Midday blocked completely</strong></div></div>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:5}}>Auto-detected beaches</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>{BEACHES.map(b=><Tag key={b} color="blue" ch={b}/>)}</div>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:7}}>🌳 Parks / Studios</div>
          <div style={{background:gnl,borderRadius:7,padding:11}}><div style={{fontSize:13,color:gn,fontFamily:U,lineHeight:1.9}}>✅ Full range: 6:30 AM – 8:30 PM<br/>✨ Golden hour highlighted as ideal<br/>📅 Max 1 session/day</div></div>
        </Card>
        <Card sx={{padding:18}}>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:12}}>🔮 Live Preview</div>
          <div style={{marginBottom:9}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:3}}>Date</div><input type="date" value={pvDate} onChange={e=>setPvDate(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}/></div>
          <div style={{marginBottom:9}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:3}}>Package</div><select value={pvPkg} onChange={e=>setPvPkg(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name} ({p.dur}m)</option>)}</select></div>
          <div style={{marginBottom:11}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:3}}>Location</div><select value={pvLoc} onChange={e=>setPvLoc(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}>{["Cocoa Beach","New Smyrna Beach","Daytona Beach","Disney's BoardWalk","Orlando/Winter Park","Deltona Studio"].map(l=><option key={l}>{l}</option>)}</select></div>
          {ideal.beach&&<div style={{background:gl,borderRadius:6,padding:8,marginBottom:9,border:`1px solid ${go}`}}><div style={{fontSize:10,fontWeight:700,color:go,fontFamily:U}}>🏖️ Beach active · 🌅 {ideal.sun.rs} · 🌇 {ideal.sun.ss}</div></div>}
          <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
            {ideal.sl.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:5,background:s.ideal?ml:cr,border:`1px solid ${s.ideal?ma:bo}`}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:s.ideal?ma:bo,flexShrink:0}}/>
              <span style={{fontSize:12,fontFamily:U,color:s.ideal?md:dk,fontWeight:s.ideal?700:400,flex:1}}>{s.t}</span>
              {s.lbl&&<span style={{fontSize:9,color:md,fontFamily:U,fontWeight:700}}>{s.lbl}</span>}
            </div>)}
          </div>
        </Card>
      </div>
    </div>
  };

  const contracts=()=><div className="fi">
    <H2>Contracts</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      <Card sx={{padding:18}}>
        <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:3}}>Portrait Photography Agreement</div>
        <div style={{fontSize:12,color:br,fontFamily:U,marginBottom:12}}>Edit freely — only affects future contracts</div>
        <textarea value={contract} onChange={e=>setContract(e.target.value)} rows={18} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:6,padding:"10px",fontSize:11,fontFamily:U,color:es,outline:"none",resize:"vertical",background:cr,lineHeight:1.8}}/>
        <div style={{display:"flex",gap:7,marginTop:10}}><Btn v="m" ch="Save" onClick={async()=>{await sb.from("settings").upsert({key:"contract",value:contract});toast("Contract saved! ✓")}}/><Btn v="o" ch="Preview"/></div>
      </Card>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>Signed Contracts</div>
        <Card sx={{overflow:"hidden",marginBottom:11}}>
          {clients.filter(c=>c.signed).map((c,i,arr)=><div key={c.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none"}}>
            <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.date} · {c.loc}</div></div>
            <Tag color="green" ch="Signed ✓"/><Btn sm v="o" ch="View"/>
          </div>)}
        </Card>
        <Card sx={{padding:12,background:ml,border:`1px solid ${ma}`}}><div style={{fontSize:13,fontWeight:600,color:md,fontFamily:U,marginBottom:4}}>💡 Per-Client Amendments</div><div style={{fontSize:13,color:dk,fontFamily:U,lineHeight:1.6}}>Open a client record → Create Contract to generate a custom version. Clients cannot change anything without you.</div></Card>
      </div>
    </div>
  </div>;

  const invoices=()=>{
    if(selInv){
      const c=selInv,p=pkgs.find(x=>x.id===c.pkg);
      return<div className="fi">
        <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:18}}><button onClick={()=>setSelInv(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button><h2 style={{fontFamily:D,fontSize:22,color:es,fontWeight:400}}>Invoice — {c.first} {c.last}</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:18}}>
          <Card sx={{padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
              <div><div style={{fontFamily:D,fontSize:20,color:es}}>The Collective</div><div style={{fontSize:13,color:br,fontFamily:U}}>Michelle Coombs Photography</div><div style={{fontSize:13,color:br,fontFamily:U}}>hello@michellecoombsphotography.com</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600}}>Invoice</div><div style={{fontFamily:D,fontSize:17,color:es}}>#{String(c.id).slice(-4).padStart(4,"0")}</div><Tag color={c.bal===0?"green":c.paid>0?"gold":"red"} ch={c.bal===0?"Paid":c.paid>0?"Partial":"Unpaid"}/></div>
            </div>
            <div style={{borderTop:`1px solid ${bo}`,paddingTop:16,marginBottom:16}}>
              <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>Bill To</div>
              <div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div>
              <div style={{fontSize:13,color:br,fontFamily:U}}>{c.email}</div>
              <div style={{fontSize:13,color:br,fontFamily:U}}>{c.phone}</div>
            </div>
            <div style={{background:cr,borderRadius:7,overflow:"hidden",marginBottom:16}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"7px 11px",background:es}}>
                {["Description","Qty","Amount"].map(h=><div key={h} style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:ta,fontFamily:U,fontWeight:600}}>{h}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"11px",borderBottom:`1px solid ${bo}`}}>
                <div><div style={{fontFamily:D,fontSize:17,color:es}}>{p?.name}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.date} · {c.loc}</div></div>
                <div style={{fontSize:12,color:dk,fontFamily:U}}>1</div>
                <div style={{fontFamily:D,fontSize:17,color:es}}>${p?.price?.toLocaleString()}</div>
              </div>
              <div style={{padding:"11px",display:"flex",justifyContent:"flex-end",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{display:"flex",gap:22,fontSize:12,fontFamily:U,color:br}}><span>Retainer Paid</span><span style={{color:gn}}>-${c.paid}</span></div>
                <div style={{display:"flex",gap:22,fontFamily:D,fontSize:16,color:c.bal>0?rd:gn}}><span>Balance Due</span><span>${c.bal}</span></div>
              </div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <Btn v="m" ch="Send Invoice" onClick={()=>toast("Email sending — connect Resend to activate! ✉️")}/>
              <Btn v="o" ch="Mark Paid" onClick={async()=>{const upd={...c,paid:(p?.price||0),bal:0};setSelInv(upd);setClients(cs=>cs.map(cl=>cl.id===upd.id?upd:cl));await sb.from("clients").update({paid:upd.paid,bal:0}).eq("id",upd.id);toast("Marked as paid! ✓");}}/>
            </div>
          </Card>
          <div>
            <Card sx={{padding:14,marginBottom:11}}>
              <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>Payment History</div>
              {c.paid>0?<div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:U,padding:"7px 0",borderBottom:`1px solid ${bo}`}}><span style={{color:dk}}>Retainer</span><span style={{color:gn}}>+${c.paid}</span></div>:<div style={{fontSize:13,color:tl,fontFamily:U}}>No payments yet</div>}
            </Card>
            <Card sx={{padding:14,background:c.bal===0?gnl:gl,border:`1px solid ${c.bal===0?gn:go}`}}>
              <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.bal===0?"🎉 Paid in Full":"💳 Payment Due"}</div>
              <div style={{fontFamily:D,fontSize:22,color:c.bal===0?gn:rd}}>${c.bal===0?p?.price||0:c.bal}</div>
              {c.bal>0&&<div style={{fontSize:12,color:br,fontFamily:U,marginTop:4}}>Due 72 hrs before session</div>}
            </Card>
          </div>
        </div>
      </div>;
    }
    return<div className="fi">
    <H2 action={<div style={{display:"flex",gap:7}}><Btn sm v="o" ch="Sync QuickBooks" onClick={()=>toast("QuickBooks — connect when live! 📊")}/><Btn sm v="m" ch="+ Invoice"/></div>}>Invoices</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11,marginBottom:16}}>
      {[["Total",`$${(rev+out).toLocaleString()}`],["Collected",`$${rev.toLocaleString()}`],["Outstanding",`$${out.toLocaleString()}`]].map(([l,v])=><Card key={l} sx={{padding:14}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es}}>{v}</div></Card>)}
    </div>
    <Card sx={{overflow:"hidden"}}>
      {clients.filter(c=>c.paid>0||c.bal>0).map((c,i,arr)=>{const p=pkgs.find(x=>x.id===c.pkg);return<div key={c.id} className="rh" onClick={()=>setSelInv(c)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",cursor:"pointer"}}>
        <div style={{flex:1.5}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{p?.name}</div></div>
        <div style={{fontSize:13,color:br,fontFamily:U,flex:1}}>{c.date}</div>
        <div style={{fontFamily:D,fontSize:17,color:es,flex:0.8}}>${p?.price?.toLocaleString()}</div>
        <Tag color={c.bal===0?"green":c.paid>0?"gold":"red"} ch={c.bal===0?"Paid":c.paid>0?"Partial":"Unpaid"}/>
        <Btn sm v="o" ch="View" onClick={e=>{e.stopPropagation();setSelInv(c);}}/>
      </div>})}
    </Card>
  </div>};

  const galleries=()=><div className="fi">
    <H2>Galleries</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
      {clients.map(c=><Card hover key={c.id} sx={{padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.date}</div></div><Tag color={c.gallery?"green":"gray"} ch={c.gallery?"Delivered":"Pending"}/></div>
        <input value={c.gallery} onChange={e=>setClients(cs=>cs.map(cl=>cl.id===c.id?{...cl,gallery:e.target.value}:cl))} placeholder="Paste Pic-Time URL…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:11,fontFamily:U,outline:"none",background:cr}}/>
        {c.gallery&&<div style={{marginTop:6}}><a href={c.gallery} target="_blank" rel="noreferrer"><Btn sm v="o" ch="Open →"/></a></div>}
      </Card>)}
    </div>
  </div>;

  const portal=()=>{
    const pc=portalC||clients[0]?.id||null;
    const c=clients.find(x=>x.id===pc)||clients[0];
    if(!c)return<div className="fi"><H2>Client Portal</H2><div style={{color:br,fontFamily:U}}>No clients yet.</div></div>;
    const p=pkgs.find(x=>x.id===c.pkg),sun=getSun(c.date||"2026-04-15"),wx=WX.find(w=>w.client===`${c.first} ${c.last}`)||WX[0];
    const portalLink=`${window.location.origin}?portal=${c.id}`;
    return<div className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{fontFamily:D,fontSize:20,color:es,fontWeight:400}}>Client Portal Preview</h2>
        <div style={{display:"flex",gap:9,alignItems:"center"}}>
          <select value={pc} onChange={e=>setPortalC(e.target.value)} style={{border:`1px solid ${bo}`,borderRadius:5,padding:"6px 11px",fontSize:13,fontFamily:U,color:es,outline:"none",background:cr}}>
            {clients.map(cl=><option key={cl.id} value={cl.id}>{cl.first} {cl.last}</option>)}
          </select>
          <Btn sm v="m" ch="📋 Copy Link" onClick={()=>{navigator.clipboard.writeText(portalLink);toast("Portal link copied! 🔗");}}/>
        </div>
      </div>
      <div style={{background:sa,borderRadius:7,padding:7,marginBottom:14,fontSize:11,fontFamily:U,color:br}}>🔗 Client link: <span style={{color:bl,fontStyle:"italic"}}>{portalLink}</span></div>
      <div style={{background:sa,borderRadius:9,padding:18}}>
        <div style={{background:wh,borderRadius:6,padding:"9px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{fontFamily:D,fontSize:17,color:es}}>The Collective · Michelle Coombs Photography</div><div style={{fontSize:13,color:br,fontFamily:U}}>Welcome, {c.first}!</div></div>
        <div style={{background:es,borderRadius:6,padding:"22px 18px",textAlign:"center",marginBottom:12}}><div style={{fontFamily:D,fontSize:22,color:cr,marginBottom:2}}>Hi {c.first}! 🎉</div><div style={{fontSize:12,color:ta,fontFamily:U}}>Your session details — everything in one place.</div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
          <Card sx={{padding:14}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>📅 Your Session</div>
            <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.date?new Date(c.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"TBD"}</div>
            <div style={{fontSize:13,color:br,fontFamily:U,marginBottom:9}}>{c.loc} · {p?.name}</div>
            <div style={{display:"flex",gap:14}}>{[["🌅",sun.rs],["🌇",sun.ss]].map(([l,v])=><div key={l}><div style={{fontSize:9,color:tl,fontFamily:U}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:es,fontFamily:U}}>{v}</div></div>)}</div>
          </Card>
          <WW shoot={wx}/>
          <Card sx={{padding:14}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>💳 Investment</div>
            {[["Package",`$${p?.price||0}`],["Retainer Paid",`-$${c.paid||0}`],["Balance Due",`$${c.bal||0}`]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:U,marginBottom:3,color:l==="Balance Due"?rd:dk,fontWeight:l==="Balance Due"?700:400}}><span>{l}</span><span>{v}</span></div>)}
            {c.bal>0&&<Btn v="m" ch="Pay Balance Now" sx={{width:"100%",marginTop:7}} onClick={()=>toast("Square payment — connect when live! 💳")}/>}
          </Card>
          <Card sx={{padding:14}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>📝 Contract</div>
            <Tag color={c.signed?"green":"red"} ch={c.signed?"Signed ✓":"Awaiting Signature"}/>
            <div style={{marginTop:7}}><Btn v="o" sm ch="Review Contract"/></div>
          </Card>
          {c.gallery&&<Card sx={{padding:14,gridColumn:"span 2"}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:U,fontWeight:600,marginBottom:9}}>🖼️ Your Gallery</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>Your photos are ready! 🎉</div><div style={{fontSize:13,color:br,fontFamily:U}}>Click below to view and download your images.</div></div>
              <a href={c.gallery} target="_blank" rel="noreferrer"><Btn v="m" ch="View Gallery →"/></a>
            </div>
          </Card>}
          {!c.gallery&&<Card sx={{padding:14,gridColumn:"span 2",background:sa,border:`1px solid ${bo}`}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:U,fontWeight:600,marginBottom:5}}>🖼️ Gallery</div>
            <div style={{fontSize:13,color:br,fontFamily:U}}>Your gallery will appear here once it's delivered — usually within 2–3 weeks of your session.</div>
          </Card>}
        </div>
      </div>
    </div>
  };

  const settings=()=><div className="fi">
    <H2>Settings & Integrations</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
      {[{n:"Square",d:"Payment processing",i:"💳"},{n:"Resend",d:"Email delivery (~3,000/mo free)",i:"✉️"},{n:"QuickBooks",d:"Sync invoices & financials",i:"📊"},{n:"Supabase",d:"Database — saves all data",i:"🗄️"},{n:"Zapier",d:"Connect Showit form → CRM",i:"⚡"},{n:"Pic-Time",d:"Gallery delivery via links",i:"🖼️",active:true}].map(s=><Card key={s.n} sx={{padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:36,height:36,borderRadius:7,background:sa,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{s.i}</div>
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es,marginBottom:1}}>{s.n}</div><div style={{fontSize:12,color:br,fontFamily:U,marginBottom:4}}>{s.d}</div><Tag color={s.active?"green":"gray"} ch={s.active?"Active":"Not connected"}/></div>
          <Btn sm v={s.active?"o":"m"} ch={s.active?"Manage":"Connect"} onClick={()=>toast(`${s.n} — connect when going live! 🚀`)}/>
        </div>
      </Card>)}
    </div>
  </div>;

  const leads=()=>{
    const lsearch=search;
    const filtL=c=>!lsearch||`${c.first} ${c.last} ${c.email} ${c.phone}`.toLowerCase().includes(lsearch.toLowerCase());
    return<div className="fi">
    <H2 action={<Btn v="m" ch="+ Add Lead" onClick={()=>setModal("nc")}/>}>Lead Pipeline</H2>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search leads by name, email or phone…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:7,padding:"9px 14px",fontSize:12,fontFamily:U,color:es,outline:"none",background:wh,marginBottom:12}}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      {["Lead","Proposal Sent","Booked","Completed"].map(stage=><div key={stage}>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:7,display:"flex",justifyContent:"space-between"}}>{stage}<span style={{color:tl}}>{clients.filter(c=>c.status===stage).length}</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {clients.filter(c=>c.status===stage&&filtL(c)).map(c=><Card hover key={c.id} sx={{padding:11,cursor:"pointer"}} onClick={()=>{setSelC(c);setTab("clients")}}>
            <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.first} {c.last}</div>
            <div style={{fontSize:12,color:br,fontFamily:U,marginBottom:2}}>{c.loc}</div>
            <div style={{fontSize:9,color:tl,fontFamily:U}}>{c.date||"TBD"}</div>
            {c.bal>0&&<div style={{marginTop:4}}><Tag color="gold" ch={`$${c.bal} due`}/></div>}
          </Card>)}
        </div>
      </div>)}
    </div>
  </div>};

  const calendar=()=>{
    const sdays=clients.map(c=>c.date?parseInt(c.date.split("-")[2]):null).filter(Boolean);
    return<div className="fi">
      <H2>Calendar — March 2026</H2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 220px",gap:18}}>
        <Card sx={{padding:18}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} style={{textAlign:"center",fontSize:9,color:tl,fontFamily:U,padding:"2px 0"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
            {Array(new Date(2026,2,1).getDay()).fill(null).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:31},(_,i)=>i+1).map(d=>{const has=sdays.includes(d);return<div key={d} style={{aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:has?es:"transparent",color:has?go:es,fontSize:12,fontFamily:has?D:U,fontWeight:has?700:400,cursor:has?"pointer":"default"}}>{d}</div>})}
          </div>
        </Card>
        <div>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:7}}>Sessions</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {upcoming.map(c=>{const wx=WX.find(w=>w.date===c.date);return<Card key={c.id} sx={{padding:11}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:U}}>{c.date}</div></div>{wx&&<span style={{fontSize:16}}>{wx.icon}</span>}</div>
            </Card>})}
          </div>
        </div>
      </div>
    </div>
  };

  const addClientModal=()=><div style={{position:"fixed",inset:0,background:"rgba(44,24,16,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(3px)"}}>
    <div style={{background:wh,borderRadius:13,padding:24,width:"100%",maxWidth:460,boxShadow:"0 20px 50px rgba(44,24,16,.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h3 style={{fontFamily:D,fontSize:19,color:es,fontWeight:400}}>Add New Client</h3><button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",fontSize:19,cursor:"pointer",color:br}}>×</button></div>
      <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="First Name" value={nc.first} onChange={e=>setNc({...nc,first:e.target.value})}/></div><div style={{flex:1}}><Inp label="Last Name" value={nc.last} onChange={e=>setNc({...nc,last:e.target.value})}/></div></div>
      <Inp label="Email" value={nc.email} onChange={e=>setNc({...nc,email:e.target.value})} type="email"/>
      <Inp label="Phone" value={nc.phone} onChange={e=>setNc({...nc,phone:e.target.value})}/>
      <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="Session Date" value={nc.date} onChange={e=>setNc({...nc,date:e.target.value})} type="date"/></div>
        <div style={{flex:1}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:U,fontWeight:600,marginBottom:3}}>Package</div>
          <select value={nc.pkg} onChange={e=>setNc({...nc,pkg:e.target.value})} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"7px 9px",fontSize:13,fontFamily:U,color:es,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
        </div>
      </div>
      <Inp label="Location" value={nc.loc} onChange={e=>setNc({...nc,loc:e.target.value})} ph="e.g. Cocoa Beach…"/>
      <Inp label="Notes" value={nc.notes} onChange={e=>setNc({...nc,notes:e.target.value})} multi rows={2}/>
      <div style={{display:"flex",gap:7,justifyContent:"flex-end",marginTop:4}}>
        <Btn v="o" ch="Cancel" onClick={()=>setModal(null)}/>
        <Btn v="m" ch="Add Client" onClick={async()=>{if(!nc.first||!nc.email)return;const p=pkgs.find(x=>x.id===nc.pkg);const newC={...nc,status:"Lead",type:"Family",paid:0,bal:p?.price||0,gallery:"",signed:false,wf:"l1"};const{data}=await sb.from("clients").insert([newC]).select();setClients(cs=>[...(data||[newC]),...cs]);setNc({first:"",last:"",email:"",phone:"",date:"",loc:"",pkg:"signature",notes:""});setModal(null);toast("Client added! Workflow triggered ⚡")}}/>
      </div>
    </div>
  </div>;

  const map={dashboard,leads,calendar,invoices,workflows,scheduler,galleries,portal,settings};
  const renderTab=()=>{
    if(tab==="clients")return selC?clientDetail():clientsList();
    if(tab==="emails")return emailsTab();
    if(tab==="packages")return packagesTab();
    return(map[tab]||dashboard)();
  };

  return<>
    <style>{css}</style>
    <div style={{display:"flex",minHeight:"100vh",background:cr,fontFamily:U}}>
      {sidebar()}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{background:wh,borderBottom:`1px solid ${bo}`,padding:"10px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div style={{fontFamily:D,fontSize:17,color:es,fontWeight:400}}>{NAV.find(n=>n.id===tab)?.i} {NAV.find(n=>n.id===tab)?.l}</div>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{fontSize:13,color:br,fontFamily:U}}>📍 Deltona, FL</div>
            <div style={{width:28,height:28,borderRadius:"50%",background:es,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:D,fontSize:9,color:go,fontWeight:700}}>MC</span></div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"22px"}}>{renderTab()}</div>
      </div>
      {modal==="nc"&&addClientModal()}
      {notif&&<div style={{position:"fixed",bottom:18,right:18,background:es,color:cr,padding:"9px 18px",borderRadius:7,fontSize:12,fontFamily:U,boxShadow:"0 6px 24px rgba(44,24,16,.25)",zIndex:9999,display:"flex",alignItems:"center",gap:6}}><span>✓</span>{notif}</div>}
    </div>
  </>
}
