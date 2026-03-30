import { useState } from "react";

var BLUE   = "#003087";
var RED    = "#E4002B";
var GREEN  = "#00875A";
var AMBER  = "#FF8B00";
var PURPLE = "#6554C0";
var TEAL   = "#00A896";
var ORANGE = "#FF6B35";
var WHITE  = "#FFFFFF";
var G100   = "#F0F2F5";
var G200   = "#E2E6EC";
var G400   = "#9AAABF";
var G600   = "#5A6A82";
var G800   = "#2C3A4F";

var PORTFOLIO = [
  {
    id:"POL-2024-88341", insured:"Marcus Reid",       product:"HO-3 Homeowners",  state:"FL",
    premium:3240, renewalDate:"2025-04-15", agent:"John Carter",   tenure:7,
    priorClaims:1, lastClaimAmount:4200, latePayments:0, endorsements:2,
    rateChange:+8.5, marketAvgChange:+5.2, coverageAmount:425000, creditScore:720,
    notes:"One water damage claim 2022. Good payer. Recent endorsement added swimming pool.",
  },
  {
    id:"POL-2024-55129", insured:"Sandra White",      product:"HO-3 Homeowners",  state:"FL",
    premium:2180, renewalDate:"2025-04-20", agent:"Maria Torres",  tenure:15,
    priorClaims:0, lastClaimAmount:0,    latePayments:1, endorsements:0,
    rateChange:+12.0, marketAvgChange:+5.2, coverageAmount:310000, creditScore:680,
    notes:"Long-term loyal customer. No claims in 15 years. Rate increase above market -- high churn risk.",
  },
  {
    id:"POL-2024-11203", insured:"Metro Delivery LLC",product:"Commercial Auto",   state:"FL",
    premium:18500, renewalDate:"2025-04-10", agent:"David Park",   tenure:3,
    priorClaims:3, lastClaimAmount:245000, latePayments:2, endorsements:4,
    rateChange:+22.0, marketAvgChange:+8.0, coverageAmount:1000000, creditScore:590,
    notes:"Three claims in 3 years including major BI. Two late payments. Significant rate increase on renewal.",
  },
  {
    id:"POL-2024-34821", insured:"Patricia Nguyen",   product:"HO-3 Homeowners",  state:"TX",
    premium:1840, renewalDate:"2025-04-28", agent:"Sarah Mitchell", tenure:2,
    priorClaims:0, lastClaimAmount:0,    latePayments:0, endorsements:1,
    rateChange:+3.5, marketAvgChange:+4.1, coverageAmount:285000, creditScore:760,
    notes:"New customer. Zero claims. Rate increase below market. Low churn risk.",
  },
  {
    id:"POL-2024-72041", insured:"Robert Kim",        product:"Personal Auto",     state:"GA",
    premium:1460, renewalDate:"2025-04-18", agent:"Tom Walsh",     tenure:5,
    priorClaims:2, lastClaimAmount:8800, latePayments:0, endorsements:1,
    rateChange:+15.0, marketAvgChange:+6.5, coverageAmount:0, creditScore:640,
    notes:"Two at-fault claims last 24 months. Significant rate increase. Mid-range credit. Shopping likely.",
  },
  {
    id:"POL-2024-90312", insured:"Chen Family Trust", product:"HO-3 Homeowners",  state:"CA",
    premium:4820, renewalDate:"2025-04-22", agent:"Lisa Jordan",   tenure:11,
    priorClaims:1, lastClaimAmount:12400, latePayments:0, endorsements:3,
    rateChange:+6.0, marketAvgChange:+9.2, coverageAmount:780000, creditScore:790,
    notes:"Loyal 11-year customer. Rate increase BELOW market. Very low churn risk. Good account to retain.",
  },
];

var SCORE_RESULTS = {
  "POL-2024-88341": {
    churnRisk: 58, priceSensitivity: 72, retentionScore: 44,
    churnLabel: "MEDIUM", priceLabel: "HIGH", retentionLabel: "AT RISK",
    recommendedAction: "PROACTIVE OUTREACH",
    actionColor: AMBER,
    reasoning: [
      "Rate increase of +8.5% is 3.3 points above market average (+5.2%) -- customer will likely notice",
      "Swimming pool endorsement added this year increases premium further -- compound rate concern",
      "Single prior claim (water damage) -- not a high-risk profile but aware of renewal process",
      "7-year tenure indicates loyalty but not immune to price shopping above market",
      "FL market is competitive -- alternatives available at market rate within same coverage level",
    ],
    recommendedActions: [
      "Agent outreach 45 days before renewal to discuss rate increase and policy value",
      "Offer multi-policy discount if homeowners and auto can be written together",
      "Highlight claim service quality and claims history -- one claim handled smoothly",
      "Consider loss mitigation discount for pool safety features (fence, alarm)",
      "If rate increase unavoidable, offer premium payment plan to reduce monthly impact",
    ],
    retentionLevers: [
      { lever:"Multi-policy bundle", impactPct:18, effort:"Medium" },
      { lever:"Pool safety discount", impactPct:8,  effort:"Low"    },
      { lever:"Loyalty credit",       impactPct:5,  effort:"Low"    },
      { lever:"Payment plan",         impactPct:12, effort:"Low"    },
    ],
    predictedOutcome: "65% retention probability without intervention. 81% with proactive outreach and discount offer.",
  },
  "POL-2024-55129": {
    churnRisk: 82, priceSensitivity: 91, retentionScore: 22,
    churnLabel: "HIGH", priceLabel: "VERY HIGH", retentionLabel: "CRITICAL",
    recommendedAction: "IMMEDIATE RETENTION ACTION",
    actionColor: ORANGE,
    reasoning: [
      "Rate increase of +12.0% is 6.8 points above market average -- extreme price sensitivity trigger",
      "15-year loyal customer with ZERO claims -- among the most profitable customers in the book",
      "One late payment this year -- possible financial stress or dissatisfaction signal",
      "No endorsements added recently -- no additional coverage value reinforcing the relationship",
      "At this rate differential, customer has strong financial incentive to shop the market",
      "Loss of a 15-year zero-claim customer represents $32,700+ in lifetime premium value",
    ],
    recommendedActions: [
      "URGENT: Agent personal call within 2 weeks -- do not send standard renewal notice first",
      "Review rate increase drivers -- can any be adjusted given 15-year loss-free history?",
      "Apply maximum available loyalty discount to offset rate increase",
      "Offer 5-year rate lock or rate stability guarantee if available in FL",
      "Reinforce the value of a 15-year relationship and zero-claim pricing advantage",
      "Flag to underwriting: consider exception rating for this account given loss history",
    ],
    retentionLevers: [
      { lever:"Loyalty discount (max)",       impactPct:28, effort:"Low"    },
      { lever:"Exception rating request",     impactPct:35, effort:"High"   },
      { lever:"5-year rate lock",             impactPct:22, effort:"Medium" },
      { lever:"Multi-policy bundle",          impactPct:15, effort:"Medium" },
    ],
    predictedOutcome: "31% retention probability without intervention. 74% with exception rating and personal agent outreach.",
  },
  "POL-2024-11203": {
    churnRisk: 41, priceSensitivity: 35, retentionLabel: "MONITOR",
    churnLabel: "MEDIUM-LOW", priceLabel: "LOW", retentionScore: 61,
    recommendedAction: "STANDARD RENEWAL + MONITORING",
    actionColor: TEAL,
    reasoning: [
      "Rate increase of +22% is large but commercial auto market is up +8% -- loss experience drives most of the delta",
      "Three claims in 3 years including a $245,000 BI claim -- insured knows they are a high-risk account",
      "Two late payments suggest cash flow stress but commercial clients rarely shop on price alone",
      "4-year relationship and specialty commercial coverage -- switching costs are high",
      "Coverage limit of $1M CSL limits competitive alternatives at comparable pricing",
      "Risk: non-renewal for underwriting reasons more likely than customer-driven lapse",
    ],
    recommendedActions: [
      "Standard renewal letter at 60 days -- rate increase is defensible given loss history",
      "Schedule commercial lines review call to discuss fleet safety program and loss prevention",
      "Offer fleet safety training discount to reduce future claim frequency",
      "Monitor 60-day payment -- if late, flag for collections and potential mid-term cancellation review",
      "Underwriting review: consider whether 4th claim in 36 months would trigger non-renewal",
    ],
    retentionLevers: [
      { lever:"Fleet safety program discount", impactPct:12, effort:"Medium" },
      { lever:"Loss prevention consultation",  impactPct:8,  effort:"Medium" },
      { lever:"Payment plan",                  impactPct:6,  effort:"Low"    },
    ],
    predictedOutcome: "72% retention probability. Primary risk is underwriting non-renewal, not customer churn.",
  },
  "POL-2024-34821": {
    churnRisk: 14, priceSensitivity: 18, retentionScore: 88,
    churnLabel: "LOW", priceLabel: "LOW", retentionLabel: "SECURE",
    recommendedAction: "STANDARD RENEWAL",
    actionColor: GREEN,
    reasoning: [
      "Rate increase of +3.5% is BELOW market average of +4.1% -- customer is actually getting a better deal than market",
      "Zero claims and zero late payments -- perfect customer risk profile",
      "Only 2-year tenure -- but low churn risk due to favourable pricing position",
      "High credit score (760) correlates with stability and lower likelihood of lapsing",
      "Standard endorsement (HVAC update) shows engaged customer improving property",
      "No action needed -- standard renewal process appropriate",
    ],
    recommendedActions: [
      "Standard automated renewal at 60 days -- no special handling required",
      "Include loyalty discount offer at year 3 to reinforce relationship",
      "Consider upsell: umbrella policy or auto if not already written with us",
      "Good candidate for referral programme -- satisfied new customer likely to refer",
    ],
    retentionLevers: [
      { lever:"Year-3 loyalty discount",  impactPct:6,  effort:"Low" },
      { lever:"Umbrella upsell",           impactPct:14, effort:"Low" },
      { lever:"Referral programme",        impactPct:9,  effort:"Low" },
    ],
    predictedOutcome: "92% retention probability. No intervention required. Focus agent time on higher-risk accounts.",
  },
  "POL-2024-72041": {
    churnRisk: 71, priceSensitivity: 78, retentionScore: 31,
    churnLabel: "HIGH", priceLabel: "HIGH", retentionLabel: "AT RISK",
    recommendedAction: "PROACTIVE OUTREACH",
    actionColor: AMBER,
    reasoning: [
      "Rate increase of +15% is more than double the market average of +6.5% -- significant price shock",
      "Two at-fault claims in 24 months -- customer knows they are a rated risk but may still shop",
      "Medium credit score (640) -- price-sensitive segment, more likely to switch for small savings",
      "5-year tenure provides some stickiness but not enough to absorb a 15% rate hit alone",
      "Personal auto is a highly competitive line -- many alternatives within 5% of our price",
      "Without outreach, this customer will likely obtain competing quotes at renewal",
    ],
    recommendedActions: [
      "Agent outreach 45-60 days before renewal to frame rate increase in context of loss history",
      "Offer telematics / usage-based insurance programme as alternative to rate increase",
      "Defensive driving course discount -- reduces rate and demonstrates partnership",
      "Bundle discount if homeowners can be added to the account",
      "If customer threatens to leave: offer graduated rate increase over 2 years instead of single-year shock",
    ],
    retentionLevers: [
      { lever:"Telematics programme",       impactPct:22, effort:"Medium" },
      { lever:"Defensive driving discount", impactPct:10, effort:"Low"   },
      { lever:"Multi-policy bundle",        impactPct:18, effort:"Medium"},
      { lever:"Graduated rate increase",    impactPct:25, effort:"High"  },
    ],
    predictedOutcome: "38% retention probability without intervention. 67% with telematics offer and proactive outreach.",
  },
  "POL-2024-90312": {
    churnRisk: 11, priceSensitivity: 12, retentionScore: 94,
    churnLabel: "VERY LOW", priceLabel: "VERY LOW", retentionLabel: "SECURE",
    recommendedAction: "UPSELL OPPORTUNITY",
    actionColor: GREEN,
    reasoning: [
      "Rate increase of +6.0% is BELOW market average of +9.2% -- customer is getting an excellent deal",
      "11-year loyal customer with only one manageable claim ($12,400) -- highly profitable account",
      "Zero late payments, high credit score (790) -- financially stable and reliable",
      "High-value property ($780K) with 3 endorsements -- engaged customer with complex coverage needs",
      "Below-market rate makes it nearly impossible for competitors to undercut us",
      "This is one of the best accounts in the renewal book -- deserves recognition and upsell focus",
    ],
    recommendedActions: [
      "Standard renewal at 60 days -- no retention action needed",
      "Proactive upsell: high-value home endorsement (jewellery, art, wine) given property value",
      "Umbrella policy recommendation -- $780K property owner is ideal umbrella candidate",
      "VIP recognition: agent personal note acknowledging 11-year relationship",
      "Referral programme invitation -- this customer likely knows other high-value homeowners",
    ],
    retentionLevers: [
      { lever:"High-value items endorsement", impactPct:0,  effort:"Low"    },
      { lever:"Umbrella upsell",              impactPct:0,  effort:"Low"    },
      { lever:"VIP recognition",              impactPct:0,  effort:"Low"    },
    ],
    predictedOutcome: "96% retention probability. No retention action needed. Primary opportunity is revenue growth through upsell.",
  },
};

var CHURN_THEME = {
  "VERY HIGH": { color:ORANGE, bg:"#FFF0EB" },
  "HIGH":      { color:ORANGE, bg:"#FFF0EB" },
  "MEDIUM":    { color:AMBER,  bg:"#FFF8EC" },
  "MEDIUM-LOW":{ color:TEAL,   bg:"#E6F7F7" },
  "LOW":       { color:GREEN,  bg:"#E3FCEF" },
  "VERY LOW":  { color:GREEN,  bg:"#E3FCEF" },
};

var ACTION_ORDER = { "IMMEDIATE RETENTION ACTION":0, "PROACTIVE OUTREACH":1, "UPSELL OPPORTUNITY":2, "STANDARD RENEWAL + MONITORING":3, "STANDARD RENEWAL":4 }; // eslint-disable-line no-unused-vars

function NTTLogo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:3 }}>
        <span style={{ fontFamily:"Arial Black,Arial", fontWeight:900, fontSize:20, color:BLUE }}>NTT</span>
        <span style={{ fontFamily:"Arial,sans-serif", fontWeight:700, fontSize:16, color:BLUE }}>DATA</span>
      </div>
      <div style={{ height:2, background:RED, marginTop:2, borderRadius:1 }}/>
    </div>
  );
}

function RiskBar(props) {
  var score = props.score;
  var color = score > 70 ? ORANGE : score > 45 ? AMBER : score > 25 ? TEAL : GREEN;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1, height:6, background:G200, borderRadius:3 }}>
        <div style={{ height:"100%", width:score+"%", background:color, borderRadius:3, transition:"width 0.6s" }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:700, color:color, minWidth:28 }}>{score}</span>
    </div>
  );
}

export default function App() {
  var [selected,    setSelected]    = useState(null);
  var [result,      setResult]      = useState(null);
  var [loading,     setLoading]     = useState(false);
  var [phaseIdx,    setPhaseIdx]    = useState(0);
  var [activeTab,   setActiveTab]   = useState("reasoning");
  var [doneMap,     setDoneMap]     = useState({});
  var [filterAction,setFilterAction]= useState("all");

  var PHASES = [
    "Loading policy history and claims data...",
    "Analysing rate change vs market benchmarks...",
    "Scoring churn risk and price sensitivity...",
    "Evaluating retention levers and ROI...",
    "Generating recommended action and talking points...",
  ];

  function runScore(pol) {
    if (loading) return;
    setSelected(pol);
    setResult(null);
    setLoading(true);
    setActiveTab("reasoning");
    setPhaseIdx(0);
    var p = 0;
    function tick() {
      p++; setPhaseIdx(p);
      if (p < PHASES.length - 1) setTimeout(tick, 550);
    }
    setTimeout(tick, 550);
    setTimeout(function() {
      var data = SCORE_RESULTS[pol.id];
      setResult(data);
      setDoneMap(function(prev) { var n = Object.assign({}, prev); n[pol.id] = data; return n; });
      setLoading(false);
    }, 3000);
  }

  function runAll() {
    if (loading) return;
    var unscored = PORTFOLIO.filter(function(p) { return !doneMap[p.id]; });
    if (unscored.length === 0) return;
    var idx = 0;
    function next() {
      if (idx >= unscored.length) return;
      var pol = unscored[idx]; idx++;
      setSelected(pol);
      setLoading(true);
      setPhaseIdx(0);
      setTimeout(function() {
        var data = SCORE_RESULTS[pol.id];
        setResult(data);
        setDoneMap(function(prev) { var n = Object.assign({}, prev); n[pol.id] = data; return n; });
        setLoading(false);
        setTimeout(next, 300);
      }, 1400);
    }
    next();
  }

  var allScored   = Object.keys(doneMap).length;
  var critCount   = Object.values(doneMap).filter(function(r) { return r.churnLabel === "HIGH" || r.churnLabel === "VERY HIGH"; }).length;
  var avgChurn    = allScored > 0 ? Math.round(Object.values(doneMap).reduce(function(s,r) { return s+r.churnRisk; }, 0) / allScored) : 0;
  var atRiskPrem  = PORTFOLIO.filter(function(p) { return doneMap[p.id] && (doneMap[p.id].churnLabel === "HIGH" || doneMap[p.id].churnLabel === "VERY HIGH"); }).reduce(function(s,p) { return s+p.premium; }, 0);

  var filteredPortfolio = PORTFOLIO.filter(function(p) {
    if (filterAction === "all") return true;
    var r = doneMap[p.id];
    if (!r) return false;
    return r.recommendedAction === filterAction;
  });

  return (
    <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", background:G100, minHeight:"100vh", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <div style={{ background:WHITE, borderBottom:"3px solid "+BLUE, padding:"10px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 6px rgba(0,0,0,0.07)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:18 }}>
          <NTTLogo/>
          <div style={{ width:1, height:30, background:G200 }}/>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:BLUE }}>Renewal Risk Scorer</div>
            <div style={{ fontSize:10, color:G600 }}>AI-Powered Renewal Book Intelligence -- PolicyCenter AMS Accelerator</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:20 }}>
          {[
            { v:PORTFOLIO.length,   l:"Renewals",     c:BLUE   },
            { v:allScored,          l:"Scored",        c:PURPLE },
            { v:critCount,          l:"High Churn",    c:ORANGE },
            { v:avgChurn?avgChurn+"%":"--", l:"Avg Churn Risk", c:AMBER },
            { v:atRiskPrem>0?"$"+Math.round(atRiskPrem/1000)+"k":"--", l:"At-Risk Premium", c:RED },
          ].map(function(s) {
            return (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:20, fontWeight:800, color:s.c, lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:9, color:G400, textTransform:"uppercase", letterSpacing:1 }}>{s.l}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* Left sidebar */}
        <div style={{ width:290, background:WHITE, borderRight:"1px solid "+G200, overflowY:"auto", padding:"14px 10px", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, alignItems:"center" }}>
            <div style={{ fontSize:10, fontWeight:700, color:G400, letterSpacing:2 }}>RENEWAL BOOK</div>
            <button onClick={runAll} disabled={loading || allScored === PORTFOLIO.length}
              style={{ fontSize:9, padding:"4px 10px", background:loading||allScored===PORTFOLIO.length?G200:BLUE, border:"none", borderRadius:6, color:loading||allScored===PORTFOLIO.length?G400:WHITE, cursor:loading||allScored===PORTFOLIO.length?"not-allowed":"pointer", fontWeight:600 }}>
              Score All
            </button>
          </div>

          {/* Filter */}
          <div style={{ marginBottom:10, display:"flex", flexWrap:"wrap", gap:4 }}>
            {["all","IMMEDIATE RETENTION ACTION","PROACTIVE OUTREACH","STANDARD RENEWAL"].map(function(f) {
              var labels = { "all":"All", "IMMEDIATE RETENTION ACTION":"Critical", "PROACTIVE OUTREACH":"Outreach", "STANDARD RENEWAL":"Standard" };
              var a = filterAction === f;
              return (
                <button key={f} onClick={function() { setFilterAction(f); }}
                  style={{ fontSize:9, padding:"3px 8px", background:a?BLUE:G100, border:"1px solid "+(a?BLUE:G200), borderRadius:10, color:a?WHITE:G600, cursor:"pointer" }}>
                  {labels[f] || f}
                </button>
              );
            })}
          </div>

          {filteredPortfolio.map(function(pol) {
            var cached = doneMap[pol.id];
            var isAct  = selected && selected.id === pol.id;
            var ct     = cached ? CHURN_THEME[cached.churnLabel] || CHURN_THEME.MEDIUM : null;
            var rateColor = pol.rateChange > pol.marketAvgChange ? RED : GREEN;
            return (
              <div key={pol.id} onClick={function() { runScore(pol); }}
                style={{ background:isAct?"#EBF2FF":WHITE, border:"1.5px solid "+(isAct?BLUE:G200), borderRadius:10, padding:"11px 12px", marginBottom:7, cursor:loading?"not-allowed":"pointer", opacity:loading&&!isAct?0.5:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:9, color:G400, fontFamily:"monospace" }}>{pol.id}</span>
                  {ct && <span style={{ fontSize:9, fontWeight:700, color:ct.color, background:ct.bg, border:"1px solid "+ct.color, borderRadius:3, padding:"0 5px" }}>{cached.churnLabel}</span>}
                </div>
                <div style={{ fontSize:12, fontWeight:700, color:G800, marginBottom:3 }}>{pol.insured}</div>
                <div style={{ fontSize:10, color:G600, marginBottom:4 }}>{pol.product} -- {pol.state}</div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
                  <span style={{ color:G400 }}>Premium: <strong style={{ color:G800 }}>${pol.premium.toLocaleString()}</strong></span>
                  <span style={{ color:rateColor, fontWeight:600 }}>+{pol.rateChange}% (mkt: +{pol.marketAvgChange}%)</span>
                </div>
                <div style={{ fontSize:10, color:G400, marginTop:3 }}>Renews: {pol.renewalDate} -- {pol.tenure}yr tenure</div>
                {cached && (
                  <div style={{ marginTop:5, borderTop:"1px solid "+G200, paddingTop:5 }}>
                    <RiskBar score={cached.churnRisk}/>
                    <div style={{ fontSize:9, color:cached.actionColor || BLUE, fontWeight:600, marginTop:3 }}>{cached.recommendedAction}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main */}
        <div style={{ flex:1, overflowY:"auto", padding:"18px 22px" }}>

          {!selected && !loading && (
            <div style={{ textAlign:"center", paddingTop:80, opacity:0.4 }}>
              <div style={{ fontSize:48, marginBottom:12 }}>&#128200;</div>
              <div style={{ fontSize:15, fontWeight:700, color:G800 }}>Select a renewal to score</div>
              <div style={{ fontSize:12, color:G600, marginTop:6, lineHeight:1.7, maxWidth:400, margin:"6px auto 0" }}>
                The Renewal Risk Scorer analyses each policy for churn risk and price sensitivity, then recommends the right retention action -- so agents focus time on the renewals that actually need attention.
              </div>
              <button onClick={runAll} style={{ marginTop:20, padding:"10px 24px", background:BLUE, border:"none", borderRadius:8, color:WHITE, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                Score All {PORTFOLIO.length} Renewals
              </button>
            </div>
          )}

          {loading && selected && (
            <div style={{ maxWidth:700 }}>
              <PolicyHeader pol={selected}/>
              <div style={{ marginTop:14, background:WHITE, borderRadius:12, padding:"22px 20px", border:"1px solid "+G200 }}>
                <div style={{ fontSize:13, color:BLUE, fontWeight:700, marginBottom:18 }}>Scoring renewal risk...</div>
                {PHASES.map(function(label, i) {
                  var done = i < phaseIdx;
                  var act  = i === phaseIdx;
                  var pct  = [20,40,60,80,100][i];
                  return (
                    <div key={i} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:11, color:act?BLUE:done?GREEN:G400, fontWeight:act?700:400 }}>
                          {done?"v ":act?"> ":"o "}{label}
                        </span>
                        <span style={{ fontSize:10, color:G400 }}>{done||act?pct:0}%</span>
                      </div>
                      <div style={{ height:4, background:G200, borderRadius:4 }}>
                        <div style={{ height:"100%", width:(done||act)?pct+"%":"0%", background:done?GREEN:act?BLUE:"transparent", borderRadius:4, transition:"width 0.5s" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!loading && result && selected && (
            <div style={{ maxWidth:860 }}>
              <PolicyHeader pol={selected}/>

              {/* Score banner */}
              <div style={{ marginTop:12, padding:"14px 18px", background:WHITE, border:"2px solid "+(result.actionColor||BLUE), borderRadius:12, display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                {[
                  { label:"Churn Risk",         score:result.churnRisk,       band:result.churnLabel },
                  { label:"Price Sensitivity",  score:result.priceSensitivity, band:result.priceLabel },
                  { label:"Retention Score",    score:result.retentionScore,  band:result.retentionLabel },
                ].map(function(m, i) {
                  var c = m.score > 70 ? ORANGE : m.score > 45 ? AMBER : m.score > 25 ? TEAL : GREEN;
                  if (m.label === "Retention Score") c = m.score > 70 ? GREEN : m.score > 45 ? TEAL : m.score > 25 ? AMBER : ORANGE;
                  return (
                    <div key={i} style={{ textAlign:"center", minWidth:90 }}>
                      <div style={{ fontSize:32, fontWeight:800, color:c, lineHeight:1 }}>{m.score}</div>
                      <div style={{ fontSize:9, color:G400, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>{m.label}</div>
                      <span style={{ fontSize:9, fontWeight:700, color:c }}>{m.band}</span>
                    </div>
                  );
                })}
                <div style={{ width:1, height:56, background:G200 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:9, color:G400, marginBottom:5 }}>RECOMMENDED ACTION</div>
                  <div style={{ fontSize:14, fontWeight:700, color:result.actionColor || BLUE, marginBottom:5 }}>{result.recommendedAction}</div>
                  <div style={{ fontSize:11, color:G600, lineHeight:1.6 }}>{result.predictedOutcome}</div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display:"flex", marginTop:16, marginBottom:14, borderBottom:"2px solid "+G200 }}>
                {[
                  { k:"reasoning", l:"Risk Reasoning" },
                  { k:"actions",   l:"Recommended Actions" },
                  { k:"levers",    l:"Retention Levers" },
                ].map(function(tab) {
                  var a = activeTab === tab.k;
                  return (
                    <button key={tab.k} onClick={function() { setActiveTab(tab.k); }}
                      style={{ background:"transparent", border:"none", borderBottom:"3px solid "+(a?BLUE:"transparent"), color:a?BLUE:G600, padding:"7px 14px", fontSize:12, fontWeight:a?700:400, cursor:"pointer", marginBottom:-2 }}>
                      {tab.l}
                    </button>
                  );
                })}
              </div>

              {activeTab === "reasoning" && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {result.reasoning.map(function(r, i) {
                    var isPos = r.indexOf("BELOW") !== -1 || r.indexOf("excellent") !== -1 || r.indexOf("profitable") !== -1 || r.indexOf("loyal") !== -1;
                    return (
                      <div key={i} style={{ background:WHITE, borderRadius:9, padding:"11px 14px", border:"1px solid "+G200, borderLeft:"4px solid "+(isPos?GREEN:AMBER), display:"flex", gap:10 }}>
                        <div style={{ width:22, height:22, borderRadius:"50%", background:isPos?GREEN:AMBER, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:WHITE, flexShrink:0 }}>{i+1}</div>
                        <div style={{ fontSize:12, color:G800, lineHeight:1.6 }}>{r}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "actions" && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {result.recommendedActions.map(function(a, i) {
                    var isUrgent = a.indexOf("URGENT") !== -1;
                    return (
                      <div key={i} style={{ background:WHITE, borderRadius:9, padding:"11px 14px", border:"1px solid "+(isUrgent?ORANGE:G200), display:"flex", gap:10 }}>
                        <div style={{ width:22, height:22, borderRadius:"50%", background:isUrgent?ORANGE:BLUE, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:WHITE, flexShrink:0 }}>{i+1}</div>
                        <div style={{ fontSize:12, color:G800, lineHeight:1.6 }}>{a}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "levers" && (
                <div>
                  <div style={{ fontSize:11, color:G600, marginBottom:10 }}>Available retention levers and estimated churn risk reduction:</div>
                  {result.retentionLevers.map(function(lv, i) {
                    var effortColor = lv.effort === "Low" ? GREEN : lv.effort === "Medium" ? AMBER : ORANGE;
                    return (
                      <div key={i} style={{ background:WHITE, borderRadius:9, padding:"13px 15px", border:"1px solid "+G200, marginBottom:8, display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12, fontWeight:700, color:G800 }}>{lv.lever}</div>
                          <div style={{ marginTop:5 }}><RiskBar score={lv.impactPct}/></div>
                        </div>
                        <div style={{ textAlign:"center", minWidth:80 }}>
                          <div style={{ fontSize:20, fontWeight:700, color:BLUE }}>{lv.impactPct > 0 ? "-"+lv.impactPct+"%" : "--"}</div>
                          <div style={{ fontSize:9, color:G400 }}>churn reduction</div>
                        </div>
                        <span style={{ fontSize:9, fontWeight:700, color:effortColor, border:"1px solid "+effortColor, borderRadius:3, padding:"2px 8px" }}>{lv.effort}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:WHITE, borderTop:"1px solid "+G200, padding:"6px 24px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:GREEN }}/>
          <span style={{ fontSize:10, color:GREEN, fontWeight:700 }}>PoC -- Static Data</span>
        </div>
        {["PolicyCenter","Renewal Book","Rate vs Market","Churn Prediction","Claude Sonnet (Prod)","CRM Integration (Prod)"].map(function(t) {
          return <span key={t} style={{ fontSize:9, color:G600, border:"1px solid "+G200, padding:"2px 7px", borderRadius:3, background:G100 }}>{t}</span>;
        })}
        <span style={{ marginLeft:"auto", fontSize:10, color:G400 }}>NTT DATA -- Renewal Risk Scorer 2025</span>
      </div>
    </div>
  );
}

function PolicyHeader(props) {
  var p = props.pol;
  var rateColor = p.rateChange > p.marketAvgChange ? RED : GREEN;
  return (
    <div style={{ background:WHITE, border:"1px solid "+G200, borderRadius:10, padding:"13px 16px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:8 }}>
        <div><div style={{ fontSize:9, color:G400 }}>POLICY</div><div style={{ fontSize:13, fontWeight:700, color:BLUE, fontFamily:"monospace" }}>{p.id}</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>INSURED</div><div style={{ fontSize:13, fontWeight:700, color:G800 }}>{p.insured}</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>PRODUCT</div><div style={{ fontSize:12, fontWeight:600, color:G800 }}>{p.product}</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>STATE</div><div style={{ fontSize:12, fontWeight:600, color:G800 }}>{p.state}</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>RENEWAL DATE</div><div style={{ fontSize:12, fontWeight:600, color:G800 }}>{p.renewalDate}</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>TENURE</div><div style={{ fontSize:12, fontWeight:600, color:G800 }}>{p.tenure} years</div></div>
        <div><div style={{ fontSize:9, color:G400 }}>PREMIUM</div><div style={{ fontSize:12, fontWeight:600, color:PURPLE }}>${p.premium.toLocaleString()}</div></div>
        <div>
          <div style={{ fontSize:9, color:G400 }}>RATE CHANGE</div>
          <div style={{ fontSize:12, fontWeight:700, color:rateColor }}>+{p.rateChange}% (mkt: +{p.marketAvgChange}%)</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
        <span style={{ fontSize:10, color:G600 }}><strong>Prior claims:</strong> {p.priorClaims}</span>
        <span style={{ fontSize:10, color:G600 }}><strong>Late payments:</strong> {p.latePayments}</span>
        <span style={{ fontSize:10, color:G600 }}><strong>Credit score:</strong> {p.creditScore}</span>
        <span style={{ fontSize:10, color:G600 }}><strong>Agent:</strong> {p.agent}</span>
      </div>
      <div style={{ marginTop:7, fontSize:11, color:G600, lineHeight:1.6, padding:"6px 10px", background:G100, borderRadius:6 }}>{p.notes}</div>
    </div>
  );
}
