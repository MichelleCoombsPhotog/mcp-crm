import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://cqtgwqovtyoqkjfyczpz.supabase.co";
const SB_KEY = "sb_publishable_sJ9AKzaPHzNxCtz61bFjSA_GpYyINmh";
const sb = createClient(SB_URL, SB_KEY);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;font-family:'Jost',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.fade-up{animation:fadeUp .4s ease forwards}
.fade-in{animation:fadeIn .3s ease forwards}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}.pulse{animation:pulse 1.5s infinite}
input:focus,textarea:focus,select:focus{outline:none;border-color:#2C1810!important}
input,textarea,select{font-family:'Jost',sans-serif}
.slot:hover{background:#f5f5f5!important;cursor:pointer}
.slot-ideal:hover{background:#f0ece8!important;cursor:pointer}
.pkg:hover{border-color:#2C1810!important;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
.pkg{transition:all .2s ease}
.btn-hover:hover{background:#1a0e08!important}
.btn-hover{transition:background .18s ease}
.check:hover{border-color:#2C1810!important}
`;

const D = "'Cormorant Garamond',serif";
const U = "'Jost',sans-serif";
const es = "#2C1810", dk = "#5C4033", br = "#8B6F5C", lt = "#C4B5A5", cr = "#FAF7F4", bo = "#E8DDD0";
const go = "#C9A84C", gn = "#4A7A4A", rd = "#8B3A3A", gnl = "#EBF2EB";

const BEACHES = ["cocoa beach","new smyrna","daytona","st. augustine","canaveral","atlantic beach","flagler","ponce inlet","apollo beach","clearwater","st pete","siesta key","honeymoon island"];
const isBeach = l => BEACHES.some(b => l?.toLowerCase().includes(b));

const getSun = (ds, lat=28.5, lng=-81) => {
  const r=Math.PI/180, d=new Date(ds+"T12:00:00"), n=Math.floor((d-new Date(d.getFullYear(),0,0))/86400000);
  const B=360/365*(n-81)*r, EoT=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B), TC=4*lng+EoT, dec=23.45*Math.sin(B)*r;
  const HA=Math.acos(-Math.tan(lat*r)*Math.tan(dec))/r, rise=12-HA/15-TC/60, set=12+HA/15-TC/60;
  const fmt=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return`${hh%12||12}:${mm.toString().padStart(2,"0")} ${hh<12?"AM":"PM"}`};
  return{rs:fmt(rise),ss:fmt(set),rm:Math.round(rise*60),sm:Math.round(set*60)};
};
const m2t = m => {const h=Math.floor(m/60),mm=m%60;return`${h%12||12}:${mm.toString().padStart(2,"0")} ${h<12?"AM":"PM"}`};

const PKGS = [
  {id:"petite",name:"Petite Session",price:497,dur:25,img:25,desc:"Up to 25 minutes · 25 hand-edited images · Perfect for small families & individuals"},
  {id:"signature",name:"Signature Session",price:629,dur:45,img:40,desc:"Up to 45 minutes · 40 hand-edited images · Our most popular choice",pop:true},
  {id:"extended",name:"Extended Session",price:897,dur:60,img:"ALL",desc:"60 minutes · ALL edited images · For larger groups & multiple looks"},
  {id:"large",name:"Large Group",price:0,dur:30,img:"TBD",desc:"27–30 people · Custom pricing · Contact for availability"},
];
const ADDONS = [
  {id:"raw",name:"Full Raw File Buyout",price:1497,desc:"Every unedited image from your session"},
  {id:"prints",name:"Fine Art Print Set",price:297,desc:"5 archival prints, 8×10, museum-quality"},
  {id:"album",name:"Mini Album 6×6",price:197,desc:"20-page fine art album, heirloom quality"},
];

const LOCATIONS = [
  {name:"Cocoa Beach",beach:true},{name:"New Smyrna Beach",beach:true},{name:"Daytona Beach",beach:true},
  {name:"St. Augustine Beach",beach:true},{name:"Cape Canaveral",beach:true},
  {name:"Disney's BoardWalk",beach:false},{name:"Winter Park",beach:false},
  {name:"Deltona / DeBary Area",beach:false},{name:"Orlando Area",beach:false},
  {name:"Other — I'll describe in notes",beach:false},
];

const CONTRACT = `PORTRAIT PHOTOGRAPHY AGREEMENT
The Collective | Michelle Coombs Photography

By completing this booking, you agree to the following terms:

1. SERVICES
Portrait photography session as outlined in your selected package. Delivered via Pic-Time gallery within 2–3 weeks of your session date.

2. PAYMENT TERMS
A non-refundable $150 retainer is due at booking to reserve your session date. The remaining balance is due 72 hours prior to your session.

3. CANCELLATION & RESCHEDULING
You may reschedule once with at least 72 hours notice. Cancellations within 72 hours forfeit the retainer. Sessions affected by severe weather may be rescheduled at no charge.

4. WHAT'S INCLUDED
Hand-edited high-resolution images (color + black & white), wardrobe guidance, posing direction, Pic-Time online gallery with unlimited downloads and 1-year backup.

5. COPYRIGHT
The photographer retains full copyright. Client is granted a personal use license for printing and sharing online with photo credit.

6. MODEL RELEASE
By completing this agreement, client grants permission for The Collective to use images for portfolio and marketing purposes. Privacy exceptions must be requested in writing.

7. GOVERNING LAW
This agreement is governed by the laws of the State of Florida.

Questions? hello@michellecoombsphotography.com`;

const STEPS = ["Welcome","Date & Location","Time","Package","Add-Ons","About You","Contract","Payment","Confirmed"];

export default function Proposal() {
  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState(null);
  const [addons, setAddons] = useState([]);
  const [date, setDate] = useState("");
  const [loc, setLoc] = useState("");
  const [time, setTime] = useState("");
  const [signed, setSigned] = useState(false);
  const [sigName, setSigName] = useState("");
  const [form, setForm] = useState({first:"",last:"",email:"",phone:"",occasion:"",attending:"",notes:""});
  const [submitting, setSubmitting] = useState(false);
  const [pkgList, setPkgList] = useState(PKGS);
  const [addonList, setAddonList] = useState(ADDONS);

  useEffect(() => {
    const load = async () => {
      const [{data:pk},{data:ad}] = await Promise.all([
        sb.from("packages").select("*"),
        sb.from("addons").select("*"),
      ]);
      if(pk?.length) setPkgList(pk.map(p=>({...p,desc:p.description||""})));
      if(ad?.length) setAddonList(ad.map(a=>({...a,desc:a.description||""})));
    };
    load().catch(()=>{});
  },[]);

  const selPkg = pkgList.find(p=>p.id===pkg);
  const beach = isBeach(loc);
  const sun = date ? getSun(date) : null;

  const getSlots = () => {
    if(!date||!selPkg) return [];
    const dur = selPkg.dur||45;
    if(beach){
      return [
        {t:m2t(sun.rm-15), label:"🌅 Sunrise", ideal:true, note:`${m2t(sun.rm-15)} — 15 min before sunrise`},
        {t:m2t(sun.sm-dur), label:"🌇 Sunset", ideal:true, note:`${m2t(sun.sm-dur)} — starts ${dur} min before sunset`},
      ];
    }
    const slots = [];
    for(let m=sun.rm-10;m<=sun.sm;m+=30){
      const isSunrise = m>=sun.rm-10&&m<=sun.rm+20;
      const isSunset = m>=sun.sm-dur-15&&m<=sun.sm-dur+15;
      const isMidday = m>sun.rm+60&&m<sun.sm-dur-60;
      slots.push({
        t:m2t(m),
        ideal:isSunrise||isSunset,
        harsh:isMidday,
        label:isSunrise?"🌅 Golden Hour":isSunset?"🌇 Golden Hour":isMidday?"☀️ Midday":"",
        note:isMidday?"Harsh light — not recommended":"",
      });
    }
    return slots;
  };

  const total = (selPkg?.price||0) + addons.reduce((s,id)=>{const a=addonList.find(x=>x.id===id);return s+(a?.price||0);},0);
  const balance = total - 150;

  const submit = async () => {
    setSubmitting(true);
    try {
      await sb.from("clients").insert([{
        first: form.first, last: form.last, email: form.email, phone: form.phone,
        type: "Family", status: "Booked", date, loc, pkg,
        notes: `Occasion: ${form.occasion}\nAttending: ${form.attending}\nNotes: ${form.notes}\nTime: ${time}`,
        paid: 150, bal: balance, gallery: "", signed: true, wf: "s1",
      }]);
    } catch(e){ console.log(e); }
    setStep(8);
    setSubmitting(false);
  };

  const nav = (s) => { window.scrollTo(0,0); setStep(s); };

  const Divider = () => <div style={{height:1,background:bo,margin:"20px 0"}}/>;

  const BtnPrimary = ({ch,onClick,disabled}) => (
    <button onClick={onClick} disabled={disabled} className="btn-hover" style={{
      background:disabled?"#ccc":es,color:"#fff",border:"none",borderRadius:4,
      padding:"14px 32px",fontSize:13,fontFamily:U,fontWeight:600,letterSpacing:"0.12em",
      textTransform:"uppercase",cursor:disabled?"not-allowed":"pointer",width:"100%",marginTop:16,
    }}>{ch}</button>
  );

  const BtnBack = ({onClick}) => (
    <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",color:br,fontSize:13,fontFamily:U,display:"flex",alignItems:"center",gap:5,marginBottom:20}}>← Back</button>
  );

  const Progress = () => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:32}}>
      {STEPS.slice(1,-1).map((s,i)=>(
        <div key={s} style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:step>i+1?es:step===i+1?go:bo,transition:"all .3s"}}/>
          {i<STEPS.length-3&&<div style={{width:20,height:1,background:step>i+1?es:bo,transition:"all .3s"}}/>}
        </div>
      ))}
    </div>
  );

  const Wrap = ({children}) => (
    <div style={{minHeight:"100vh",background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 16px 80px"}}>
      <div style={{width:"100%",maxWidth:620}} className="fade-up">
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontFamily:D,fontSize:13,color:br,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6}}>The Collective</div>
          <div style={{fontFamily:D,fontSize:11,color:lt,letterSpacing:"0.15em",textTransform:"uppercase"}}>Michelle Coombs Photography</div>
        </div>
        {step>0&&step<8&&<Progress/>}
        {children}
      </div>
    </div>
  );

  // Step 0 — Welcome
  if(step===0) return <Wrap>
    <style>{css}</style>
    <div style={{textAlign:"center",padding:"20px 0 32px"}}>
      <div style={{width:1,height:60,background:bo,margin:"0 auto 32px"}}/>
      <h1 style={{fontFamily:D,fontSize:42,color:es,fontWeight:400,lineHeight:1.1,marginBottom:16}}>Let's Make It<br/><em>Official</em></h1>
      <p style={{fontFamily:U,fontSize:15,color:br,lineHeight:1.7,maxWidth:420,margin:"0 auto 32px"}}>You're just a few steps away from locking in your session. This should take about 5 minutes.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:340,margin:"0 auto 36px"}}>
        {["Choose your date & location","Select your package","Sign your contract","Pay your $150 retainer"].map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:es,color:"#fff",fontFamily:U,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:600}}>{i+1}</div>
            <span style={{fontFamily:U,fontSize:13,color:dk}}>{s}</span>
          </div>
        ))}
      </div>
      <BtnPrimary ch="Let's Get Started →" onClick={()=>nav(1)}/>
      <p style={{fontFamily:U,fontSize:11,color:lt,marginTop:14}}>Questions? <a href="mailto:hello@michellecoombsphotography.com" style={{color:br}}>hello@michellecoombsphotography.com</a></p>
    </div>
  </Wrap>;

  // Step 8 — Confirmed
  if(step===8) return <Wrap>
    <style>{css}</style>
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{width:56,height:56,borderRadius:"50%",background:gnl,border:`2px solid ${gn}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:22}}>✓</div>
      <h2 style={{fontFamily:D,fontSize:36,color:es,fontWeight:400,marginBottom:12}}>You're Officially Booked!</h2>
      <p style={{fontFamily:U,fontSize:14,color:br,lineHeight:1.7,maxWidth:420,margin:"0 auto 28px"}}>I'm SO excited to work with you, {form.first}! Check your email for your booking confirmation and next steps.</p>
      <div style={{background:cr,borderRadius:8,padding:20,textAlign:"left",marginBottom:24}}>
        {[[" Date",date],[" Location",loc],[" Package",selPkg?.name],[" Time",time],[" Retainer Paid","$150"]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${bo}`}}>
            <span style={{fontFamily:U,fontSize:13,color:br}}>{l}</span>
            <span style={{fontFamily:U,fontSize:13,color:es,fontWeight:500}}>{v}</span>
          </div>
        ))}
      </div>
      <p style={{fontFamily:U,fontSize:12,color:lt}}>Your gallery will be delivered within 2–3 weeks of your session via Pic-Time.</p>
    </div>
  </Wrap>;

  return <Wrap>
    <style>{css}</style>

    {/* Step 1 — Date & Location */}
    {step===1&&<div>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>When & Where</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:28,lineHeight:1.6}}>Choose your preferred session date and location.</p>
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:7}}>Session Date</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es,background:"#fff"}}/>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:7}}>Location</label>
        <select value={loc} onChange={e=>setLoc(e.target.value)}
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:loc?es:lt,background:"#fff"}}>
          <option value="">Select a location…</option>
          {LOCATIONS.map(l=><option key={l.name} value={l.name}>{l.beach?"🏖️":"🌳"} {l.name}</option>)}
        </select>
      </div>
      {loc&&<div style={{background:isBeach(loc)?"#FBF3E0":gnl,borderRadius:6,padding:"10px 14px",fontSize:12,fontFamily:U,color:isBeach(loc)?go:gn,marginBottom:4}}>
        {isBeach(loc)?"🏖️ Beach location — only sunrise & sunset times available":"🌳 Outdoor location — full day available, golden hour recommended"}
      </div>}
      <BtnPrimary ch="Continue →" onClick={()=>nav(2)} disabled={!date||!loc}/>
    </div>}

    {/* Step 2 — Time */}
    {step===2&&<div>
      <BtnBack onClick={()=>nav(1)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>Choose Your Time</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:8,lineHeight:1.6}}>
        {beach?"Beach sessions are only available at sunrise and sunset — the most magical light of the day.":"Available times for your session. Golden hour slots are highly recommended!"}
      </p>
      {sun&&<div style={{background:cr,borderRadius:6,padding:"10px 14px",fontSize:12,fontFamily:U,color:br,marginBottom:20,display:"flex",gap:20}}>
        <span>🌅 Sunrise: <strong style={{color:es}}>{sun.rs}</strong></span>
        <span>🌇 Sunset: <strong style={{color:es}}>{sun.ss}</strong></span>
      </div>}
      {!selPkg&&<div style={{background:"#FFF8E1",borderRadius:6,padding:"10px 14px",fontSize:12,fontFamily:U,color:go,marginBottom:16}}>⚠️ Please select a package first so we can calculate the right start time.</div>}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
        {getSlots().map((s,i)=><div key={i} className={s.ideal?"slot-ideal":"slot"}
          onClick={()=>setTime(s.t)}
          style={{padding:"14px 16px",borderRadius:6,border:`1.5px solid ${time===s.t?es:s.ideal?go:s.harsh?"#F5B942":bo}`,
            background:time===s.t?es:s.ideal?"#FFFBF0":s.harsh?"#FFFBF0":"#fff",
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:D,fontSize:18,color:time===s.t?"#fff":es}}>{s.t}</div>
            {s.label&&<div style={{fontFamily:U,fontSize:11,color:time===s.t?"rgba(255,255,255,.7)":s.harsh?"#C47A00":go,marginTop:2}}>{s.label}</div>}
          </div>
          {s.harsh&&<div style={{fontFamily:U,fontSize:11,color:"#C47A00"}}>Not recommended</div>}
          {s.ideal&&<div style={{fontFamily:U,fontSize:11,color:time===s.t?"rgba(255,255,255,.7)":go}}>✨ Ideal</div>}
          {time===s.t&&<div style={{color:"#fff",fontSize:14}}>✓</div>}
        </div>)}
      </div>
      <BtnPrimary ch="Continue →" onClick={()=>nav(3)} disabled={!time||(!selPkg&&!beach)}/>
    </div>}

    {/* Step 3 — Package */}
    {step===3&&<div>
      <BtnBack onClick={()=>nav(2)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>Choose Your Package</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:24,lineHeight:1.6}}>All packages include hand-edited images delivered via Pic-Time.</p>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:8}}>
        {pkgList.map(p=><div key={p.id} className="pkg" onClick={()=>setPkg(p.id)}
          style={{padding:20,borderRadius:8,border:`1.5px solid ${pkg===p.id?es:bo}`,background:pkg===p.id?"#FAFAFA":"#fff",cursor:"pointer",position:"relative",overflow:"hidden"}}>
          {p.pop&&<div style={{position:"absolute",top:0,right:0,background:go,color:"#fff",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",fontFamily:U,fontWeight:600}}>Most Popular</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontFamily:D,fontSize:20,color:es,marginBottom:3}}>{p.name}</div>
              <div style={{fontFamily:U,fontSize:13,color:br,lineHeight:1.6,marginBottom:8,maxWidth:340}}>{p.desc||p.description}</div>
              <div style={{display:"flex",gap:8}}>
                <span style={{fontFamily:U,fontSize:11,background:cr,color:br,padding:"3px 10px",borderRadius:20}}>{p.dur} min</span>
                <span style={{fontFamily:U,fontSize:11,background:cr,color:br,padding:"3px 10px",borderRadius:20}}>{p.img} images</span>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:16}}>
              <div style={{fontFamily:D,fontSize:26,color:p.price?es:br}}>{p.price?`$${p.price.toLocaleString()}`:"Contact"}</div>
              {pkg===p.id&&<div style={{fontFamily:U,fontSize:11,color:gn,marginTop:4}}>✓ Selected</div>}
            </div>
          </div>
        </div>)}
      </div>
      <BtnPrimary ch="Continue →" onClick={()=>nav(4)} disabled={!pkg}/>
    </div>}

    {/* Step 4 — Add-Ons */}
    {step===4&&<div>
      <BtnBack onClick={()=>nav(3)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>A La Carte</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:24,lineHeight:1.6}}>Enhance your session with these optional add-ons. You can always add these later.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        {addonList.map(a=>{const sel=addons.includes(a.id);return<div key={a.id} className="pkg" onClick={()=>setAddons(as=>sel?as.filter(x=>x!==a.id):[...as,a.id])}
          style={{padding:16,borderRadius:8,border:`1.5px solid ${sel?es:bo}`,background:sel?"#FAFAFA":"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
          <div className="check" style={{width:20,height:20,borderRadius:4,border:`2px solid ${sel?es:lt}`,background:sel?es:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .15s"}}>
            {sel&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:D,fontSize:17,color:es}}>{a.name}</div>
            <div style={{fontFamily:U,fontSize:12,color:br}}>{a.desc||a.description}</div>
          </div>
          <div style={{fontFamily:D,fontSize:18,color:es,flexShrink:0}}>${a.price.toLocaleString()}</div>
        </div>})}
      </div>
      <Divider/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span style={{fontFamily:U,fontSize:13,color:br}}>{selPkg?.name}</span>
        <span style={{fontFamily:D,fontSize:16,color:es}}>${selPkg?.price?.toLocaleString()}</span>
      </div>
      {addons.map(id=>{const a=addonList.find(x=>x.id===id);return a?<div key={id} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontFamily:U,fontSize:13,color:br}}>{a.name}</span>
        <span style={{fontFamily:D,fontSize:16,color:es}}>+${a.price.toLocaleString()}</span>
      </div>:null})}
      <Divider/>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontFamily:U,fontSize:14,color:es,fontWeight:600}}>Total</span>
        <span style={{fontFamily:D,fontSize:22,color:es}}>${total.toLocaleString()}</span>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{fontFamily:U,fontSize:12,color:br}}>Retainer due today</span>
        <span style={{fontFamily:D,fontSize:16,color:gn}}>$150</span>
      </div>
      <BtnPrimary ch="Continue →" onClick={()=>nav(5)}/>
    </div>}

    {/* Step 5 — About You */}
    {step===5&&<div>
      <BtnBack onClick={()=>nav(4)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>About You</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:24,lineHeight:1.6}}>Tell me a little about yourself so I can make your session perfect.</p>
      <div style={{display:"flex",gap:12,marginBottom:14}}>
        <div style={{flex:1}}>
          <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>First Name *</label>
          <input value={form.first} onChange={e=>setForm({...form,first:e.target.value})} placeholder="Sarah"
            style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es}}/>
        </div>
        <div style={{flex:1}}>
          <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Last Name *</label>
          <input value={form.last} onChange={e=>setForm({...form,last:e.target.value})} placeholder="Mitchell"
            style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es}}/>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Email *</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="sarah@email.com"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es}}/>
      </div>
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Phone</label>
        <input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="407-555-0100"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es}}/>
      </div>
      <Divider/>
      <p style={{fontFamily:D,fontSize:18,color:es,marginBottom:16,fontStyle:"italic"}}>A little more about your session…</p>
      <div style={{marginBottom:14}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Tell me about who's attending & a little about yourselves</label>
        <textarea value={form.attending} onChange={e=>setForm({...form,attending:e.target.value})} rows={3} placeholder="e.g. Family of 4 — two kids ages 3 and 7, very energetic! We love the outdoors…"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es,resize:"vertical"}}/>
      </div>
      <div style={{marginBottom:14}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Any special occasions? (birthday, anniversary, pregnancy, etc.)</label>
        <input value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})} placeholder="e.g. Celebrating our 10th anniversary!"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es}}/>
      </div>
      <div style={{marginBottom:8}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:6}}>Anything else I should know?</label>
        <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3} placeholder="Mobility needs, pets, outfit changes, vision for the session…"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:14,fontFamily:U,color:es,resize:"vertical"}}/>
      </div>
      <BtnPrimary ch="Continue →" onClick={()=>nav(6)} disabled={!form.first||!form.email}/>
    </div>}

    {/* Step 6 — Contract */}
    {step===6&&<div>
      <BtnBack onClick={()=>nav(5)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>Review & Sign</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:20,lineHeight:1.6}}>Please read and sign your portrait photography agreement.</p>
      <div style={{background:cr,borderRadius:8,padding:20,marginBottom:20,maxHeight:280,overflowY:"auto",border:`1px solid ${bo}`}}>
        <pre style={{fontFamily:U,fontSize:12,color:dk,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{CONTRACT}</pre>
      </div>
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontFamily:U,fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:br,fontWeight:600,marginBottom:7}}>Type your full name to sign</label>
        <input value={sigName} onChange={e=>setSigName(e.target.value)} placeholder="Sarah Mitchell"
          style={{width:"100%",border:`1px solid ${bo}`,borderRadius:4,padding:"12px 14px",fontSize:18,fontFamily:D,color:es,fontStyle:"italic"}}/>
        {sigName&&<div style={{fontFamily:D,fontSize:13,color:br,marginTop:6,fontStyle:"italic"}}>✓ Signed as "{sigName}" on {new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>}
      </div>
      <div onClick={()=>setSigned(!signed)} style={{display:"flex",alignItems:"flex-start",gap:11,cursor:"pointer",padding:"12px 14px",border:`1px solid ${signed?es:bo}`,borderRadius:6,background:signed?"#FAFAFA":"#fff",marginBottom:4}}>
        <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${signed?es:lt}`,background:signed?es:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
          {signed&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
        </div>
        <span style={{fontFamily:U,fontSize:13,color:dk,lineHeight:1.5}}>I have read and agree to the Portrait Photography Agreement. I understand the payment terms, cancellation policy, and copyright terms.</span>
      </div>
      <BtnPrimary ch="Continue to Payment →" onClick={()=>nav(7)} disabled={!signed||!sigName}/>
    </div>}

    {/* Step 7 — Payment */}
    {step===7&&<div>
      <BtnBack onClick={()=>nav(6)}/>
      <h2 style={{fontFamily:D,fontSize:32,color:es,fontWeight:400,marginBottom:6}}>Secure Your Date</h2>
      <p style={{fontFamily:U,fontSize:13,color:br,marginBottom:24,lineHeight:1.6}}>A $150 non-refundable retainer reserves your session date. The balance of ${balance.toLocaleString()} is due 72 hours before your session.</p>
      <div style={{background:cr,borderRadius:8,padding:20,marginBottom:20,border:`1px solid ${bo}`}}>
        <div style={{fontFamily:D,fontSize:16,color:es,marginBottom:14}}>Booking Summary</div>
        {[[" Date",date],[" Location",loc],[" Package",selPkg?.name],[" Time",time]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${bo}`}}>
            <span style={{fontFamily:U,fontSize:13,color:br}}>{l}</span>
            <span style={{fontFamily:U,fontSize:13,color:es}}>{v}</span>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 6px",marginTop:4}}>
          <span style={{fontFamily:U,fontSize:13,color:br}}>Session Total</span>
          <span style={{fontFamily:D,fontSize:18,color:es}}>${total.toLocaleString()}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",background:"#F0F7F0",borderRadius:4,paddingLeft:8,paddingRight:8}}>
          <span style={{fontFamily:U,fontSize:13,color:gn,fontWeight:600}}>Due Today (Retainer)</span>
          <span style={{fontFamily:D,fontSize:20,color:gn}}>$150</span>
        </div>
      </div>
      <div style={{background:"#FFF8E1",borderRadius:6,padding:"12px 14px",marginBottom:20,border:`1px solid ${go}`}}>
        <div style={{fontFamily:U,fontSize:12,color:go,fontWeight:600,marginBottom:3}}>💳 Payment via Square</div>
        <div style={{fontFamily:U,fontSize:12,color:dk}}>Secure payment processing will be available once Square is connected. For now, Michelle will send you a payment link directly.</div>
      </div>
      <BtnPrimary ch={submitting?"Processing…":"Complete Booking →"} onClick={submit} disabled={submitting}/>
      <p style={{fontFamily:U,fontSize:11,color:lt,textAlign:"center",marginTop:12}}>🔒 Your information is secure and encrypted</p>
    </div>}

  </Wrap>;
}
