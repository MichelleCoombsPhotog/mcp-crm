import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://cqtgwqovtyoqkjfyczpz.supabase.co";
const SB_KEY = "sb_publishable_sJ9AKzaPHzNxCtz61bFjSA_GpYyINmh";
const sb = createClient(SB_URL, SB_KEY);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#fff;font-family:'Cormorant Garamond',serif;color:#444444;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .35s ease forwards}
input,textarea,select{font-family:'Cormorant Garamond',serif;color:#444444;font-size:18px;}
input:focus,textarea:focus,select:focus{outline:none;border-color:#444444!important;}
.btn:hover{background:#e8ceca!important;cursor:pointer;}
.btn{transition:background .18s;}
.pkg-card:hover{border-color:#444444!important;cursor:pointer;}
.pkg-card{transition:all .18s;}
.slot-row:hover{background:#faf4f4!important;cursor:pointer;}
.slot-row{transition:background .15s;}
.day:hover{background:#f0dedc!important;cursor:pointer;}
.day-taken{text-decoration:line-through;color:#ccc!important;cursor:default!important;}
.day-taken:hover{background:transparent!important;cursor:default!important;}
.day-past{color:#ddd!important;cursor:default!important;}
.day-past:hover{background:transparent!important;}
.day-selected{background:#444444!important;color:#fff!important;}
.addon-row:hover{border-color:#444!important;cursor:pointer;}
.addon-row{transition:all .15s;}
`;

const D = "'Cormorant Garamond',serif";
const tx = "#444444";
const lt = "#888888";
const pk = "#F0DEDC";
const bdr = "#E8D8D6";
const wh = "#ffffff";
const gn = "#5A7A5A";
const rd = "#8B3A3A";

const BEACHES = ["cocoa beach","new smyrna","daytona","st. augustine","canaveral","atlantic beach","flagler","ponce inlet"];
const isBeach = l => BEACHES.some(b => l?.toLowerCase().includes(b));

const getSun = (ds, lat=28.5, lng=-81) => {
  // Calculate in UTC solar time then convert to Eastern time
  // Florida: EST = UTC-5, EDT = UTC-4 (Mar-Nov)
  const dateObj = new Date(ds+"T12:00:00");
  const month = dateObj.getMonth(); // 0-indexed
  const isDST = month >= 2 && month <= 10; // EDT Mar-Nov
  const tzOffset = isDST ? 4 : 5; // hours behind UTC
  const r=Math.PI/180;
  const n=Math.floor((dateObj-new Date(dateObj.getFullYear(),0,0))/86400000);
  const B=360/365*(n-81)*r;
  const EoT=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B);
  // Use actual longitude for solar correction, then apply timezone
  const TC=4*(lng+tzOffset*15)+EoT;
  const dec=23.45*Math.sin(B)*r;
  const HA=Math.acos(-Math.tan(lat*r)*Math.tan(dec))/r;
  const rise=12-HA/15-TC/60;
  const set=12+HA/15-TC/60;
  const fmt=h=>{
    // Normalize to 0-24
    let hh=Math.floor(h), mm=Math.round((h-Math.floor(h))*60);
    if(mm===60){hh+=1;mm=0;}
    const ampm=hh<12||hh===24?"AM":"PM";
    const h12=hh%12||12;
    return`${h12}:${mm.toString().padStart(2,"0")} ${ampm}`;
  };
  return{rs:fmt(rise),ss:fmt(set),rm:Math.round(rise*60),sm:Math.round(set*60)};
};
const m2t=m=>{
  const totalMins=((m%1440)+1440)%1440; // normalize
  const h=Math.floor(totalMins/60), mm=totalMins%60;
  const ampm=h<12||h===24?"AM":"PM";
  const h12=h%12||12;
  return`${h12}:${mm.toString().padStart(2,"0")} ${ampm}`;
};

const PKGS_D = [
  {id:"petite",name:"Petite Session",price:497,dur:25,img:25,desc:"Up to 25 minutes · 25 hand-edited images · Perfect for small families and individuals"},
  {id:"signature",name:"Signature Session",price:629,dur:45,img:40,desc:"Up to 45 minutes · 40 hand-edited images · Our most popular choice",pop:true},
  {id:"extended",name:"Extended Session",price:897,dur:60,img:"ALL",desc:"60 minutes · All edited images · Ideal for larger groups and multiple looks"},
  {id:"large",name:"Large Group",price:0,dur:30,img:"TBD",desc:"27 to 30 people · Custom pricing · Contact for availability"},
];
const ADDONS_D = [
  {id:"raw",name:"Full Raw File Buyout",price:1497,desc:"Every unedited image from your session"},
  {id:"prints",name:"Fine Art Print Set",price:297,desc:"5 archival prints, 8x10, museum quality"},
  {id:"album",name:"Mini Album 6x6",price:197,desc:"20-page fine art album, heirloom quality"},
];
const LOCS = [
  {name:"Cocoa Beach",beach:true,
   vibe:"Wide open shoreline with classic Florida beach energy. Beautiful at both sunrise and sunset.",
   details:"Parking available at Cocoa Beach Pier ($5–$10) and free street parking along A1A. Easy access, popular spot.",
   drive:"About 45 min east of Orlando / Deltona area."},
  {name:"New Smyrna Beach",beach:true,
   vibe:"A quieter, more intimate stretch of coast with natural dunes and golden light. One of Michelle's favorites.",
   details:"Street parking available near Flagler Ave. Some paid lots near the main access points. Less crowded than Cocoa.",
   drive:"About 1 hour from Orlando, 30 min south of Daytona."},
  {name:"Daytona Beach",beach:true,
   vibe:"Wide, flat beach with gorgeous open skies. Sunrise sessions here are especially stunning.",
   details:"Multiple free and paid parking lots along the beachfront. Easy vehicle beach access at certain points.",
   drive:"About 1 hour north of Orlando."},
  {name:"St. Augustine Beach",beach:true,
   vibe:"Historic charm meets coastal beauty. Stunning light, gorgeous piers, and a slightly elevated feel.",
   details:"Parking at St. Augustine Beach Park ($5/hr) or street parking nearby. Worth the drive for the scenery.",
   drive:"About 1.5 hours northeast of Orlando."},
  {name:"Cape Canaveral",beach:true,
   vibe:"Serene, natural stretch of coastline near the space coast. Incredible for golden hour with wide open skies.",
   details:"Free parking at Jetty Park and along the shore. Slightly less crowded than Cocoa Beach.",
   drive:"About 1 hour east of Orlando."},
  {name:"Disney's BoardWalk",beach:false,
   vibe:"Charming lakeside promenade with beautiful architecture, warm lights, and a storybook atmosphere.",
   details:"Parking at Disney's BoardWalk resort. Best sessions around late afternoon to evening for the warm ambient light.",
   drive:"About 30 min from Deltona, 20 min from downtown Orlando. Disney resort area."},
  {name:"Winter Park",beach:false,
   vibe:"Gorgeous tree-lined streets, brick walkways, lush parks and the iconic Park Avenue. Timeless and elevated.",
   details:"Central Park is a stunning backdrop. Free street parking and public lots available. Mead Gardens also beautiful.",
   drive:"About 45 min south of Deltona, right in the heart of the Orlando metro."},
  {name:"Deltona / DeBary Area",beach:false,
   vibe:"Beautiful natural areas close to home — springs, wooded parks, and golden hour fields.",
   details:"Blue Spring State Park, Gemini Springs, and Lyonia Preserve are local favorites. Minimal parking fees.",
   drive:"Local — no drive needed! This is home base."},
  {name:"Orlando Area",beach:false,
   vibe:"Flexible — parks, lakefronts, gardens, and urban backdrops all available. Great for a tailored look.",
   details:"Location specifics determined at booking. Lake Eola, Loch Haven Park, and Kraft Azalea Garden are favorites.",
   drive:"20–40 min from Deltona depending on the specific spot."},
  {name:"Other — describe in notes",beach:false,
   vibe:"Have somewhere special in mind? Michelle loves shooting unique locations. Tell her more in your notes.",
   details:"Discuss location details, access, and parking in the notes field. Custom locations welcome.",
   drive:"Travel time varies. A small travel fee may apply for locations over 60 miles."},
];
const CONTRACT=`PORTRAIT PHOTOGRAPHY AGREEMENT
The Collective | Michelle Coombs Photography

By completing this booking, you agree to the following terms:

1. SERVICES
Portrait photography session as outlined in your selected package. Delivered via Pic-Time gallery within 2 to 3 weeks of your session date.

2. PAYMENT TERMS
A non-refundable $150 retainer is due at booking to reserve your session date. The remaining balance is due 72 hours prior to your session.

3. CANCELLATION AND RESCHEDULING
You may reschedule once with at least 72 hours notice. Cancellations within 72 hours forfeit the retainer. Sessions affected by severe weather may be rescheduled at no charge.

4. WHAT IS INCLUDED
Hand-edited high-resolution images in color and black and white, wardrobe guidance, posing direction, Pic-Time online gallery with unlimited downloads and 1-year backup.

5. COPYRIGHT
The photographer retains full copyright. Client is granted a personal use license for printing and sharing online with photo credit.

6. MODEL RELEASE
By completing this agreement, client grants permission for The Collective to use images for portfolio and marketing purposes. Privacy exceptions must be requested in writing.

7. GOVERNING LAW
This agreement is governed by the laws of the State of Florida.

Questions? hello@michellecoombsphotography.com`;

// --- Reusable UI ---
const Label = ({ch}) => (
  <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8,fontWeight:400}}>{ch}</div>
);

const PrimaryBtn = ({ch,onClick,disabled,full}) => (
  <button className="btn" onClick={onClick} disabled={disabled} style={{
    background:disabled?"#e0e0e0":pk,color:disabled?"#aaa":tx,
    border:"none",borderRadius:2,padding:"14px 36px",
    fontFamily:D,fontSize:18,fontWeight:500,letterSpacing:"0.08em",
    cursor:disabled?"not-allowed":"pointer",
    width:full?"100%":"auto",marginTop:12,
  }}>{ch}</button>
);

const BackBtn = ({onClick}) => (
  <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",color:lt,fontFamily:D,fontSize:16,letterSpacing:"0.08em",marginBottom:28,display:"block"}}>
    Back
  </button>
);

const Divider = () => <div style={{height:"1px",background:bdr,margin:"20px 0"}}/>;

const Progress = ({step,total}) => (
  <div style={{display:"flex",gap:4,marginBottom:36}}>
    {Array.from({length:total},(_,i)=>(
      <div key={i} style={{height:2,flex:1,background:i<step?"#444444":bdr,transition:"background .3s",borderRadius:2}}/>
    ))}
  </div>
);

const Wrap = ({children,step,totalSteps}) => (
  <div style={{minHeight:"100vh",background:wh,display:"flex",flexDirection:"column",alignItems:"center",padding:"48px 20px 100px"}}>
    <style>{css}</style>
    <div style={{width:"100%",maxWidth:600}} className="fu">
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontFamily:D,fontSize:15,color:lt,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:4}}>The Collective</div>
        <div style={{fontFamily:D,fontSize:12,color:"#bbb",letterSpacing:"0.2em",textTransform:"uppercase"}}>Michelle Coombs Photography</div>
      </div>
      {step>0&&step<totalSteps&&<Progress step={step} total={totalSteps-1}/>}
      {children}
    </div>
  </div>
);

// --- Calendar Component ---
const Calendar = ({value, onChange, takenDates}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString("default",{month:"long"});
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();

  const prev = () => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else{setViewMonth(m=>m-1);} };
  const next = () => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else{setViewMonth(m=>m+1);} };

  const fmt = d => `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const isPast = d => new Date(fmt(d)+"T12:00:00") < today;
  const isTaken = d => takenDates.includes(fmt(d));
  const isSelected = d => value === fmt(d);

  return (
    <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <button onClick={prev} style={{background:"none",border:"none",cursor:"pointer",color:tx,fontFamily:D,fontSize:20,padding:"0 8px"}}>&#8249;</button>
        <div style={{fontFamily:D,fontSize:20,color:tx,letterSpacing:"0.05em"}}>{monthName} {viewYear}</div>
        <button onClick={next} style={{background:"none",border:"none",cursor:"pointer",color:tx,fontFamily:D,fontSize:20,padding:"0 8px"}}>&#8250;</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
          <div key={d} style={{textAlign:"center",fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.1em",padding:"4px 0"}}>{d}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
        {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:daysInMonth},(_,i)=>i+1).map(d=>{
          const past=isPast(d),taken=isTaken(d),sel=isSelected(d);
          return(
            <div key={d} className={`day${taken?" day-taken":""}${past&&!taken?" day-past":""}${sel?" day-selected":""}`}
              onClick={()=>!past&&!taken&&onChange(fmt(d))}
              style={{
                aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",
                borderRadius:3,fontFamily:D,fontSize:17,color:tx,
                position:"relative",userSelect:"none",
              }}>
              {d}
              {taken&&<div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:4,height:4,borderRadius:"50%",background:"#ccc"}}/>}
            </div>
          );
        })}
      </div>
      {value&&<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${bdr}`,fontFamily:D,fontSize:16,color:tx,textAlign:"center"}}>
        {new Date(value+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
      </div>}
    </div>
  );
};

// --- Main Proposal Component ---
export default function Proposal() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [pkg, setPkg] = useState("");
  const [loc, setLoc] = useState("");
  const [time, setTime] = useState("");
  const [addons, setAddons] = useState([]);
  const [form, setForm] = useState({first:"",last:"",email:"",phone:"",occasion:"",attending:"",notes:""});
  const [sigName, setSigName] = useState("");
  const [customLoc, setCustomLoc] = useState("");
  const [showCustomLoc, setShowCustomLoc] = useState(false);
  const [signed, setSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pkgList, setPkgList] = useState(PKGS_D);
  const [addonList, setAddonList] = useState(ADDONS_D);
  const [takenDates, setTakenDates] = useState([]);
  const [tokenStatus, setTokenStatus] = useState("loading"); // loading | valid | completed | expired | invalid | missing
  const [tokenRow, setTokenRow] = useState(null);

  const TOTAL_STEPS = 9;

  useEffect(()=>{
    const load = async () => {
      try {
        // Check token first
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if(!token){
          setTokenStatus("missing");
        } else {
          const {data:propRow} = await sb.from("proposals").select("*").eq("token",token).single();
          if(!propRow){
            setTokenStatus("invalid");
          } else if(propRow.status==="completed"){
            setTokenStatus("completed");
          } else if(propRow.status==="revoked"){
            setTokenStatus("invalid");
          } else if(new Date(propRow.expires_at)<new Date()){
            setTokenStatus("expired");
          } else {
            setTokenStatus("valid");
            setTokenRow(propRow);
            // Pre-fill name and email from token row
            setForm(f=>({...f,
              first:propRow.client_first||"",
              last:propRow.client_last||"",
              email:propRow.client_email||"",
            }));
          }
        }

        const [{data:pk},{data:ad},{data:cl}] = await Promise.all([
          sb.from("packages").select("*"),
          sb.from("addons").select("*"),
          sb.from("clients").select("date"),
        ]);
        if(pk?.length) setPkgList(pk.map(p=>({...p,desc:p.description||p.desc||""})));
        if(ad?.length) setAddonList(ad.map(a=>({...a,desc:a.description||a.desc||""})));
        if(cl?.length) setTakenDates(cl.map(c=>c.date).filter(Boolean));
      } catch(e){ console.log(e); setTokenStatus("invalid"); }
    };
    load();
  },[]);

  const selPkg = pkgList.find(p=>p.id===pkg);
  const beach = isBeach(loc);
  const sun = date ? getSun(date) : null;
  const total = (selPkg?.price||0) + addons.reduce((s,id)=>{const a=addonList.find(x=>x.id===id);return s+(a?.price||0);},0);
  const balance = total - 150;

  const getSlots = () => {
    if(!date||!selPkg||!loc) return [];
    const dur = selPkg.dur||45;
    if(beach){
      return [
        {t:m2t(sun.rm-15), label:"Sunrise", ideal:true, note:`15 minutes before sunrise at ${sun.rs}`},
        {t:m2t(sun.sm-dur), label:"Sunset", ideal:true, note:`Session starts ${dur} minutes before sunset at ${sun.ss}`},
      ];
    }
    const slots=[];
    for(let m=sun.rm-10;m<=sun.sm-selPkg.dur;m+=30){
      const isSunrise=m>=sun.rm-10&&m<=sun.rm+30;
      const isSunset=m>=sun.sm-selPkg.dur-20&&m<=sun.sm-selPkg.dur+20;
      const isHarsh=m>sun.rm+60&&m<sun.sm-selPkg.dur-60;
      slots.push({t:m2t(m),ideal:isSunrise||isSunset,harsh:isHarsh,
        label:isSunrise?"Golden Hour — Morning":isSunset?"Golden Hour — Evening":isHarsh?"Midday — Harsh Light":"",
      });
    }
    return slots;
  };

  const nav = s => { window.scrollTo(0,0); setStep(s); };

  const submit = async () => {
    setSubmitting(true);
    try {
      await sb.from("clients").insert([{
        first:form.first, last:form.last, email:form.email, phone:form.phone,
        type:"Family", status:"Booked", date, loc, pkg,
        notes:`Time: ${time}\nOccasion: ${form.occasion}\nAttending: ${form.attending}\nNotes: ${form.notes}`,
        paid:150, bal:balance, gallery:"", signed:true, wf:"s1",
      }]);
      // Mark token as completed — prevents any future use
      if(tokenRow?.token){
        await sb.from("proposals").update({status:"completed",completed_at:new Date().toISOString()}).eq("token",tokenRow.token);
      }
    } catch(e){ console.log(e); }
    setSubmitting(false);
    nav(10);
  };

  // Token guard screens
  if(tokenStatus==="loading") return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"80px 0"}}>
        <div style={{fontFamily:D,fontSize:20,color:lt,fontWeight:300,letterSpacing:"0.05em"}}>Loading your proposal…</div>
      </div>
    </Wrap>
  );

  if(tokenStatus==="missing") return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Booking Proposal</div>
        <div style={{fontFamily:D,fontSize:32,color:tx,fontWeight:300,marginBottom:16}}>Link Required</div>
        <div style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300,lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>
          This proposal requires a personal link sent by Michelle. Please use the link from your email to continue.
        </div>
      </div>
    </Wrap>
  );

  if(tokenStatus==="completed") return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Booking Proposal</div>
        <div style={{fontFamily:D,fontSize:32,color:tx,fontWeight:300,marginBottom:16}}>Already Booked!</div>
        <div style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300,lineHeight:1.7,maxWidth:420,margin:"0 auto",marginBottom:24}}>
          This proposal has already been completed and your session is confirmed. Check your email for your booking details.
        </div>
        <div style={{fontFamily:D,fontSize:15,color:lt,fontWeight:300}}>Questions? hello@michellecoombsphotography.com</div>
      </div>
    </Wrap>
  );

  if(tokenStatus==="expired") return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Booking Proposal</div>
        <div style={{fontFamily:D,fontSize:32,color:tx,fontWeight:300,marginBottom:16}}>This Link Has Expired</div>
        <div style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300,lineHeight:1.7,maxWidth:420,margin:"0 auto",marginBottom:24}}>
          Your proposal link is no longer active. Please reach out to Michelle for a new link.
        </div>
        <div style={{fontFamily:D,fontSize:15,color:lt,fontWeight:300}}>hello@michellecoombsphotography.com</div>
      </div>
    </Wrap>
  );

  if(tokenStatus==="invalid") return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Booking Proposal</div>
        <div style={{fontFamily:D,fontSize:32,color:tx,fontWeight:300,marginBottom:16}}>Invalid Link</div>
        <div style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300,lineHeight:1.7,maxWidth:420,margin:"0 auto",marginBottom:24}}>
          This link is not valid. Please use the link Michelle sent you directly, or contact her for a new one.
        </div>
        <div style={{fontFamily:D,fontSize:15,color:lt,fontWeight:300}}>hello@michellecoombsphotography.com</div>
      </div>
    </Wrap>
  );

  // Step 0 — Welcome
  if(step===0) return (
    <Wrap step={0} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"20px 0 32px"}}>
        <div style={{width:1,height:48,background:bdr,margin:"0 auto 36px"}}/>
        <h1 style={{fontFamily:D,fontSize:52,color:tx,fontWeight:300,lineHeight:1.1,marginBottom:16}}>
          Let's Make It<br/><em style={{fontStyle:"italic",fontWeight:400}}>Official</em>
        </h1>
        <p style={{fontFamily:D,fontSize:20,color:lt,lineHeight:1.7,maxWidth:400,margin:"0 auto 36px",fontWeight:300}}>
          You're just a few steps away from locking in your session. This takes about 5 minutes.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:320,margin:"0 auto 40px",textAlign:"left"}}>
          {["Choose your date","Select your package","Pick your location and time","Sign your contract","Pay your $150 retainer"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:pk,color:tx,fontFamily:D,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
              <span style={{fontFamily:D,fontSize:18,color:tx,fontWeight:300}}>{s}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn ch="Get Started" onClick={()=>nav(1)}/>
        <div style={{marginTop:20,fontFamily:D,fontSize:15,color:lt}}>
          Questions? <a href="mailto:hello@michellecoombsphotography.com" style={{color:tx}}>hello@michellecoombsphotography.com</a>
        </div>
      </div>
    </Wrap>
  );

  // Step 10 — Confirmed
  if(step===10) return (
    <Wrap step={10} totalSteps={TOTAL_STEPS}>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:pk,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px",fontFamily:D,fontSize:22,color:tx}}>✓</div>
        <h2 style={{fontFamily:D,fontSize:44,color:tx,fontWeight:300,marginBottom:14}}>You're Officially Booked</h2>
        <p style={{fontFamily:D,fontSize:20,color:lt,lineHeight:1.7,maxWidth:400,margin:"0 auto 32px",fontWeight:300}}>
          So excited to work with you, {form.first}! Check your email for your confirmation and next steps.
        </p>
        <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:24,textAlign:"left",marginBottom:24}}>
          {[["Date",new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})],["Location",loc],["Package",selPkg?.name],["Time",time],["Retainer Paid","$150"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${bdr}`}}>
              <span style={{fontFamily:D,fontSize:17,color:lt,fontWeight:300}}>{l}</span>
              <span style={{fontFamily:D,fontSize:17,color:tx}}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{fontFamily:D,fontSize:16,color:lt,fontWeight:300}}>Your gallery will be delivered within 2 to 3 weeks via Pic-Time.</p>
      </div>
    </Wrap>
  );

  return (
    <Wrap step={step} totalSteps={TOTAL_STEPS}>

      {/* Step 1 — Date */}
      {step===1&&<div className="fu">
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Choose Your Date</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:24,fontWeight:300,lineHeight:1.6}}>
          Dates with a strikethrough are already reserved. Select any open date to continue.
        </p>
        <Calendar value={date} onChange={setDate} takenDates={takenDates}/>
        <div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(2)} disabled={!date}/>
        </div>
      </div>}

      {/* Step 2 — Package */}
      {step===2&&<div className="fu">
        <BackBtn onClick={()=>nav(1)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Choose Your Package</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:24,fontWeight:300,lineHeight:1.6}}>
          All packages include hand-edited images delivered through your private Pic-Time gallery.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:8}}>
          {pkgList.map(p=>(
            <div key={p.id} className="pkg-card" onClick={()=>setPkg(p.id)}
              style={{borderRadius:4,border:`1.5px solid ${pkg===p.id?"#444444":bdr}`,
                background:pkg===p.id?"#faf7f7":wh,position:"relative",overflow:"hidden"}}>
              {p.pop&&<div style={{position:"absolute",top:12,right:12,background:pk,color:tx,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 14px",fontFamily:D,zIndex:2}}>Most Popular</div>}
              {(p.image_url||p.img_url)&&<div style={{width:"100%",height:200,overflow:"hidden",borderBottom:`1px solid ${bdr}`}}>
                <img src={p.image_url||p.img_url} alt={p.name}
                  style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
              </div>}
              <div style={{padding:"20px 22px 22px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{flex:1,paddingRight:16}}>
                    <div style={{fontFamily:D,fontSize:24,color:tx,marginBottom:6}}>{p.name}</div>
                    <div style={{fontFamily:D,fontSize:17,color:lt,lineHeight:1.7,fontWeight:300,marginBottom:12}}>{p.desc||p.description||""}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <span style={{fontFamily:D,fontSize:14,background:pk,color:tx,padding:"3px 12px",borderRadius:2}}>{p.dur} min</span>
                      <span style={{fontFamily:D,fontSize:14,background:pk,color:tx,padding:"3px 12px",borderRadius:2}}>{p.img||p.num_images||"—"} images</span>
                      <span style={{fontFamily:D,fontSize:14,background:"#f5f5f5",color:lt,padding:"3px 12px",borderRadius:2}}>Pic-Time gallery included</span>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:D,fontSize:32,color:p.price?tx:lt,fontWeight:300}}>{p.price?`$${p.price.toLocaleString()}`:"Contact"}</div>
                    {pkg===p.id&&<div style={{fontFamily:D,fontSize:14,color:gn,marginTop:4,letterSpacing:"0.05em"}}>Selected</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(3)} disabled={!pkg}/>
        </div>
      </div>}

      {/* Step 3 — Location */}
      {step===3&&<div className="fu">
        <BackBtn onClick={()=>nav(2)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Choose Your Location</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:24,fontWeight:300,lineHeight:1.6}}>
          Your location determines what times are available for your session.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
          {LOCS.map(l=>(
            <div key={l.name} className="pkg-card" onClick={()=>setLoc(l.name)}
              style={{padding:"18px 22px",borderRadius:4,border:`1.5px solid ${loc===l.name?"#444444":bdr}`,
                background:loc===l.name?"#faf7f7":wh,position:"relative"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1,paddingRight:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
                    <div style={{fontFamily:D,fontSize:20,color:tx}}>{l.name}</div>
                    <span style={{fontFamily:D,fontSize:12,background:l.beach?pk:"#f0f0f0",color:l.beach?tx:lt,
                      padding:"2px 10px",borderRadius:2,letterSpacing:"0.08em",textTransform:"uppercase",flexShrink:0}}>
                      {l.beach?"Beach":"Outdoor"}
                    </span>
                  </div>
                  <div style={{fontFamily:D,fontSize:15,color:lt,fontWeight:300,lineHeight:1.6,marginBottom:6,fontStyle:"italic"}}>
                    {l.vibe}
                  </div>
                  {loc===l.name&&<div style={{marginTop:8,paddingTop:10,borderTop:`1px solid ${bdr}`}}>
                    <div style={{fontFamily:D,fontSize:14,color:tx,marginBottom:4,lineHeight:1.7}}>{l.details}</div>
                    <div style={{fontFamily:D,fontSize:13,color:lt,marginTop:4}}>{l.drive}</div>
                  </div>}
                </div>
                {loc===l.name&&<div style={{fontFamily:D,fontSize:14,color:gn,letterSpacing:"0.05em",flexShrink:0,marginLeft:12,marginTop:4}}>Selected</div>}
              </div>
            </div>
          ))}
        </div>
        <div onClick={()=>setShowCustomLoc(!showCustomLoc)}
          style={{padding:"18px 22px",borderRadius:4,border:`1.5px solid ${showCustomLoc?"#444444":bdr}`,
            background:showCustomLoc?"#faf7f7":wh,cursor:"pointer",marginTop:4}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontFamily:D,fontSize:20,color:tx,marginBottom:4}}>My location isn't listed</div>
              <div style={{fontFamily:D,fontSize:15,color:lt,fontWeight:300,fontStyle:"italic"}}>Resort, Airbnb, private property, or somewhere special</div>
            </div>
            {showCustomLoc&&<div style={{fontFamily:D,fontSize:14,color:gn,letterSpacing:"0.05em",flexShrink:0,marginLeft:12}}>Selected</div>}
          </div>
          {showCustomLoc&&<div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${bdr}`}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>Enter your address or location name</div>
            <input value={customLoc} onChange={e=>{setCustomLoc(e.target.value);setLoc(e.target.value);}}
              placeholder="e.g. 1234 Gulf Blvd, Clearwater Beach, FL or The Grand Bohemian Hotel Orlando"
              style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:2,padding:"12px 16px",fontFamily:D,fontSize:16,color:tx,outline:"none"}}/>
            <div style={{fontSize:13,color:lt,fontFamily:D,marginTop:8,lineHeight:1.6}}>
              Please include the full address if possible so Michelle can plan the best time and lighting for your session.
            </div>
            {customLoc&&<a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(customLoc)} target="_blank" rel="noreferrer"
              style={{display:"inline-block",marginTop:10,background:pk,color:tx,fontFamily:D,fontSize:13,padding:"6px 16px",borderRadius:2,textDecoration:"none",letterSpacing:"0.05em",border:`1px solid ${bdr}`}}>
              Verify on Google Maps
            </a>}
          </div>}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(4)} disabled={!loc}/>
        </div>
      </div>}

      {/* Step 4 — Time */}
      {step===4&&<div className="fu">
        <BackBtn onClick={()=>nav(3)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Choose Your Time</h2>
        {sun&&<div style={{fontFamily:D,fontSize:17,color:lt,marginBottom:20,fontWeight:300,lineHeight:1.6}}>
          {beach
            ? "Beach sessions are available at sunrise and sunset only — these are the most flattering and magical times of day near the water."
            : "All times are shown below. Golden hour sessions — morning and evening — are strongly recommended for the best light."}
        </div>}
        {sun&&<div style={{background:"#faf7f7",borderRadius:4,padding:"12px 16px",marginBottom:20,border:`1px solid ${bdr}`,display:"flex",gap:32}}>
          <div><div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:2}}>Sunrise</div><div style={{fontFamily:D,fontSize:20,color:tx}}>{sun.rs}</div></div>
          <div><div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:2}}>Sunset</div><div style={{fontFamily:D,fontSize:20,color:tx}}>{sun.ss}</div></div>
        </div>}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
          {getSlots().map((s,i)=>(
            <div key={i} className="slot-row" onClick={()=>setTime(s.t)}
              style={{padding:"16px 20px",borderRadius:4,border:`1.5px solid ${time===s.t?"#444444":s.ideal?pk:s.harsh?"#f0e8e0":bdr}`,
                background:time===s.t?"#444444":s.ideal?"#fdf9f9":s.harsh?"#fffaf5":wh,
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:D,fontSize:24,color:time===s.t?wh:tx}}>{s.t}</div>
                {s.label&&<div style={{fontFamily:D,fontSize:15,color:time===s.t?"rgba(255,255,255,.7)":s.harsh?"#B8860B":lt,fontWeight:300,marginTop:2}}>{s.label}</div>}
                {s.note&&<div style={{fontFamily:D,fontSize:14,color:time===s.t?"rgba(255,255,255,.6)":lt,fontWeight:300,marginTop:1}}>{s.note}</div>}
              </div>
              <div style={{fontFamily:D,fontSize:14,color:time===s.t?wh:s.ideal?gn:s.harsh?"#B8860B":lt,letterSpacing:"0.05em",flexShrink:0,marginLeft:16}}>
                {time===s.t?"Selected":s.ideal?"Recommended":s.harsh?"Not Recommended":""}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(5)} disabled={!time}/>
        </div>
      </div>}

      {/* Step 5 — Add-Ons */}
      {step===5&&<div className="fu">
        <BackBtn onClick={()=>nav(4)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Add-Ons</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:24,fontWeight:300,lineHeight:1.6}}>
          Enhance your session with these optional additions. You can always skip these and add them later.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
          {addonList.map(a=>{const sel=addons.includes(a.id);return(
            <div key={a.id} className="addon-row" onClick={()=>setAddons(as=>sel?as.filter(x=>x!==a.id):[...as,a.id])}
              style={{padding:"16px 20px",borderRadius:4,border:`1.5px solid ${sel?"#444444":bdr}`,
                background:sel?"#faf7f7":wh,display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:20,height:20,borderRadius:3,border:`1.5px solid ${sel?"#444444":"#ccc"}`,
                background:sel?"#444444":wh,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {sel&&<span style={{color:wh,fontSize:12,lineHeight:1}}>✓</span>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:D,fontSize:20,color:tx}}>{a.name}</div>
                <div style={{fontFamily:D,fontSize:16,color:lt,fontWeight:300}}>{a.desc||a.description}</div>
              </div>
              <div style={{fontFamily:D,fontSize:24,color:tx,flexShrink:0}}>${a.price.toLocaleString()}</div>
            </div>
          )})}
        </div>
        <Divider/>
        <div style={{marginBottom:6,display:"flex",justifyContent:"space-between"}}>
          <span style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300}}>{selPkg?.name}</span>
          <span style={{fontFamily:D,fontSize:20,color:tx}}>${selPkg?.price?.toLocaleString()}</span>
        </div>
        {addons.map(id=>{const a=addonList.find(x=>x.id===id);return a?(
          <div key={id} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300}}>{a.name}</span>
            <span style={{fontFamily:D,fontSize:20,color:tx}}>+${a.price.toLocaleString()}</span>
          </div>
        ):null})}
        <Divider/>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontFamily:D,fontSize:20,color:tx}}>Total</span>
          <span style={{fontFamily:D,fontSize:32,color:tx,fontWeight:300}}>${total.toLocaleString()}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <span style={{fontFamily:D,fontSize:17,color:lt,fontWeight:300}}>Retainer due today</span>
          <span style={{fontFamily:D,fontSize:20,color:gn}}>$150</span>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(6)}/>
        </div>
      </div>}

      {/* Step 6 — About You */}
      {step===6&&<div className="fu">
        <BackBtn onClick={()=>nav(5)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>About You</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:28,fontWeight:300,lineHeight:1.6}}>
          Tell me a little about yourself and your group so I can make your session perfect.
        </p>
        <div style={{display:"flex",gap:14,marginBottom:16}}>
          <div style={{flex:1}}>
            <Label ch="First Name"/>
            <input value={form.first} onChange={e=>setForm({...form,first:e.target.value})} placeholder="Sarah"
              style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh}}/>
          </div>
          <div style={{flex:1}}>
            <Label ch="Last Name"/>
            <input value={form.last} onChange={e=>setForm({...form,last:e.target.value})} placeholder="Mitchell"
              style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh}}/>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <Label ch="Email"/>
          <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="sarah@email.com"
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh}}/>
        </div>
        <div style={{marginBottom:24}}>
          <Label ch="Phone"/>
          <input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="407-555-0100"
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh}}/>
        </div>
        <Divider/>
        <p style={{fontFamily:D,fontSize:22,color:tx,marginBottom:20,fontStyle:"italic",fontWeight:300}}>A little more about your session</p>
        <div style={{marginBottom:16}}>
          <Label ch="Tell me about who is attending and a little about yourselves"/>
          <textarea value={form.attending} onChange={e=>setForm({...form,attending:e.target.value})} rows={3}
            placeholder="Family of 4, two kids ages 3 and 7. We love the outdoors and are pretty relaxed in front of the camera!"
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh,resize:"vertical",lineHeight:1.5}}/>
        </div>
        <div style={{marginBottom:16}}>
          <Label ch="Any special occasions?"/>
          <input value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})} placeholder="Birthday, anniversary, pregnancy announcement..."
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh}}/>
        </div>
        <div style={{marginBottom:8}}>
          <Label ch="Anything else I should know?"/>
          <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3}
            placeholder="Mobility needs, pets, outfit changes, specific vision for the session..."
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:wh,resize:"vertical",lineHeight:1.5}}/>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue" onClick={()=>nav(7)} disabled={!form.first||!form.email}/>
        </div>
      </div>}

      {/* Step 7 — Contract */}
      {step===7&&<div className="fu">
        <BackBtn onClick={()=>nav(6)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Review and Sign</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:20,fontWeight:300,lineHeight:1.6}}>
          Please review your session details and agreement before signing.
        </p>

        <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:24,marginBottom:24,background:"#fdf9f9"}}>
          <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:16}}>Your Session Summary</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
            {[
              ["Date", new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})],
              ["Time", time],
              ["Location", loc],
              ["Package", selPkg?.name],
              ["Session Length", `${selPkg?.dur} minutes`],
              ["Images Included", `${selPkg?.img} hand-edited images`],
              ...(addons.length?[["Add-Ons", addonList.filter(a=>addons.includes(a.id)).map(a=>a.name).join(", ")]]:[]),
              ["Session Total", `$${total.toLocaleString()}`],
              ["Retainer Due Today", "$150"],
              ["Balance Due 72 hrs Before Session", `$${balance.toLocaleString()}`],
            ].map(([l,v])=>(
              <div key={l} style={{padding:"9px 0",borderBottom:`1px solid ${bdr}`}}>
                <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>{l}</div>
                <div style={{fontFamily:D,fontSize:18,color:tx,fontWeight:300}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>Photography Agreement</div>
        <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:24,marginBottom:24,maxHeight:300,overflowY:"auto",background:"#fafafa"}}>
          <pre style={{fontFamily:D,fontSize:16,color:tx,lineHeight:1.8,whiteSpace:"pre-wrap",fontWeight:300}}>{CONTRACT}</pre>
        </div>
        <div style={{marginBottom:20}}>
          <Label ch="Type your full name to sign"/>
          <input value={sigName} onChange={e=>setSigName(e.target.value)} placeholder="Sarah Mitchell"
            style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:24,fontFamily:D,color:tx,fontStyle:"italic",background:wh}}/>
          {sigName&&<div style={{fontFamily:D,fontSize:15,color:lt,marginTop:7,fontStyle:"italic",fontWeight:300}}>
            Signed as "{sigName}" on {new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
          </div>}
        </div>
        <div onClick={()=>setSigned(!signed)}
          style={{display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",padding:"16px",
            border:`1.5px solid ${signed?"#444444":bdr}`,borderRadius:4,background:signed?"#faf7f7":wh,marginBottom:8}}>
          <div style={{width:20,height:20,borderRadius:3,border:`1.5px solid ${signed?"#444444":"#ccc"}`,
            background:signed?"#444444":wh,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
            {signed&&<span style={{color:wh,fontSize:12}}>✓</span>}
          </div>
          <span style={{fontFamily:D,fontSize:18,color:tx,lineHeight:1.6,fontWeight:300}}>
            I have read and agree to the Portrait Photography Agreement, including the payment terms, cancellation policy, and copyright terms.
          </span>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <PrimaryBtn ch="Continue to Payment" onClick={()=>nav(8)} disabled={!signed||!sigName}/>
        </div>
      </div>}

      {/* Step 8 — Payment */}
      {step===8&&<div className="fu">
        <BackBtn onClick={()=>nav(7)}/>
        <h2 style={{fontFamily:D,fontSize:38,color:tx,fontWeight:300,marginBottom:8}}>Secure Your Date</h2>
        <p style={{fontFamily:D,fontSize:18,color:lt,marginBottom:24,fontWeight:300,lineHeight:1.6}}>
          A $150 non-refundable retainer reserves your date. The remaining balance of ${balance.toLocaleString()} is due 72 hours before your session.
        </p>
        <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:24,marginBottom:20}}>
          <div style={{fontFamily:D,fontSize:22,color:tx,fontWeight:300,marginBottom:16,letterSpacing:"0.03em"}}>Booking Summary</div>
          {[
            ["Date", new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})],
            ["Location", loc],
            ["Package", selPkg?.name],
            ["Time", time],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${bdr}`}}>
              <span style={{fontFamily:D,fontSize:17,color:lt,fontWeight:300}}>{l}</span>
              <span style={{fontFamily:D,fontSize:17,color:tx}}>{v}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 8px"}}>
            <span style={{fontFamily:D,fontSize:18,color:lt,fontWeight:300}}>Session Total</span>
            <span style={{fontFamily:D,fontSize:24,color:tx,fontWeight:300}}>${total.toLocaleString()}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:pk,borderRadius:3}}>
            <span style={{fontFamily:D,fontSize:20,color:tx}}>Due Today</span>
            <span style={{fontFamily:D,fontSize:26,color:tx,fontWeight:300}}>$150</span>
          </div>
        </div>
        <div style={{border:`1px solid ${bdr}`,borderRadius:4,padding:24,marginBottom:20,background:"#fafafa"}}>
          <div style={{fontFamily:D,fontSize:13,color:lt,fontWeight:300,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:14}}>Card Details</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div>
              <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>Name on Card</div>
              <input placeholder={`${form.first} ${form.last}`} style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:"#fff"}}/>
            </div>
            <div>
              <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>Card Number</div>
              <input placeholder="•••• •••• •••• ••••" style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:"#fff"}}/>
            </div>
            <div style={{display:"flex",gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>Expiry</div>
                <input placeholder="MM / YY" style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:"#fff"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:D,fontSize:13,color:lt,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>CVV</div>
                <input placeholder="•••" style={{width:"100%",border:`1px solid ${bdr}`,borderRadius:3,padding:"11px 14px",fontSize:18,fontFamily:D,color:tx,background:"#fff"}}/>
              </div>
            </div>
          </div>
          <div style={{marginTop:14,padding:"10px 14px",background:"#fff",borderRadius:2,border:`1px solid ${bdr}`,fontFamily:D,fontSize:14,color:lt,fontWeight:300}}>
            Secure payment via Square · $150 retainer charged today · Balance due 72 hrs before session
          </div>
        </div>
        <PrimaryBtn ch={submitting?"Processing...":"Complete Booking"} onClick={submit} disabled={submitting} full/>
        <div style={{fontFamily:D,fontSize:15,color:lt,textAlign:"center",marginTop:14,fontWeight:300}}>
          Your information is secure and encrypted
        </div>
      </div>}

    </Wrap>
  );
}
