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
body{font-size:17px}input,textarea,select{font-family:'Cormorant Garamond',serif!important;font-size:17px!important;}
input:focus,textarea:focus,select:focus{outline:none;border-color:#444444!important;}
button{font-family:'Cormorant Garamond',serif;}
@media print{
  .no-print{display:none!important;}
  .print-area{position:fixed;top:0;left:0;width:100%;z-index:99999;}
  body{background:#fff;}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
}`;

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
 if(!beach){const sl=[];for(let m=sun.rm-30;m<=sun.sm;m+=15){const ideal=(m>=sun.rm-15&&m<=sun.rm+30)||(m>=sun.sm-len-15&&m<=sun.sm-len+15);sl.push({t:m2t(m),ideal,lbl:m<=sun.rm?"":m>=sun.sm-len?"":""});}return{sl,sun,beach};}
 return{sl:[...[-15,0,15].map(i=>({t:m2t(sun.rm+i-15),ideal:i===0,lbl:i===-15?" Ideal":i===0?" Sunrise":""})),...[-len-15,-len].map(i=>({t:m2t(sun.sm+i),ideal:i===-len,lbl:i===-len?" Ideal":""}))],sun,beach};
};

const PKGS=[
 {id:"petite",name:"Petite Session",price:497,dur:25,img:25,desc:"Up to 25 min · 25 edited images",pop:false},
 {id:"signature",name:"Signature Session",price:629,dur:45,img:40,desc:"Up to 45 min · 40 edited images",pop:true},
 {id:"extended",name:"Extended Session",price:897,dur:60,img:"ALL",desc:"60 min · ALL edited images",pop:false},
 {id:"large",name:"27–30 People",price:0,dur:30,img:"TBD",desc:"Large group — contact for pricing",pop:false},
];
const ADDONS=[{id:"raw",name:"Full Raw File Buyout",price:1497},{id:"prints",name:"Fine Art Print Set",price:297},{id:"album",name:"Mini Album 6x6",price:197}];
const EMAILS_D=[
 {id:"e1",name:"Auto Reply",subject:"Re: Your Photography Inquiry",trigger:"Immediately on lead added",body:"Hi {first_name},\n\nThank you so much for reaching out! I am so excited to connect with you.\n\nI will be in touch within one business day with availability and your personalized proposal.\n\nWarmly,\nMichelle\nThe Collective | Michelle Coombs Photography"},
 {id:"e2",name:"Inquiry Response 2",subject:"Your Session — Quick Follow Up",trigger:"36 hrs after proposal sent (if not completed)",body:"Hi {first_name},\n\nJust following up — your date is still available!\n\n- Reserve your session: [Booking Proposal Link]\n- Prefer a quick call? [Book a Call]\n\nWarmly,\nMichelle"},
 {id:"e3",name:"Magic Email",subject:"Still thinking it over?",trigger:"4 days after proposal sent (if not completed)",body:"Hi {first_name},\n\nI still have your date held but can only keep it a couple more days.\n\nAny questions at all? Just reply here or grab a quick call: [Book a Call]\n\nMichelle"},
 {id:"e4",name:"Thanks for Booking",subject:"You are officially booked!",trigger:"2 minutes after booking confirmed",body:"Hi {first_name},\n\nYou are officially on my calendar and I am SO excited!\n\n- Date: {session_date}\n- Time: {session_time}\n- Location: {session_location}\n\nYour What to Wear Guide is on its way!\n\nSo excited to meet you,\nMichelle"},
 {id:"e5",name:"What to Wear Guide",subject:"What to Wear for Your Session",trigger:"2 hours after booking confirmed",body:"Hi {first_name},\n\nHere are a few tips to help you look and feel amazing:\n\n- Choose 2-3 complementary colors\n- Avoid logos and busy patterns\n- Flowy fabrics photograph beautifully at the beach\n- Coordinate, do not match\n\nFull guide: [Session Prep Guide Link]\n\nCan not wait!\nMichelle"},
 {id:"e6",name:"Session Details",subject:"Your Session is One Week Away",trigger:"1 week before shoot date",body:"Hi {first_name},\n\nJust a friendly reminder — we are one week out from your session!\n\n- Date: {session_date}\n- Time: {session_time}\n- Location: {session_location}\n\nPlease arrive 5-10 minutes early. See you soon!\n\nMichelle"},
 {id:"e7",name:"Day-After Thank You",subject:"It was so great to meet you!",trigger:"1 day after shoot date",body:"Hi {first_name},\n\nYesterday was so much fun — thank you for trusting me with your family! Your gallery will be ready in 2-3 weeks.\n\nIf you have a moment, a Google review means the world to me: [Leave a Review Link]\n\nWith love,\nMichelle"},
 {id:"e8",name:"Gallery Ready",subject:"Your gallery is ready!",trigger:"When gallery is delivered",body:"Hi {first_name},\n\nGreat news — your gallery is ready and waiting for you!\n\nView your gallery here: {gallery_link}\n\nYou have one year of unlimited downloads. Favorites, share with family, order prints — it is all there.\n\nWith love,\nMichelle"},
];
const CLIENTS_D=[
 {id:1,first:"Sarah",last:"Mitchell",email:"sarah@email.com",phone:"407-555-0101",type:"Family",status:"Active",date:"2026-05-15",loc:"New Smyrna Beach",pkg:"extended",notes:"Large family 22 people.",paid:897,bal:0,gallery:"",signed:true,wf:"s3"},
 {id:2,first:"Carmen",last:"Rodriguez",email:"carmen@email.com",phone:"407-555-0202",type:"Family",status:"Lead",date:"2026-04-10",loc:"Cocoa Beach",pkg:"signature",notes:"Family of 5.",paid:0,bal:629,gallery:"",signed:false,wf:"l1"},
 {id:3,first:"Emma",last:"Thornton",email:"emma@email.com",phone:"407-555-0303",type:"Portrait",status:"Completed",date:"2026-01-20",loc:"Disney's BoardWalk",pkg:"petite",notes:"Solo portrait.",paid:497,bal:0,gallery:"https://pictime.com/gallery/emma",signed:true,wf:"end"},
 {id:4,first:"Alex",last:"Patel",email:"alex@email.com",phone:"407-555-0404",type:"Engagement",status:"Proposal Sent",date:"2026-04-22",loc:"Cocoa Beach",pkg:"signature",notes:"Couple session.",paid:150,bal:479,gallery:"",signed:true,wf:"l3"},
 {id:5,first:"Jessica",last:"Huang",email:"jessica@email.com",phone:"407-555-0505",type:"Family",status:"Booked",date:"2026-03-27",loc:"New Smyrna Beach",pkg:"petite",notes:"Sunrise beach session.",paid:150,bal:347,gallery:"",signed:true,wf:"s1"},
];
const WX=[
 {date:"2026-03-27",client:"Jessica Huang",loc:"New Smyrna Beach",hi:76,lo:62,cond:"Partly Cloudy",pop:10,icon:""},
 {date:"2026-04-10",client:"Carmen Rodriguez",loc:"Cocoa Beach",hi:81,lo:68,cond:"Sunny",pop:5,icon:"️"},
 {date:"2026-05-15",client:"Sarah Mitchell",loc:"New Smyrna Beach",hi:88,lo:74,cond:"Scattered Showers",pop:35,icon:"️"},
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
const NAV=[{id:"dashboard",l:"Dashboard",i:"◈"},{id:"leads",l:"Leads",i:""},{id:"clients",l:"Clients",i:""},{id:"calendar",l:"Calendar",i:""},{id:"invoices",l:"Invoices",i:""},{id:"workflows",l:"Workflows",i:""},{id:"contracts",l:"Contracts",i:""},{id:"emails",l:"Email Templates",i:"️"},{id:"proposals",l:"Booking Proposals",i:"◻"},{id:"packages",l:"Packages",i:""},{id:"scheduler",l:"Scheduler",i:"️"},{id:"locations",l:"Locations",i:""},{id:"questionnaires",l:"Questionnaires",i:""},{id:"galleries",l:"Galleries",i:"️"},{id:"portal",l:"Client Portal",i:""},{id:"agent",l:"Agent Settings",i:"◎"},{id:"settings",l:"Settings",i:"️"}];
const LOCS_D=[
 {id:"loc1",name:"Cocoa Beach",area:"Cocoa Beach, FL",address:"Cocoa Beach Pier, 401 Meade Ave",beach:true,notes:"Arrive 15 min early. Parking at pier lot."},
 {id:"loc2",name:"New Smyrna Beach",area:"New Smyrna Beach, FL",address:"Flagler Ave Beach Access",beach:true,notes:"Less crowded than Daytona. Beautiful at golden hour."},
 {id:"loc3",name:"Daytona Beach",area:"Daytona Beach, FL",address:"Main St Beach Access",beach:true,notes:"Busy on weekends. Best on weekday mornings."},
 {id:"loc4",name:"Disney's BoardWalk",area:"Orlando, FL",address:"2101 N Epcot Resorts Blvd, Orlando",beach:false,notes:"Gorgeous at sunset. Requires resort access."},
 {id:"loc5",name:"Deltona Studio",area:"Deltona, FL",address:"Studio — contact for address",beach:false,notes:"Indoor/outdoor space available."},
];
const SC=s=>({Active:"green",Booked:"green",Completed:"gray",Lead:"gold","Proposal Sent":"blue",Closed:"red"}[s]||"gray");
const TK={green:{bg:gnl,tx:gn},red:{bg:"#F5EBEB",tx:rd},gold:{bg:gl,tx:go},blue:{bg:bll,tx:bl},mauve:{bg:ml,tx:md},gray:{bg:sa,tx:br}};
const Tag=({color,ch})=>{
 const cols={green:{bg:gnl,tx:gn},red:{bg:"#F5EBEB",tx:rd},gold:{bg:"#fdf9f9",tx:"#888"},blue:{bg:"#F0F4F8",tx:"#3A5A7A"},mauve:{bg:"#fdf9f9",tx:"#888"},gray:{bg:"#f5f5f5",tx:"#888"}};
 const s=cols[color]||cols.gray;
 return<span style={{background:s.bg,color:s.tx,fontSize:12,fontFamily:D,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 12px",borderRadius:2,border:`1px solid ${bo}`}}>{ch}</span>
};
const Btn=({onClick,ch,v="p",sm,sx={}})=>{
 const s={p:{bg:pk,tx:es,border:`1px solid ${bo}`},m:{bg:pk,tx:es,border:`1px solid ${bo}`},o:{bg:"transparent",tx:es,border:`1px solid ${bo}`}}[v]||{bg:pk,tx:es,border:`1px solid ${bo}`};
 return<button onClick={onClick} style={{background:s.bg,color:s.tx,border:s.border,borderRadius:2,padding:sm?"7px 18px":"12px 26px",fontSize:sm?15:16,fontFamily:D,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"background .15s",...sx}}>{ch}</button>
};
const Card=({hover,sx={},children})=><div className={hover?"ch":""} style={{background:wh,borderRadius:3,border:`1px solid ${bo}`,transition:"all .2s",...sx}}>{children}</div>;
const H2=({children,action})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}><h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300,letterSpacing:"0.02em"}}>{children}</h2>{action}</div>;
const Inp=({label,value,onChange,type="text",multi,rows=4,ph})=><div style={{marginBottom:14}}>
 {label&&<label style={{display:"block",fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,marginBottom:6,fontFamily:D,fontWeight:400}}>{label}</label>}
 {multi?<textarea value={value} onChange={onChange} rows={rows} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:D,color:es,outline:"none",resize:"vertical",background:cr,lineHeight:1.5}}/>
 :<input type={type} value={value} onChange={onChange} placeholder={ph} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:D,color:es,outline:"none",background:cr}}/>}
</div>;
const WW=({shoot})=>{
 const sun=getSun(shoot.date),pc=shoot.pop>40?rd:shoot.pop>20?go:gn;
 return<Card hover sx={{padding:14,background:`linear-gradient(135deg,${shoot.pop>40?"#F9EDED":"#EDF2F8"},${wh})`}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
 <div><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:2}}>Shoot Date</div>
 <div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.client}</div>
 <div style={{fontSize:12,color:br,fontFamily:D}}>{new Date(shoot.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
 </div>
 <div style={{textAlign:"right"}}><div style={{fontSize:26}}>{shoot.icon}</div><div style={{fontFamily:D,fontSize:17,color:es}}>{shoot.hi}°</div></div>
 </div>
 <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:7}}>{shoot.cond} · Low {shoot.lo}°</div>
 <div style={{display:"flex",justifyContent:"space-between",paddingTop:7,borderTop:`1px solid ${bo}`}}>
 {[["",sun.rs,es],["️",`${shoot.pop}%`,pc],["",sun.ss,es]].map(([l,v,c],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:9,color:tl,fontFamily:D}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:c,fontFamily:D}}>{v}</div></div>)}
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
 const [locations,setLocations]=useState(LOCS_D);
 const [selLoc,setSelLoc]=useState(null);
 const [calMonth,setCalMonth]=useState(new Date(2026,2,1));
 const [invoiceList,setInvoiceList]=useState([]);
 const [editInv,setEditInv]=useState(null);
 const [newInvModal,setNewInvModal]=useState(false);
 const [newInv,setNewInv]=useState({clientId:"",customName:"",customEmail:"",items:[{desc:"",qty:1,price:0}],paid:0,notes:""});
 const [questionnaires,setQuestionnaires]=useState([
 {id:"q1",name:"Portrait Session Questionnaire",fields:[
 {id:"f1",label:"How many people will be in the session?",type:"text"},
 {id:"f2",label:"Any mobility or physical limitations?",type:"text"},
 {id:"f3",label:"What feeling do you want these photos to capture?",type:"textarea"},
 {id:"f4",label:"Preferred outfit color palette?",type:"text"},
 ]},
 {id:"q2",name:"Family Session Questionnaire",fields:[
 {id:"f1",label:"Names and ages of all children?",type:"text"},
 {id:"f2",label:"Any pets joining the session?",type:"text"},
 {id:"f3",label:"What's the most important thing to capture today?",type:"textarea"},
 ]},
 ]);
 const [selQ,setSelQ]=useState(null);
 const [contractTemplates,setContractTemplates]=useState([
  {id:"c1",name:"Portrait Photography Agreement",type:"portrait",active:true,body:"PORTRAIT PHOTOGRAPHY AGREEMENT\nThe Collective | Michelle Coombs Photography\n\n1. SERVICES\nPortrait photography as outlined in the selected package. Delivered via Pic-Time gallery within 2–3 weeks of session date.\n\n2. PAYMENT TERMS\n$150 non-refundable retainer due at booking to hold your date. Balance due 72 hours before session. Accepted: credit card, Venmo, Zelle.\n\n3. CANCELLATION & RESCHEDULING\nOne free reschedule with 72+ hours notice. Cancellation with less than 72 hours notice forfeits the retainer. Weather-related rescheduling is always free.\n\n4. WHAT IS INCLUDED\nHand-edited high-resolution images in color and black & white, wardrobe guidance, posing direction, highlight film, Pic-Time gallery with unlimited downloads and 1-year backup.\n\n5. COPYRIGHT\nPhotographer retains full copyright. Client is granted a personal use license for printing and sharing on social media. Commercial use requires written permission.\n\n6. MODEL RELEASE\nClient grants permission for the photographer to use images in portfolio and marketing materials unless a written request for privacy is made prior to the session.\n\n7. GALLERY DELIVERY\nEdited gallery will be delivered within 2–3 weeks of the session. Rush delivery available for an additional fee.\n\n8. GOVERNING LAW\nThis agreement is governed by the laws of the State of Florida.\n\nPhotographer Signature: _________________________ Date: __________\nClient Signature: _________________________ Date: __________"},
  {id:"c2",name:"Beach Session Agreement",type:"beach",active:true,body:"BEACH SESSION AGREEMENT\nThe Collective | Michelle Coombs Photography\n\n1. SERVICES\nBeach portrait session at the agreed location. Session times are strictly sunrise or sunset windows (typically 20-60 minutes depending on package).\n\n2. BEACH-SPECIFIC TERMS\nBeach sessions are scheduled based on sunrise and sunset times. Exact timing will be confirmed 48-72 hours before the session. Please plan to arrive 10-15 minutes early.\n\n3. WEATHER POLICY\nIf weather is unsafe (lightning, heavy rain), we will reschedule at no charge. Overcast days typically produce beautiful, even light and are not grounds for rescheduling.\n\n4. PAYMENT TERMS\n$150 non-refundable retainer due at booking. Balance due 72 hours before session.\n\n5. CANCELLATION\nOne free reschedule with 72+ hours notice. Less than 72 hours notice forfeits retainer.\n\n6. INCLUDED\nHand-edited hi-res images, highlight film, Pic-Time gallery (unlimited downloads, 1-year backup).\n\n7. COPYRIGHT & RELEASE\nPhotographer retains copyright. Personal use license granted to client. Portfolio/marketing use permitted unless client opts out in writing.\n\n8. GOVERNING LAW: State of Florida.\n\nPhotographer Signature: _________________________ Date: __________\nClient Signature: _________________________ Date: __________"},
  {id:"c3",name:"Large Group Agreement (27-30 People)",type:"large_group",active:true,body:"LARGE GROUP PHOTOGRAPHY AGREEMENT\nThe Collective | Michelle Coombs Photography\n\n1. SERVICES\nLarge group session (27-30 people) at agreed location and time. Additional coordination time is included.\n\n2. GROUP COORDINATION\nClient is responsible for ensuring all group members arrive on time and are ready at the agreed start time. Late arrivals may result in shortened session time.\n\n3. PAYMENT TERMS\n$300 non-refundable retainer due at booking. Balance due 72 hours before session. Large group pricing is customized — see your proposal for exact amount.\n\n4. CANCELLATION\nOne free reschedule with 72+ hours notice. Less than 72 hours notice forfeits retainer.\n\n5. INCLUDED\nHand-edited hi-res group images, Pic-Time gallery (unlimited downloads, 1-year backup). Large groups receive select edited images as agreed in proposal.\n\n6. COPYRIGHT & RELEASE\nPhotographer retains copyright. Personal use license granted. Portfolio use permitted unless opted out.\n\n7. GOVERNING LAW: State of Florida.\n\nPhotographer Signature: _________________________ Date: __________\nClient Signature: _________________________ Date: __________"},
]);
 const [selContract,setSelContract]=useState(null);
 const [editContractMode,setEditContractMode]=useState(false);
 const [editLocModal,setEditLocModal]=useState(null);
 const [lSearch,setLSearch]=useState("");
 const [showInvPreview,setShowInvPreview]=useState(false);
 const [showInvEmailPreview,setShowInvEmailPreview]=useState(false);
 const [sqLink,setSqLink]=useState("");
 const [agentModal,setAgentModal]=useState(null);
 const [inboxQueue,setInboxQueue]=useState([]);
 const [reviewModal,setReviewModal]=useState(null);
 const [gcalSyncing,setGcalSyncing]=useState(false);
 const [gcalLastSync,setGcalLastSync]=useState(null);
 const [agentSettings,setAgentSettings]=useState({
  autoReplyEnabled:true,
  autoReplyBody:"Hi {first_name},\n\nThank you so much for reaching out to The Collective! I am so excited to connect with you.\n\nI have received your inquiry and will be in touch within 24 hours with availability and everything you need to know.\n\nIn the meantime, feel free to browse our packages at the link below.\n\nWith love,\nMichelle\nThe Collective | Michelle Coombs Photography",
  followUpEnabled:true,
  autoSend:false,
  voiceNotes:"Warm, genuine, slightly elevated. Never corporate. Short sentences. She loves what she does. Signs as Michelle or With love, Michelle. No em dashes. No bullet points in emails.",
  smartQuestions:{
   beach:"I want to make sure we get the most magical light for you — are you thinking a sunrise session to start your day with something beautiful, or a sunset session for that golden glow at the end?",
   family:"I would love to know a little more about your crew — how many people will be joining, and do you have any little ones who might need some extra patience and movement in the session?",
   portrait:"Tell me a little about what you are hoping to feel when you look at these photos — is there a particular vibe or setting that speaks to you?",
   engagement:"Congratulations again! I would love to know how you two met, or what moment or place is most meaningful to you both — that always helps me create something really personal.",
   maternity:"You are glowing already! Are you envisioning something soft and natural outdoors, or would you prefer a more styled indoor session with beautiful light?",
   default:"What is the most important thing you want to capture or feel in these photos? That helps me tailor everything just for you."
  },
  calendarConnected:false,
 });
 const [agentStep,setAgentStep]=useState("idle");       // idle|checking|drafting|done|error
 const [agentLog,setAgentLog]=useState([]);              // string[] activity log
 const [agentDraft,setAgentDraft]=useState("");          // final email
 const [agentSubject,setAgentSubject]=useState("");
 const [calEvents,setCalEvents]=useState([]);            // fetched gcal events
 const [gcalConnected,setGcalConnected]=useState(false);
 const [importTab,setImportTab]=useState("square");
 const [csvText,setCsvText]=useState("");
 const [importPreview,setImportPreview]=useState([]);
 const [bookingProposalTypes,setBookingProposalTypes]=useState([
  {id:"bp1",name:"Family Beach Session",description:"Perfect for families of all sizes at the beach",sessionType:"Family",location:"beach",pkgIds:["petite","signature","extended"],addonIds:["raw"],active:true},
  {id:"bp2",name:"Portrait Session",description:"Individual or couples portrait sessions",sessionType:"Portrait",location:"any",pkgIds:["petite","signature"],addonIds:["prints"],active:true},
 ]);
 const [selBP,setSelBP]=useState(null);
 const [pkgImages,setPkgImages]=useState({});
 const [schedulerRules,setSchedulerRules]=useState({beachMorningOffset:-15,beachEveningOffset:0,nonBeachStart:390,nonBeachEnd:1230,bufferMins:30,maxPerDay:2});

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



 // ── GOOGLE CALENDAR SYNC ───────────────────────────────────────
 const GCAL_URL="https://gcal.mcp.claude.com/mcp";

 const gcalCall=async(toolName,args)=>{
  try{
   const res=await fetch(GCAL_URL,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({jsonrpc:"2.0",id:Date.now(),method:"tools/call",params:{name:toolName,arguments:args}})});
   if(!res.ok)return null;
   const d=await res.json();
   const txt=d?.result?.content?.[0]?.text;
   if(!txt)return null;
   try{return JSON.parse(txt);}catch{return txt;}
  }catch(ex){console.log("GCal error:",ex.message);return null;}
 };

 const checkDateOnGCal=async(dateStr)=>{
  if(!dateStr)return{available:true,events:[]};
  const dayStart=dateStr+"T00:00:00-04:00";
  const dayEnd=dateStr+"T23:59:59-04:00";
  const data=await gcalCall("list_events",{calendarId:"primary",timeMin:dayStart,timeMax:dayEnd,maxResults:20});
  if(!data)return{available:true,events:[],gcalOk:false};
  const items=(data.items||[]).filter(e=>!e.summary?.startsWith("MCP:"));
  return{available:items.length===0,events:items.map(e=>({summary:e.summary||"Busy",start:e.start?.dateTime||e.start?.date||"",end:e.end?.dateTime||e.end?.date||""})),gcalOk:true};
 };

 const pushToGCal=async(client,pkg)=>{
  if(!client.date)return false;
  const sun=getSun(client.date);
  const beach=isB(client.loc||"");
  const startMin=beach?sun.rm-15:9*60;
  const endMin=startMin+(pkg?.dur||45);
  const pad=n=>String(n).padStart(2,"0");
  const startISO=client.date+"T"+pad(Math.floor(startMin/60))+":"+pad(startMin%60)+":00";
  const endISO=client.date+"T"+pad(Math.floor(endMin/60))+":"+pad(endMin%60)+":00";
  const result=await gcalCall("create_event",{
   calendarId:"primary",
   summary:"MCP: "+client.first+" "+client.last+" — "+(pkg?.name||"Session"),
   description:"Client: "+client.first+" "+client.last+"\nEmail: "+client.email+"\nPhone: "+client.phone+"\nType: "+client.type+"\nLocation: "+client.loc+"\nPackage: "+(pkg?.name||"")+"\nNotes: "+(client.notes||""),
   start:{dateTime:startISO,timeZone:"America/New_York"},
   end:{dateTime:endISO,timeZone:"America/New_York"},
   location:client.loc||""
  });
  return !!result;
 };

 const syncAllToGCal=async()=>{
  setGcalSyncing(true);
  let pushed=0;
  const bookedClients=clients.filter(cl=>cl.date&&["Booked","Active"].includes(cl.status));
  for(const cl of bookedClients){
   const pkg=pkgs.find(p=>p.id===cl.pkg);
   const ok=await pushToGCal(cl,pkg);
   if(ok)pushed++;
  }
  setGcalSyncing(false);
  setGcalLastSync(new Date().toLocaleTimeString());
  setAgentSettings(s=>({...s,calendarConnected:true}));
  toast(pushed+" sessions pushed to Google Calendar!");
 };

 // ── AUTO-RESPONDER AGENT ───────────────────────────────────────
 const runAutoAgent=async(newLead)=>{
  const as=agentSettings;
  const p=pkgs.find(x=>x.id===newLead.pkg);
  const isBeach=isB(newLead.loc||"");
  const sessionType=(newLead.type||"Family").toLowerCase();

  // Step 1: Build instant auto-reply
  const autoReplyText=as.autoReplyBody
   .replace("{first_name}",newLead.first)
   .replace("{last_name}",newLead.last)
   .replace("{session_type}",newLead.type||"Family")
   .replace("{package}",p?.name||"Signature Session");

  // Step 2: Check Google Calendar for availability
  let calAvailable=true;
  let calEvents=[];
  let calOk=false;
  if(newLead.date){
   const check=await checkDateOnGCal(newLead.date);
   calAvailable=check.available;
   calEvents=check.events||[];
   calOk=check.gcalOk||false;
  }

  // Also check CRM bookings
  const crmConflict=clients.some(cl=>cl.date===newLead.date&&cl.id!==newLead.id&&cl.status!=="Cancelled");
  const fullyAvailable=calAvailable&&!crmConflict;

  // Step 3: Pick smart question
  let smartQ=as.smartQuestions.default;
  if(isBeach)smartQ=as.smartQuestions.beach;
  else if(sessionType.includes("engagement"))smartQ=as.smartQuestions.engagement;
  else if(sessionType.includes("portrait"))smartQ=as.smartQuestions.portrait;
  else if(sessionType.includes("maternity"))smartQ=as.smartQuestions.maternity;
  else if(sessionType.includes("family"))smartQ=as.smartQuestions.family;

  // Step 4: AI-draft the follow-up email
  const sun=newLead.date?getSun(newLead.date):null;
  const dateDisplay=newLead.date?new Date(newLead.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"the date you mentioned";
  const timeNote=isBeach&&sun?" The ideal time would be around "+m2t(sun.rm-15)+" (morning) or "+m2t(sun.sm-(p?.dur||45))+" (evening).":"";

  const systemPrompt=`You are writing an email AS Michelle Coombs, warm lifestyle photographer in Central Florida, brand "The Collective | Michelle Coombs Photography." Voice: ${as.voiceNotes} Write ONLY the email body. No subject line. No preamble.`;

  const availMsg=fullyAvailable
   ?"Great news — "+dateDisplay+" is available on Michelle's calendar."+timeNote
   :(crmConflict||!calOk)
    ?"Michelle will need to confirm the date "+dateDisplay+" — include a note that you will verify shortly and suggest they also mention an alternate date."
    :""+dateDisplay+" appears to have a conflict on the calendar. Gently let them know and ask if they have flexibility on the date, suggesting they offer 1-2 alternatives.";

  const userPrompt=`Write a warm follow-up email from Michelle to a new inquiry. This is the SECOND email — the first auto-reply already went out confirming receipt.

CLIENT INFO:
- Name: ${newLead.first} ${newLead.last}
- Session type: ${newLead.type||"Family"}
- Package: ${p?.name||"Signature Session"}
- Requested date: ${dateDisplay}
- Location: ${newLead.loc||"not specified yet"}
- Their notes: ${newLead.notes||"(none provided)"}

CALENDAR STATUS: ${availMsg}

YOUR JOB IN THIS EMAIL:
1. Open warmly — reference something specific from their inquiry if possible
2. Address the calendar status naturally (available / checking / conflict)
3. Ask this ONE question and nothing else: "${smartQ}"
4. Close warmly, invite them to reply

Keep it to 4-6 sentences. Human, warm, NOT corporate. No lists. Sign as Michelle.`;

  let followUpText="";
  try{
   const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:systemPrompt,messages:[{role:"user",content:userPrompt}]})
   });
   const data=await res.json();
   followUpText=data.content?.find(b=>b.type==="text")?.text||"Could not draft — please write manually.";
  }catch(ex){followUpText="AI unavailable — please write follow-up manually.";}

  // Step 5: Add to inbox review queue
  const reviewItem={
   id:Date.now().toString(),
   lead:newLead,
   autoReplyText,
   followUpText,
   followUpSubject:"Re: Your Photography Inquiry — The Collective | Michelle Coombs Photography",
   calAvailable:fullyAvailable,
   calOk,
   calEvents,
   smartQ,
   createdAt:new Date().toISOString(),
   status:"pending"
  };

  setInboxQueue(q=>[reviewItem,...q]);

  if(as.autoSend){
   toast("Agent: Auto-reply + follow-up queued for "+newLead.first+"!");
  }else{
   setReviewModal(reviewItem);
   toast("Agent ready — review emails for "+newLead.first);
  }
 };

 // ── BOOKING AGENT ──────────────────────────────────────────────
 const log=(msg)=>setAgentLog(l=>[...l,msg]);

 const fetchGCalEvents=async()=>{
  // Try to get Google Calendar events via MCP connector
  // Returns array of {start, end, summary} or []
  try{
   const res=await fetch("https://gcal.mcp.claude.com/mcp",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
     jsonrpc:"2.0",id:1,method:"tools/call",
     params:{name:"list_events",arguments:{
      calendarId:"primary",
      timeMin:new Date().toISOString(),
      timeMax:new Date(Date.now()+60*24*60*60*1000).toISOString(),
      maxResults:50
     }}
    })
   });
   if(!res.ok)throw new Error("gcal "+res.status);
   const d=await res.json();
   const items=d?.result?.content?.[0]?.text;
   if(items){
    const parsed=JSON.parse(items);
    setGcalConnected(true);
    return(parsed.items||[]).map(e=>({
     start:e.start?.dateTime||e.start?.date||"",
     end:e.end?.dateTime||e.end?.date||"",
     summary:e.summary||"Busy"
    }));
   }
  }catch(ex){
   console.log("GCal not connected:",ex.message);
   setGcalConnected(false);
  }
  return[];
 };

 const findAvailableDates=(bookedDates,existingEvents,weekCount=4)=>{
  // Returns up to 3 candidate date objects with sun times
  const results=[];
  const taken=new Set([
   ...bookedDates,
   ...existingEvents.map(e=>e.start?.slice(0,10)).filter(Boolean)
  ]);
  const now=new Date();
  for(let d=0;d<weekCount*7&&results.length<3;d++){
   const dt=new Date(now.getTime()+(d+7)*24*60*60*1000); // start 1 week out
   const iso=dt.toISOString().slice(0,10);
   const dow=dt.getDay();
   if(dow===0||dow===6){  // prefer weekends for families
    if(!taken.has(iso)){
     const sun=getSun(iso);
     results.push({date:iso,day:dt.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),sun});
    }
   }
  }
  // Fill with weekdays if needed
  for(let d=0;d<weekCount*7&&results.length<3;d++){
   const dt=new Date(now.getTime()+(d+7)*24*60*60*1000);
   const iso=dt.toISOString().slice(0,10);
   const dow=dt.getDay();
   if(dow>0&&dow<6&&!taken.has(iso)&&!results.find(r=>r.date===iso)){
    const sun=getSun(iso);
    results.push({date:iso,day:dt.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),sun});
   }
   if(results.length>=3)break;
  }
  return results.slice(0,3);
 };

 const runBookingAgent=async(lead)=>{
  setAgentStep("checking");
  setAgentLog([]);
  setAgentDraft("");
  setAgentSubject("");
  const p=pkgs.find(x=>x.id===lead.pkg);
  const isBeach=isB(lead.loc||"");

  log("Reading lead details for "+lead.first+" "+lead.last+"...");
  log("Session type: "+(lead.type||"Family")+" · Package: "+(p?.name||"Signature")+" · Location: "+(lead.loc||"TBD"));
  if(lead.notes)log("Notes: "+lead.notes);

  log("Checking Google Calendar for availability...");
  const events=await fetchGCalEvents();
  setCalEvents(events);

  if(gcalConnected||events.length>0){
   log("Google Calendar connected — "+events.length+" events found in next 60 days.");
  }else{
   log("Google Calendar not yet connected — using session bookings from CRM for availability.");
  }

  const bookedDates=clients.filter(cl=>cl.date&&cl.status!=="Cancelled"&&cl.id!==lead.id).map(cl=>cl.date);
  log("CRM has "+bookedDates.length+" existing booked sessions.");

  const available=findAvailableDates(bookedDates,events,6);
  if(available.length===0){log("Warning: no clearly open dates found — using best guesses.");available.push(...[7,14,21].map(offset=>{const dt=new Date(Date.now()+offset*24*60*60*1000);const iso=dt.toISOString().slice(0,10);return{date:iso,day:dt.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),sun:getSun(iso)};}));}

  log("Found "+available.length+" available dates.");
  available.forEach((a,i)=>{
   const timeNote=isBeach?" — ideal start "+m2t(a.sun.rm-15)+" (morning) or "+m2t(a.sun.sm-(p?.dur||45))+" (evening)":"";
   log("  Option "+(i+1)+": "+a.day+timeNote);
  });

  setAgentStep("drafting");
  log("Drafting personalized reply with Claude AI...");

  const dateOptions=available.map((a,i)=>{
   const timeNote=isBeach?" — ideal start: "+m2t(a.sun.rm-15)+" (morning) or "+m2t(a.sun.sm-(p?.dur||45))+" (evening)":"";
   return"Option "+(i+1)+": "+a.day+timeNote;
  }).join("\n");

  const missingInfo=[];
  if(!lead.loc||lead.loc.trim()==="")missingInfo.push("preferred location (beach or park/studio)");
  if(!lead.type||lead.type==="Family"&&!lead.notes?.toLowerCase().includes("people")&&!lead.notes?.toLowerCase().includes("kids"))missingInfo.push("how many people will be attending");
  if(!lead.date)missingInfo.push("rough timeframe they had in mind");
  if(isBeach&&!lead.notes?.toLowerCase().includes("stay")&&!lead.notes?.toLowerCase().includes("hotel"))missingInfo.push("where they're staying (to suggest nearest beach access)");

  const systemPrompt=`You are writing an email AS Michelle Coombs, a warm, genuine lifestyle family photographer in Central Florida. Her brand is "The Collective | Michelle Coombs Photography." She is human, caring, and slightly elevated — never corporate. She loves what she does and it shows. Sign as "Michelle" or "With love, Michelle." Write ONLY the email body — no subject line prefix, no preamble. Do not use em dashes.`;

  const userPrompt=`This is a new inquiry from ${lead.first} ${lead.last}. Write Michelle's first reply email — it should feel personal, like she read every word they sent.

LEAD DETAILS:
- Name: ${lead.first} ${lead.last}
- Session type: ${lead.type||"Family"}
- Package interest: ${p?.name||"Signature Session"} (${p?.desc||""})
- Requested date: ${lead.date||"flexible / not specified"}
- Location preference: ${lead.loc||"not specified"}
- Notes / what they wrote: ${lead.notes||"(no additional notes)"}
${isBeach?"- This is a BEACH session. Timing is determined by sunrise/sunset.":"- This is a park/studio session — full day availability."}

AVAILABLE DATES (already checked Michelle's calendar):
${dateOptions}

WHAT TO DO IN THE EMAIL:
1. Respond warmly and specifically to what they actually said in their notes
2. Express genuine excitement about their session type
3. Offer these 3 specific dates with the time windows naturally woven in (don't list them robotically — weave them in conversationally)
4. ${missingInfo.length>0?"Naturally ask about: "+missingInfo.join(", ")+" — ONE question at a time, not a list of questions":"They've given good info — no need to ask much. Just confirm and excite them."}
5. End with a warm, human close

Keep it SHORT (5-8 sentences max). Sound like a real person, not a business. No bullet points in the email.`;

  try{
   const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,system:systemPrompt,messages:[{role:"user",content:userPrompt}]})
   });
   const data=await res.json();
   const text=data.content?.find(b=>b.type==="text")?.text||"";
   if(!text)throw new Error("Empty response");
   setAgentDraft(text);
   const subj="Re: Your Photography Inquiry — The Collective";
   setAgentSubject(subj);
   log("Email drafted successfully.");
   log("Updating lead status to Proposal Sent...");
   const upd={...lead,status:"Proposal Sent"};
   setClients(cs=>cs.map(x=>x.id===lead.id?upd:x));
   await sb.from("clients").update({status:"Proposal Sent"}).eq("id",lead.id);
   log("Status updated.");
   setAgentStep("done");
  }catch(ex){
   log("Error: "+ex.message);
   setAgentStep("error");
  }
 };


 const agentSettingsTab=()=>{
  const as=agentSettings;
  const setAS=v=>setAgentSettings({...as,...v});
  return<div className="fi">
  <H2>Agent Settings</H2>
  <div style={{marginBottom:18,padding:"14px 20px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
  <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:4}}>How the Auto-Responder Agent Works</div>
  <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.9}}>When a new lead is added to your CRM, the agent automatically: (1) drafts an instant warm auto-reply, (2) checks your Google Calendar for their requested date, (3) drafts a personalized follow-up with availability and one smart question. You review and approve before anything sends — or turn on Auto-Send to let it go automatically.</div>
  </div>

  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
  <Card sx={{padding:26}}>
  <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:16}}>Google Calendar</div>
  <div style={{marginBottom:14,padding:"14px 16px",background:as.calendarConnected?gnl:"#fdf0ee",border:"1px solid "+(as.calendarConnected?"#c3dbc3":"#e8c8c4"),borderRadius:3}}>
   <div style={{fontFamily:D,fontSize:15,color:as.calendarConnected?gn:rd,fontWeight:500,marginBottom:3}}>{as.calendarConnected?"Google Calendar Connected":"Not Yet Connected"}</div>
   <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.6}}>{as.calendarConnected?"The agent can check your real availability and new sessions push automatically.":"Connect Google Calendar so the agent can check real availability and push bookings back."}</div>
  </div>
  <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.8,marginBottom:14}}>
   To connect: In Claude.ai → click your profile → Settings → Connectors → find Google Calendar → Connect. Then come back here and click Sync Now to test.
  </div>
  <div style={{display:"flex",gap:8}}>
  <Btn v="m" ch={gcalSyncing?"Syncing...":"Sync All Sessions Now"} onClick={syncAllToGCal} sx={{opacity:gcalSyncing?0.7:1}}/>
  <Btn v="o" ch="Test Connection" onClick={async()=>{
   const data=await gcalCall("list_events",{calendarId:"primary",timeMin:new Date().toISOString(),maxResults:3});
   if(data){setAS({calendarConnected:true});toast("Connected! Found Google Calendar events.");}
   else toast("Not connected yet. Follow the steps above.");
  }}/>
  </div>
  {gcalLastSync&&<div style={{fontSize:13,color:br,fontFamily:D,marginTop:10}}>Last sync: {gcalLastSync}</div>}
  </Card>

  <Card sx={{padding:26}}>
  <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:16}}>Agent Behavior</div>
  <div style={{marginBottom:14}}>
  <div onClick={()=>setAS({autoReplyEnabled:!as.autoReplyEnabled})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:12,padding:"10px 0",borderBottom:"1px solid "+bo}}>
   <div style={{width:20,height:20,borderRadius:3,border:"1.5px solid "+(as.autoReplyEnabled?"#444":bo),background:as.autoReplyEnabled?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
   {as.autoReplyEnabled&&<span style={{color:"#fff",fontSize:11}}></span>}
   </div>
   <div><div style={{fontFamily:D,fontSize:15,color:es}}>Send instant auto-reply</div><div style={{fontSize:12,color:br,fontFamily:D}}>Email 1 — thanks, 24 hour response time</div></div>
  </div>
  <div onClick={()=>setAS({followUpEnabled:!as.followUpEnabled})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:12,padding:"10px 0",borderBottom:"1px solid "+bo}}>
   <div style={{width:20,height:20,borderRadius:3,border:"1.5px solid "+(as.followUpEnabled?"#444":bo),background:as.followUpEnabled?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
   {as.followUpEnabled&&<span style={{color:"#fff",fontSize:11}}></span>}
   </div>
   <div><div style={{fontFamily:D,fontSize:15,color:es}}>Draft availability follow-up</div><div style={{fontSize:12,color:br,fontFamily:D}}>Email 2 — AI-drafted with calendar + smart question</div></div>
  </div>
  <div onClick={()=>setAS({autoSend:!as.autoSend})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"10px 0"}}>
   <div style={{width:20,height:20,borderRadius:3,border:"1.5px solid "+(as.autoSend?"#444":bo),background:as.autoSend?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
   {as.autoSend&&<span style={{color:"#fff",fontSize:11}}></span>}
   </div>
   <div><div style={{fontFamily:D,fontSize:15,color:es}}>Auto-send without review</div><div style={{fontSize:12,color:br,fontFamily:D}}>Skip review step (requires Resend connected)</div></div>
  </div>
  </div>
  </Card>
  </div>

  <Card sx={{padding:26,marginBottom:18}}>
  <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:6}}>Voice & Tone Notes</div>
  <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:12,lineHeight:1.7}}>Describe how Michelle writes — the AI uses this for every drafted email. Be as specific as you want.</div>
  <textarea value={as.voiceNotes} onChange={e=>setAS({voiceNotes:e.target.value})} rows={3}
   style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"12px 16px",fontFamily:D,fontSize:15,color:es,outline:"none",resize:"vertical",lineHeight:1.6}}/>
  </Card>

  <Card sx={{padding:26,marginBottom:18}}>
  <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:6}}>Instant Auto-Reply Template</div>
  <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:12,lineHeight:1.7}}>This sends the moment a lead is added. Use merge tags: {"{first_name} {session_type} {package}"}. Edit it to sound exactly like you.</div>
  <textarea value={as.autoReplyBody} onChange={e=>setAS({autoReplyBody:e.target.value})} rows={10}
   style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"14px 18px",fontFamily:D,fontSize:15,color:es,outline:"none",resize:"vertical",lineHeight:1.8}}/>
  </Card>

  <Card sx={{padding:26,marginBottom:18}}>
  <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:6}}>Smart Questions by Session Type</div>
  <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:16,lineHeight:1.7}}>The agent picks one question based on session type and asks it in the follow-up email. Edit each one to sound like you.</div>
  {[
   ["beach","Beach Sessions"],
   ["family","Family Sessions"],
   ["portrait","Portrait Sessions"],
   ["engagement","Engagement Sessions"],
   ["maternity","Maternity Sessions"],
   ["default","Default (all others)"],
  ].map(([key,label])=><div key={key} style={{marginBottom:14}}>
   <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>{label}</div>
   <textarea value={as.smartQuestions[key]} onChange={e=>setAS({smartQuestions:{...as.smartQuestions,[key]:e.target.value}})} rows={2}
    style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontFamily:D,fontSize:14,color:es,outline:"none",resize:"vertical",lineHeight:1.6}}/>
  </div>)}
  </Card>

  <div style={{display:"flex",gap:9}}>
  <Btn v="m" ch="Save Agent Settings" onClick={async()=>{
   await sb.from("settings").upsert({key:"agent_settings",value:JSON.stringify(as)});
   toast("Agent settings saved!");
  }}/>
  <Btn v="o" ch="Test Agent Now" onClick={()=>{
   if(clients.length===0)return toast("Add a client first to test the agent.");
   const testLead=clients.find(cl=>cl.status==="Lead")||clients[0];
   runAutoAgent(testLead);
  }}/>
  </div>

  {inboxQueue.length>0&&<div style={{marginTop:28}}>
  <H2>Agent Inbox</H2>
  <Card sx={{overflow:"hidden"}}>
  {inboxQueue.map((item,i)=><div key={item.id} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",borderBottom:i<inboxQueue.length-1?"1px solid "+bo:"none"}}>
   <div style={{flex:1}}>
    <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{item.lead.first} {item.lead.last}</div>
    <div style={{fontSize:13,color:br,fontFamily:D}}>{item.lead.type||"Family"} · {item.lead.date||"No date"} · {item.lead.loc||"No location"}</div>
    <div style={{fontSize:12,color:tl,fontFamily:D,marginTop:2}}>{new Date(item.createdAt).toLocaleString()}</div>
   </div>
   <Tag color={item.status==="approved"?"green":"gold"} ch={item.status==="approved"?"Approved":"Pending Review"}/>
   {item.status!=="approved"&&<Btn sm v="m" ch="Review" onClick={()=>setReviewModal(item)}/>}
   {item.status==="approved"&&<Btn sm v="o" ch="Re-open" onClick={()=>setReviewModal(item)}/>}
  </div>)}
  </Card>
  </div>}
  </div>;
 };

 const agentModalUI=()=>{
  const lead=agentModal;if(!lead)return null;
  const p=pkgs.find(x=>x.id===lead.pkg);
  const isDone=agentStep==="done";
  const isRunning=agentStep==="checking"||agentStep==="drafting";
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2100,backdropFilter:"blur(6px)"}}>
  <div style={{background:wh,borderRadius:3,padding:32,width:"100%",maxWidth:680,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 28px 80px rgba(0,0,0,.22)",border:"1px solid "+bo}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
   <div>
    <h3 style={{fontFamily:D,fontSize:26,color:es,fontWeight:300,marginBottom:4}}>Booking Agent</h3>
    <div style={{fontSize:15,color:br,fontFamily:D}}>{lead.first} {lead.last} · {lead.type||"Family"} · {p?.name||"Signature"}</div>
   </div>
   {!isRunning&&<button onClick={()=>{setAgentModal(null);setAgentStep("idle");setAgentLog([]);setAgentDraft("");}} style={{background:"transparent",border:"none",fontSize:24,cursor:"pointer",color:br}}>×</button>}
   </div>

   {agentStep==="idle"&&<div>
   <div style={{background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3,padding:"16px 20px",marginBottom:20}}>
    <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:8,fontWeight:500}}>What this agent will do:</div>
    {[
     "Read "+lead.first+"'s full inquiry details from the CRM",
     "Check your Google Calendar for real availability"+(gcalConnected?"":" (connect Google Calendar in Settings for live data)"),
     "Find 3 open dates with ideal beach/golden-hour timing",
     "Write a personalized first-reply email that sounds like you",
     "Update lead status to Proposal Sent automatically"
    ].map((s,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:7}}>
     <div style={{width:20,height:20,borderRadius:"50%",background:es,color:"#fff",fontFamily:D,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div>
     <div style={{fontFamily:D,fontSize:14,color:es,lineHeight:1.6}}>{s}</div>
    </div>)}
   </div>
   {!gcalConnected&&<div style={{background:"#fdf0ee",border:"1px solid #e8c8c4",borderRadius:3,padding:"12px 16px",marginBottom:18}}>
    <div style={{fontFamily:D,fontSize:14,color:rd,fontWeight:500,marginBottom:3}}>Google Calendar not connected</div>
    <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.6}}>The agent will still work using your CRM bookings for availability. To use live Google Calendar data, go to Settings and connect Google Calendar.</div>
   </div>}
   <div style={{display:"flex",gap:9}}>
    <Btn v="m" ch="Run Booking Agent" sx={{fontSize:16,padding:"13px 28px"}} onClick={()=>runBookingAgent(lead)}/>
    <Btn v="o" ch="Cancel" onClick={()=>{setAgentModal(null);setAgentStep("idle");setAgentLog([]);}}/>
   </div>
   </div>}

   {(isRunning||agentStep==="done"||agentStep==="error")&&<div>
   <div style={{background:"#faf8f8",border:"1px solid "+bo,borderRadius:3,padding:"14px 18px",marginBottom:18,maxHeight:200,overflowY:"auto"}}>
    <div style={{fontSize:12,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Agent Activity</div>
    {agentLog.map((l,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:5}}>
     <div style={{width:6,height:6,borderRadius:"50%",background:isDone?gn:isRunning?"#F0DEDC":rd,flexShrink:0,marginTop:6}} className={isRunning?"pu":""}/>
     <div style={{fontFamily:"monospace",fontSize:13,color:es,lineHeight:1.5}}>{l}</div>
    </div>)}
    {isRunning&&<div style={{display:"flex",gap:8,alignItems:"center",marginTop:4}}>
     <div style={{width:6,height:6,borderRadius:"50%",background:pk,flexShrink:0}} className="pu"/>
     <div style={{fontFamily:"monospace",fontSize:13,color:br}} className="pu">{agentStep==="checking"?"Checking calendar…":"Writing email…"}</div>
    </div>}
   </div>
   {isDone&&agentDraft&&<div>
    <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Drafted Email</div>
    <div style={{marginBottom:8}}>
     <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:4}}>Subject</div>
     <input value={agentSubject} onChange={e=>setAgentSubject(e.target.value)} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"9px 14px",fontFamily:D,fontSize:15,color:es,outline:"none"}}/>
    </div>
    <textarea value={agentDraft} onChange={e=>setAgentDraft(e.target.value)} rows={11} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"14px 18px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",background:"#fdfaf9",lineHeight:1.8,marginBottom:12}}/>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
     <Btn v="m" ch="Copy Email" onClick={()=>{navigator.clipboard.writeText("Subject: "+agentSubject+"\n\n"+agentDraft);toast("Copied! Paste into Gmail or your email client.");}}/>
     <Btn v="o" ch="Save as Template" onClick={()=>{const ne={id:Date.now().toString(),name:"Agent: "+lead.first+" inquiry reply",subject:agentSubject,trigger:"New lead first reply",body:agentDraft};setEmails(em=>[...em,ne]);toast("Saved as template!");}}/>
     <Btn v="o" ch="Regenerate" onClick={()=>runBookingAgent(lead)}/>
     <Btn v="o" ch="Open Client" onClick={()=>{setAgentModal(null);setSelC(lead);setTab("clients");}}/>
    </div>
    <div style={{marginTop:14,padding:"10px 14px",background:gnl,border:"1px solid #c3dbc3",borderRadius:2}}>
     <div style={{fontFamily:D,fontSize:14,color:gn}}>Lead status updated to Proposal Sent</div>
    </div>
   </div>}
   {agentStep==="error"&&<div>
    <div style={{padding:"14px 18px",background:"#fdf0ee",border:"1px solid #e8c8c4",borderRadius:3,marginBottom:14}}>
     <div style={{fontFamily:D,fontSize:15,color:rd,marginBottom:4}}>Something went wrong</div>
     <div style={{fontSize:13,color:br,fontFamily:D}}>Check that VITE_ANTHROPIC_KEY is set in your Vercel environment variables, then try again.</div>
    </div>
    <div style={{display:"flex",gap:8}}><Btn v="m" ch="Try Again" onClick={()=>runBookingAgent(lead)}/><Btn v="o" ch="Close" onClick={()=>{setAgentModal(null);setAgentStep("idle");setAgentLog([]);}}/></div>
   </div>}
   </div>}
  </div>
  </div>;
 };


 const reviewModalUI=()=>{
  const rv=reviewModal;if(!rv)return null;
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3000,backdropFilter:"blur(6px)"}}>
  <div style={{background:wh,borderRadius:3,padding:32,width:"100%",maxWidth:780,maxHeight:"94vh",overflowY:"auto",boxShadow:"0 32px 90px rgba(0,0,0,.25)",border:"1px solid "+bo}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
   <div>
    <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Agent Review</div>
    <h3 style={{fontFamily:D,fontSize:28,color:es,fontWeight:300,marginBottom:4}}>{rv.lead.first} {rv.lead.last}</h3>
    <div style={{fontSize:15,color:br,fontFamily:D}}>{rv.lead.type||"Family"} · {rv.lead.loc||"Location TBD"} · {rv.lead.date||"Date TBD"}</div>
   </div>
   <button onClick={()=>setReviewModal(null)} style={{background:"transparent",border:"none",fontSize:24,cursor:"pointer",color:br}}>×</button>
   </div>

   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
    <div style={{padding:"12px 16px",background:rv.calAvailable?gnl:"#fdf0ee",border:"1px solid "+(rv.calAvailable?"#c3dbc3":"#e8c8c4"),borderRadius:3}}>
    <div style={{fontFamily:D,fontSize:15,color:rv.calAvailable?gn:rd,fontWeight:500,marginBottom:2}}>{rv.calAvailable?"Date is open on your calendar":"Date conflict detected"}</div>
    <div style={{fontSize:13,color:br,fontFamily:D}}>{rv.calOk?"Checked Google Calendar":"Used CRM bookings for availability"}{rv.calEvents.length>0?" · "+rv.calEvents.length+" existing events that day":""}</div>
    </div>
    <div style={{padding:"12px 16px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
    <div style={{fontFamily:D,fontSize:15,color:es,fontWeight:500,marginBottom:2}}>Smart question selected</div>
    <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.5,fontStyle:"italic"}}>"{rv.smartQ?.slice(0,80)}..."</div>
    </div>
   </div>

   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20}}>
    <div>
    <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
     <span>Email 1 — Instant Auto-Reply</span>
     <span style={{background:gnl,color:gn,fontSize:11,padding:"2px 10px",borderRadius:2,border:"1px solid #c3dbc3"}}>Sends immediately</span>
    </div>
    <textarea value={rv.autoReplyText} onChange={e=>setReviewModal({...rv,autoReplyText:e.target.value})} rows={10}
     style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"12px 16px",fontFamily:D,fontSize:14,color:es,outline:"none",resize:"vertical",lineHeight:1.7,background:"#fdfaf9"}}/>
    </div>
    <div>
    <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
     <span>Email 2 — Availability + Question</span>
     <span style={{background:bll,color:bl,fontSize:11,padding:"2px 10px",borderRadius:2,border:"1px solid #b8cee8"}}>After you approve</span>
    </div>
    <input value={rv.followUpSubject} onChange={e=>setReviewModal({...rv,followUpSubject:e.target.value})}
     style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"9px 14px",fontFamily:D,fontSize:14,color:es,outline:"none",marginBottom:6}}
     placeholder="Subject line"/>
    <textarea value={rv.followUpText} onChange={e=>setReviewModal({...rv,followUpText:e.target.value})} rows={9}
     style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"12px 16px",fontFamily:D,fontSize:14,color:es,outline:"none",resize:"vertical",lineHeight:1.7,background:"#fdfaf9"}}/>
    </div>
   </div>

   <div style={{padding:"12px 18px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3,marginBottom:18,fontSize:14,color:br,fontFamily:D,lineHeight:1.7}}>
    To: <strong style={{color:es}}>{rv.lead.email}</strong> — Edit either email above before approving. Once you click Approve, copy these into Gmail or your email client. When Resend is connected, they will send automatically.
   </div>

   <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
    <Btn v="m" ch="Approve + Copy Both" sx={{padding:"13px 28px",fontSize:16}} onClick={()=>{
     const both="=== EMAIL 1: AUTO-REPLY ===\nTo: "+rv.lead.email+"\nSubject: Re: Your Photography Inquiry\n\n"+rv.autoReplyText+"\n\n\n=== EMAIL 2: FOLLOW-UP ===\nTo: "+rv.lead.email+"\nSubject: "+rv.followUpSubject+"\n\n"+rv.followUpText;
     navigator.clipboard.writeText(both);
     setInboxQueue(q=>q.map(x=>x.id===rv.id?{...x,status:"approved"}:x));
     setReviewModal(null);
     toast("Both emails copied! Paste into Gmail to send.");
    }}/>
    <Btn v="o" ch="Copy Email 1 Only" onClick={()=>{navigator.clipboard.writeText(rv.autoReplyText);toast("Auto-reply copied!");}}/>
    <Btn v="o" ch="Copy Email 2 Only" onClick={()=>{navigator.clipboard.writeText("Subject: "+rv.followUpSubject+"\n\n"+rv.followUpText);toast("Follow-up copied!");}}/>
    <Btn v="o" ch="Save as Templates" onClick={()=>{
     const e1={id:Date.now().toString(),name:"Agent Auto-Reply",subject:"Re: Your Photography Inquiry",trigger:"Instant on new lead",body:rv.autoReplyText};
     const e2={id:(Date.now()+1).toString(),name:"Agent Follow-Up: Availability",subject:rv.followUpSubject,trigger:"After calendar check",body:rv.followUpText};
     setEmails(em=>[...em,e1,e2]);
     toast("Both emails saved to Email Templates!");
    }}/>
    <Btn v="o" ch="Dismiss" onClick={()=>setReviewModal(null)}/>
   </div>
  </div>
  </div>;
 };

 const aiEmailModal=()=>{
 const c=aiModal;if(!c)return null;
 return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,backdropFilter:"blur(5px)"}}>
 <div style={{background:wh,borderRadius:3,padding:28,width:"100%",maxWidth:640,boxShadow:"0 24px 70px rgba(0,0,0,.18)",border:`1px solid ${bo}`,maxHeight:"90vh",overflowY:"auto"}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
 <div>
 <h3 style={{fontFamily:D,fontSize:26,color:es,fontWeight:300,marginBottom:2}}>AI Email Draft</h3>
 <div style={{fontSize:14,color:br,fontFamily:D}}>{c._templateMode?"Creating a new email template":"For "+c.first+" "+c.last+" · "+c.status}</div>
 </div>
 <button onClick={()=>{setAiModal(null);setAiDraft("");}} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br,fontFamily:D}}>×</button>
 </div>
 <div style={{marginBottom:14}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>What kind of email?</div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
 {AI_PURPOSES.map(ap=><button key={ap.id} onClick={()=>setAiPurpose(ap.id)} style={{textAlign:"left",padding:"9px 12px",border:`1.5px solid ${aiPurpose===ap.id?es:bo}`,borderRadius:3,background:aiPurpose===ap.id?"#fdf9f9":wh,cursor:"pointer",transition:"all .12s"}}>
 <div style={{fontFamily:D,fontSize:15,color:aiPurpose===ap.id?es:br,fontWeight:aiPurpose===ap.id?500:300}}>{ap.label}</div>
 <div style={{fontSize:12,color:tl,fontFamily:D,fontWeight:300}}>{ap.desc}</div>
 </button>)}
 </div>
 </div>
 {aiPurpose==="custom"&&<Inp label="Describe what you need" value={aiCustomPrompt} onChange={e=>setAiCustomPrompt(e.target.value)} multi rows={2} ph="e.g. She just asked about adding a second location…"/>}
 <div style={{display:"flex",gap:8,marginBottom:16}}>
 <Btn v="m" ch={aiLoading?" Drafting…":" Draft Email"} onClick={()=>draftEmail(c)} sx={{opacity:aiLoading?0.7:1}}/>
 {aiDraft&&<Btn v="o" ch="↺ Regenerate" onClick={()=>draftEmail(c)}/>}
 </div>
 {aiLoading&&<div style={{padding:"28px 0",textAlign:"center"}}>
 <div className="pu" style={{fontSize:14,color:br,fontFamily:D,letterSpacing:"0.1em"}}> Writing your email…</div>
 </div>}
 {aiDraft&&!aiLoading&&<div>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Draft</div>
 <textarea value={aiDraft} onChange={e=>setAiDraft(e.target.value)} rows={12} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"15px 18px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",background:"#fdfaf9",lineHeight:1.7}}/>
 <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
 <Btn v="m" ch="Copy Email" onClick={()=>{navigator.clipboard.writeText(aiDraft);toast("Copied to clipboard!")}}/>
 <Btn v="o" ch="Save as Template" onClick={()=>{const lbl=AI_PURPOSES.find(x=>x.id===aiPurpose)?.label||"Draft";const ne={id:Date.now().toString(),name:c._templateMode?"AI: "+lbl:`AI Draft — ${c.first} · ${lbl}`,subject:"",trigger:lbl,body:aiDraft};setEmails(em=>[...em,ne]);toast("Template saved! Edit it to add a subject line.");setAiModal(null);setAiDraft("");if(c._templateMode)setTab("emails");}}/>
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
 {open&&<div><div style={{fontFamily:D,fontSize:16,color:es,fontWeight:300,lineHeight:1.2}}>The Collective</div><div style={{fontSize:13,letterSpacing:"0.15em",color:br,textTransform:"uppercase",fontFamily:D}}>Studio CRM</div></div>}
 </div>
 <nav style={{flex:1,padding:"12px 0",overflowY:"auto"}}>
 {NAV.map(n=><button key={n.id} className="nb" onClick={()=>{setTab(n.id);setSelC(null);setSelE(null);setSelP(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:open?"11px 20px":"11px 10px",background:tab===n.id?"#fdf9f9":"transparent",borderLeft:`2px solid ${tab===n.id?"#444444":"transparent"}`,border:"none",borderLeft:`2px solid ${tab===n.id?"#444444":"transparent"}`,cursor:"pointer",transition:"all .14s",textAlign:"left"}}>
 <span style={{fontSize:14,flexShrink:0,width:18,opacity:tab===n.id?1:0.5}}>{n.i}</span>
 {open&&<span style={{fontSize:17,fontFamily:D,fontWeight:400,color:tab===n.id?es:br,whiteSpace:"nowrap",letterSpacing:"0.02em"}}>{n.l}</span>}
 </button>)}
 </nav>
 <button onClick={()=>setOpen(!open)} style={{padding:"12px",background:"transparent",border:"none",borderTop:`1px solid ${bo}`,cursor:"pointer",color:br,fontSize:14,fontFamily:D,textAlign:open?"right":"center",paddingRight:open?20:10}}>{open?"←":"→"}</button>
 </div>;

 const dashboard=()=><div className="fi">
 <H2>Good morning, Michelle ️</H2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:18}}>
 {[["","Revenue",`$${rev.toLocaleString()}`],["","Outstanding",`$${out.toLocaleString()}`],["","Active",clients.filter(c=>["Active","Booked","Proposal Sent"].includes(c.status)).length],["","New Leads",clients.filter(c=>c.status==="Lead").length]].map(([i,l,v])=><Card hover key={l} sx={{padding:15}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
 <div><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:34,color:es,fontWeight:300,lineHeight:1}}>{v}</div></div>
 <span style={{fontSize:20}}>{i}</span>
 </div>
 </Card>)}
 </div>
 <div style={{marginBottom:18}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600}}> Upcoming Sessions</div>
 <Btn sm v="o" ch="View Calendar" onClick={()=>setTab("calendar")}/>
 </div>
 <Card sx={{overflow:"hidden"}}>
 {upcoming.length===0&&<div style={{padding:"22px 14px",fontFamily:D,fontSize:15,color:tl}}>No upcoming sessions.</div>}
 {upcoming.slice(0,8).map((c,i,arr)=>{const sun=getSun(c.date),p=pkgs.find(x=>x.id===c.pkg),loc=locations.find(l=>l.name===c.loc||c.loc?.includes(l.name));
 return<div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:i<arr.length-1?"1px solid "+bo:"none",transition:"background .14s"}}>
 <div style={{width:48,height:48,borderRadius:6,background:es,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
 <div style={{fontSize:8,color:"#aaa",textTransform:"uppercase",fontFamily:D,letterSpacing:"0.1em"}}>{new Date(c.date+"T12:00:00").toLocaleString("default",{month:"short"})}</div>
 <div style={{fontSize:20,color:"#fff",fontFamily:D,lineHeight:1}}>{new Date(c.date+"T12:00:00").getDate()}</div>
 </div>
 <div style={{flex:1}}>
 <div style={{fontFamily:D,fontSize:19,color:es,marginBottom:2}}>{c.first} {c.last}</div>
 <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:2}}>{c.loc} · {p?.name}</div>
 <div style={{fontSize:12,color:tl,fontFamily:D}}>{loc?.beach?"️ Beach":""} {isB(c.loc)?" "+sun.rs+" · "+sun.ss:""}</div>
 </div>
 <div style={{textAlign:"right",display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
 <Tag color={SC(c.status)} ch={c.status}/>
 <div style={{fontSize:12,color:br,fontFamily:D}}>{c.type}</div>
 </div>
 </div>})}
 </Card>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
 <div>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>️ Shoot Day Weather</div>
 <div style={{display:"flex",flexDirection:"column",gap:9}}>{WX.slice(0,2).map(w=><WW key={w.date} shoot={w}/>)}</div>
 </div>
 <div>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}> Recent Leads</div>
 <Card sx={{overflow:"hidden"}}>
 {clients.filter(c=>["Lead","Proposal Sent"].includes(c.status)).slice(0,4).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:10,padding:"15px 18px",borderBottom:i<arr.length-1?"1px solid "+bo:"none",transition:"background .14s"}}>
 <div style={{flex:1}}><div style={{fontFamily:D,fontSize:16,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.type} · {c.date||"TBD"}</div></div>
 <Tag color={SC(c.status)} ch={c.status}/>
 <Btn sm v="o" ch="AI" onClick={e=>{e.stopPropagation();setSelC(c);setAiModal(c);setAiDraft("");setAiPurpose("inquiry_response");}}/>
 </div>)}
 </Card>
 </div>
 </div>
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
 if(!editC)return<div style={{padding:"14px 0",borderBottom:"1px solid "+bo}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:2}}>{l}</div>
 <div style={{fontFamily:D,fontSize:19,color:es,fontWeight:300}}>{c[f]||"—"}</div>
 </div>;
 if(opts)return<div style={{padding:"12px 0",borderBottom:"1px solid "+bo}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div>
 <select value={getFldVal(f)} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{[f]:e.target.value});} )} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}>
 {opts.map(function(o){return<option key={o}>{o}</option>;})}
 </select>
 </div>;
 return<div style={{padding:"12px 0",borderBottom:"1px solid "+bo}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div>
 <input type={t} value={getFldVal(f)} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{[f]:e.target.value});})}
 style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
 </div>;
 };

 return<div className="fi">
 <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:24}}>
 <button onClick={()=>{setSelC(null);setEditC(false);setEditDraft(null);}} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17,fontFamily:D}}>←</button>
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300,flex:1}}>{c.first} {c.last}</h2>
 <Tag color={SC(c.status)} ch={c.status}/>
 {!editC&&<Btn sm v="o" ch="Edit Client" onClick={()=>{setEditC(true);setEditDraft({});}}/>}
 {editC&&<><Btn sm v="m" ch="Save Changes" onClick={saveClient}/><Btn sm v="o" ch="Cancel" onClick={()=>{setEditC(false);setEditDraft(null);}}/></>}
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:20}}>
 <div>
 <Card sx={{padding:24,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Contact</div>
 <FLD l="First Name" f="first"/>
 <FLD l="Last Name" f="last"/>
 <FLD l="Email" f="email" type="email"/>
 <FLD l="Phone" f="phone" type="tel"/>
 {editC&&<>
 <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${bo}`}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Secondary Contact</div>
 <FLD l="Name" f="contact2name"/>
 <FLD l="Phone" f="contact2phone" type="tel"/>
 </div>
 </>}
 {!editC&&(c.contact2name||c.contact2phone)&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${bo}`}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Secondary Contact</div>
 <div style={{fontFamily:D,fontSize:16,color:es,fontWeight:300}}>{c.contact2name} · {c.contact2phone}</div>
 </div>}
 </Card>
 <Card sx={{padding:24,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Session</div>
 <FLD l="Date" f="date" type="date"/>
 <FLD l="Location" f="loc"/>
 <FLD l="Package" f="pkg" opts={pkgs.map(p=>p.id)}/>
 <FLD l="Session Type" f="type" opts={["Family","Portrait","Engagement","Maternity","Newborn","Other"]}/>
 <FLD l="Status" f="status" opts={["Lead","Proposal Sent","Booked","Active","Completed","Closed"]}/>
 <div style={{marginTop:10}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Notes</div>
 {editC?<textarea value={getFldVal("notes")} onChange={e=>setEditDraft(function(d){return Object.assign({},d,{notes:e.target.value});})} rows={3}
 style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",background:"#fff"}}/>
 :<div style={{fontFamily:D,fontSize:15,color:br,fontWeight:300,lineHeight:1.6}}>{c.notes||"—"}</div>}
 </div>
 </Card>
 <Card sx={{padding:24,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Financials</div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
 {[["Package Price",`$${p?.price||0}`],["Paid",editC?null:`$${c.paid}`],["Balance",editC?null:`$${c.bal}`]].map(([l,v])=>v?<div key={l} style={{textAlign:"center",padding:12,background:"#fdf9f9",borderRadius:2,border:`1px solid ${bo}`}}><div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es,fontWeight:300}}>{v}</div></div>:null)}
 </div>
 {editC&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
 <div><div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Paid</div>
 <input type="number" value={getFldVal("paid")} onChange={e=>setEditDraft(d=>({...d,paid:Number(e.target.value)}))} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}/></div>
 <div><div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>Balance</div>
 <input type="number" value={getFldVal("bal")} onChange={e=>setEditDraft(d=>({...d,bal:Number(e.target.value)}))} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}/></div>
 </div>}
 </Card>
 <Card sx={{padding:26}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D}}>Additional Services</div>
 <Btn sm v="o" ch="+ Add Service" onClick={()=>setShowAddonPicker(c.id)}/>
 </div>
 {cAddons.length===0&&<div style={{fontFamily:D,fontSize:15,color:br,fontWeight:300}}>No additional services added yet.</div>}
 {cAddons.map((a,i)=><div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${bo}`}}>
 <span style={{fontFamily:D,fontSize:16,color:es,fontWeight:300}}>{a.name}</span>
 <span style={{fontFamily:D,fontSize:16,color:es}}>${a.price.toLocaleString()}</span>
 </div>)}
 {showAddonPicker===c.id&&<div style={{marginTop:14,padding:14,background:"#fdf9f9",borderRadius:2,border:`1px solid ${bo}`}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Pick Existing</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
 {addons.map(a=><button key={a.id} onClick={()=>addClientAddon(a)} style={{background:pk,border:`1px solid ${bo}`,borderRadius:2,padding:"5px 12px",fontFamily:D,fontSize:14,color:es,cursor:"pointer"}}>{a.name} — ${a.price}</button>)}
 </div>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Or Add Custom</div>
 <div style={{display:"flex",gap:8}}>
 <input value={newAddon.name} onChange={e=>setNewAddon(n=>({...n,name:e.target.value}))} placeholder="Service name"
 style={{flex:2,border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
 <input type="number" value={newAddon.price} onChange={e=>setNewAddon(n=>({...n,price:e.target.value}))} placeholder="Price"
 style={{flex:1,border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:17,fontFamily:D,color:es,outline:"none",background:"#fff"}}/>
 <Btn sm v="m" ch="Add" onClick={()=>{if(newAddon.name&&newAddon.price)addClientAddon(newAddon);}}/>
 </div>
 <button onClick={()=>setShowAddonPicker(null)} style={{marginTop:8,background:"none",border:"none",fontFamily:D,fontSize:14,color:br,cursor:"pointer"}}>Cancel</button>
 </div>}
 </Card>
 </div>
 <div>
 {wx&&<div style={{marginBottom:14}}><WW shoot={wx}/></div>}
 {sun&&<Card sx={{padding:22,marginBottom:16,background:"#fdf9f9"}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Ideal Times</div>
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
 <Card sx={{padding:22,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Workflow Progress</div>
 {(()=>{const allSteps=[...LWF.steps,...SWF.steps];const ci=allSteps.findIndex(s=>s.id===selC.wf);
 return<div style={{display:"flex",flexDirection:"column",gap:3}}>{allSteps.map((s,i)=>{const done=i<ci,curr=i===ci;
 return<div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:2,background:curr?pk:done?gnl:"transparent",opacity:i>ci+3?0.35:1}}>
 <div style={{width:16,height:16,borderRadius:"50%",background:curr?"#444":done?gn:bo,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${curr?"#444":done?gn:bo}`}}>
 <span style={{fontSize:8,color:"#fff"}}>{done?"":curr?"●":""}</span>
 </div>
 <div style={{flex:1}}><div style={{fontSize:14,color:es,fontFamily:D,fontWeight:curr?500:300}}>{s.a}</div><div style={{fontSize:11,color:br,fontFamily:D}}>{s.t}</div></div>
 </div>})}</div>})()}
 <select value={selC.wf||"l1"} onChange={async e=>{const upd={...selC,wf:e.target.value};setSelC(upd);setClients(cs=>cs.map(x=>x.id===upd.id?upd:x));await sb.from("clients").update({wf:e.target.value}).eq("id",upd.id);toast("Workflow updated");}}
 style={{width:"100%",marginTop:10,border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:14,fontFamily:D,color:es,outline:"none",background:"#fff"}}>
 {[...LWF.steps,...SWF.steps].map(s=><option key={s.id} value={s.id}>{s.a}</option>)}
 </select>
 </Card>
 <Card sx={{padding:22,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:9}}>Gallery</div>
 <input value={c.gallery||""} onChange={e=>setClients(cs=>cs.map(cl=>cl.id===c.id?{...cl,gallery:e.target.value}:cl))} placeholder="Paste Pic-Time URL"
 style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"8px 10px",fontSize:14,fontFamily:D,color:es,outline:"none",background:"#fff",marginBottom:8}}/>
 {c.gallery&&<a href={c.gallery} target="_blank" rel="noreferrer"><Btn sm v="o" ch="Open Gallery"/></a>}
 </Card>
 <Card sx={{padding:22,marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Booking Proposal</div>
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
 <div style={{fontFamily:D,fontSize:15,color:gn,fontWeight:400}}> Proposal completed</div>
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
 <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Link Expires After</div>
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
 <Card sx={{padding:22}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Quick Actions</div>
 <div style={{display:"flex",flexDirection:"column",gap:9}}>
 <Btn v="m" ch="AI Draft Email" sx={{fontSize:17,padding:"14px 22px",letterSpacing:"0.08em"}} onClick={()=>{setAiModal(c);setAiDraft("");setAiPurpose("inquiry_response");}}/>
 <Btn v="o" ch="View Invoice" onClick={()=>{const pkg=pkgs.find(x=>x.id===c.pkg);setEditInv({...c,_type:"client",_items:[{desc:(pkg?pkg.name+" — "+pkg.desc:"Session"),qty:1,price:(pkg?.price||0)}]});setTab("invoices");}}/>
 <Btn v="o" ch="View Contract" onClick={()=>{setTab("contracts");}}/>
 <Btn v="o" ch="Send Email" onClick={()=>toast("Connect Resend to send emails")}/>
 </div>
 </Card>
 <Card sx={{padding:22,marginTop:16}}>
 <div style={{fontSize:14,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Questionnaires</div>
 {questionnaires.length===0&&<div style={{fontFamily:D,fontSize:15,color:tl}}>No questionnaires yet. Create one in the Questionnaires tab.</div>}
 {questionnaires.map(q=>{
 const resp=c.questionnaireResponses&&c.questionnaireResponses[q.id];
 return<div key={q.id} style={{marginBottom:14,paddingBottom:14,borderBottom:"1px solid "+bo}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
 <div style={{fontFamily:D,fontSize:17,color:es}}>{q.name}</div>
 {resp?<Tag color="green" ch="Completed"/>:<Btn sm v="o" ch="Send" onClick={()=>toast("Connect Resend to send")}/>}
 </div>
 {resp&&q.fields.map(f=><div key={f.id} style={{marginBottom:8}}>
 <div style={{fontSize:12,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:3}}>{f.label}</div>
 <div style={{fontFamily:D,fontSize:16,color:es,fontWeight:300,background:"#fdf9f9",padding:"8px 12px",borderRadius:2,border:"1px solid "+bo}}>{resp[f.id]||"—"}</div>
 </div>)}
 {!resp&&<div style={{fontFamily:D,fontSize:14,color:tl,fontStyle:"italic"}}>Not yet completed by client</div>}
 </div>;})}
 </Card>
 </div>
 </div>
 </div>
 };
 const clientsList=()=>{
 const filt=clients.filter(c=>!search||`${c.first} ${c.last} ${c.email} ${c.phone}`.toLowerCase().includes(search.toLowerCase()));
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ Add Client" onClick={()=>setModal("nc")}/>}>Clients</H2>
 <input value={search} onChange={e=>setSearch(e.target.value)} placeholder=" Search by name, email or phone…" style={{width:"100%",border:`1px solid ${bo}`,borderRadius:7,padding:"9px 14px",fontSize:12,fontFamily:D,color:es,outline:"none",background:wh,marginBottom:12}}/>
 <Card sx={{overflow:"hidden"}}>
 <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"7px 14px",borderBottom:`1px solid ${bo}`}}>
 {["Client","Type","Location","Date","Status","Balance"].map(h=><div key={h} style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600}}>{h}</div>)}
 </div>
 {filt.map((c,i)=><div key={c.id} className="rh" onClick={()=>setSelC(c)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 1fr .8fr .8fr",padding:"15px 18px",borderBottom:i<filt.length-1?`1px solid ${bo}`:"none",alignItems:"center",transition:"background .14s"}}>
 <div><div style={{fontFamily:D,fontSize:19,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:tl,fontFamily:D}}>{c.email}</div></div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{c.type}</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{c.loc}</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{c.date||"TBD"}</div>
 <Tag color={SC(c.status)} ch={c.status}/>
 <div style={{fontFamily:D,fontSize:13,color:c.bal>0?rd:gn}}>{c.bal>0?`$${c.bal}`:""}</div>
 </div>)}
 </Card>
 </div>};

 const emailsTab=()=>{
 if(selE)return<div className="fi">
 <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:18}}><button onClick={()=>setSelE(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button><h2 style={{fontFamily:D,fontSize:20,color:es,fontWeight:400}}>Edit Template</h2></div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
 <Card sx={{padding:24}}>
 <Inp label="Template Name" value={selE.name} onChange={e=>setSelE({...selE,name:e.target.value})}/>
 <Inp label="Subject Line" value={selE.subject} onChange={e=>setSelE({...selE,subject:e.target.value})}/>
 <Inp label="Trigger" value={selE.trigger} onChange={e=>setSelE({...selE,trigger:e.target.value})}/>
 <Inp label="Email Body" value={selE.body} onChange={e=>setSelE({...selE,body:e.target.value})} multi rows={11}/>
 <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:10,background:cr,padding:9,borderRadius:7,lineHeight:1.7}}>Merge tags: {"{first_name} {session_date} {session_time} {session_location}"}</div>
 <div style={{display:"flex",gap:7}}><Btn v="m" ch="Save" onClick={async()=>{setEmails(es=>es.map(e=>e.id===selE.id?selE:e));await sb.from("emails").upsert(selE);toast("Saved! ");setSelE(null)}}/><Btn v="o" ch="Cancel" onClick={()=>setSelE(null)}/></div>
 </Card>
 <Card sx={{padding:24}}>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:10}}>Preview</div>
 <div style={{background:cr,borderRadius:7,padding:14}}>
 <div style={{fontSize:13,fontWeight:600,color:es,fontFamily:D,marginBottom:9}}>{selE.subject}</div>
 <div style={{height:1,background:bo,marginBottom:9}}/>
 <div style={{fontSize:12,color:dk,fontFamily:D,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{selE.body.replace("{first_name}","Sarah").replace("{session_date}","May 15, 2026").replace("{session_time}","6:30 AM").replace("{session_location}","New Smyrna Beach")}</div>
 </div>
 </Card>
 </div>
 </div>;
 return<div className="fi">
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300}}>Email Templates</h2>
 <div style={{display:"flex",gap:8}}>
 <Btn v="o" ch="AI Draft New Template" onClick={()=>{setAiModal({first:"template",last:"",email:"",status:"",type:"",pkg:"",loc:"",date:"",notes:"",_templateMode:true});setAiDraft("");setAiPurpose("inquiry_response");}}/>
 <Btn v="m" ch="+ New Template" onClick={()=>{const ne={id:Date.now().toString(),name:"New Template",subject:"",trigger:"",body:""};setEmails(es=>[...es,ne]);setSelE(ne)}}/>
 </div>
 </div>
 <div style={{marginBottom:16,padding:"14px 18px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
 <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.8}}>Tip: Use <strong>AI Draft New Template</strong> to have Claude write a full email template for any situation. Then save it and it will appear in your library below. You can also open any client and use AI Draft Email for a personalized version.</div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
 {emails.map(e=><Card hover key={e.id} sx={{padding:14,cursor:"pointer"}} onClick={()=>setSelE({...e})}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}><div style={{fontFamily:D,fontSize:17,color:es,flex:1,marginRight:7}}>{e.name}</div><Btn sm v="o" ch="Edit" onClick={ev=>{ev.stopPropagation();setSelE({...e})}}/></div>
 <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:2}}> {e.subject}</div>
 <div style={{fontSize:9,color:tl,fontFamily:D,fontStyle:"italic"}}> {e.trigger}</div>
 </Card>)}
 </div>
 </div>
 };

 const packagesTab=()=>{
 if(selP)return<div className="fi">
 <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:24}}>
 <button onClick={()=>setSelP(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17,fontFamily:D}}>←</button>
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300}}>{selP._isAddon?"Edit Add-On":"Edit Package"}</h2>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
 <Card sx={{padding:24}}>
 <Inp label="Name" value={selP.name} onChange={e=>setSelP({...selP,name:e.target.value})}/>
 <Inp label="Price ($)" value={selP.price} onChange={e=>setSelP({...selP,price:Number(e.target.value)})} type="number"/>
 {!selP._isAddon&&<><Inp label="Duration (min)" value={selP.dur} onChange={e=>setSelP({...selP,dur:Number(e.target.value)})} type="number"/>
 <Inp label="Images Included" value={selP.img} onChange={e=>setSelP({...selP,img:e.target.value})}/></>}
 <Inp label="Description" value={selP.desc||""} onChange={e=>setSelP({...selP,desc:e.target.value})} multi rows={3}/>
 {!selP._isAddon&&<div onClick={()=>setSelP({...selP,pop:!selP.pop})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:16,padding:"10px 0"}}>
 <div style={{width:18,height:18,borderRadius:3,border:`1.5px solid ${selP.pop?"#444":bo}`,background:selP.pop?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
 {selP.pop&&<span style={{color:"#fff",fontSize:11}}></span>}
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
 const row={id:selP.id,name:selP.name,price:Number(selP.price),dur:Number(selP.dur),img:String(selP.img),description:selP.desc||"",pop:selP.pop||false,image_url:selP.image_url||""};
 setPkgs(ps=>ps.map(p=>p.id===selP.id?selP:p));
 await sb.from("packages").upsert(row);
 }
 toast("Saved!");setSelP(null);
 }}/>
 <Btn v="o" ch="Cancel" onClick={()=>setSelP(null)}/>
 </div>
 </Card>
 {!selP._isAddon&&<Card sx={{padding:24}}>
 <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Package Photo</div>
 <div style={{marginBottom:14,fontSize:14,color:br,fontFamily:D,lineHeight:1.7}}>This photo shows on the client-facing booking proposal alongside this package. Use a beautiful image that represents this session type.</div>
 {(selP.image_url||pkgImages[selP.id])&&<div style={{marginBottom:14}}>
 <img src={selP.image_url||pkgImages[selP.id]} alt={selP.name} style={{width:"100%",height:200,objectFit:"cover",borderRadius:3,border:`1px solid ${bo}`}}/>
 </div>}
 <div style={{border:`2px dashed ${bo}`,borderRadius:3,padding:"24px 16px",textAlign:"center",background:"#fdf9f9",cursor:"pointer"}}
  onClick={()=>document.getElementById("pkg-img-upload-"+selP.id).click()}>
 <div style={{fontFamily:D,fontSize:16,color:br,marginBottom:6}}>Click to upload photo</div>
 <div style={{fontSize:13,color:tl,fontFamily:D}}>JPG or PNG, recommended 800×600 or larger</div>
 <input id={"pkg-img-upload-"+selP.id} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{
   const dataUrl=ev.target.result;
   setPkgImages(pi=>({...pi,[selP.id]:dataUrl}));
   setSelP({...selP,image_url:dataUrl});
   toast("Photo uploaded!");
  };
  reader.readAsDataURL(file);
 }}/>
 </div>
 {(selP.image_url||pkgImages[selP.id])&&<button onClick={()=>{setPkgImages(pi=>{const n={...pi};delete n[selP.id];return n;});setSelP({...selP,image_url:""});}} style={{marginTop:10,background:"transparent",border:"none",fontFamily:D,fontSize:13,color:rd,cursor:"pointer",textDecoration:"underline"}}>Remove photo</button>}
 </Card>}
 </div>
 </div>;
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ Add Package" onClick={()=>{const np={id:Date.now().toString(),name:"New Package",price:0,dur:60,img:0,desc:"",pop:false};setPkgs(ps=>[...ps,np]);setSelP(np)}}/>}>Packages & Pricing</H2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11,marginBottom:22}}>
 {pkgs.map(p=><Card hover key={p.id} sx={{padding:18,position:"relative",overflow:"hidden"}}>
 {p.pop&&<div style={{position:"absolute",top:0,right:0,background:go,color:wh,fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 11px",fontFamily:D,fontWeight:700}}>Most Popular</div>}
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
 const TC2={email:{bg:bll,c:bl,i:"️"},proposal:{bg:"#F0EBF5",c:"#6B3A7A",i:""},workflow:{bg:gnl,c:gn,i:""},status:{bg:ml,c:md,i:"️"}};
 return<div className="fi">
 <H2>Automation Workflows</H2>
 <div style={{display:"flex",gap:9,marginBottom:18}}>
 {[LWF,SWF].map(w=><button key={w.id} onClick={()=>setSelWF(w)} style={{padding:"7px 14px",borderRadius:7,border:`2px solid ${wf.id===w.id?es:bo}`,background:wf.id===w.id?es:wh,color:wf.id===w.id?cr:dk,fontFamily:D,fontSize:13,fontWeight:600,cursor:"pointer"}}>{w.name}</button>)}
 </div>
 <Card sx={{padding:26,marginBottom:18}}>
 <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:12}}>{wf.name}</div>
 <div style={{display:"flex",gap:0,marginBottom:18,overflowX:"auto"}}>
 {wf.ms.map((m,i)=><div key={m} style={{display:"flex",alignItems:"center"}}>
 <div style={{background:es,color:cr,borderRadius:20,padding:"4px 11px",fontSize:10,fontFamily:D,fontWeight:600,whiteSpace:"nowrap"}}>{m}</div>
 {i<wf.ms.length-1&&<div style={{width:25,height:2,background:bo,flexShrink:0}}/>}
 </div>)}
 </div>
 <div style={{display:"grid",gridTemplateColumns:`repeat(${wf.ms.length},1fr)`,gap:14}}>
 {wf.ms.map((m,mi)=><div key={m}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>{m}</div>
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
 style={{background:"#F5EBEB",border:"none",borderRadius:2,padding:"5px 9px",cursor:"pointer",color:rd,fontSize:12,fontFamily:D}}></button>
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
 {clients.filter(c=>!["Completed","Closed"].includes(c.status)).map((c,i,arr)=><div key={c.id} className="rh" onClick={()=>{setSelC(c);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:11,padding:"15px 18px",borderBottom:i<arr.length-1?`1px solid ${bo}`:"none",cursor:"pointer"}}>
 <div style={{width:7,height:7,borderRadius:"50%",background:gn,flexShrink:0}} className="pu"/>
 <div style={{flex:1}}><div style={{fontFamily:D,fontSize:19,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{[...LWF.steps,...SWF.steps].find(s=>s.id===c.wf)?.a||"Active"}</div></div>
 <Tag color={SC(c.status)} ch={c.status}/>
 </div>)}
 </Card>

 </div>
 };

 const scheduler=()=>{
 const r=schedulerRules;
 const getCustomSlots=(ds,pid,loc)=>{
  const sun=getSun(ds),beach=isB(loc),p=pkgs.find(x=>x.id===pid),len=p?.dur||60;
  if(!beach){
   const sl=[];
   for(let m=r.nonBeachStart;m<=r.nonBeachEnd;m+=15){
    const ideal=(m>=sun.rm+r.beachMorningOffset&&m<=sun.rm+r.beachMorningOffset+45)||(m>=sun.sm-len+r.beachEveningOffset-15&&m<=sun.sm-len+r.beachEveningOffset+15);
    sl.push({t:m2t(m),ideal,lbl:""});
   }
   return{sl,sun,beach};
  }
  return{sl:[
   ...[-15,0,15].map(i=>({t:m2t(sun.rm+r.beachMorningOffset+i),ideal:i===0,lbl:i===-15?"Ideal Morning":i===0?"Sunrise":""})),
   ...[-(len+15+r.beachEveningOffset*-1),-(len+r.beachEveningOffset*-1)].map(i=>({t:m2t(sun.sm+i),ideal:i===-(len+r.beachEveningOffset*-1),lbl:i===-(len+r.beachEveningOffset*-1)?"Ideal Evening":""}))
  ],sun,beach};
 };
 const ideal=getCustomSlots(pvDate,pvPkg,pvLoc);
 const RuleRow=({label,val,min,max,step=5,onChange,suffix=""})=><div style={{marginBottom:16}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
   <div style={{fontSize:14,fontFamily:D,color:es}}>{label}</div>
   <div style={{fontFamily:D,fontSize:16,color:es,fontWeight:500,minWidth:60,textAlign:"right"}}>{val>0?"+":""}{val} {suffix}</div>
  </div>
  <input type="range" min={min} max={max} step={step} value={val} onChange={e=>onChange(Number(e.target.value))}
   style={{width:"100%",accentColor:"#444444"}}/>
  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:tl,fontFamily:D}}>
   <span>{min>0?m2t(min):min+" min"}</span><span>{max>0&&max>60?m2t(max):max+" min"}</span>
  </div>
 </div>;
 return<div className="fi">
 <H2>Smart Scheduler</H2>
 <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:18}}>
 <div>
 <Card sx={{padding:26,marginBottom:16}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
  <div style={{fontFamily:D,fontSize:20,color:es}}>Beach Session Rules</div>
  <Tag color="blue" ch="Editable"/>
 </div>
 <div style={{marginBottom:8,fontSize:14,color:br,fontFamily:D}}>Adjust the timing offsets for beach sessions. Positive = after sunrise/sunset, negative = before.</div>
 <RuleRow label="Morning start offset (from sunrise)" val={r.beachMorningOffset} min={-60} max={60} step={5} suffix="min" onChange={v=>setSchedulerRules({...r,beachMorningOffset:v})}/>
 <RuleRow label="Evening end offset (from sunset)" val={r.beachEveningOffset} min={-30} max={30} step={5} suffix="min" onChange={v=>setSchedulerRules({...r,beachEveningOffset:v})}/>
 <div style={{borderTop:"1px solid "+bo,paddingTop:14,marginTop:4}}>
  <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:10}}>Current beach rules:</div>
  <div style={{background:"#fdf9f9",borderRadius:2,padding:"12px 16px",border:"1px solid "+bo,fontSize:14,color:es,fontFamily:D,lineHeight:2}}>
   Morning: Sunrise {r.beachMorningOffset>=0?"+":""}{r.beachMorningOffset} min<br/>
   Evening: Sunset − session length {r.beachEveningOffset>=0?"+":""}{r.beachEveningOffset} min<br/>
   Midday: always blocked
  </div>
 </div>
 </Card>
 <Card sx={{padding:26}}>
 <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:16}}>Parks / Studios / Non-Beach</div>
 <RuleRow label="Earliest start time" val={r.nonBeachStart} min={300} max={720} step={15} suffix="" onChange={v=>setSchedulerRules({...r,nonBeachStart:v})}/>
 <RuleRow label="Latest start time" val={r.nonBeachEnd} min={900} max={1320} step={15} suffix="" onChange={v=>setSchedulerRules({...r,nonBeachEnd:v})}/>
 <RuleRow label="Buffer between sessions" val={r.bufferMins} min={0} max={120} step={15} suffix="min" onChange={v=>setSchedulerRules({...r,bufferMins:v})}/>
 <RuleRow label="Max sessions per day" val={r.maxPerDay} min={1} max={6} step={1} suffix="" onChange={v=>setSchedulerRules({...r,maxPerDay:v})}/>
 </Card>
 </div>
 <Card sx={{padding:26}}>
 <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:14}}>Live Preview</div>
 <div style={{marginBottom:12}}><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>Date</div><input type="date" value={pvDate} onChange={e=>setPvDate(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:U,outline:"none",background:cr}}/></div>
 <div style={{marginBottom:12}}><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>Package</div><select value={pvPkg} onChange={e=>setPvPkg(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:U,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name} ({p.dur}m)</option>)}</select></div>
 <div style={{marginBottom:14}}><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>Location</div><select value={pvLoc} onChange={e=>setPvLoc(e.target.value)} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:2,padding:"10px 14px",fontSize:16,fontFamily:U,outline:"none",background:cr}}>{["Cocoa Beach","New Smyrna Beach","Daytona Beach","Disney's BoardWalk","Orlando/Winter Park","Deltona Studio"].map(l=><option key={l}>{l}</option>)}</select></div>
 {ideal.beach&&<div style={{background:"#fdf9f9",borderRadius:2,padding:"10px 14px",marginBottom:12,border:"1px solid "+bo}}><div style={{fontSize:14,color:es,fontFamily:D}}>Beach · Sunrise {ideal.sun.rs} · Sunset {ideal.sun.ss}</div></div>}
 <div style={{maxHeight:340,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
 {ideal.sl.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",borderRadius:2,background:s.ideal?"#fdf0ee":cr,border:`1px solid ${s.ideal?bo:bo}`}}>
 <div style={{width:8,height:8,borderRadius:"50%",background:s.ideal?"#F0DEDC":"#E8D8D6",flexShrink:0}}/>
 <span style={{fontSize:15,fontFamily:D,color:es,fontWeight:s.ideal?600:300,flex:1}}>{s.t}</span>
 {s.lbl&&<span style={{fontSize:12,color:br,fontFamily:D}}>{s.lbl}</span>}
 </div>)}
 </div>
 </Card>
 </div>
 </div>
 };

 const generateContractPDF=(ct,client)=>{
 const clientInfo=client?`\n\nCLIENT: ${client.first} ${client.last}\nEMAIL: ${client.email}\nPHONE: ${client.phone}\nSESSION DATE: ${client.date||"TBD"}\nLOCATION: ${client.loc||"TBD"}\nPACKAGE: ${pkgs.find(p=>p.id===client.pkg)?.name||"TBD"}\n`:"";
 const fullText=ct.name.toUpperCase()+"\n"+("─".repeat(50))+"\n"+clientInfo+"\n"+ct.body;
 const blob=new Blob([fullText],{type:"text/plain"});
 const url=URL.createObjectURL(blob);
 const a=document.createElement("a");
 a.href=url;a.download=(ct.name.replace(/\s+/g,"-"))+(client?"-"+client.last:"")+".txt";
 a.click();URL.revokeObjectURL(url);
 toast("Contract downloaded!");
 };
 const printContract=(ct,client)=>{
 const clientInfo=client?`<div style="background:#f9f7f5;border:1px solid #E8D8D6;border-radius:4px;padding:16px 20px;margin-bottom:24px;"><strong>Client:</strong> ${client.first} ${client.last} | ${client.email} | ${client.phone}<br/><strong>Session Date:</strong> ${client.date||"TBD"} | <strong>Location:</strong> ${client.loc||"TBD"} | <strong>Package:</strong> ${pkgs.find(p=>p.id===client.pkg)?.name||"TBD"}</div>`:"";
 const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${ct.name}</title><style>@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');body{font-family:'Cormorant Garamond',Georgia,serif;max-width:720px;margin:40px auto;padding:0 32px;color:#444;line-height:1.8}h1{font-size:24px;font-weight:300;letter-spacing:0.05em;border-bottom:2px solid #E8D8D6;padding-bottom:16px;margin-bottom:24px}.logo{font-size:18px;color:#888;margin-bottom:32px}pre{white-space:pre-wrap;font-family:inherit;font-size:15px}footer{margin-top:48px;padding-top:20px;border-top:1px solid #E8D8D6;font-size:12px;color:#aaa;text-align:center}@media print{body{margin:0;padding:24px}}</style></head><body><div class="logo">The Collective | Michelle Coombs Photography</div><h1>${ct.name}</h1>${clientInfo}<pre>${ct.body}</pre><footer>Generated ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})} · The Collective | Michelle Coombs Photography</footer></body></html>`;
 const w=window.open("","_blank","width=800,height=900");
 w.document.write(html);w.document.close();
 setTimeout(()=>w.print(),600);
 };
 const contracts=()=>{
 if(selContract){
  const ct=selContract;
  const clientsWithThisContract=clients.filter(cl=>cl.contractId===ct.id||cl.signed);
  return<div className="fi">
  <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:24}}>
  <button onClick={()=>{setSelContract(null);setEditContractMode(false);}} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:20,fontFamily:D}}>← All Contracts</button>
  <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300,flex:1}}>{ct.name}</h2>
  <Tag color={ct.active?"green":"gray"} ch={ct.active?"Active":"Inactive"}/>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:20}}>
  <Card sx={{padding:28}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D}}>Contract Text</div>
  <div style={{display:"flex",gap:8}}>
  {!editContractMode&&<Btn sm v="o" ch="Edit Contract" onClick={()=>setEditContractMode(true)}/>}
  {editContractMode&&<><Btn sm v="m" ch="Save" onClick={async()=>{setContractTemplates(cs=>cs.map(x=>x.id===ct.id?ct:x));await sb.from("settings").upsert({key:"contract_"+ct.id,value:ct.body});toast("Contract saved!");setEditContractMode(false);}}/><Btn sm v="o" ch="Cancel" onClick={()=>{setSelContract(contractTemplates.find(x=>x.id===ct.id));setEditContractMode(false);}}/></>}
  </div>
  </div>
  {editContractMode
  ?<textarea value={ct.body} onChange={e=>setSelContract({...ct,body:e.target.value})} rows={24} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"14px 16px",fontSize:15,fontFamily:D,color:es,outline:"none",resize:"vertical",lineHeight:1.8}}/>
  :<div style={{background:"#fdf9f9",borderRadius:2,padding:"20px 24px",border:"1px solid "+bo,fontSize:15,fontFamily:D,color:es,lineHeight:1.9,whiteSpace:"pre-wrap",maxHeight:520,overflowY:"auto"}}>{ct.body}</div>}
  <div style={{display:"flex",gap:8,marginTop:16,flexWrap:"wrap"}}>
  <Btn v="m" ch="Print / Save PDF" onClick={()=>printContract(ct,null)}/>
  <Btn v="o" ch="Download as Text" onClick={()=>generateContractPDF(ct,null)}/>
  </div>
  </Card>
  <div>
  <Card sx={{padding:22,marginBottom:14}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Contract Details</div>
  <div style={{marginBottom:10}}>
  <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:4}}>Contract Name</div>
  {editContractMode?<input value={ct.name} onChange={e=>setSelContract({...ct,name:e.target.value})} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontFamily:D,fontSize:16,color:es,outline:"none"}}/>:<div style={{fontFamily:D,fontSize:17,color:es}}>{ct.name}</div>}
  </div>
  <div style={{marginBottom:10}}>
  <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:4}}>Type</div>
  <div style={{fontFamily:D,fontSize:16,color:es}}>{ct.type}</div>
  </div>
  <div style={{padding:"10px 0",borderTop:"1px solid "+bo}}>
  <div onClick={()=>setSelContract({...ct,active:!ct.active})} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
  <div style={{width:18,height:18,borderRadius:3,border:"1.5px solid "+(ct.active?"#444":bo),background:ct.active?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
  {ct.active&&<span style={{color:"#fff",fontSize:11}}></span>}
  </div>
  <span style={{fontFamily:D,fontSize:15,color:es}}>Active (shown to clients)</span>
  </div>
  </div>
  </Card>
  <Card sx={{padding:22,marginBottom:14}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Send to Client</div>
  <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.7,marginBottom:12}}>Select a client to generate a personalized version of this contract with their session details pre-filled.</div>
  <select style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontFamily:D,fontSize:15,color:es,outline:"none",marginBottom:10}} id="contract-client-select">
  <option value="">— Select a client —</option>
  {clients.map(cl=><option key={cl.id} value={cl.id}>{cl.first} {cl.last} · {cl.date||"no date"}</option>)}
  </select>
  <div style={{display:"flex",gap:8}}>
  <Btn v="m" ch="Print for Client" onClick={()=>{const sel=document.getElementById("contract-client-select").value;const cl=clients.find(x=>x.id===Number(sel)||x.id===sel);if(!cl)return toast("Select a client first");printContract(ct,cl);}}/>
  <Btn v="o" ch="Download PDF" onClick={()=>{const sel=document.getElementById("contract-client-select").value;const cl=clients.find(x=>x.id===Number(sel)||x.id===sel);if(!cl)return toast("Select a client first");generateContractPDF(ct,cl);}}/>
  </div>
  </Card>
  <Card sx={{padding:22}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Clients with This Contract</div>
  {clientsWithThisContract.length===0&&<div style={{fontFamily:D,fontSize:14,color:tl}}>No clients assigned yet.</div>}
  {clientsWithThisContract.map(cl=><div key={cl.id} className="rh" onClick={()=>{setSelC(cl);setTab("clients");}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid "+bo,cursor:"pointer"}}>
  <div style={{flex:1}}><div style={{fontFamily:D,fontSize:16,color:es}}>{cl.first} {cl.last}</div><div style={{fontSize:13,color:br,fontFamily:D}}>{cl.date||"TBD"} · {cl.loc||"TBD"}</div></div>
  <Tag color="green" ch="Signed"/>
  </div>)}
  </Card>
  </div>
  </div>
  </div>;
 }
 const addNewContract=()=>{const body=["CONTRACT TEMPLATE","The Collective | Michelle Coombs Photography","","1. SERVICES","[Describe services here]","","2. PAYMENT TERMS","[Describe payment terms]","","3. CANCELLATION","[Describe cancellation policy]","","4. GOVERNING LAW: State of Florida.","","Photographer Signature: _________________________ Date: __________","Client Signature: _________________________ Date: __________"].join("\n");const newCt={id:Date.now().toString(),name:"New Contract Template",type:"custom",active:true,body};setContractTemplates(cs=>[...cs,newCt]);setSelContract(newCt);setEditContractMode(true);};
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ New Contract" onClick={addNewContract}>Contracts</Btn>}>Contracts</H2>
 <div style={{marginBottom:18,padding:"16px 20px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:4}}>How it works</div>
 <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.8}}>Create different contract templates for different session types. When sending to a client, their name, session date, location, and package are automatically filled in. Only you can edit contracts — clients receive a PDF to download and sign.</div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,marginBottom:28}}>
 {contractTemplates.map(ct=><Card hover key={ct.id} sx={{padding:22,cursor:"pointer"}} onClick={()=>{setSelContract({...ct});setEditContractMode(false);}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
 <div style={{fontFamily:D,fontSize:20,color:es}}>{ct.name}</div>
 <Tag color={ct.active?"green":"gray"} ch={ct.active?"Active":"Inactive"}/>
 </div>
 <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:14,lineHeight:1.6}}>{ct.body.split("\n").slice(0,3).join(" · ").slice(0,120)}…</div>
 <div style={{display:"flex",gap:8}}>
 <Btn sm v="o" ch="Edit" onClick={e=>{e.stopPropagation();setSelContract({...ct});setEditContractMode(true);}}/>
 <Btn sm v="o" ch="Print / PDF" onClick={e=>{e.stopPropagation();printContract(ct,null);}}/>
 </div>
 </Card>)}
 </div>
 <H2>Signed Contracts by Client</H2>
 <Card sx={{overflow:"hidden"}}>
 <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr",padding:"10px 18px",borderBottom:"1px solid "+bo}}>
 {["Client","Session","Status","Actions"].map(h=><div key={h} style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:500}}>{h}</div>)}
 </div>
 {clients.filter(c=>c.signed||c.status==="Booked"||c.status==="Active"||c.status==="Completed").map((c,i,arr)=>{
 const pkg=pkgs.find(p=>p.id===c.pkg);
 return<div key={c.id} style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr",padding:"14px 18px",borderBottom:i<arr.length-1?"1px solid "+bo:"none",alignItems:"center"}}>
 <div><div style={{fontFamily:D,fontSize:17,color:es}}>{c.first} {c.last}</div><div style={{fontSize:13,color:br,fontFamily:D}}>{c.email}</div></div>
 <div style={{fontFamily:D,fontSize:15,color:br}}>{c.date||"TBD"} · {pkg?.name||"TBD"}</div>
 <Tag color={c.signed?"green":"gold"} ch={c.signed?"Signed":"Pending"}/>
 <div style={{display:"flex",gap:6}}>
 <Btn sm v="o" ch="Print" onClick={()=>{const ct=contractTemplates[0];if(ct)printContract(ct,c);}}/>
 </div>
 </div>;})}
 {clients.filter(c=>c.signed||c.status==="Booked"||c.status==="Active"||c.status==="Completed").length===0&&<div style={{padding:"22px 18px",fontFamily:D,fontSize:15,color:tl}}>No signed contracts yet.</div>}
 </Card>
 </div>;
 };

 const invoices=()=>{
 const allInvoices=[
 ...clients.filter(c=>c.paid>0||c.bal>0).map(c=>({...c,_type:"client"})),
 ...invoiceList,
 ];
 if(editInv){
 const inv=editInv;
 const isClient=inv._type==="client";
 const p=isClient?pkgs.find(x=>x.id===inv.pkg):null;
 // Build default items with full package details if coming from client
 const defaultItems=p?[
 {desc:p.name,qty:1,price:p.price},
 {desc:"Session duration: "+p.dur+" minutes",qty:1,price:0},
 {desc:"Edited images included: "+(p.img==="ALL"?"All images":p.img+" images"),qty:1,price:0},
 {desc:"Delivery via Pic-Time gallery — unlimited downloads, 1-year backup",qty:1,price:0},
 ]:[{desc:"Session",qty:1,price:0}];
 const items=inv._items||defaultItems;
 const subtotal=items.filter(i=>Number(i.price)>0).reduce((s,i)=>s+(Number(i.qty)||1)*(Number(i.price)||0),0);
 const balance=subtotal-(Number(inv.paid)||0);
 const showPreview=showInvPreview;
 const setShowPreview=setShowInvPreview;
 const showEmailPreview=showInvEmailPreview;
 const setShowEmailPreview=setShowInvEmailPreview;
 const clientName=isClient?inv.first+" "+inv.last:inv.customName;
 const clientEmail=isClient?inv.email:inv.customEmail;
 if(showEmailPreview)return<div className="fi">
 <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:20}}>
 <button onClick={()=>setShowEmailPreview(false)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:20,fontFamily:D}}>← Back to Invoice</button>
 </div>
 <Card sx={{padding:32,maxWidth:620}}>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:4}}>To</div>
 <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:2}}>{clientName}</div>
 <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:20}}>{clientEmail}</div>
 <div style={{borderBottom:"2px solid "+bo,marginBottom:20}}/>
 <div style={{fontFamily:D,fontSize:17,fontWeight:500,color:es,marginBottom:20}}>Subject: Your invoice from The Collective | Michelle Coombs Photography</div>
 <div style={{fontFamily:D,fontSize:17,color:es,lineHeight:2,whiteSpace:"pre-line"}}>
 {`Hi ${inv.first||clientName},\n\nPlease find your invoice for your upcoming session below.\n\n- Session: ${inv.date||"TBD"}\n- Location: ${inv.loc||"TBD"}\n- Package: ${p?.name||"Session"}\n- Total: $${subtotal.toLocaleString()}\n- Retainer paid: $${inv.paid||0}\n- Balance due: $${Math.max(0,balance).toLocaleString()}\n\nPayment is due 72 hours before your session. If you have any questions, just reply to this email.\n\nSo excited to see you!\nMichelle\nThe Collective | Michelle Coombs Photography`}
 </div>
 <div style={{marginTop:24,display:"flex",gap:8}}>
 <Btn v="m" ch="Send Invoice Email" onClick={()=>toast("Connect Resend to send invoices")}/>
 <Btn v="o" ch="Cancel" onClick={()=>setShowEmailPreview(false)}/>
 </div>
 </Card>
 </div>;
 if(showPreview)return<div className="fi">
 <div className="no-print" style={{display:"flex",gap:9,alignItems:"center",marginBottom:20}}>
 <button onClick={()=>setShowPreview(false)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:20,fontFamily:D}}>← Back to Edit</button>
 <h2 style={{fontFamily:D,fontSize:28,color:es,fontWeight:300,flex:1}}>Invoice Preview</h2>
 <Btn v="m" ch="Print / Save PDF" onClick={()=>window.print()}/>
 </div>
 <Card sx={{padding:40,maxWidth:700}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,paddingBottom:24,borderBottom:"2px solid "+bo}}>
 <div>
 <div style={{fontFamily:D,fontSize:28,color:es,letterSpacing:"0.02em"}}>The Collective</div>
 <div style={{fontSize:15,color:br,fontFamily:D,marginTop:4}}>Michelle Coombs Photography</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>hello@michellecoombsphotography.com</div>
 </div>
 <div style={{textAlign:"right"}}>
 <div style={{fontFamily:D,fontSize:22,color:es,marginBottom:4}}>INVOICE</div>
 <div style={{fontSize:14,color:br,fontFamily:D}}>#{String(inv.id).slice(-4).padStart(4,"0")}</div>
 <div style={{fontSize:14,color:br,fontFamily:D,marginTop:4}}>{new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
 </div>
 </div>
 <div style={{marginBottom:28}}>
 <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Bill To</div>
 <div style={{fontFamily:D,fontSize:20,color:es}}>{clientName}</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{clientEmail}</div>
 {isClient&&<div style={{fontSize:15,color:br,fontFamily:D}}>{inv.phone}</div>}
 </div>
 {(inv.date||inv.loc)&&<div style={{background:"#fdf9f9",border:"1px solid "+bo,borderRadius:2,padding:"14px 18px",marginBottom:24}}>
 <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Session Details</div>
 {inv.date&&<div style={{fontFamily:D,fontSize:16,color:es}}>Date: {new Date(inv.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>}
 {inv.loc&&<div style={{fontFamily:D,fontSize:16,color:es}}>Location: {inv.loc}</div>}
 </div>}
 <div style={{marginBottom:24}}>
 <div style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr",padding:"10px 0",borderBottom:"2px solid "+es,marginBottom:10}}>
 {["Description","Qty","Amount"].map(h=><div key={h} style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:500}}>{h}</div>)}
 </div>
 {items.map((item,idx)=>{
 const amt=(Number(item.qty)||1)*(Number(item.price)||0);
 return<div key={idx} style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr",padding:"10px 0",borderBottom:"1px solid "+bo}}>
 <div style={{fontFamily:D,fontSize:16,color:es}}>{item.desc}</div>
 <div style={{fontFamily:D,fontSize:16,color:br}}>{amt>0?(Number(item.qty)||1):""}</div>
 <div style={{fontFamily:D,fontSize:16,color:es}}>{amt>0?"$"+amt.toLocaleString():"Included"}</div>
 </div>;})}
 </div>
 <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,borderTop:"2px solid "+bo,paddingTop:16}}>
 <div style={{display:"flex",gap:32,fontFamily:D,fontSize:16,color:br}}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
 {inv.paid>0&&<div style={{display:"flex",gap:32,fontFamily:D,fontSize:16,color:gn}}><span>Retainer Paid</span><span>-${inv.paid}</span></div>}
 <div style={{display:"flex",gap:32,fontFamily:D,fontSize:22,color:balance<=0?gn:es,fontWeight:500,paddingTop:8,borderTop:"1px solid "+bo}}><span>Balance Due</span><span>${Math.max(0,balance).toLocaleString()}</span></div>
 </div>
 {inv.notes&&<div style={{marginTop:24,padding:"14px 18px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:2}}>
 <div style={{fontSize:13,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Notes</div>
 <div style={{fontFamily:D,fontSize:15,color:es,lineHeight:1.7}}>{inv.notes}</div>
 </div>}
 </Card>
 </div>;
 return<div className="fi">
 <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:20}}>
 <button onClick={()=>{setEditInv(null);setShowInvPreview(false);setShowInvEmailPreview(false);}} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:20}}>←</button>
 <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:300,flex:1}}>Invoice — {clientName}</h2>
 <Tag color={balance<=0?"green":inv.paid>0?"gold":"red"} ch={balance<=0?"Paid":inv.paid>0?"Partial":"Unpaid"}/>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:20}}>
 <Card sx={{padding:28}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,paddingBottom:20,borderBottom:"1px solid "+bo}}>
 <div><div style={{fontFamily:D,fontSize:24,color:es}}>The Collective</div><div style={{fontSize:15,color:br,fontFamily:D}}>Michelle Coombs Photography</div><div style={{fontSize:15,color:br,fontFamily:D}}>hello@michellecoombsphotography.com</div></div>
 <div style={{textAlign:"right"}}><div style={{fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D}}>Invoice #{String(inv.id).slice(-4).padStart(4,"0")}</div><div style={{fontFamily:D,fontSize:14,color:br,marginTop:4}}>{inv.date||new Date().toLocaleDateString()}</div></div>
 </div>
 <div style={{marginBottom:20}}>
 <div style={{fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Bill To</div>
 <div style={{fontFamily:D,fontSize:20,color:es}}>{clientName}</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{clientEmail}</div>
 {isClient&&<div style={{fontSize:15,color:br,fontFamily:D}}>{inv.phone}</div>}
 </div>
 <div style={{marginBottom:18}}>
 <div style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 32px",gap:6,padding:"9px 0",borderBottom:"2px solid "+bo,marginBottom:10}}>
 {["Description","Qty","Price",""].map((h,i)=><div key={i} style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:500}}>{h}</div>)}
 </div>
 {items.map((item,idx)=><div key={idx} style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 32px",gap:6,marginBottom:8,alignItems:"center"}}>
 <input value={item.desc} onChange={e=>{const ni=[...items];ni[idx]={...ni[idx],desc:e.target.value};setEditInv({...inv,_items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontFamily:D,fontSize:16,color:es,outline:"none"}}/>
 <input type="number" value={item.qty} onChange={e=>{const ni=[...items];ni[idx]={...ni[idx],qty:e.target.value};setEditInv({...inv,_items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"9px 8px",fontFamily:D,fontSize:15,color:es,outline:"none"}}/>
 <input type="number" value={item.price} onChange={e=>{const ni=[...items];ni[idx]={...ni[idx],price:e.target.value};setEditInv({...inv,_items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"9px 8px",fontFamily:D,fontSize:15,color:es,outline:"none"}}/>
 <button onClick={()=>{const ni=items.filter((_,i)=>i!==idx);setEditInv({...inv,_items:ni});}} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:18,fontFamily:D}}>×</button>
 </div>)}
 <button onClick={()=>setEditInv({...inv,_items:[...items,{desc:"",qty:1,price:0}]})} style={{background:"transparent",border:"1px dashed "+bo,borderRadius:2,padding:"9px 14px",fontFamily:D,fontSize:14,color:br,cursor:"pointer",marginTop:6,width:"100%"}}>+ Add Line Item</button>
 </div>
 <div style={{borderTop:"1px solid "+bo,paddingTop:14,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
 <div style={{display:"flex",gap:24,fontFamily:D,fontSize:15,color:br}}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
 <div style={{display:"flex",gap:24,alignItems:"center",fontFamily:D,fontSize:15}}>
 <span style={{color:br}}>Retainer / Paid</span>
 <div style={{display:"flex",alignItems:"center",gap:4}}>
 <span style={{color:br}}>$</span>
 <input type="number" value={inv.paid||0} onChange={e=>setEditInv({...inv,paid:Number(e.target.value)})} style={{width:90,border:"1px solid "+bo,borderRadius:2,padding:"6px 10px",fontFamily:D,fontSize:15,color:gn,outline:"none"}}/>
 </div>
 </div>
 <div style={{display:"flex",gap:24,fontFamily:D,fontSize:20,color:balance<=0?gn:rd,fontWeight:500}}><span>Balance Due</span><span>${Math.max(0,balance).toLocaleString()}</span></div>
 </div>
 {inv.notes!==undefined&&<div style={{marginTop:16}}>
 <div style={{fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Notes</div>
 <textarea value={inv.notes||""} onChange={e=>setEditInv({...inv,notes:e.target.value})} rows={2} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"10px 12px",fontFamily:D,fontSize:15,color:es,outline:"none",resize:"vertical"}}/>
 </div>}
 <div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap"}}>
 <Btn v="m" ch="Save Invoice" onClick={async()=>{
 if(isClient){const upd={...inv,paid:inv.paid,bal:Math.max(0,subtotal-inv.paid)};setClients(cs=>cs.map(cl=>cl.id===upd.id?upd:cl));await sb.from("clients").update({paid:upd.paid,bal:upd.bal}).eq("id",upd.id);}
 else{setInvoiceList(il=>il.map(i=>i.id===inv.id?inv:i));}
 toast("Invoice saved!");setEditInv(null);setShowInvPreview(false);setShowInvEmailPreview(false);
 }}/>
 <Btn v="o" ch="Preview Invoice" onClick={()=>setShowPreview(true)}/>
 <Btn v="o" ch="Preview Email" onClick={()=>setShowEmailPreview(true)}/>
 <Btn v="o" ch="Mark Paid" onClick={async()=>{
 const upd={...inv,paid:subtotal,bal:0,_items:items};
 if(isClient){setClients(cs=>cs.map(cl=>cl.id===upd.id?upd:cl));await sb.from("clients").update({paid:subtotal,bal:0}).eq("id",upd.id);}
 else setInvoiceList(il=>il.map(i=>i.id===inv.id?upd:i));
 setEditInv(upd);toast("Marked as paid!");
 }}/>
 {isClient&&<Btn v="o" ch="Cancel Session" onClick={()=>{
 const upd={...inv,status:"Cancelled"};
 setClients(cs=>cs.map(cl=>cl.id===upd.id?upd:cl));
 sb.from("clients").update({status:"Cancelled"}).eq("id",upd.id);
 toast("Session cancelled.");setEditInv(upd);
 }}/>}
 </div>
 </Card>
 <div>
 <Card sx={{padding:22,marginBottom:14}}>
 <div style={{fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Payment Summary</div>
 <div style={{fontFamily:D,fontSize:34,color:balance<=0?gn:es,fontWeight:300,marginBottom:6}}>${Math.max(0,balance).toLocaleString()}</div>
 <div style={{fontSize:15,color:br,fontFamily:D,marginBottom:14}}>Balance due</div>
 {inv.paid>0&&<div style={{background:gnl,borderRadius:2,padding:"10px 14px",border:"1px solid #c3dbc3",marginBottom:10}}>
 <div style={{fontFamily:D,fontSize:16,color:gn}}>Received: ${inv.paid.toLocaleString()}</div>
 </div>}
 {balance>0&&<div style={{background:"#fdf9f9",borderRadius:2,padding:"10px 14px",border:"1px solid "+bo}}>
 <div style={{fontFamily:D,fontSize:15,color:br}}>Due 72 hrs before session</div>
 </div>}
 {balance>0&&<div style={{marginTop:14}}>
 <Btn v="m" ch={"Pay $"+Math.max(0,balance).toLocaleString()+" via Square"} onClick={()=>{const sq=window.__squareLink||"";if(sq){window.open(sq,"_blank");}else{const entered=prompt("Paste your Square payment link (saved for this session):");if(entered){window.__squareLink=entered;window.open(entered,"_blank");}}}}/>
 <div style={{fontSize:12,color:tl,fontFamily:D,marginTop:6}}>Opens your Square checkout link. Set your default link in Settings.</div>
 </div>}
 </Card>
 {isClient&&<Card sx={{padding:22}}>
 <div style={{fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Session Info</div>
 <div style={{fontFamily:D,fontSize:17,color:es,marginBottom:6}}>{inv.date?new Date(inv.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}):"Date TBD"}</div>
 <div style={{fontSize:15,color:br,fontFamily:D,marginBottom:4}}>{inv.loc}</div>
 <div style={{fontSize:15,color:br,fontFamily:D}}>{p?.name}</div>
 </Card>}
 </div>
 </div>
 </div>;
 }
 return<div className="fi">
 <H2 action={<div style={{display:"flex",gap:7}}>
 <Btn sm v="o" ch="Sync QuickBooks" onClick={()=>toast("QuickBooks — connect when ready! ")}/>
 <Btn sm v="m" ch="+ Invoice" onClick={()=>setNewInvModal(true)}/>
 </div>}>Invoices</H2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:11,marginBottom:16}}>
 {[["Total Billed",`$${(rev+out).toLocaleString()}`],["Collected",`$${rev.toLocaleString()}`],["Outstanding",`$${out.toLocaleString()}`]].map(([l,v])=><Card key={l} sx={{padding:20}}><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontFamily:D,fontSize:22,color:es}}>{v}</div></Card>)}
 </div>
 <Card sx={{overflow:"hidden"}}>
 <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"7px 14px",borderBottom:"1px solid "+bo}}>
 {["Client","Package / Description","Date","Total","Status"].map(h=><div key={h} style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D}}>{h}</div>)}
 </div>
 {allInvoices.map((inv,i)=>{
 const p=inv._type==="client"?pkgs.find(x=>x.id===inv.pkg):null;
 const items=inv._items||[{price:p?.price||0,qty:1}];
 const total=inv._type==="client"?(p?.price||0):items.reduce((s,it)=>s+it.qty*it.price,0);
 const bal=total-(inv.paid||0);
 return<div key={inv.id} className="rh" onClick={()=>setEditInv({...inv,_items:inv._items||[{desc:p?.name||"Session",qty:1,price:p?.price||0}]})} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"15px 18px",borderBottom:i<allInvoices.length-1?"1px solid "+bo:"none",alignItems:"center",cursor:"pointer"}}>
 <div><div style={{fontFamily:D,fontSize:17,color:es}}>{inv._type==="client"?inv.first+" "+inv.last:inv.customName}</div><div style={{fontSize:12,color:tl,fontFamily:D}}>{inv._type==="client"?inv.email:inv.customEmail}</div></div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>{p?.name||"Custom Invoice"}</div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>{inv.date||"—"}</div>
 <div style={{fontFamily:D,fontSize:15,color:es}}>${total.toLocaleString()}</div>
 <Tag color={bal<=0?"green":inv.paid>0?"gold":"red"} ch={bal<=0?"Paid":inv.paid>0?"Partial":"Unpaid"}/>
 </div>;
 })}
 {allInvoices.length===0&&<div style={{padding:"22px 14px",fontFamily:D,fontSize:14,color:tl}}>No invoices yet. Add a client or create a standalone invoice.</div>}
 </Card>
 {newInvModal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
 <div style={{background:"#fff",borderRadius:3,padding:28,width:"100%",maxWidth:520,boxShadow:"0 20px 60px rgba(0,0,0,.15)",border:"1px solid "+bo,maxHeight:"90vh",overflowY:"auto"}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
 <h3 style={{fontFamily:D,fontSize:24,color:es,fontWeight:300}}>Create Invoice</h3>
 <button onClick={()=>setNewInvModal(false)} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br}}>×</button>
 </div>
 <div style={{marginBottom:14}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Link to Client (optional)</div>
 <select value={newInv.clientId} onChange={e=>setNewInv({...newInv,clientId:e.target.value})} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px 10px",fontFamily:D,fontSize:14,color:es,outline:"none"}}>
 <option value="">— Standalone Invoice —</option>
 {clients.map(c=><option key={c.id} value={c.id}>{c.first} {c.last}</option>)}
 </select>
 </div>
 {!newInv.clientId&&<><Inp label="Client Name" value={newInv.customName} onChange={e=>setNewInv({...newInv,customName:e.target.value})}/><Inp label="Client Email" value={newInv.customEmail} onChange={e=>setNewInv({...newInv,customEmail:e.target.value})} type="email"/></>}
 <div style={{marginBottom:12}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:6}}>Line Items</div>
 {newInv.items.map((item,idx)=><div key={idx} style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 28px",gap:6,marginBottom:6,alignItems:"center"}}>
 <input placeholder="Description" value={item.desc} onChange={e=>{const ni=[...newInv.items];ni[idx]={...ni[idx],desc:e.target.value};setNewInv({...newInv,items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"10px 14px",fontFamily:D,fontSize:16,color:es,outline:"none"}}/>
 <input type="number" placeholder="Qty" value={item.qty} onChange={e=>{const ni=[...newInv.items];ni[idx]={...ni[idx],qty:Number(e.target.value)};setNewInv({...newInv,items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"7px 8px",fontFamily:D,fontSize:14,color:es,outline:"none"}}/>
 <input type="number" placeholder="Price" value={item.price} onChange={e=>{const ni=[...newInv.items];ni[idx]={...ni[idx],price:Number(e.target.value)};setNewInv({...newInv,items:ni});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"7px 8px",fontFamily:D,fontSize:14,color:es,outline:"none"}}/>
 <button onClick={()=>setNewInv({...newInv,items:newInv.items.filter((_,i)=>i!==idx)})} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:16}}>×</button>
 </div>)}
 <button onClick={()=>setNewInv({...newInv,items:[...newInv.items,{desc:"",qty:1,price:0}]})} style={{background:"transparent",border:"1px dashed "+bo,borderRadius:2,padding:"6px 14px",fontFamily:D,fontSize:13,color:br,cursor:"pointer",width:"100%",marginTop:4}}>+ Add Line</button>
 </div>
 <Inp label="Retainer / Amount Paid ($)" value={newInv.paid} onChange={e=>setNewInv({...newInv,paid:Number(e.target.value)})} type="number"/>
 <Inp label="Notes" value={newInv.notes} onChange={e=>setNewInv({...newInv,notes:e.target.value})} multi rows={2}/>
 <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
 <Btn v="o" ch="Cancel" onClick={()=>setNewInvModal(false)}/>
 <Btn v="m" ch="Create Invoice" onClick={()=>{
 const client=newInv.clientId?clients.find(c=>String(c.id)===String(newInv.clientId)):null;
 const id=Date.now();
 const total=newInv.items.reduce((s,i)=>s+i.qty*i.price,0);
 if(client){
 const upd={...client,paid:newInv.paid,bal:total-newInv.paid};
 setClients(cs=>cs.map(c=>c.id===client.id?upd:c));
 sb.from("clients").update({paid:upd.paid,bal:upd.bal}).eq("id",client.id);
 } else {
 setInvoiceList(il=>[...il,{...newInv,id,_type:"standalone",date:new Date().toISOString().slice(0,10)}]);
 }
 setNewInvModal(false);
 setNewInv({clientId:"",customName:"",customEmail:"",items:[{desc:"",qty:1,price:0}],paid:0,notes:""});
 toast("Invoice created!");
 }}/>
 </div>
 </div>
 </div>}
 </div>;
 };

 const galleries=()=><div className="fi">
 <H2>Galleries</H2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
 {clients.map(c=><Card hover key={c.id} sx={{padding:20}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}><div><div style={{fontFamily:D,fontSize:19,color:es}}>{c.first} {c.last}</div><div style={{fontSize:12,color:br,fontFamily:D}}>{c.date}</div></div><Tag color={c.gallery?"green":"gray"} ch={c.gallery?"Delivered":"Pending"}/></div>
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
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300}}>Client Portal Preview</h2>
 <div style={{display:"flex",gap:9,alignItems:"center"}}>
 <select value={pc} onChange={e=>setPortalC(e.target.value)} style={{border:`1px solid ${bo}`,borderRadius:5,padding:"6px 11px",fontSize:13,fontFamily:D,color:es,outline:"none",background:cr}}>
 {clients.map(cl=><option key={cl.id} value={cl.id}>{cl.first} {cl.last}</option>)}
 </select>
 <Btn sm v="m" ch="Copy Link" onClick={()=>{navigator.clipboard.writeText(portalLink);toast("Portal link copied! ");}}/>
 </div>
 </div>
 <div style={{background:"#fdf9f9",borderRadius:2,padding:"10px 14px",marginBottom:20,fontSize:14,fontFamily:D,color:br,border:`1px solid ${bo}`,letterSpacing:"0.03em"}}>Client link: <span style={{color:es,fontStyle:"italic"}}>{portalLink}</span></div>
 <div style={{border:`1px solid ${bo}`,borderRadius:3,overflow:"hidden"}}>
 <div style={{background:"#fff",padding:"14px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${bo}`}}><div style={{fontFamily:D,fontSize:18,color:es,fontWeight:300,letterSpacing:"0.08em",textTransform:"uppercase"}}>The Collective · Michelle Coombs Photography</div><div style={{fontSize:15,color:br,fontFamily:D,fontStyle:"italic"}}>Welcome, {c.first}</div></div>
 <div style={{background:pk,padding:"28px 22px",textAlign:"center",borderBottom:`1px solid ${bo}`}}><div style={{fontFamily:D,fontSize:36,color:es,fontWeight:300,marginBottom:4}}>Hi {c.first}</div><div style={{fontSize:17,color:"#666",fontFamily:D,fontWeight:300}}>Your session details, all in one place.</div></div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderTop:`1px solid ${bo}`}}>
 <Card sx={{padding:20}}>
 <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}> Your Session</div>
 <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:2}}>{c.date?new Date(c.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}):"TBD"}</div>
 <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:9}}>{c.loc} · {p?.name}</div>
 <div style={{display:"flex",gap:14}}>{[["",sun.rs],["",sun.ss]].map(([l,v])=><div key={l}><div style={{fontSize:9,color:tl,fontFamily:D}}>{l}</div><div style={{fontSize:11,fontWeight:600,color:es,fontFamily:D}}>{v}</div></div>)}</div>
 </Card>
 <WW shoot={wx}/>
 <Card sx={{padding:20}}>
 <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}> Investment</div>
 {[["Package",`$${p?.price||0}`],["Retainer Paid",`-$${c.paid||0}`],["Balance Due",`$${c.bal||0}`]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:D,marginBottom:3,color:l==="Balance Due"?rd:dk,fontWeight:l==="Balance Due"?700:400}}><span>{l}</span><span>{v}</span></div>)}
 {c.bal>0&&<Btn v="m" ch="Pay Balance Now" sx={{width:"100%",marginTop:7}} onClick={()=>toast("Square payment — connect when live! ")}/>}
 </Card>
 <Card sx={{padding:20}}>
 <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}> Contract</div>
 <Tag color={c.signed?"green":"red"} ch={c.signed?"Signed ":"Awaiting Signature"}/>
 <div style={{marginTop:7}}><Btn v="o" sm ch="Review Contract"/></div>
 </Card>
 {c.gallery&&<Card sx={{padding:14,gridColumn:"span 2"}}>
 <div style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",color:br,fontFamily:D,fontWeight:400,marginBottom:9}}>️ Your Gallery</div>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
 <div><div style={{fontFamily:D,fontSize:20,color:es,marginBottom:2}}>Your photos are ready! </div><div style={{fontSize:13,color:br,fontFamily:D}}>Click below to view and download your images.</div></div>
 <a href={c.gallery} target="_blank" rel="noreferrer"><Btn v="m" ch="View Gallery →"/></a>
 </div>
 </Card>}
 {!c.gallery&&<Card sx={{padding:14,gridColumn:"span 2",background:sa,border:`1px solid ${bo}`}}>
 <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",color:br,fontFamily:D,fontWeight:600,marginBottom:5}}>️ Gallery</div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>Your gallery will appear here once it's delivered — usually within 2–3 weeks of your session.</div>
 </Card>}
 </div>
 </div>
 </div>
 };

 const parseSproutCSV=(text)=>{
  const lines=text.trim().split("\n");
  const headers=lines[0].split(",").map(h=>h.trim().replace(/"/g,"").toLowerCase());
  return lines.slice(1).map(row=>{
   const vals=[];let cur="",inQ=false;
   for(const ch of row){if(ch==="\"")inQ=!inQ;else if(ch===","&&!inQ){vals.push(cur.trim());cur="";}else cur+=ch;}
   vals.push(cur.trim());
   const obj={};headers.forEach((h,i)=>obj[h]=vals[i]||"");
   return{
    first:(obj["first name"]||obj["firstname"]||obj["first"]||"").replace(/"/g,""),
    last:(obj["last name"]||obj["lastname"]||obj["last"]||"").replace(/"/g,""),
    email:(obj["email"]||obj["email address"]||"").replace(/"/g,""),
    phone:(obj["phone"]||obj["phone number"]||obj["mobile"]||"").replace(/"/g,""),
    date:(obj["session date"]||obj["date"]||"").replace(/"/g,""),
    loc:(obj["location"]||obj["session location"]||"").replace(/"/g,""),
    type:(obj["session type"]||obj["type"]||"Family").replace(/"/g,""),
    status:(obj["status"]||"Lead").replace(/"/g,""),
    notes:(obj["notes"]||obj["note"]||"").replace(/"/g,""),
    paid:Number((obj["paid"]||obj["amount paid"]||"0").replace(/[$,"]/g,"")||0),
    bal:Number((obj["balance"]||obj["amount due"]||"0").replace(/[$,"]/g,"")||0),
    pkg:"signature",signed:false,wf:"l1",
   };
  }).filter(r=>r.first||r.email);
 };
 const settings=()=>{
 return<div className="fi">
 <H2>Settings & Integrations</H2>
 <div style={{display:"flex",gap:9,marginBottom:20,borderBottom:"1px solid "+bo,paddingBottom:0}}>
 {[["square","Square Connect"],["sprout","Import from Sprout"],["integrations","All Integrations"]].map(([id,label])=><button key={id} onClick={()=>setImportTab(id)} style={{padding:"10px 20px",border:"none",borderBottom:`2px solid ${importTab===id?es:"transparent"}`,background:"transparent",fontFamily:D,fontSize:15,color:importTab===id?es:br,cursor:"pointer",marginBottom:-1}}>{label}</button>)}
 </div>
 {importTab==="square"&&<div>
 <Card sx={{padding:28,marginBottom:16}}>
 <div style={{fontFamily:D,fontSize:22,color:es,marginBottom:16}}>How to Connect Square</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
 {[
  ["Step 1","Create a Payment Link","Go to squareup.com → Log in → click Online Checkout in the left sidebar → click Payment Links → click + Create a link."],
  ["Step 2","Set up your link","Choose Fixed Price or No Amount (so you can customize per invoice). Name it something like 'Michelle Coombs Photography Session Payment'. Add your logo if you like."],
  ["Step 3","Copy the link","After creating, copy the link — it will look like https://square.link/u/xxxxxxxx"],
  ["Step 4","Paste it below","Paste the link in the field below. It will then appear as a Pay button on every unpaid invoice in this CRM."],
 ].map(([n,t,d])=><div key={n} style={{padding:"16px 18px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
 <div style={{fontFamily:D,fontSize:13,color:br,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{n}</div>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:6,fontWeight:500}}>{t}</div>
 <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.7}}>{d}</div>
 </div>)}
 </div>
 <div style={{padding:"16px 18px",background:gnl,border:"1px solid #c3dbc3",borderRadius:3,marginBottom:20}}>
 <div style={{fontFamily:D,fontSize:15,color:gn,marginBottom:4,fontWeight:500}}>Tip: No Amount link is most flexible</div>
 <div style={{fontSize:13,color:gn,fontFamily:D,lineHeight:1.7}}>Creating a "No Amount" payment link lets you customize the dollar amount per session in Square when you send it, or you can have clients type in the amount they owe. This works perfectly with the CRM balance due shown on invoices.</div>
 </div>
 <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
 <div style={{flex:1}}><Inp label="Your Square Payment Link" value={sqLink} onChange={e=>setSqLink(e.target.value)} ph="https://square.link/u/xxxxxxxx"/></div>
 <Btn v="m" ch="Save Link" sx={{marginBottom:14}} onClick={()=>{window.__squareLink=sqLink;toast("Square link saved! Pay buttons on invoices will now open this link.");}}/>
 </div>
 <div style={{fontSize:13,color:tl,fontFamily:D}}>This saves for your current session. To make permanent: In Supabase, go to the settings table and add a row with key = "square_link" and the value as your link.</div>
 </Card>
 </div>}
 {importTab==="sprout"&&<div>
 <Card sx={{padding:28,marginBottom:16}}>
 <div style={{fontFamily:D,fontSize:22,color:es,marginBottom:16}}>Import Clients from Sprout Studio</div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:22}}>
 {[
  ["Step 1","Export from Sprout","In Sprout Studio → go to Contacts or Clients → click the Export or Download button (usually top right). Choose CSV format. Download the file."],
  ["Step 2","Open the file","Open the downloaded CSV in TextEdit (Mac) or Notepad (Windows). Select all the text and copy it."],
  ["Step 3","Paste below","Paste the CSV text into the box below. The importer will read the columns automatically."],
  ["Step 4","Review & import","Check the preview — it shows the first few rows. Click Import to add them to your CRM. Existing clients will not be duplicated."],
 ].map(([n,t,d])=><div key={n} style={{padding:"16px 18px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
 <div style={{fontFamily:D,fontSize:13,color:br,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{n}</div>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:6,fontWeight:500}}>{t}</div>
 <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.7}}>{d}</div>
 </div>)}
 </div>
 <div style={{marginBottom:16}}>
 <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Paste CSV Data Here</div>
 <textarea value={csvText} onChange={e=>{setCsvText(e.target.value);if(e.target.value.trim())setImportPreview(parseSproutCSV(e.target.value));else setImportPreview([]);}} rows={6} placeholder={"First Name,Last Name,Email,Phone,Session Date,Location,Status,Notes\nSarah,Mitchell,sarah@email.com,..."}
 style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"12px 16px",fontFamily:"monospace",fontSize:13,color:es,outline:"none",resize:"vertical",lineHeight:1.5}}/>
 </div>
 {importPreview.length>0&&<div>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:10}}>Preview — {importPreview.length} clients found:</div>
 <Card sx={{overflow:"hidden",marginBottom:14}}>
 <div style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr 1fr 1fr",padding:"8px 16px",borderBottom:"1px solid "+bo}}>
 {["Name","Email","Date","Status"].map(h=><div key={h} style={{fontSize:12,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D}}>{h}</div>)}
 </div>
 {importPreview.slice(0,8).map((r,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 1.5fr 1fr 1fr",padding:"10px 16px",borderBottom:i<Math.min(importPreview.length,8)-1?"1px solid "+bo:"none"}}>
 <div style={{fontFamily:D,fontSize:15,color:es}}>{r.first} {r.last}</div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>{r.email}</div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>{r.date||"—"}</div>
 <div style={{fontSize:13,color:br,fontFamily:D}}>{r.status}</div>
 </div>)}
 {importPreview.length>8&&<div style={{padding:"10px 16px",fontFamily:D,fontSize:13,color:br}}>…and {importPreview.length-8} more</div>}
 </Card>
 <div style={{display:"flex",gap:10,alignItems:"center"}}>
 <Btn v="m" ch={"Import "+importPreview.length+" Clients"} onClick={async()=>{
  const existing=new Set(clients.map(c=>c.email.toLowerCase()));
  const newClients=importPreview.filter(r=>r.email&&!existing.has(r.email.toLowerCase())).map((r,i)=>({...r,id:Date.now()+i,gallery:""}));
  if(newClients.length===0)return toast("All clients already exist in your CRM.");
  setClients(cs=>[...cs,...newClients]);
  for(const cl of newClients){await sb.from("clients").insert(cl).catch(()=>{});}
  toast(newClients.length+" clients imported! "+(importPreview.length-newClients.length)+" skipped (already exist).");
  setCsvText("");setImportPreview([]);
 }}/>
 <button onClick={()=>{setCsvText("");setImportPreview([]);}} style={{background:"none",border:"none",fontFamily:D,fontSize:14,color:br,cursor:"pointer"}}>Clear</button>
 </div>
 </div>}
 <div style={{marginTop:20,padding:"14px 18px",background:ml,border:"1px solid "+ma,borderRadius:3}}>
 <div style={{fontFamily:D,fontSize:15,color:md,marginBottom:4,fontWeight:500}}>Column mapping</div>
 <div style={{fontSize:13,color:br,fontFamily:D,lineHeight:1.8}}>The importer looks for these column names (not case-sensitive): First Name, Last Name, Email, Phone, Session Date, Location, Session Type, Status, Notes, Paid, Balance. If Sprout exports with different column names, reach out and we can adjust the mapping.</div>
 </div>
 </Card>
 </div>}
 {importTab==="integrations"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
 {[{n:"Square",d:"Payment processing",i:""},{n:"Resend",d:"Email delivery (~3,000/mo free)",i:"️"},{n:"QuickBooks",d:"Sync invoices & financials",i:""},{n:"Supabase",d:"Database — saves all data",i:"️"},{n:"Zapier",d:"Connect Showit form → CRM",i:""},{n:"Pic-Time",d:"Gallery delivery via links",i:"️",active:true}].map(s=><Card key={s.n} sx={{padding:20}}>
 <div style={{display:"flex",alignItems:"center",gap:9}}>
 <div style={{width:36,height:36,borderRadius:7,background:sa,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{s.i}</div>
 <div style={{flex:1}}><div style={{fontFamily:D,fontSize:20,color:es,marginBottom:1}}>{s.n}</div><div style={{fontSize:12,color:br,fontFamily:D,marginBottom:4}}>{s.d}</div><Tag color={s.active?"green":"gray"} ch={s.active?"Active":"Not connected"}/></div>
 <Btn sm v={s.active?"o":"m"} ch={s.active?"Manage":"Connect"} onClick={()=>toast(`${s.n} — connect when going live! `)}/>
 </div>
 </Card>)}
 </div>}
 </div>;
 };

 const leads=()=>{
 const stages=["Lead","Proposal Sent","Booked","Active","Cold Lead","Cancelled"];
 const stageColors={"Lead":"#3A5A7A","Proposal Sent":"#888","Booked":gn,"Active":gn,"Cold Lead":"#ccc","Cancelled":rd};
 const filtL=c=>!lSearch||`${c.first} ${c.last} ${c.email}`.toLowerCase().includes(lSearch.toLowerCase());
 return<div className="fi">
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300}}>Leads Pipeline</h2>
 <div style={{display:"flex",gap:8,alignItems:"center"}}>
 <input value={lSearch} onChange={e=>setLSearch(e.target.value)} placeholder="Search…" style={{border:"1px solid "+bo,borderRadius:2,padding:"7px 12px",fontFamily:D,fontSize:13,color:es,outline:"none",width:160}}/>
 <Btn sm v="m" ch="+ Add Lead" onClick={()=>setModal("nc")}/>
 </div>
 </div>
 <div style={{marginBottom:16,padding:"12px 18px",background:"#faf8f8",border:"1px solid "+bo,borderRadius:3,display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}>
 <div style={{fontFamily:D,fontSize:14,color:br,lineHeight:1.6}}>
  <strong style={{color:es}}>Booking Agent</strong>{inboxQueue.filter(x=>x.status==="pending").length>0&&<span style={{background:rd,color:"#fff",fontSize:12,fontFamily:D,borderRadius:2,padding:"2px 10px",marginLeft:8}}>{inboxQueue.filter(x=>x.status==="pending").length} pending review</span>} — click the dark <em>Book This Lead</em> button on any Lead or Proposal Sent card to have the AI check your calendar, pick 3 dates, and draft a personalized first reply.
 </div>
 <div style={{display:"flex",gap:7,flexShrink:0}}>
 {gcalConnected
  ?<Tag color="green" ch="Google Calendar Connected"/>
  :<Btn sm v="o" ch="Connect Google Calendar" onClick={()=>setTab("settings")}/>}
 </div>
 </div>
 <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:12,minHeight:400}}>
 {stages.map(stage=>{
 const stageCl=clients.filter(c=>c.status===stage&&filtL(c));
 return<div key={stage} style={{minWidth:210,flex:"0 0 210px"}}>
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,padding:"8px 10px",borderRadius:2,background:"#faf8f8",borderLeft:"3px solid "+(stageColors[stage]||bo)}}>
 <div style={{fontFamily:D,fontSize:13,color:es,letterSpacing:"0.03em"}}>{stage}</div>
 <div style={{minWidth:20,height:20,borderRadius:"50%",background:stageColors[stage]||bo,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 6px"}}>
 <span style={{fontFamily:D,fontSize:10,color:"#fff"}}>{stageCl.length}</span>
 </div>
 </div>
 <div style={{display:"flex",flexDirection:"column",gap:7}}>
 {stageCl.map(c=>{
 const p=pkgs.find(x=>x.id===c.pkg);
 return<Card hover key={c.id} sx={{padding:14,cursor:"pointer",borderLeft:"3px solid "+(stageColors[stage]||bo)}} onClick={()=>{setSelC(c);setTab("clients");}}>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:3,fontWeight:400}}>{c.first} {c.last}</div>
 <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:2}}>{c.type} · {p?.name}</div>
 {c.date&&<div style={{fontSize:11,color:tl,fontFamily:D,marginBottom:5}}>{new Date(c.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>}
 {c.bal>0&&<div style={{fontSize:11,color:rd,fontFamily:D,marginBottom:6}}>${c.bal} outstanding</div>}
 {c.notes&&<div style={{fontSize:11,color:tl,fontFamily:D,marginBottom:7,fontStyle:"italic",lineHeight:1.4}}>{c.notes.slice(0,60)}{c.notes.length>60?"…":""}</div>}
 {(stage==="Lead"||stage==="Proposal Sent")&&<button onClick={e=>{e.stopPropagation();setAgentModal(c);setAgentStep("idle");setAgentLog([]);setAgentDraft("");}}
 style={{width:"100%",background:"#444444",color:"#fff",border:"none",borderRadius:2,padding:"8px 12px",fontFamily:D,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",marginBottom:7,transition:"opacity .15s"}}
 onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>
 Book This Lead
 </button>}
 <select value={c.status} onClick={e=>e.stopPropagation()} onChange={async e=>{e.stopPropagation();const upd={...c,status:e.target.value};setClients(cs=>cs.map(x=>x.id===upd.id?upd:x));await sb.from("clients").update({status:e.target.value}).eq("id",c.id);toast("Status → "+e.target.value);}}
 style={{fontSize:11,border:"1px solid "+bo,borderRadius:2,padding:"5px 8px",fontFamily:D,color:br,outline:"none",cursor:"pointer",width:"100%"}}>
 {["Lead","Proposal Sent","Booked","Active","Completed","Cold Lead","Cancelled","Closed"].map(s=><option key={s}>{s}</option>)}
 </select>
 </Card>;
 })}
 {stageCl.length===0&&<div style={{border:"1px dashed "+bo,borderRadius:2,padding:"18px 10px",textAlign:"center",fontFamily:D,fontSize:12,color:tl}}>Empty</div>}
 </div>
 </div>;
 })}
 </div>
 </div>;
 };

 const calendar=()=>{
 const yr=calMonth.getFullYear(),mo=calMonth.getMonth();
 const firstDay=new Date(yr,mo,1).getDay();
 const daysInMonth=new Date(yr,mo+1,0).getDate();
 const monthName=calMonth.toLocaleString("default",{month:"long",year:"numeric"});
 const prevMonth=()=>setCalMonth(new Date(yr,mo-1,1));
 const nextMonth=()=>setCalMonth(new Date(yr,mo+1,1));
 const sessionsInMonth=clients.filter(c=>{if(!c.date)return false;const d=new Date(c.date+"T12:00:00");return d.getFullYear()===yr&&d.getMonth()===mo&&c.status!=="Cancelled";});
 const byDay={};
 sessionsInMonth.forEach(c=>{const d=new Date(c.date+"T12:00:00").getDate();if(!byDay[d])byDay[d]=[];byDay[d].push(c);});
 const today=new Date();
 return<div className="fi">
 <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
 <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:300}}>{monthName}</h2>
 <div style={{display:"flex",gap:8,alignItems:"center"}}>
 <button onClick={prevMonth} style={{background:"transparent",border:"1px solid "+bo,borderRadius:2,padding:"7px 14px",fontFamily:D,fontSize:16,cursor:"pointer",color:es}}>←</button>
 <button onClick={()=>setCalMonth(new Date(today.getFullYear(),today.getMonth(),1))} style={{background:"transparent",border:"1px solid "+bo,borderRadius:2,padding:"7px 14px",fontFamily:D,fontSize:13,cursor:"pointer",color:br,letterSpacing:"0.1em",textTransform:"uppercase"}}>Today</button>
 <button onClick={nextMonth} style={{background:"transparent",border:"1px solid "+bo,borderRadius:2,padding:"7px 14px",fontFamily:D,fontSize:16,cursor:"pointer",color:es}}>→</button>
 </div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:18}}>
 <Card sx={{padding:22}}>
 <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
 {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{textAlign:"center",fontSize:13,letterSpacing:"0.1em",color:br,fontFamily:D,padding:"4px 0",textTransform:"uppercase"}}>{d}</div>)}
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
 {Array(firstDay).fill(null).map((_,i)=><div key={"e"+i} style={{minHeight:80}}/>)}
 {Array.from({length:daysInMonth},(_,i)=>i+1).map(d=>{
 const isToday=today.getFullYear()===yr&&today.getMonth()===mo&&today.getDate()===d;
 const daySessions=byDay[d]||[];
 const hasSession=daySessions.length>0;
 return<div key={d} style={{minHeight:220,borderRadius:3,border:"1px solid "+(isToday?es:bo),background:isToday?"#fdf9f9":"#fff",padding:4,cursor:hasSession?"pointer":"default",transition:"background .1s"}}
 onClick={()=>{if(daySessions.length===1){setSelC(daySessions[0]);setTab("clients");}}}>
 <div style={{fontFamily:D,fontSize:15,color:isToday?es:br,fontWeight:isToday?600:400,marginBottom:3,width:26,height:26,borderRadius:"50%",background:isToday?es:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:isToday?"#fff":br}}>{d}</div>
 {daySessions.map((c,ci)=>{const sun=getSun(c.date),p=pkgs.find(x=>x.id===c.pkg);return<div key={c.id} style={{background:pk,borderRadius:2,padding:"3px 7px",marginBottom:3,fontSize:12,fontFamily:D,color:es,lineHeight:1.4}}>
 <div style={{fontWeight:600,fontSize:13}}>{c.first} {c.last}</div>
 <div style={{color:br,fontSize:9}}>{p?.name} · {isB(c.loc)?" "+sun.rs:c.loc}</div>
 </div>;})}
 </div>;
 })}
 </div>
 </Card>
 <div>
 <div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:9}}>Sessions This Month</div>
 {sessionsInMonth.length===0&&<div style={{fontFamily:D,fontSize:14,color:tl,padding:"14px 0"}}>No sessions in {calMonth.toLocaleString("default",{month:"long"})}.</div>}
 <div style={{display:"flex",flexDirection:"column",gap:7}}>
 {sessionsInMonth.sort((a,b)=>a.date.localeCompare(b.date)).map(c=>{
 const sun=getSun(c.date),p=pkgs.find(x=>x.id===c.pkg);
 return<Card hover key={c.id} sx={{padding:12,cursor:"pointer"}} onClick={()=>{setSelC(c);setTab("clients");}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
 <div>
 <div style={{fontFamily:D,fontSize:16,color:es}}>{c.first} {c.last}</div>
 <div style={{fontSize:12,color:br,fontFamily:D,marginBottom:3}}>{new Date(c.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
 <div style={{fontSize:11,color:br,fontFamily:D}}>{p?.name} · {c.loc}</div>
 {isB(c.loc)&&<div style={{fontSize:11,color:es,fontFamily:D,marginTop:2}}> {sun.rs} · {sun.ss}</div>}
 </div>
 <Tag color={SC(c.status)} ch={c.status}/>
 </div>
 </Card>;
 })}
 </div>
 </div>
 </div>
 </div>;
 };

 const addClientModal=()=><div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
 <div style={{background:wh,borderRadius:3,padding:28,width:"100%",maxWidth:480,boxShadow:"0 20px 60px rgba(0,0,0,.15)",border:`1px solid ${bo}`}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h3 style={{fontFamily:D,fontSize:26,color:es,fontWeight:300}}>Add New Client</h3><button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br,fontFamily:D}}>×</button></div>
 <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="First Name" value={nc.first} onChange={e=>setNc({...nc,first:e.target.value})}/></div><div style={{flex:1}}><Inp label="Last Name" value={nc.last} onChange={e=>setNc({...nc,last:e.target.value})}/></div></div>
 <Inp label="Email" value={nc.email} onChange={e=>setNc({...nc,email:e.target.value})} type="email"/>
 <Inp label="Phone" value={nc.phone} onChange={e=>setNc({...nc,phone:e.target.value})}/>
 <div style={{display:"flex",gap:11}}><div style={{flex:1}}><Inp label="Session Date" value={nc.date} onChange={e=>setNc({...nc,date:e.target.value})} type="date"/></div>
 <div style={{flex:1}}><div style={{fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:br,fontFamily:D,fontWeight:600,marginBottom:3}}>Package</div>
 <select value={nc.pkg} onChange={e=>setNc({...nc,pkg:e.target.value})} style={{width:"100%",border:`1px solid ${bo}`,borderRadius:5,padding:"7px 9px",fontSize:13,fontFamily:D,color:es,outline:"none",background:cr}}>{pkgs.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
 </div>
 </div>
 <Inp label="Location" value={nc.loc} onChange={e=>setNc({...nc,loc:e.target.value})} ph="e.g. Cocoa Beach…"/>
 <Inp label="Notes" value={nc.notes} onChange={e=>setNc({...nc,notes:e.target.value})} multi rows={2}/>
 <div style={{display:"flex",gap:7,justifyContent:"flex-end",marginTop:4}}>
 <Btn v="o" ch="Cancel" onClick={()=>setModal(null)}/>
 <Btn v="m" ch="Add Client" onClick={async()=>{
 if(!nc.first||!nc.email)return;
 const p=pkgs.find(x=>x.id===nc.pkg);
 const newC={...nc,status:"Lead",type:"Family",paid:0,bal:p?.price||0,gallery:"",signed:false,wf:"l1"};
 const{data}=await sb.from("clients").insert([newC]).select();
 const savedC=data?.[0]||newC;
 setClients(cs=>[savedC,...cs]);
 setNc({first:"",last:"",email:"",phone:"",date:"",loc:"",pkg:"signature",notes:""});
 setModal(null);
 toast("Client added! Running agent...");
 if(agentSettings.autoReplyEnabled||agentSettings.followUpEnabled){
  setTimeout(()=>runAutoAgent(savedC),400);
 }
}}/>
 </div>
 </div>
 </div>;

 const locationsTab=()=>{
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ Add Location" onClick={()=>setEditLocModal({id:Date.now().toString(),name:"",area:"",address:"",beach:false,notes:""})}/>}>Locations</H2>
 <div style={{background:"#fdf9f9",border:"1px solid "+bo,borderRadius:2,padding:"10px 16px",marginBottom:16,fontFamily:D,fontSize:13,color:br}}>
 Locations marked as Beach automatically trigger sunrise/sunset scheduling rules in proposals and the scheduler.
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
 {locations.map(loc=><Card hover key={loc.id} sx={{padding:22}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
 <div><div style={{fontFamily:D,fontSize:19,color:es,marginBottom:2}}>{loc.name}</div><div style={{fontSize:13,color:br,fontFamily:D}}>{loc.area}</div></div>
 <div style={{display:"flex",gap:6,alignItems:"center"}}>
 {loc.beach&&<Tag color="blue" ch="️ Beach"/>}
 <Btn sm v="o" ch="Edit" onClick={()=>setEditLocModal({...loc})}/>
 </div>
 </div>
 {loc.address&&<div style={{fontSize:12,color:br,fontFamily:D,marginBottom:4}}> {loc.address}</div>}
 {loc.notes&&<div style={{fontSize:12,color:tl,fontFamily:D,fontStyle:"italic"}}>{loc.notes}</div>}
 </Card>)}
 </div>
 {editLocModal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
 <div style={{background:"#fff",borderRadius:3,padding:28,width:"100%",maxWidth:480,boxShadow:"0 20px 60px rgba(0,0,0,.15)",border:"1px solid "+bo}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
 <h3 style={{fontFamily:D,fontSize:22,color:es,fontWeight:300}}>{editLocModal.name||"New Location"}</h3>
 <button onClick={()=>setEditLocModal(null)} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:br}}>×</button>
 </div>
 <Inp label="Location Name" value={editLocModal.name} onChange={e=>setEditLocModal({...editLocModal,name:e.target.value})}/>
 <Inp label="Area / City" value={editLocModal.area} onChange={e=>setEditLocModal({...editLocModal,area:e.target.value})}/>
 <Inp label="Address or Landmark" value={editLocModal.address} onChange={e=>setEditLocModal({...editLocModal,address:e.target.value})}/>
 <Inp label="Notes for Clients" value={editLocModal.notes} onChange={e=>setEditLocModal({...editLocModal,notes:e.target.value})} multi rows={2}/>
 <div onClick={()=>setEditLocModal({...editLocModal,beach:!editLocModal.beach})} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:18,padding:"10px 0"}}>
 <div style={{width:20,height:20,borderRadius:3,border:"1.5px solid "+(editLocModal.beach?"#444":bo),background:editLocModal.beach?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
 {editLocModal.beach&&<span style={{color:"#fff",fontSize:11}}></span>}
 </div>
 <div><div style={{fontFamily:D,fontSize:15,color:es}}>Beach Location</div><div style={{fontSize:12,color:br,fontFamily:D}}>Enables sunrise/sunset scheduling rules</div></div>
 </div>
 <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
 {locations.find(l=>l.id===editLocModal.id)&&<Btn v="o" ch="Delete" onClick={()=>{setLocations(ls=>ls.filter(l=>l.id!==editLocModal.id));setEditLocModal(null);toast("Location removed.");}}/>}
 <Btn v="o" ch="Cancel" onClick={()=>setEditLocModal(null)}/>
 <Btn v="m" ch="Save Location" onClick={()=>{
 if(locations.find(l=>l.id===editLocModal.id)){setLocations(ls=>ls.map(l=>l.id===editLocModal.id?editLocModal:l));}
 else{setLocations(ls=>[...ls,editLocModal]);}
 setEditLocModal(null);toast("Location saved!");
 }}/>
 </div>
 </div>
 </div>}
 </div>;
 };

 const questionnairesTab=()=>{
 if(selQ){
 const q=selQ;
 return<div className="fi">
 <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:20}}>
 <button onClick={()=>setSelQ(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:17}}>←</button>
 <h2 style={{fontFamily:D,fontSize:28,color:es,fontWeight:300,flex:1}}>{q.name}</h2>
 <Btn sm v="m" ch="Save" onClick={()=>{setQuestionnaires(qs=>qs.map(x=>x.id===q.id?q:x));toast("Questionnaire saved!");setSelQ(null);}}/>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
 <Card sx={{padding:26}}>
 <Inp label="Questionnaire Name" value={q.name} onChange={e=>setSelQ({...q,name:e.target.value})}/>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Questions</div>
 {q.fields.map((f,idx)=><div key={f.id} style={{border:"1px solid "+bo,borderRadius:2,padding:12,marginBottom:8}}>
 <div style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
 <input value={f.label} onChange={e=>{const nf=[...q.fields];nf[idx]={...nf[idx],label:e.target.value};setSelQ({...q,fields:nf});}} placeholder="Question text" style={{flex:1,border:"1px solid "+bo,borderRadius:2,padding:"6px 10px",fontFamily:D,fontSize:14,color:es,outline:"none"}}/>
 <select value={f.type} onChange={e=>{const nf=[...q.fields];nf[idx]={...nf[idx],type:e.target.value};setSelQ({...q,fields:nf});}} style={{border:"1px solid "+bo,borderRadius:2,padding:"6px 8px",fontFamily:D,fontSize:13,color:es,outline:"none"}}>
 <option value="text">Short Answer</option>
 <option value="textarea">Long Answer</option>
 </select>
 <button onClick={()=>setSelQ({...q,fields:q.fields.filter((_,i)=>i!==idx)})} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:16}}>×</button>
 </div>
 </div>)}
 <button onClick={()=>setSelQ({...q,fields:[...q.fields,{id:Date.now().toString(),label:"",type:"text"}]})} style={{background:"transparent",border:"1px dashed "+bo,borderRadius:2,padding:"8px",fontFamily:D,fontSize:13,color:br,cursor:"pointer",width:"100%"}}>+ Add Question</button>
 </Card>
 <div>
 <Card sx={{padding:24,marginBottom:16}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:14}}>Preview</div>
 <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:16}}>{q.name}</div>
 {q.fields.map((f,idx)=><div key={f.id} style={{marginBottom:14}}>
 <div style={{fontFamily:D,fontSize:14,color:es,marginBottom:6}}>{idx+1}. {f.label||"Untitled question"}</div>
 {f.type==="textarea"?<textarea disabled rows={2} style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px",fontFamily:D,fontSize:13,background:"#fafafa"}}/>
 :<input disabled style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px",fontFamily:D,fontSize:13,background:"#fafafa"}}/>}
 </div>)}
 </Card>
 <Card sx={{padding:22}}>
 <div style={{fontSize:13,letterSpacing:"0.15em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:10}}>Send to Client</div>
 <select style={{width:"100%",border:"1px solid "+bo,borderRadius:2,padding:"8px 10px",fontFamily:D,fontSize:14,color:es,outline:"none",marginBottom:10}}>
 <option>Select a client…</option>
 {clients.map(c=><option key={c.id}>{c.first} {c.last}</option>)}
 </select>
 <Btn sm v="m" ch="Send Questionnaire" onClick={()=>toast("Connect Resend to send questionnaires ️")}/>
 </Card>
 </div>
 </div>
 </div>;
 }
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ New Questionnaire" onClick={()=>{const nq={id:Date.now().toString(),name:"New Questionnaire",fields:[]};setQuestionnaires(qs=>[...qs,nq]);setSelQ(nq);}}/>}>Questionnaires</H2>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:11}}>
 {questionnaires.map(q=><Card hover key={q.id} sx={{padding:16,cursor:"pointer"}} onClick={()=>setSelQ({...q})}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
 <div style={{fontFamily:D,fontSize:19,color:es}}>{q.name}</div>
 <Btn sm v="o" ch="Edit" onClick={e=>{e.stopPropagation();setSelQ({...q});}}/>
 </div>
 <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:8}}>{q.fields.length} questions</div>
 <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
 {q.fields.slice(0,3).map((f,i)=><div key={i} style={{fontSize:11,color:tl,fontFamily:D,background:"#faf8f8",border:"1px solid "+bo,borderRadius:2,padding:"2px 8px"}}>{f.label.slice(0,28)}{f.label.length>28?"…":""}</div>)}
 </div>
 </Card>)}
 </div>
 </div>;
 };


 const bookingProposalsTab=()=>{
 if(selBP){
  const bp=selBP;
  return<div className="fi">
  <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:24}}>
  <button onClick={()=>setSelBP(null)} style={{background:"transparent",border:"none",cursor:"pointer",color:br,fontSize:20,fontFamily:D}}>← All Proposal Types</button>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:20}}>
  <Card sx={{padding:26}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:16}}>Proposal Type Details</div>
  <Inp label="Proposal Name" value={bp.name} onChange={e=>setSelBP({...bp,name:e.target.value})}/>
  <Inp label="Description (shown to client)" value={bp.description} onChange={e=>setSelBP({...bp,description:e.target.value})} multi rows={2}/>
  <Inp label="Session Type" value={bp.sessionType} onChange={e=>setSelBP({...bp,sessionType:e.target.value})}/>
  <div style={{marginBottom:14}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Which Packages to Show</div>
  {pkgs.map(p=><div key={p.id} onClick={()=>setSelBP({...bp,pkgIds:bp.pkgIds.includes(p.id)?bp.pkgIds.filter(x=>x!==p.id):[...bp.pkgIds,p.id]})} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderRadius:2,background:bp.pkgIds.includes(p.id)?"#fdf9f9":wh,border:"1px solid "+(bp.pkgIds.includes(p.id)?bo:"transparent"),marginBottom:4}}>
  <div style={{width:18,height:18,borderRadius:3,border:`1.5px solid ${bp.pkgIds.includes(p.id)?"#444":bo}`,background:bp.pkgIds.includes(p.id)?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
  {bp.pkgIds.includes(p.id)&&<span style={{color:"#fff",fontSize:11}}></span>}
  </div>
  <div>
  <div style={{fontFamily:D,fontSize:16,color:es}}>{p.name}</div>
  <div style={{fontSize:13,color:br,fontFamily:D}}>${p.price} · {p.dur} min</div>
  </div>
  {(p.image_url||pkgImages[p.id])&&<img src={p.image_url||pkgImages[p.id]} alt={p.name} style={{width:48,height:36,objectFit:"cover",borderRadius:2,marginLeft:"auto"}}/>}
  {!(p.image_url||pkgImages[p.id])&&<div style={{marginLeft:"auto",fontSize:12,color:tl,fontFamily:D,fontStyle:"italic"}}>No photo</div>}
  </div>)}
  </div>
  <div style={{marginBottom:14}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:8}}>Which Add-Ons to Show</div>
  {addons.map(a=><div key={a.id} onClick={()=>setSelBP({...bp,addonIds:bp.addonIds.includes(a.id)?bp.addonIds.filter(x=>x!==a.id):[...bp.addonIds,a.id]})} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderRadius:2,background:bp.addonIds.includes(a.id)?"#fdf9f9":wh,border:"1px solid "+(bp.addonIds.includes(a.id)?bo:"transparent"),marginBottom:4}}>
  <div style={{width:18,height:18,borderRadius:3,border:`1.5px solid ${bp.addonIds.includes(a.id)?"#444":bo}`,background:bp.addonIds.includes(a.id)?"#444":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
  {bp.addonIds.includes(a.id)&&<span style={{color:"#fff",fontSize:11}}></span>}
  </div>
  <div style={{fontFamily:D,fontSize:16,color:es}}>{a.name} — ${a.price}</div>
  </div>)}
  </div>
  <div style={{display:"flex",gap:8}}>
  <Btn v="m" ch="Save" onClick={()=>{setBookingProposalTypes(bps=>bps.map(b=>b.id===bp.id?bp:b));toast("Proposal type saved!");setSelBP(null);}}/>
  <Btn v="o" ch="Cancel" onClick={()=>setSelBP(null)}/>
  </div>
  </Card>
  <div>
  <Card sx={{padding:22,marginBottom:14}}>
  <div style={{fontSize:14,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontFamily:D,marginBottom:12}}>Client Preview</div>
  <div style={{fontSize:13,color:br,fontFamily:D,marginBottom:14}}>This is roughly how packages will appear to your client:</div>
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
  {pkgs.filter(p=>bp.pkgIds.includes(p.id)).map(p=><div key={p.id} style={{border:"1px solid "+bo,borderRadius:3,overflow:"hidden"}}>
  {(p.image_url||pkgImages[p.id])&&<img src={p.image_url||pkgImages[p.id]} alt={p.name} style={{width:"100%",height:120,objectFit:"cover"}}/>}
  {!(p.image_url||pkgImages[p.id])&&<div style={{height:80,background:"#f5f0f0",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontFamily:D,fontSize:13,color:tl}}>No photo — upload in Packages tab</div></div>}
  <div style={{padding:"12px 14px"}}>
  <div style={{fontFamily:D,fontSize:16,color:es,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3}}>{p.name}</div>
  <div style={{fontFamily:D,fontSize:18,color:es,marginBottom:4}}>${p.price.toLocaleString()}</div>
  <div style={{fontSize:13,color:br,fontFamily:D}}>{p.desc}</div>
  </div>
  </div>)}
  </div>
  </Card>
  </div>
  </div>
  </div>;
 }
 return<div className="fi">
 <H2 action={<Btn v="m" ch="+ New Proposal Type" onClick={()=>{const nb={id:Date.now().toString(),name:"New Proposal",description:"",sessionType:"Family",location:"any",pkgIds:[],addonIds:[],active:true};setBookingProposalTypes(bps=>[...bps,nb]);setSelBP(nb);}}/>}>Booking Proposals</H2>
 <div style={{marginBottom:18,padding:"16px 20px",background:"#fdf9f9",border:"1px solid "+bo,borderRadius:3}}>
 <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:4}}>How it works</div>
 <div style={{fontSize:14,color:br,fontFamily:D,lineHeight:1.8}}>Create different proposal types for different session types (Family Beach, Portrait, Engagement, etc). Each type shows different packages with their photos. To add photos to packages, go to Packages and click Edit on any package.</div>
 </div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
 {bookingProposalTypes.map(bp=><Card hover key={bp.id} sx={{padding:22,position:"relative",cursor:"pointer"}} onClick={()=>setSelBP({...bp})}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
 <div>
 <div style={{fontFamily:D,fontSize:20,color:es}}>{bp.name}</div>
 <div style={{fontSize:14,color:br,fontFamily:D,marginTop:3}}>{bp.sessionType} · {bp.pkgIds.length} packages · {bp.addonIds.length} add-ons</div>
 </div>
 <Tag color={bp.active?"green":"gray"} ch={bp.active?"Active":"Draft"}/>
 </div>
 <div style={{fontSize:14,color:br,fontFamily:D,marginBottom:12}}>{bp.description}</div>
 <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
 {pkgs.filter(p=>bp.pkgIds.includes(p.id)).map(p=><div key={p.id} style={{fontSize:12,fontFamily:D,color:es,background:"#fdf9f9",border:"1px solid "+bo,borderRadius:2,padding:"3px 10px"}}>{p.name}</div>)}
 </div>
 </Card>)}
 </div>
 </div>;
 };

 const map={dashboard,leads,calendar,invoices,workflows,scheduler,galleries,portal,settings};
 const renderTab=()=>{
 if(tab==="clients")return selC?clientDetail():clientsList();
 if(tab==="emails")return emailsTab();
 if(tab==="packages")return packagesTab();
 if(tab==="proposals")return bookingProposalsTab();
 if(tab==="contracts")return contracts();
 if(tab==="agent")return agentSettingsTab();
 if(tab==="locations")return locationsTab();
 if(tab==="questionnaires")return questionnairesTab();
 return(map[tab]||dashboard)();
 };

 return<>
 <style>{css}</style>
 <div style={{display:"flex",minHeight:"100vh",background:"#fff",fontFamily:D}}>
 <div className="no-print">{sidebar()}</div>
 <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:"#fff"}}>
 <div className="no-print" style={{background:wh,borderBottom:`1px solid ${bo}`,padding:"10px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
 <div style={{fontFamily:D,fontSize:17,color:es,fontWeight:400}}>{NAV.find(n=>n.id===tab)?.i} {NAV.find(n=>n.id===tab)?.l}</div>
 <div style={{display:"flex",alignItems:"center",gap:11}}>
 <div style={{fontSize:13,color:br,fontFamily:D}}> Deltona, FL</div>
 <div style={{width:28,height:28,borderRadius:"50%",background:es,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:D,fontSize:9,color:go,fontWeight:700}}>MC</span></div>
 </div>
 </div>
 <div style={{flex:1,overflowY:"auto",padding:"32px 36px"}}>{renderTab()}</div>
 </div>
 {modal==="nc"&&addClientModal()}
 {aiModal&&aiEmailModal()}
 {agentModal&&agentModalUI()}
 {reviewModal&&reviewModalUI()}
 {notif&&<div style={{position:"fixed",bottom:20,right:20,background:"#444",color:"#fff",padding:"11px 22px",borderRadius:2,fontSize:15,fontFamily:D,boxShadow:"0 4px 20px rgba(0,0,0,.15)",zIndex:9999,display:"flex",alignItems:"center",gap:8,letterSpacing:"0.05em"}}><span></span>{notif}</div>}
 </div>
 </>
}
