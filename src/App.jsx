import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://cqtgwqovtyoqkjfyczpz.supabase.co";
const SB_KEY = "sb_publishable_sJ9AKzaPHzNxCtz61bFjSA_GpYyINmh";
const sb = createClient(SB_URL, SB_KEY);

const css=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#444444}
.rh:hover{background:#fdf9f9!important;cursor:pointer}
.ch:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.06)!important}
.nb:hover{background:#fdf9f9!important}
@keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fi .25s ease}
@keyframes pu{0%,100%{opacity:1}50%{opacity:.3}}.pu{animation:pu 2s infinite}
input,textarea,select{font-family:'Cormorant Garamond',serif!important;}
input:focus,textarea:focus,select:focus{outline:none;border-color:#444444!important;}
button{font-family:'Cormorant Garamond',serif;}`;

const es="#444444",dk="#444444",br="#888888",ta="#aaaaaa",cr="#ffffff",sa="#fdf9f9",bo="#E8D8D6",wh="#FFFFFF",tl="#aaaaaa";
const go="#888888",gl="#fdf9f9",ma="#F0DEDC",ml="#fdf9f9",md="#888888",gn="#5A7A5A",gnl="#EBF2EB",rd="#8B3A3A",bl="#3A5A7A",bll="#EBF0F5";
const pk="#F0DEDC";
const D="'Cormorant Garamond',serif",U="'Cormorant Garamond',serif";

const getSun=(ds,lat=28.5,lng=-81)=>{
  const dateObj=new Date(ds+"T12:00:00"),month=dateObj.getMonth(),isDST=month>=2&&month<=10,tzOffset=isDST?4:5;
  const r=Math.PI/180,n=Math.floor((dateObj-new Date(dateObj.getFullYear(),0,0))/86400000);
  const B=360/365*(n-81)*r,EoT=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B),TC=4*(lng+tzOffset*15)+EoT,dec=23.45*Math.sin(B)*r;
  const HA=Math.acos(-Math.tan(lat*r)*Math.tan(dec))/r,rise=12-HA/15-TC/60,set=12+HA/15-TC/60;
  const fmt=h=>{let hh=Math.floor(h),mm=Math.round((h-Math.floor(h))*60);if(mm===60){hh+=1;mm=0;}const ampm=hh<12||hh===24?"AM":"PM";return`${hh%12||12}:${mm.toString().padStart(2,"0")} ${ampm}`};
  return{rs:fmt(rise),ss:fmt(set),rm:Math.round(rise*60),sm:Math.round(set*60)};
};
const m2t=m=>{const t=((m%1440)+1440)%1440,h=Math.floor(t/60),mm=t%60,ampm=h<12||h===24?"AM":"PM";return`${h%12||12}:${mm.toString().padStart(2,"0")} ${ampm}`};
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
const Tag=({color,ch})=>{
  const cols={green:{bg:gnl,tx:gn},red:{bg:"#F5EBEB",tx:rd},gold:{bg:"#fdf9f9",tx:"#888"},blue:{bg:"#F0F4F8",tx:"#3A5A7A"},mauve:{bg:"#fdf9f9",tx:"#888"},gray:{bg:"#f5f5f5",tx:"#888"}};
  const s=cols[color]||cols.gray;
  return<span style={{background:s.bg,color:s.tx,fontSize:12,fontFamily:D,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 12px",borderRadius:2,border:`1px solid ${bo}`}}>{ch}</span>
};
const Btn=({onClick,ch,v="p",sm,sx={}})=>{
  const s={p:{bg:pk,tx:es,border:`1px solid ${bo}`},m:{bg:pk,tx:es,border:`1px solid ${bo}`},o:{bg:"transparent",tx:es,border:`1px solid ${bo}`}}[v]||{bg:pk,tx:es,border:`1px solid ${bo}`};
  return<button onClick={onClick} style={{background:s.bg,color:s.tx,border:s.border,borderRadius:2,padding:sm?"5px 14px":"9px 22px",fontSize:sm?13:14,fontFamily:D,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"background .15s",...sx}}>{ch}</button>
};
const Card=({hover,sx={},children})=><div className={hover?"ch":""} style={{background:wh,borderRadius:3,border:`1px solid ${bo}`,transition:"all .2s",...sx}}>{children}</div>;
const H2=({children,action})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}><h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300,letterSpacing:"0.02em"}}>{children}</h2>{action}</div>;
const Inp=({label,value,onChange,type="text",multi,rows=4,ph})=><div style={{marginBottom:14}}>
  {label&&<label style={{display:"block",fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,marginBottom:6,fontFamily:D,fontWeight:400}}>{label}</label>}
  {multi?<textarea value={value} onChange={onChange} rows={rows} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:D,color:es,outline:"none",resize:"vertical",background:cr,lineHeight:1.5}}/>
  :<input type={type} value={value} onChange={onChange} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:D,color:es,outline:"none",background:cr}}/>}
</div>;
const WW=({shoot})=>{
  const sun=getSun(shoot.date),pc=shoot.pop>40?rd:shoot.pop>20?go:gn;
  return<Card hover sx={{padding:14,background:`linear-gradient(135deg,${shoot.pop>40?"#F9EDED":"#EDF2F8"},${wh})`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
      <div><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:2}}>Shoot Date</div>
        <div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.client}</div>
        <div style={{fontSize:12,color:br,fontFamily:D}}>{new Date(shoot.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
      </div>
      <div style={{textAlign:"right"}}><div style={{fontSize:26}}>{shoot.icon}</div><div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.hi}°</div></div>
    </div>
    <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:7}}>{shoot.cond} · Low {shoot.lo}°</div>
    <div style={{display:"flex",justifyContent:"space-between",paddingTop:7,borderTop:`1px solid ${bo}`}}>
      {[["🌅",sun.rs,es],["🌧️",`${shoot.pop}%`,pc],["🌇",sun.ss,es]].map(([l,v,c],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:9,color:tl,fontFamily:D}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:c,fontFamily:D}}>{v}</div></div>)}
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
  const [editC,setEditC]=useState(false);
  const [editDraft,setEditDraft]=useState(null);
  const [clientAddons,setClientAddons]=useState({});
  const [newAddon,setNewAddon]=useState({name:"",price:""});
  const [showAddonPicker,setShowAddonPicker]=useState(null);
  const [proposalExpiry,setProposalExpiry]=useState({});
  const [clientProposals,setClientProposals]=useState({});
  const [aiModal,setAiModal]=useState(null);
  const [aiDraft,setAiDraft]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiPurpose,setAiPurpose]=useState("inquiry_response");
  const [aiCustomPrompt,setAiCustomPrompt]=useState("");

  const toast=msg=>{setNotif(msg);setTimeout(()=>setNotif(null),3000)};

  const AI_PURPOSES=[
    {id:"inquiry_response",label:"Inquiry Response",desc:"First reply to a new lead"},
    {id:"follow_up",label:"Follow-Up",desc:"Check in if they haven't booked"},
    {id:"booking_confirm",label:"Booking Confirmation",desc:"They just booked — celebrate!"},
    {id:"session_prep",label:"Session Prep",desc:"What to wear, what to expect"},
    {id:"day_before",label:"Day Before Reminder",desc:"Quick reminder before their shoot"},
    {id:"day_after",label:"Day-After Thank You",desc:"Warm thank you after the session"},
    {id:"gallery_ready",label:"Gallery Ready",desc:"Their photos are delivered!"},
    {id:"custom",label:"Custom",desc:"Describe exactly what you need"},
  ];

  const draftEmail=async(client)=>{
    setAiLoading(true);setAiDraft("");
    const p=pkgs.find(x=>x.id===client.pkg);
    const sun=client.date?getSun(client.date):null;
    const purposeLabel=AI_PURPOSES.find(x=>x.id===aiPurpose)?.label||aiPurpose;
    const systemPrompt=`You are writing emails for Michelle Coombs, a warm, professional lifestyle family photographer based in Central Florida (Orlando, Cocoa Beach, New Smyrna Beach area). Her brand is "The Collective | Michelle Coombs Photography." Her style is genuine, personal, and slightly elevated — she's not corporate, she's human and caring. She signs off as "Michelle" or "With love, Michelle." Write ONLY the email body (no subject line, no extra commentary). Use {merge tags} like {first_name}, {session_date}, {session_location} where appropriate.`;
    const userPrompt=`Write a "${purposeLabel}" email for this client:
- Name: ${client.first} ${client.last}
- Session type: ${client.type}
- Package: ${p?.name||"Signature Session"} (${p?.desc||""})
- Session date: ${client.date||"TBD"}
- Location: ${client.loc||"TBD"}
- Session status: ${client.status}
- Notes: ${client.notes||"none"}
${sun?`- Sunrise: ${sun.rs}, Sunset: ${sun.ss}`:""}
${aiPurpose==="custom"?`
Special instructions: ${aiCustomPrompt}`:""}

Make it feel personal, reference their specific details naturally. Keep it warm, brief, and on-brand for Michelle.`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:systemPrompt,messages:[{role:"user",content:userPrompt}]})});
      const data=await res.json();
      const text=data.content?.find(b=>b.type==="text")?.text||"";
      setAiDraft(text);
    }catch(e){setAiDraft("Could not connect. Please try again.");}
    setAiLoading(false);
  };

  const aiEmailModal=()=>{
    const c=aiModal;if(!c)return null;
    return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,backdropFilter:"blur(5px)"}}>
      <div style={{background:wh,borderRadius:3,padding:28,width:"100%",maxWidth:640,boxShadow:"0 24px 70px rgba(0,0,0,.18)",border:`1px solid ${bo}`,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div>
            <h3 style={{fontFamily:D,fontSize:26,color:es,fontWeight:300,marginBottom:2}}>✨ AI Email Draft</h3>
            <div style={{fontSize:14,color:br,fontFamily:D}}>For {c.first} {c.last} · {c.status}</div>
          </div>
          <button onClick={()=>{setAiModal(null);setAiDraft("");}} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br,fontFamily:D}}>×</button>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>What kind of email?</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
            {AI_PURPOSES.map(ap=><button key={ap.id} onClick={()=>setAiPurpose(ap.id)} style={{textAlign:"left",padding:"9px 12px",border:`1.5px solid ${aiPurpose===ap.id?es:bo}`,borderRadius:3,background:aiPurpose===ap.id?"#fdf9f9":wh,cursor:"pointer",transition:"all .12s"}}>
              <div style={{fontFamily:D,fontSize:15,color:aiPurpose===ap.id?es:br,fontWeight:aiPurpose===ap.id?500:300}}>{ap.label}</div>
              <div style={{fontSize:12,color:tl,fontFamily:D,fontWeight:300}}>{ap.desc}</div>
            </button>)}
          </div>
        </div>
        {aiPurpose==="custom"&&<Inp label="Describe what you need" value={aiCustomPrompt} onChange={e=>setAiCustomPrompt(e.target.value)} multi rows={2} ph="e.g. She just asked about adding a second location…"/>}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <Btn v="m" ch={aiLoading?"✨ Drafting…":"✨ Draft Email"} onClick={()=>draftEmail(c)} sx={{opacity:aiLoading?0.7:1}}/>
          {aiDraft&&<Btn v="o" ch="↺ Regenerate" onClick={()=>draftEmail(c)}/>}
        </div>
        {aiLoading&&<div style={{padding:"28px 0",textAlign:"center"}}>
          <div className="pu" style={{fontSize:14,color:br,fontFamily:D,letterSpacing:"0.1em"}}>✨ Writing your email…</div>
        </div>}
        {aiDraft&&!aiLoading&&<div>
          <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Draft</div>
          <textarea value={aiDraft} onChange={e=>setAiDraft(e.target.value)} rows={12} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"12px 14px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",background:"#fdfaf9",lineHeight:1.7}}/>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <Btn v="m" ch="Copy Email" onClick={()=>{navigator.clipboard.writeText(aiDraft);toast("Copied to clipboard!")}}/>
            <Btn v="o" ch="Save as Template" onClick={()=>{const ne={id:Date.now().toString(),name:`AI Draft — ${c.first} · ${AI_PURPOSES.find(x=>x.id===aiPurpose)?.label}`,subject:"",trigger:"AI Generated",body:aiDraft};setEmails(em=>[...em,ne]);toast("Saved as template!");setAiModal(null);setAiDraft("");}}/>
            <Btn v="o" ch="Cancel" onClick={()=>{setAiModal(null);setAiDraft("");}}/>
          </div>
        </div>}
      </div>
    </div>
  };

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
        // Load proposals
        const {data:props}=await sb.from("proposals").select("*");
        if(props?.length){
          const byClient={};
          props.forEach(p=>{if(!byClient[p.client_id])byClient[p.client_id]=[];byClient[p.client_id].push(p);});
          setClientProposals(byClient);
        }
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

  const sidebar=()=><div style={{width:open?220:52,minHeight:"100vh",background:"#fff",borderRight:`1px solid ${bo}`,flexShrink:0,display:"flex",flexDirection:"column",transition:"width .22s",overflow:"hidden"}}>
    <div style={{padding:open?"28px 20px 18px":"28px 10px 18px",borderBottom:`1px solid ${bo}`,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:32,height:32,borderRadius:"50%",border:`1px solid ${bo}`,background:pk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:D,fontSize:12,color:es,fontWeight:500}}>MC</span></div>
      {open&&<div><div style={{fontFamily:D,fontSize:16,color:es,fontWeight:300,lineHeight:1.2}}>The Collective</div><div style={{fontSize:11,letterSpacing:"0.15em",color:br,textTransform:"uppercase",fontFamily:D}}>Studio CRM</div></div>}
    </div>
    <nav style={{flex:1,padding:"12px 0",overflowY:"auto"}}>
      {NAV.map(n=><button key={n.id} className="nb" onClick={()=>{setTab(n.id);setSelC(null);setSelE(null);setSelP(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:open?"11px 20px":"11px 10px",background:tab===n.id?"#fdf9f9":"transparent",borderLeft:`2px solid ${tab===n.id?"#444444":"transparent"}`,border:"none",borderLeft:`2px solid ${tab===n.id?"#444444":"transparent"}`,cursor:"pointer",transition:"all .14s",textAlign:"left"}}>
        <span style={{fontSize:14,flexShrink:0,width:18,opacity:tab===n.id?1:0.5}}>{n.i}</span>
        {open&&<span style={{fontSize:15,fontFamily:D,fontWeight:400,color:tab===n.id?es:br,whiteSpace:"nowrap",letterSpacing:"0.02em"}}>{n.l}</span>}
      </button>)}
    </nav>
    <button onClick={()=>setOpen(!open)} style={{padding:"12px",background:"transparent",border:"none",borderTop:`1px solid ${bo}`,cursor:"pointer",color:br,fontSize:14,fontFamily:D,textAlign:open?"right":"center",paddingRight:open?20:10}}>{open?"←":"→"}</button>
  </div>;

  const dashboard=()=><div className="fi">
    <H2>Good morning, Michelle ☀️</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:18}}>
      {[["💰","Revenue",`$${rev.toLocaleString()}`],["⏳","Outstanding",`$${out.toLocaleString()}`],["🌟","Active",clients.filter(c=>["Active","Booked","Proposal Sent"].includes(c.status)).length],["📥","New Leads",clients.filter(c=>c.status==="Lead").length]].map(([i,l,v])=><Card hover key={l} sx={{padding:15}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:28,color:es,fontWeight:300,lineHeight:1}}>{v}</div></div>
          <span style={{fontSize:20}}>{i}</span>
        </div>
      </Card>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:18,marginBottom:18}}>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>☁️ Shoot Day Weather</div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>{WX.slice(0,2).map(w=><WW key={w.date} shoot={w}/>)}</div>
      </div>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>📅 Upcoming Sessions</div>
        <Card sx={{overflow:"hidden"}}>
          {upcoming.slice(0,4).map((c,i,arr)=>{const sun=getSun(c.date),p=pkgs.find(x=>x.id===c.pkg);return<div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",transition:"background .14s"}}>
            <div style={{width:36,height:36,borderRadius:7,background:es,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <div style={{fontSize:7,color:go,textTransform:"uppercase",fontFamily:D}}>{new Date(c.date+"T12:00:00").toLocaleString("default",{month:"short"})}</div>
              <div style={{fontSize:14,color:cr,fontWeight:700,fontFamily:D,lineHeight:1}}>{new Date(c.date+"T12:00:00").getDate()}</div>
            </div>
            <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.loc} · {p?.name}</div></div>
            <div style={{textAlign:"right"}}><Tag color={SC(c.status)} ch={c.status}/><div style={{fontSize:9,color:tl,fontFamily:D,marginTop:2}}>🌅 {sun.rs}</div></div>
          </div>})}
        </Card>
      </div>
    </div>
    <H2>Recent Leads</H2>
    <Card sx={{overflow:"hidden"}}>
      {clients.filter(c=>["Lead","Proposal Sent"].includes(c.status)).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",transition:"background .14s"}}>
        <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.type} · {c.date||"TBD"}</div></div>
        <Tag color={SC(c.status)} ch={c.status}/>
        <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
          <Btn sm v="o" ch="✨ AI Email" onClick={e=>{e.stopPropagation();setSelC(c);setAiModal(c);setAiDraft("");setAiPurpose("inquiry_response");}}/>
          <Btn sm v="m" ch="Send Proposal" onClick={e=>{e.stopPropagation();toast(`Proposal sent to ${c.first}! ✉️`)}}/>
        </div>
      </div>)}
    </Card>
  </div>;

  const clientDetail=()=>{
    const c=selC,sun=c.date?getSun(c.date):null,p=pkgs.find(x=>x.id===c.pkg),wx=WX.find(w=>w.date===c.date);
    const cAddons=clientAddons[c.id]||[];
    const draft=editDraft||{};

    const saveClient=async()=>{
      const upd={...c,...draft};
      setSelC(upd);setClients(cs=>cs.map(x=>x.id===upd.id?upd:x));
      await sb.from("clients").update(upd).eq("id",upd.id);
      setEditC(false);setEditDraft(null);toast("Client saved!");
    };
    const addClientAddon=(a)=>{
      const entry={id:Date.now().toString(),name:a.name,price:Number(a.price)};
      const upd={...c,bal:(c.bal||0)+Number(a.price)};
      setClientAddons(ca=>({...ca,[c.id]:[...(ca[c.id]||[]),entry]}));
      setSelC(upd);setClients(cs=>cs.map(x=>x.id===c.id?upd:x));
      sb.from("clients").update({bal:upd.bal}).eq("id",c.id);
      setShowAddonPicker(null);setNewAddon({name:"",price:""});
      toast(`${a.name} added — $${a.price}`);
    };
    const getFldVal=(f)=>{
      if(draft[f]!==undefined&&draft[f]!==null){return draft[f];}
      if(c[f]!==undefined&&c[f]!==null){return c[f];}
      return "";
    };
    const FLD=({l,f,type,opts})=>{
      const t=type||"text";
      if(!editC)return<div style={{padding:"10px 0",borderBottom:"1px solid "+bo}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:2}}>{l}</div>
        <div style={{fontFamily:D,fontSize:17,color:es,fontWeight:300}}>{c[f]||"—"}</div>
      </div>;
      if(opts)return<div style={{padding:"8px 0",borderBottom:"1px solid "+bo}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div>
        <select value={getFldVal(f)} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{[f]:e.target.value});} )} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}>
          {opts.map(function(o){return<option key={o}>{o}</option>;})}
        </select>
      </div>;
      return<div style={{padding:"8px 0",borderBottom:"1px solid "+bo}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div>
        <input type={t} value={getFldVal(f)} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{[f]:e.target.value});})}
          style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
      </div>;
    };

    return<div className="fi">
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:24}}>
        <button onClick={()=>{setSelC(null);setEditC(false);setEditDraft(null);}} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17,fontFamily:D}}>←</button>
        <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300,flex:1}}>{c.first} {c.last}</h2>
        <Tag color={SC(c.status)} ch={c.status}/>
        {!editC&&<Btn sm v="o" ch="Edit Client" onClick={()=>{setEditC(true);setEditDraft({});}}/>}
        {editC&&<><Btn sm v="m" ch="Save Changes" onClick={saveClient}/><Btn sm v="o" ch="Cancel" onClick={()=>{setEditC(false);setEditDraft(null);}}/></>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:20}}>
        <div>
          <Card sx={{padding:20,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Contact</div>
            <FLD l="First Name" f="first"/>
            <FLD l="Last Name" f="last"/>
            <FLD l="Email" f="email" type="email"/>
            <FLD l="Phone" f="phone" type="tel"/>
            {editC&&<>
              <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${bo}`}}>
                <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Secondary Contact</div>
                <FLD l="Name" f="contact2name"/>
                <FLD l="Phone" f="contact2phone" type="tel"/>
              </div>
            </>}
            {!editC&&(c.contact2name||c.contact2phone)&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${bo}`}}>
              <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Secondary Contact</div>
              <div style={{fontFamily:D,fontSize:16,color:es,fontWeight:300}}>{c.contact2name} · {c.contact2phone}</div>
            </div>}
          </Card>
          <Card sx={{padding:20,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Session</div>
            <FLD l="Date" f="date" type="date"/>
            <FLD l="Location" f="loc"/>
            <FLD l="Package" f="pkg" opts={pkgs.map(p=>p.id)}/>
            <FLD l="Session Type" f="type" opts={["Family","Portrait","Engagement","Maternity","Newborn","Other"]}/>
            <FLD l="Status" f="status" opts={["Lead","Proposal Sent","Booked","Active","Completed","Closed"]}/>
            <div style={{marginTop:10}}>
              <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Notes</div>
              {editC?<textarea value={getFldVal("notes")} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{notes:e.target.value});})} rows={3}
                style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",background:"#fff"}}/>
              :<div style={{fontFamily:D,fontSize:15,color:br,fontWeight:300,lineHeight:1.6}}>{c.notes||"—"}</div>}
            </div>
          </Card>
          <Card sx={{padding:20,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Financials</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
              {[["Package Price",`$${p?.price||0}`],["Paid",editC?null:`$${c.paid}`],["Balance",editC?null:`$${c.bal}`]].map(([l,v])=>v?<div key={l} style={{textAlign:"center",padding:12,background:"#fdf9f9",borderRadius:2,border:`1px solid ${bo}`}}><div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es,fontWeight:300}}>{v}</div></div>:null)}
            </div>
            {editC&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div><div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Paid</div>
                <input type="number" value={getFldVal("paid")} onChange={e=>setEditDraft(d=>({...d,paid:Number(e.target.value)}))} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}/></div>
              <div><div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Balance</div>
                <input type="number" value={getFldVal("bal")} onChange={e=>setEditDraft(d=>({...d,bal:Number(e.target.value)}))} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}/></div>
            </div>}
          </Card>
          <Card sx={{padding:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D}}>Additional Services</div>
              <Btn sm v="o" ch="+ Add Service" onClick={()=>setShowAddonPicker(c.id)}/>
            </div>
            {cAddons.length===0&&<div style={{fontFamily:D,fontSize:15,color:br,fontWeight:300}}>No additional services added yet.</div>}
            {cAddons.map((a,i)=><div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${bo}`}}>
              <span style={{fontFamily:D,fontSize:16,color:es,fontWeight:300}}>{a.name}</span>
              <span style={{fontFamily:D,fontSize:16,color:es}}>${a.price.toLocaleString()}</span>
            </div>)}
            {showAddonPicker===c.id&&<div style={{marginTop:14,padding:14,background:"#fdf9f9",borderRadius:2,border:`1px solid ${bo}`}}>
              <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Pick Existing</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {addons.map(a=><button key={a.id} onClick={()=>addClientAddon(a)} style={{background:pk,border:`1px solid ${bo}`,borderRadius:2,padding:"5px 12px",fontFamily:D,fontSize:14,color:es,cursor:"pointer"}}>{a.name} — ${a.price}</button>)}
              </div>
              <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Or Add Custom</div>
              <div style={{display:"flex",gap:8}}>
                <input value={newAddon.name} onChange={e=>setNewAddon(n=>({...n,name:e.target.value}))} placeholder="Service name"
                  style={{flex:2,border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
                <input type="number" value={newAddon.price} onChange={e=>setNewAddon(n=>({...n,price:e.target.value}))} placeholder="Price"
                  style={{flex:1,border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
                <Btn sm v="m" ch="Add" onClick={()=>{if(newAddon.name&&newAddon.price)addClientAddon(newAddon);}}/>
              </div>
              <button onClick={()=>setShowAddonPicker(null)} style={{marginTop:8,background:"none",border:"none",fontFamily:D,fontSize:14,color:br,cursor:"pointer"}}>Cancel</button>
            </div>}
          </Card>
        </div>
        <div>
          {wx&&<div style={{marginBottom:14}}><WW shoot={wx}/></div>}
          {sun&&<Card sx={{padding:16,marginBottom:14,background:"#fdf9f9"}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Ideal Times</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div><div style={{fontSize:11,color:br,fontFamily:D,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Sunrise</div><div style={{fontFamily:D,fontSize:20,color:es,fontWeight:300}}>{sun.rs}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:br,fontFamily:D,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Sunset</div><div style={{fontFamily:D,fontSize:20,color:es,fontWeight:300}}>{sun.ss}</div></div>
            </div>
            {isB(c.loc)&&p&&<div style={{background:pk,borderRadius:2,padding:"8px 12px",border:`1px solid ${bo}`}}>
              <div style={{fontSize:12,color:es,fontFamily:D,marginBottom:2,letterSpacing:"0.05em"}}>Ideal Beach Start Times</div>
              <div style={{fontSize:14,color:es,fontFamily:D,fontWeight:300}}>Morning: {m2t(sun.rm-15)}</div>
              <div style={{fontSize:14,color:es,fontFamily:D,fontWeight:300}}>Evening: {m2t(sun.sm-(p.dur||45))}</div>
            </div>}
          </Card>}
          <Card sx={{padding:16,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Workflow Progress</div>
            {(()=>{const allSteps=[...LWF.steps,...SWF.steps];const ci=allSteps.findIndex(s=>s.id===selC.wf);
            return<div style={{display:"flex",flexDirection:"column",gap:3}}>{allSteps.map((s,i)=>{const done=i<ci,curr=i===ci;
            return<div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:2,background:curr?pk:done?gnl:"transparent",opacity:i>ci+3?0.35:1}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:curr?"#444":done?gn:bo,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${curr?"#444":done?gn:bo}`}}>
                <span style={{fontSize:8,color:"#fff"}}>{done?"✓":curr?"●":""}</span>
              </div>
              <div style={{flex:1}}><div style={{fontSize:14,color:es,fontFamily:D,fontWeight:curr?500:300}}>{s.a}</div><div style={{fontSize:11,color:br,fontFamily:D}}>{s.t}</div></div>
            </div>})}</div>})()}
            <select value={selC.wf||"l1"} onChange={async e=>{const upd={...selC,wf:e.target.value};setSelC(upd);setClients(cs=>cs.map(x=>x.id===upd.id?upd:x));await sb.from("clients").update({wf:e.target.value}).eq("id",upd.id);toast("Workflow updated");}}
              style={{width:"100%",marginTop:10,border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:14,fontFamily:D,color:es,outline:"none",background:"#fff"}}>
              {[...LWF.steps,...SWF.steps].map(s=><option key={s.id} value={s.id}>{s.a}</option>)}
            </select>
          </Card>
          <Card sx={{padding:16,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:9}}>Gallery</div>
            <input value={c.gallery||""} onChange={e=>setClients(cs=>cs.map(cl=>cl.id===c.id?{...cl,gallery:e.target.value}:cl))} placeholder="Paste Pic-Time URL"
              style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:14,fontFamily:D,color:es,outline:"none",background:"#fff",marginBottom:8}}/>
            {c.gallery&&<a href={c.gallery} target="_blank" rel="noreferrer"><Btn sm v="o" ch="Open Gallery"/></a>}
          </Card>
          <Card sx={{padding:16,marginBottom:14}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Booking Proposal</div>
            {(()=>{
              const props=clientProposals[c.id]||[];
              const active=props.find(p=>p.status==="pending"&&new Date(p.expires_at)>new Date());
              const completed=props.find(p=>p.status==="completed");
              const expired=props.find(p=>p.status==="pending"&&new Date(p.expires_at)<=new Date());
              const expDays=proposalExpiry[c.id]!==undefined?proposalExpiry[c.id]:14;
              const propUrl=active?`${window.location.origin}/proposal?token=${active.token}`:"";

              const generateToken=async()=>{
                const token=Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
                const expiresAt=new Date(Date.now()+expDays*24*60*60*1000).toISOString();
                const row={token,client_id:c.id,client_first:c.first,client_last:c.last,client_email:c.email,status:"pending",expires_at:expiresAt,created_at:new Date().toISOString()};
                await sb.from("proposals").insert(row);
                setClientProposals(cp=>({...cp,[c.id]:[...(cp[c.id]||[]),row]}));
                toast("Proposal link generated!");
              };

              const revokeProposal=async(token)=>{
                await sb.from("proposals").update({status:"revoked"}).eq("token",token);
                setClientProposals(cp=>({...cp,[c.id]:(cp[c.id]||[]).map(p=>p.token===token?{...p,status:"revoked"}:p)}));
                toast("Proposal revoked.");
              };

              if(completed)return<div>
                <div style={{background:gnl,borderRadius:2,padding:"10px 14px",marginBottom:10,border:`1px solid #c3dbc3`}}>
                  <div style={{fontFamily:D,fontSize:15,color:gn,fontWeight:400}}>✓ Proposal completed</div>
                  <div style={{fontFamily:D,fontSize:13,color:gn,fontWeight:300}}>Retainer paid · Booked</div>
                </div>
                <Btn sm v="o" ch="Quick Actions ▾" onClick={()=>toast("Email & invoice — coming soon!")}/>
              </div>;

              if(active)return<div>
                <div style={{background:"#fdf9f9",borderRadius:2,padding:"10px 14px",marginBottom:10,border:`1px solid ${bo}`}}>
                  <div style={{fontFamily:D,fontSize:13,color:br,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Active Link</div>
                  <div style={{fontFamily:D,fontSize:13,color:es,wordBreak:"break-all",marginBottom:6,fontWeight:300}}>{propUrl}</div>
                  <div style={{fontFamily:D,fontSize:12,color:br,fontWeight:300}}>Expires: {new Date(active.expires_at).toLocaleDateString()}</div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <Btn sm v="m" ch="Copy Link" onClick={()=>{navigator.clipboard.writeText(propUrl);toast("Link copied!");}}/>
                  <Btn sm v="o" ch="Revoke" onClick={()=>revokeProposal(active.token)}/>
                </div>
              </div>;

              return<div>
                {(expired||props.find(p=>p.status==="revoked"))&&<div style={{background:"#fdf9f9",borderRadius:2,padding:"8px 12px",marginBottom:10,border:`1px solid ${bo}`}}>
                  <div style={{fontFamily:D,fontSize:13,color:br,fontWeight:300}}>{expired?"Previous link expired":"Previous link revoked"} — generate a new one below.</div>
                </div>}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Link Expires After</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {[7,14,30].map(d=><button key={d} onClick={()=>setProposalExpiry(pe=>({...pe,[c.id]:d}))}
                      style={{padding:"5px 14px",borderRadius:2,border:`1px solid ${expDays===d?"#444":bo}`,background:expDays===d?es:"#fff",color:expDays===d?"#fff":es,fontFamily:D,fontSize:14,cursor:"pointer"}}>{d} days</button>)}
                    <input type="number" min="1" max="365"
                      value={![7,14,30].includes(expDays)?expDays:""}
                      onChange={e=>setProposalExpiry(pe=>({...pe,[c.id]:Number(e.target.value)}))}
                      placeholder="Custom"
                      style={{width:80,border:`1px solid ${bo}`,borderRadius:2,padding:"5px 10px",fontSize:14,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
                  </div>
                </div>
                <Btn v="m" ch="Generate Proposal Link" onClick={generateToken}/>
              </div>;
            })()}
          </Card>
          <Card sx={{padding:16}}>
            <div style={{fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Quick Actions</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              <Btn v="m" ch="✨ AI Draft Email" onClick={()=>{setAiModal(c);setAiDraft("");setAiPurpose("inquiry_response");}}/>
              {[["Send Email","o"],["View Contract","o"],["View Invoice","o"]].map(([l,v])=><Btn key={l} v={v} ch={l} onClick={()=>toast(`${l} — coming soon!`)}/>)}
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
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name, email or phone…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:7,padding:"9px 14px",fontSize:12,fontFamily:D,color:es,outline:"none",background:wh,marginBottom:12}}/>
    <Card sx={{overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"7px 14px",borderBottom:`1px solid ${bo}`}}>
        {["Client","Type","Location","Date","Status","Balance"].map(h=><div key={h} style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600}}>{h}</div>)}
      </div>
      {filt.map((c,i)=><div key={c.id} className="rh" onClick={()=>setSelC(c)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"12px 14px",borderBottom:i<filt.length-1?`1px solid ${bo}`:"none",alignItems:"center",transition:"background .14s"}}>
        <div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:tl,fontFamily:D}}>{c.email}</div></div>
        <div style={{fontSize:13,color:br,fontFamily:D}}>{c.type}</div>
        <div style={{fontSize:13,color:br,fontFamily:D}}>{c.loc}</div>
        <div style={{fontSize:13,color:br,fontFamily:D}}>{c.date||"TBD"}</div>
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
          <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:10,background:cr,padding:9,borderRadius:7,lineHeight:1.7}}>Merge tags: {"{first_name} {session_date} {session_time} {session_location}"}</div>
          <div style={{display:"flex",gap:7}}><Btn v="m" ch="Save" onClick={async()=>{setEmails(es=>es.map(e=>e.id===selE.id?selE:e));await sb.from("emails").upsert(selE);toast("Saved! ✓");setSelE(null)}}/><Btn v="o" ch="Cancel" onClick={()=>setSelE(null)}/></div>
        </Card>
        <Card sx={{padding:18}}>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:10}}>Preview</div>
          <div style={{background:cr,borderRadius:7,padding:14}}>
            <div style={{fontSize:13,fontWeight:600,color:es,fontFamily:D,marginBottom:9}}>{selE.subject}</div>
            <div style={{height:1,background:bo,marginBottom:9}}/>
            <div style={{fontSize:12,color:dk,fontFamily:D,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{selE.body.replace("{first_name}","Sarah").replace("{session_date}","May 15, 2026").replace("{session_time}","6:30 AM").replace("{session_location}","New Smyrna Beach")}</div>
          </div>
        </Card>
      </div>
    </div>;
    return<div className="fi">
      <H2 action={<Btn v="m" ch="+ New Template" onClick={()=>{const ne={id:Date.now().toString(),name:"New Template",subject:"",trigger:"",body:""};setEmails(es=>[...es,ne]);setSelE(ne)}}/>}>Email Templates</H2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
        {emails.map(e=><Card hover key={e.id} sx={{padding:14,cursor:"pointer"}} onClick={()=>setSelE({...e})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}><div style={{fontFamily:D,fontSize:17,color:es,flex:1,marginRight:7}}>{e.name}</div><Btn sm v="o" ch="Edit" onClick={ev=>{ev.stopPropagation();setSelE({...e})}}/></div>
          <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:2}}>📧 {e.subject}</div>
          <div style={{fontSize:9,color:tl,fontFamily:D,fontStyle:"italic"}}>⏰ {e.trigger}</div>
        </Card>)}
      </div>
    </div>
  };

  const packagesTab=()=>{
    if(selP)return<div className="fi">
      <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:24}}>
        <button onClick={()=>setSelP(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17,fontFamily:D}}>←</button>
        <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300}}>{selP._isAddon?"Edit Add-On":"Edit Package"}</h2>
      </div>
      <Card sx={{padding:24,maxWidth:520}}>
        <Inp label="Name" value={selP.name} onChange={e=>setSelP({...selP,name:e.target.value})}/>
        <Inp label="Price ($)" value={selP.price} onChange={e=>setSelP({...selP,price:Number(e.target.value)})} type="number"/>
        {!selP._isAddon&&<><Inp label="Duration (min)" value={selP.dur} onChange={e=>setSelP({...selP,dur:Number(e.target.value)})} type="number"/>
        <Inp label="Images Included" value={selP.img} onChange={e=>setSelP({...selP,img:e.target.value})}/></>}
        <Inp label="Description" value={selP.desc||""} onChange={e=>setSelP({...selP,desc:e.target.value})} multi rows={2}/>
        {!selP._isAddon&&<div onClick={()=>setSelP({...selP,pop:!selP.pop})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:16,padding:"10px 0"}}>
          <div style={{width:18,height:18,borderRadius:3,border:`1.5px solid ${selP.pop?"#444":bo}`,background:selP.pop?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {selP.pop&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
          </div>
          <span style={{fontSize:15,fontFamily:D,color:es,fontWeight:300}}>Mark as Most Popular</span>
        </div>}
        <div style={{display:"flex",gap:10}}>
          <Btn v="m" ch="Save" onClick={async()=>{
            if(selP._isAddon){
              const row={id:selP.id,name:selP.name,price:Number(selP.price),description:selP.desc||""};
              setAddons(as=>as.map(a=>a.id===selP.id?{...selP,desc:selP.desc}:a));
              await sb.from("addons").upsert(row);
            } else {
              const row={id:selP.id,name:selP.name,price:Number(selP.price),dur:Number(selP.dur),img:String(selP.img),description:selP.desc||"",pop:selP.pop||false};
              setPkgs(ps=>ps.map(p=>p.id===selP.id?selP:p));
              await sb.from("packages").upsert(row);
            }
            toast("Saved!");setSelP(null);
          }}/>
          <Btn v="o" ch="Cancel" onClick={()=>setSelP(null)}/>
        </div>
      </Card>
    </div>;
    return<div className="fi">
      <H2 action={<Btn v="m" ch="+ Add Package" onClick={()=>{const np={id:Date.now().toString(),name:"New Package",price:0,dur:60,img:0,desc:"",pop:false};setPkgs(ps=>[...ps,np]);setSelP(np)}}/>}>Packages & Pricing</H2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11,marginBottom:22}}>
        {pkgs.map(p=><Card hover key={p.id} sx={{padding:18,position:"relative",overflow:"hidden"}}>
          {p.pop&&<div style={{position:"absolute",top:0,right:0,background:go,color:wh,fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 11px",fontFamily:D,fontWeight:700}}>Most Popular</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{p.name}</div><div style={{fontFamily:D,fontSize:21,color:dk,marginTop:1}}>${p.price.toLocaleString()}</div></div><Btn sm v="o" ch="Edit" onClick={()=>setSelP({...p})}/></div>
          <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.6,marginBottom:7}}>{p.desc}</div>
          <div style={{display:"flex",gap:5}}><Tag color="gray" ch={`${p.dur} min`}/><Tag color="gray" ch={`${p.img} images`}/></div>
        </Card>)}
      </div>
      <H2 action={<Btn sm v="o" ch="+ Add" onClick={()=>{const na={id:Date.now().toString(),name:"New Add-On",price:0,desc:""};setAddons(as=>[...as,na]);setSelP({...na,_isAddon:true});}}/>}>Add-Ons</H2>
      <Card sx={{overflow:"hidden"}}>
        {addons.map((a,i)=><div key={a.id} style={{display:"flex",alignItems:"center",gap:11,padding:"14px 18px",borderBottom:i<addons.length-1?`1px solid ${bo}`:"none"}}>
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es,fontWeight:300}}>{a.name}</div><div style={{fontFamily:D,fontSize:14,color:br,fontWeight:300}}>{a.desc||a.description||""}</div></div>
          <div style={{fontFamily:D,fontSize:20,color:es,fontWeight:300,marginRight:12}}>${a.price.toLocaleString()}</div>
          <Btn sm v="o" ch="Edit" onClick={()=>setSelP({...a,desc:a.desc||a.description||"",_isAddon:true})}/>
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
        {[LWF,SWF].map(w=><button key={w.id} onClick={()=>setSelWF(w)} style={{padding:"7px 14px",borderRadius:7,border:`2px solid ${wf.id===w.id?es:bo}`,background:wf.id===w.id?es:wh,color:wf.id===w.id?cr:dk,fontFamily:D,fontSize:13,fontWeight:600,cursor:"pointer"}}>{w.name}</button>)}
      </div>
      <Card sx={{padding:20,marginBottom:18}}>
        <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:12}}>{wf.name}</div>
        <div style={{display:"flex",gap:0,marginBottom:18,overflowX:"auto"}}>
          {wf.ms.map((m,i)=><div key={m} style={{display:"flex",alignItems:"center"}}>
            <div style={{background:es,color:cr,borderRadius:20,padding:"4px 11px",fontSize:10,fontFamily:D,fontWeight:600,whiteSpace:"nowrap"}}>{m}</div>
            {i<wf.ms.length-1&&<div style={{width:25,height:2,background:bo,flexShrink:0}}/>}
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${wf.ms.length},1fr)`,gap:14}}>
          {wf.ms.map((m,mi)=><div key={m}>
            <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>{m}</div>
            {(editWF?wfSteps[wf.id==="lead"?"lead":"shoot"]:wf.steps).filter(s=>s.mi===mi).map((s,si)=>{
              const stepsArr=editWF?(wf.id==="lead"?wfSteps.lead:wfSteps.shoot):wf.steps;
              const globalIdx=stepsArr.findIndex(x=>x.id===s.id);
              const st=TC2[s.type]||TC2.email;
              return<div key={s.id} style={{marginBottom:6}}>
                {editWF?<div style={{background:"#fdf9f9",borderRadius:2,padding:10,border:`1px solid ${bo}`}}>
                  <input value={s.a} onChange={e=>{const arr=[...(wf.id==="lead"?wfSteps.lead:wfSteps.shoot)];arr[globalIdx]={...arr[globalIdx],a:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}}
                    style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"6px 8px",fontSize:13,fontFamily:D,color:es,outline:"none",background:"#fff",marginBottom:4}}/>
                  <div style={{display:"flex",gap:4}}>
                    <input value={s.t} onChange={e=>{const arr=[...(wf.id==="lead"?wfSteps.lead:wfSteps.shoot)];arr[globalIdx]={...arr[globalIdx],t:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}}
                      style={{flex:1,border:`1px solid ${bo}`,borderRadius:2,padding:"5px 7px",fontSize:12,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
                    <select value={s.type} onChange={e=>{const arr=[...(wf.id==="lead"?wfSteps.lead:wfSteps.shoot)];arr[globalIdx]={...arr[globalIdx],type:e.target.value};setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}}
                      style={{border:`1px solid ${bo}`,borderRadius:2,padding:"5px 7px",fontSize:12,fontFamily:D,color:es,outline:"none",background:"#fff"}}>
                      {["email","proposal","workflow","status"].map(t=><option key={t}>{t}</option>)}
                    </select>
                    <button onClick={()=>{const arr=(wf.id==="lead"?wfSteps.lead:wfSteps.shoot).filter(x=>x.id!==s.id);setWfSteps(wf.id==="lead"?{...wfSteps,lead:arr}:{...wfSteps,shoot:arr});}}
                      style={{background:"#F5EBEB",border:"none",borderRadius:2,padding:"5px 9px",cursor:"pointer",color:rd,fontSize:12,fontFamily:D}}>✕</button>
                  </div>
                </div>
                :<div style={{background:"#fdf9f9",borderRadius:2,padding:"9px 12px",border:`1px solid ${bo}`,borderLeft:`3px solid ${st.c}`}}>
                  <div style={{fontSize:11,color:br,fontFamily:D,marginBottom:2}}>{s.t}</div>
                  <div style={{fontSize:14,color:es,fontFamily:D,fontWeight:300}}>{s.a}</div>
                  {s.cond&&<div style={{fontSize:12,color:br,fontFamily:D,fontStyle:"italic",marginTop:1}}>If not completed</div>}
                </div>}
              </div>
            })}
            {editWF&&<button onClick={()=>{const ns={id:Date.now().toString(),mi,t:"Immediately",type:"email",a:"New Step"};setWfSteps(wf.id==="lead"?{...wfSteps,lead:[...wfSteps.lead,ns]}:{...wfSteps,shoot:[...wfSteps.shoot,ns]});}}
              style={{width:"100%",background:"transparent",border:`1px dashed ${bo}`,borderRadius:2,padding:"6px",fontFamily:D,fontSize:13,color:br,cursor:"pointer",marginTop:4}}>+ Add Step</button>}
          </div>)}
        </div>
      </Card>
      <H2 action={<div style={{display:"flex",gap:8}}>{editWF&&<Btn sm v="m" ch="Save Workflow" onClick={()=>{toast("Workflow saved!");setEditWF(false);}}/>}<Btn sm v="o" ch={editWF?"Cancel":"Edit Workflow"} onClick={()=>setEditWF(!editWF)}/></div>}>Active Clients in Workflow</H2>
      <Card sx={{overflow:"hidden",marginBottom:14}}>
        {clients.filter(c=>!["Completed","Closed"].includes(c.status)).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",cursor:"pointer"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:gn,flexShrink:0}} className="pu"/>
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{[...LWF.steps,...SWF.steps].find(s=>s.id===c.wf)?.a||"Active"}</div></div>
          <Tag color={SC(c.status)} ch={c.status}/>
        </div>)}
      </Card>

    </div>
  };

  const scheduler=()=>{
    const ideal=getSlots(pvDate,pvPkg,pvLoc);
    return<div className="fi">
      <H2>Smart Scheduler</H2>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:18}}>
        <Card sx={{padding:18}}>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:11}}>🏖️ Beach Session Rules</div>
          <div style={{background:ml,borderRadius:7,padding:11,marginBottom:11}}><div style={{fontSize:13,fontWeight:700,color:md,fontFamily:D,marginBottom:4}}>✅ Beach times auto-restricted to:</div><div style={{fontSize:13,color:dk,fontFamily:D,lineHeight:1.9}}>🌅 <strong>Morning:</strong> Sunrise − 15 mins<br/>🌇 <strong>Evening:</strong> Sunset − session length<br/>🚫 <strong>Midday blocked completely</strong></div></div>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:5}}>Auto-detected beaches</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>{BEACHES.map(b=><Tag key={b} color="blue" ch={b}/>)}</div>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:7}}>🌳 Parks / Studios</div>
          <div style={{background:gnl,borderRadius:7,padding:11}}><div style={{fontSize:13,color:gn,fontFamily:D,lineHeight:1.9}}>✅ Full range: 6:30 AM – 8:30 PM<br/>✨ Golden hour highlighted as ideal<br/>📅 Max 1 session/day</div></div>
        </Card>
        <Card sx={{padding:18}}>
          <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:12}}>🔮 Live Preview</div>
          <div style={{marginBottom:9}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:3}}>Date</div><input type="date" value={pvDate} onChange={e=>setPvDate(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}/></div>
          <div style={{marginBottom:9}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:3}}>Package</div><select value={pvPkg} onChange={e=>setPvPkg(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name} ({p.dur}m)</option>)}</select></div>
          <div style={{marginBottom:11}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:3}}>Location</div><select value={pvLoc} onChange={e=>setPvLoc(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:12,fontFamily:U,outline:"none",background:cr}}>{["Cocoa Beach","New Smyrna Beach","Daytona Beach","Disney's BoardWalk","Orlando/Winter Park","Deltona Studio"].map(l=><option key={l}>{l}</option>)}</select></div>
          {ideal.beach&&<div style={{background:gl,borderRadius:6,padding:8,marginBottom:9,border:`1px solid ${go}`}}><div style={{fontSize:10,fontWeight:700,color:go,fontFamily:D}}>🏖️ Beach active · 🌅 {ideal.sun.rs} · 🌇 {ideal.sun.ss}</div></div>}
          <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
            {ideal.sl.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 9px",borderRadius:5,background:s.ideal?ml:cr,border:`1px solid ${s.ideal?ma:bo}`}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:s.ideal?ma:bo,flexShrink:0}}/>
              <span style={{fontSize:12,fontFamily:D,color:s.ideal?md:dk,fontWeight:s.ideal?700:400,flex:1}}>{s.t}</span>
              {s.lbl&&<span style={{fontSize:9,color:md,fontFamily:D,fontWeight:700}}>{s.lbl}</span>}
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
        <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:12}}>Edit freely — only affects future contracts</div>
        <textarea value={contract} onChange={e=>setContract(e.target.value)} rows={18} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:6,padding:"10px",fontSize:11,fontFamily:D,color:es,outline:"none",resize:"vertical",background:cr,lineHeight:1.8}}/>
        <div style={{display:"flex",gap:7,marginTop:10}}><Btn v="m" ch="Save" onClick={async()=>{await sb.from("settings").upsert({key:"contract",value:contract});toast("Contract saved! ✓")}}/><Btn v="o" ch="Preview"/></div>
      </Card>
      <div>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>Signed Contracts</div>
        <Card sx={{overflow:"hidden",marginBottom:11}}>
          {clients.filter(c=>c.signed).map((c,i,arr)=><div key={c.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none"}}>
            <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.date} · {c.loc}</div></div>
            <Tag color="green" ch="Signed ✓"/><Btn sm v="o" ch="View"/>
          </div>)}
        </Card>
        <Card sx={{padding:12,background:ml,border:`1px solid ${ma}`}}><div style={{fontSize:13,fontWeight:600,color:md,fontFamily:D,marginBottom:4}}>💡 Per-Client Amendments</div><div style={{fontSize:13,color:dk,fontFamily:D,lineHeight:1.6}}>Open a client record → Create Contract to generate a custom version. Clients cannot change anything without you.</div></Card>
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
              <div><div style={{fontFamily:D,fontSize:20,color:es}}>The Collective</div><div style={{fontSize:13,color:br,fontFamily:D}}>Michelle Coombs Photography</div><div style={{fontSize:13,color:br,fontFamily:D}}>hello@michellecoombsphotography.com</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600}}>Invoice</div><div style={{fontFamily:D,fontSize:17,color:es}}>#{String(c.id).slice(-4).padStart(4,"0")}</div><Tag color={c.bal===0?"green":c.paid>0?"gold":"red"} ch={c.bal===0?"Paid":c.paid>0?"Partial":"Unpaid"}/></div>
            </div>
            <div style={{borderTop:`1px solid ${bo}`,paddingTop:16,marginBottom:16}}>
              <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>Bill To</div>
              <div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div>
              <div style={{fontSize:13,color:br,fontFamily:D}}>{c.email}</div>
              <div style={{fontSize:13,color:br,fontFamily:D}}>{c.phone}</div>
            </div>
            <div style={{background:cr,borderRadius:7,overflow:"hidden",marginBottom:16}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"7px 11px",background:es}}>
                {["Description","Qty","Amount"].map(h=><div key={h} style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:ta,fontFamily:D,fontWeight:600}}>{h}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"11px",borderBottom:`1px solid ${bo}`}}>
                <div><div style={{fontFamily:D,fontSize:17,color:es}}>{p?.name}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.date} · {c.loc}</div></div>
                <div style={{fontSize:12,color:dk,fontFamily:D}}>1</div>
                <div style={{fontFamily:D,fontSize:17,color:es}}>${p?.price?.toLocaleString()}</div>
              </div>
              <div style={{padding:"11px",display:"flex",justifyContent:"flex-end",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{display:"flex",gap:22,fontSize:12,fontFamily:D,color:br}}><span>Retainer Paid</span><span style={{color:gn}}>-${c.paid}</span></div>
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
              <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>Payment History</div>
              {c.paid>0?<div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:D,padding:"7px 0",borderBottom:`1px solid ${bo}`}}><span style={{color:dk}}>Retainer</span><span style={{color:gn}}>+${c.paid}</span></div>:<div style={{fontSize:13,color:tl,fontFamily:D}}>No payments yet</div>}
            </Card>
            <Card sx={{padding:14,background:c.bal===0?gnl:gl,border:`1px solid ${c.bal===0?gn:go}`}}>
              <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.bal===0?"🎉 Paid in Full":"💳 Payment Due"}</div>
              <div style={{fontFamily:D,fontSize:22,color:c.bal===0?gn:rd}}>${c.bal===0?p?.price||0:c.bal}</div>
              {c.bal>0&&<div style={{fontSize:12,color:br,fontFamily:D,marginTop:4}}>Due 72 hrs before session</div>}
            </Card>
          </div>
        </div>
      </div>;
    }
    return<div className="fi">
    <H2 action={<div style={{display:"flex",gap:7}}><Btn sm v="o" ch="Sync QuickBooks" onClick={()=>toast("QuickBooks — connect when live! 📊")}/><Btn sm v="m" ch="+ Invoice"/></div>}>Invoices</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11,marginBottom:16}}>
      {[["Total",`$${(rev+out).toLocaleString()}`],["Collected",`$${rev.toLocaleString()}`],["Outstanding",`$${out.toLocaleString()}`]].map(([l,v])=><Card key={l} sx={{padding:14}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es}}>{v}</div></Card>)}
    </div>
    <Card sx={{overflow:"hidden"}}>
      {clients.filter(c=>c.paid>0||c.bal>0).map((c,i,arr)=>{const p=pkgs.find(x=>x.id===c.pkg);return<div key={c.id} className="rh" onClick={()=>setSelInv(c)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",cursor:"pointer"}}>
        <div style={{flex:1.5}}><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{p?.name}</div></div>
        <div style={{fontSize:13,color:br,fontFamily:D,flex:1}}>{c.date}</div>
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.date}</div></div><Tag color={c.gallery?"green":"gray"} ch={c.gallery?"Delivered":"Pending"}/></div>
        <input value={c.gallery} onChange={e=>setClients(cs=>cs.map(cl=>cl.id===c.id?{...cl,gallery:e.target.value}:cl))} placeholder="Paste Pic-Time URL…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"6px 9px",fontSize:11,fontFamily:U,outline:"none",background:cr}}/>
        {c.gallery&&<div style={{marginTop:6}}><a href={c.gallery} target="_blank" rel="noreferrer"><Btn sm v="o" ch="Open →"/></a></div>}
      </Card>)}
    </div>
  </div>;

  const portal=()=>{
    const pc=portalC||clients[0]?.id||null;
    const c=clients.find(x=>x.id===pc)||clients[0];
    if(!c)return<div className="fi"><H2>Client Portal</H2><div style={{color:br,fontFamily:D}}>No clients yet.</div></div>;
    const p=pkgs.find(x=>x.id===c.pkg),sun=getSun(c.date||"2026-04-15"),wx=WX.find(w=>w.client===`${c.first} ${c.last}`)||WX[0];
    const portalLink=`${window.location.origin}?portal=${c.id}`;
    return<div className="fi">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300}}>Client Portal Preview</h2>
        <div style={{display:"flex",gap:9,alignItems:"center"}}>
          <select value={pc} onChange={e=>setPortalC(e.target.value)} style={{border:`1px solid ${bo}`,borderRadius:5,padding:"6px 11px",fontSize:13,fontFamily:D,color:es,outline:"none",background:cr}}>
            {clients.map(cl=><option key={cl.id} value={cl.id}>{cl.first} {cl.last}</option>)}
          </select>
          <Btn sm v="m" ch="📋 Copy Link" onClick={()=>{navigator.clipboard.writeText(portalLink);toast("Portal link copied! 🔗");}}/>
        </div>
      </div>
      <div style={{background:"#fdf9f9",borderRadius:2,padding:"10px 14px",marginBottom:20,fontSize:14,fontFamily:D,color:br,border:`1px solid ${bo}`,letterSpacing:"0.03em"}}>Client link: <span style={{color:es,fontStyle:"italic"}}>{portalLink}</span></div>
      <div style={{border:`1px solid ${bo}`,borderRadius:3,overflow:"hidden"}}>
        <div style={{background:"#fff",padding:"14px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${bo}`}}><div style={{fontFamily:D,fontSize:18,color:es,fontWeight:300,letterSpacing:"0.08em",textTransform:"uppercase"}}>The Collective · Michelle Coombs Photography</div><div style={{fontSize:15,color:br,fontFamily:D,fontStyle:"italic"}}>Welcome, {c.first}</div></div>
        <div style={{background:pk,padding:"28px 22px",textAlign:"center",borderBottom:`1px solid ${bo}`}}><div style={{fontFamily:D,fontSize:32,color:es,fontWeight:300,marginBottom:4}}>Hi {c.first}</div><div style={{fontSize:17,color:"#666",fontFamily:D,fontWeight:300}}>Your session details, all in one place.</div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderTop:`1px solid ${bo}`}}>
          <Card sx={{padding:14}}>
            <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}>📅 Your Session</div>
            <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.date?new Date(c.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"TBD"}</div>
            <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:9}}>{c.loc} · {p?.name}</div>
            <div style={{display:"flex",gap:14}}>{[["🌅",sun.rs],["🌇",sun.ss]].map(([l,v])=><div key={l}><div style={{fontSize:9,color:tl,fontFamily:D}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:es,fontFamily:D}}>{v}</div></div>)}</div>
          </Card>
          <WW shoot={wx}/>
          <Card sx={{padding:14}}>
            <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}>💳 Investment</div>
            {[["Package",`$${p?.price||0}`],["Retainer Paid",`-$${c.paid||0}`],["Balance Due",`$${c.bal||0}`]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:D,marginBottom:3,color:l==="Balance Due"?rd:dk,fontWeight:l==="Balance Due"?700:400}}><span>{l}</span><span>{v}</span></div>)}
            {c.bal>0&&<Btn v="m" ch="Pay Balance Now" sx={{width:"100%",marginTop:7}} onClick={()=>toast("Square payment — connect when live! 💳")}/>}
          </Card>
          <Card sx={{padding:14}}>
            <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}>📝 Contract</div>
            <Tag color={c.signed?"green":"red"} ch={c.signed?"Signed ✓":"Awaiting Signature"}/>
            <div style={{marginTop:7}}><Btn v="o" sm ch="Review Contract"/></div>
          </Card>
          {c.gallery&&<Card sx={{padding:14,gridColumn:"span 2"}}>
            <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}>🖼️ Your Gallery</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>Your photos are ready! 🎉</div><div style={{fontSize:13,color:br,fontFamily:D}}>Click below to view and download your images.</div></div>
              <a href={c.gallery} target="_blank" rel="noreferrer"><Btn v="m" ch="View Gallery →"/></a>
            </div>
          </Card>}
          {!c.gallery&&<Card sx={{padding:14,gridColumn:"span 2",background:sa,border:`1px solid ${bo}`}}>
            <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:D,fontWeight:600,marginBottom:5}}>🖼️ Gallery</div>
            <div style={{fontSize:13,color:br,fontFamily:D}}>Your gallery will appear here once it's delivered — usually within 2–3 weeks of your session.</div>
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
          <div style={{flex:1}}><div style={{fontFamily:D,fontSize:17,color:es,marginBottom:1}}>{s.n}</div><div style={{fontSize:12,color:br,fontFamily:D,marginBottom:4}}>{s.d}</div><Tag color={s.active?"green":"gray"} ch={s.active?"Active":"Not connected"}/></div>
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
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search leads by name, email or phone…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:7,padding:"9px 14px",fontSize:12,fontFamily:D,color:es,outline:"none",background:wh,marginBottom:12}}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11}}>
      {["Lead","Proposal Sent","Booked","Completed"].map(stage=><div key={stage}>
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:7,display:"flex",justifyContent:"space-between"}}>{stage}<span style={{color:tl}}>{clients.filter(c=>c.status===stage).length}</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {clients.filter(c=>c.status===stage&&filtL(c)).map(c=><Card hover key={c.id} sx={{padding:11,cursor:"pointer"}} onClick={()=>{setSelC(c);setTab("clients")}}>
            <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{c.first} {c.last}</div>
            <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:2}}>{c.loc}</div>
            <div style={{fontSize:9,color:tl,fontFamily:D}}>{c.date||"TBD"}</div>
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
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} style={{textAlign:"center",fontSize:9,color:tl,fontFamily:D,padding:"2px 0"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
            {Array(new Date(2026,2,1).getDay()).fill(null).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:31},(_,i)=>i+1).map(d=>{const has=sdays.includes(d);return<div key={d} style={{aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:has?es:"transparent",color:has?go:es,fontSize:12,fontFamily:has?D:U,fontWeight:has?700:400,cursor:has?"pointer":"default"}}>{d}</div>})}
          </div>
        </Card>
        <div>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:7}}>Sessions</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {upcoming.map(c=>{const wx=WX.find(w=>w.date===c.date);return<Card key={c.id} sx={{padding:11}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.date}</div></div>{wx&&<span style={{fontSize:16}}>{wx.icon}</span>}</div>
            </Card>})}
          </div>
        </div>
      </div>
    </div>
  };

  const addClientModal=()=><div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
    <div style={{background:wh,borderRadius:3,padding:28,width:"100%",maxWidth:480,boxShadow:"0 20px 60px rgba(0,0,0,.15)",border:`1px solid ${bo}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h3 style={{fontFamily:D,fontSize:26,color:es,fontWeight:300}}>Add New Client</h3><button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br,fontFamily:D}}>×</button></div>
      <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="First Name" value={nc.first} onChange={e=>setNc({...nc,first:e.target.value})}/></div><div style={{flex:1}}><Inp label="Last Name" value={nc.last} onChange={e=>setNc({...nc,last:e.target.value})}/></div></div>
      <Inp label="Email" value={nc.email} onChange={e=>setNc({...nc,email:e.target.value})} type="email"/>
      <Inp label="Phone" value={nc.phone} onChange={e=>setNc({...nc,phone:e.target.value})}/>
      <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="Session Date" value={nc.date} onChange={e=>setNc({...nc,date:e.target.value})} type="date"/></div>
        <div style={{flex:1}}><div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:3}}>Package</div>
          <select value={nc.pkg} onChange={e=>setNc({...nc,pkg:e.target.value})} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"7px 9px",fontSize:13,fontFamily:D,color:es,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
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
    <div style={{display:"flex",minHeight:"100vh",background:"#fff",fontFamily:D}}>
      {sidebar()}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:"#fff"}}>
        <div style={{background:wh,borderBottom:`1px solid ${bo}`,padding:"10px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div style={{fontFamily:D,fontSize:17,color:es,fontWeight:400}}>{NAV.find(n=>n.id===tab)?.i} {NAV.find(n=>n.id===tab)?.l}</div>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{fontSize:13,color:br,fontFamily:D}}>📍 Deltona, FL</div>
            <div style={{width:28,height:28,borderRadius:"50%",background:es,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:D,fontSize:9,color:go,fontWeight:700}}>MC</span></div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"32px 36px"}}>{renderTab()}</div>
      </div>
      {modal==="nc"&&addClientModal()}
      {aiModal&&aiEmailModal()}
      {notif&&<div style={{position:"fixed",bottom:20,right:20,background:"#444",color:"#fff",padding:"11px 22px",borderRadius:2,fontSize:15,fontFamily:D,boxShadow:"0 4px 20px rgba(0,0,0,.15)",zIndex:9999,display:"flex",alignItems:"center",gap:8,letterSpacing:"0.05em"}}><span>✓</span>{notif}</div>}
    </div>
  </>
}
