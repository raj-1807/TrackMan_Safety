import React, { useState } from 'react';
import { Download, TrendingUp, Users, AlertTriangle, MapPin, Clock, Activity, Shield, CheckCircle, XCircle } from 'lucide-react';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'workers', label: 'Worker Activity' },
    { key: 'alerts', label: 'Alert History' },
    { key: 'zones', label: 'Zone Usage' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Safety insights and system performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded p-0.5">
            {['24h', '7d', '30d', '90d'].map((d) => (
              <button key={d} onClick={() => setDateRange(d)}
                className={`px-2.5 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                  dateRange === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}>{d}</button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Shifts', value: '156', icon: Clock, bg: 'bg-blue-50', text: 'text-blue-600', trend: '+12%' },
          { label: 'Avg Response', value: '2.4m', icon: Activity, bg: 'bg-green-50', text: 'text-green-600', trend: '-18%' },
          { label: 'Zone Breaches', value: '7', icon: AlertTriangle, bg: 'bg-amber-50', text: 'text-amber-600', trend: '-30%' },
          { label: 'Safety Score', value: '94%', icon: Shield, bg: 'bg-blue-50', text: 'text-blue-600', trend: '+5%' },
        ].map((s) => (
          <div key={s.label} className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.text}`} />
              </div>
              <span className="text-xs font-medium text-green-600">{s.trend}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-4">
          <div className="flex gap-0 -mb-px">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 cursor-pointer transition-colors ${
                  activeTab === t.key ? 'text-[#1a237e] border-[#1a237e]' : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}>{t.label}</button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1a237e]" /> Weekly Activity
                </h3>
                <div className="h-48 flex items-end justify-between gap-2 px-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => {
                    const h = [65,78,45,88,70,55,40][i];
                    return (
                      <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="w-full bg-[#1a237e] rounded-t hover:bg-[#283593] transition-colors cursor-pointer relative group"
                          style={{height:`${h*2}px`}}>
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-gray-700 bg-white shadow px-1.5 py-0.5 rounded whitespace-nowrap">{h}</div>
                        </div>
                        <span className="text-[10px] text-gray-400">{d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-[#1a237e]" /> Top Workers</h3>
                  <div className="space-y-2">
                    {[{name:'Amit Sharma',hours:'42h',shifts:6},{name:'Vikram Singh',hours:'38h',shifts:5},{name:'Suresh Patel',hours:'35h',shifts:5}].map((w,i) => (
                      <div key={w.name} className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">#{i+1}</span>
                          <span className="text-sm font-medium text-gray-700">{w.name}</span>
                        </div>
                        <div className="text-right"><p className="text-sm font-semibold text-gray-900">{w.hours}</p><p className="text-[10px] text-gray-400">{w.shifts} shifts</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1a237e]" /> Zone Activity</h3>
                  <div className="space-y-2">
                    {[{name:'New Delhi Station - Track 3',w:12,type:'MAINTENANCE'},{name:'Nizamuddin Bridge',w:0,type:'DANGER'},{name:'Ghaziabad Yard',w:5,type:'SAFE'}].map((z) => (
                      <div key={z.name} className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${z.type==='MAINTENANCE'?'bg-blue-500':z.type==='DANGER'?'bg-red-500':'bg-green-500'}`} />
                          <span className="text-sm font-medium text-gray-700 truncate max-w-[160px]">{z.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{z.w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workers' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-gray-50">
                  {['Worker','Shifts','Hours','Avg','Breaches','SOS','Status'].map(h=>(
                    <th key={h} className="text-left text-[11px] font-semibold text-gray-500 uppercase px-4 py-2">{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {name:'Amit Sharma',id:'TM-1001',shifts:28,hours:'196h',avg:'7h',breaches:0,sos:0,st:'excellent'},
                    {name:'Vikram Singh',id:'TM-1002',shifts:25,hours:'175h',avg:'7h',breaches:1,sos:0,st:'good'},
                    {name:'Suresh Patel',id:'TM-1003',shifts:24,hours:'168h',avg:'7h',breaches:0,sos:1,st:'good'},
                    {name:'Manoj Yadav',id:'TM-1004',shifts:22,hours:'154h',avg:'7h',breaches:2,sos:0,st:'warning'},
                    {name:'Ravi Verma',id:'TM-1005',shifts:20,hours:'140h',avg:'7h',breaches:3,sos:0,st:'warning'},
                  ].map(w=>(
                    <tr key={w.id} className="hover:bg-blue-50/30">
                      <td className="px-4 py-2.5"><div className="flex items-center gap-2"><div className="w-7 h-7 bg-[#1a237e] rounded flex items-center justify-center text-white font-bold text-[10px]">{w.name.charAt(0)}</div><div><p className="text-sm font-medium text-gray-800">{w.name}</p><p className="text-[10px] text-gray-400">{w.id}</p></div></div></td>
                      <td className="px-4 py-2.5 text-sm font-medium text-gray-700">{w.shifts}</td>
                      <td className="px-4 py-2.5 text-sm text-gray-600">{w.hours}</td>
                      <td className="px-4 py-2.5 text-sm text-gray-600">{w.avg}</td>
                      <td className="px-4 py-2.5"><span className={`text-sm font-medium ${w.breaches>0?'text-amber-600':'text-gray-400'}`}>{w.breaches}</span></td>
                      <td className="px-4 py-2.5"><span className={`text-sm font-medium ${w.sos>0?'text-red-600':'text-gray-400'}`}>{w.sos}</span></td>
                      <td className="px-4 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        w.st==='excellent'?'text-green-700 bg-green-50':w.st==='good'?'text-blue-700 bg-blue-50':'text-amber-700 bg-amber-50'
                      }`}>{w.st==='excellent'?'Excellent':w.st==='good'?'Good':'Review'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[
                  {label:'Total',value:'34',icon:AlertTriangle,bg:'bg-blue-50',text:'text-blue-600'},
                  {label:'Resolved',value:'28',icon:CheckCircle,bg:'bg-green-50',text:'text-green-600'},
                  {label:'Avg Time',value:'4.2m',icon:Clock,bg:'bg-amber-50',text:'text-amber-600'},
                  {label:'Open',value:'6',icon:XCircle,bg:'bg-red-50',text:'text-red-600'},
                ].map(s=>(
                  <div key={s.label} className="p-3 bg-gray-50 rounded text-center">
                    <div className={`w-7 h-7 rounded flex items-center justify-center mx-auto mb-1.5 ${s.bg}`}><s.icon className={`w-3.5 h-3.5 ${s.text}`} /></div>
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-[10px] text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
              {[
                {date:'Today',items:[
                  {time:'14:32',type:'SOS',worker:'Suresh Patel',msg:'SOS at Ghaziabad Yard',status:'ACTIVE',sev:'CRITICAL'},
                  {time:'12:15',type:'ZONE_BREACH',worker:'Amit Sharma',msg:'Entered danger zone',status:'RESOLVED',sev:'HIGH'},
                ]},
                {date:'Yesterday',items:[
                  {time:'18:45',type:'DEVICE_OFFLINE',worker:'Ravi Verma',msg:'Device offline 15+ min',status:'RESOLVED',sev:'MEDIUM'},
                  {time:'09:30',type:'GEOFENCE_EXIT',worker:'Vikram Singh',msg:'Exited maintenance zone',status:'RESOLVED',sev:'HIGH'},
                ]},
              ].map(g=>(
                <div key={g.date} className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{g.date}</h4>
                  <div className="space-y-1.5 pl-3 border-l-2 border-gray-200">
                    {g.items.map((it,i)=>(
                      <div key={i} className="relative pl-3">
                        <div className={`absolute -left-[7px] w-3 h-3 rounded-full border-2 border-white ${
                          it.sev==='CRITICAL'?'bg-red-500':it.sev==='HIGH'?'bg-amber-500':'bg-blue-500'
                        }`} />
                        <div className="p-2.5 bg-gray-50 rounded">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-mono text-gray-400">{it.time}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              it.sev==='CRITICAL'?'text-red-700 bg-red-100':it.sev==='HIGH'?'text-amber-700 bg-amber-100':'text-blue-700 bg-blue-100'
                            }`}>{it.type.replace('_',' ')}</span>
                            <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                              it.status==='RESOLVED'?'text-green-600 bg-green-50':'text-red-600 bg-red-50'
                            }`}>{it.status}</span>
                          </div>
                          <p className="text-sm text-gray-700 font-medium">{it.msg}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Worker: {it.worker}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'zones' && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {name:'New Delhi Station - Track 3',type:'MAINTENANCE',active:3,breaches:1,shifts:28,color:'blue'},
                  {name:'Nizamuddin Bridge',type:'DANGER',active:0,breaches:4,shifts:0,color:'red'},
                  {name:'Ghaziabad Yard',type:'SAFE',active:2,breaches:0,shifts:15,color:'green'},
                ].map(z=>(
                  <div key={z.name} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2.5 h-2.5 rounded-full bg-${z.color}-500`} />
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{z.name}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[{l:'Active',v:z.active},{l:'Breaches',v:z.breaches},{l:'Shifts',v:z.shifts}].map(s=>(
                        <div key={s.l} className="p-2 bg-gray-50 rounded text-center">
                          <p className="text-lg font-bold text-gray-900">{s.v}</p>
                          <p className="text-[10px] text-gray-500">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-[#1a237e]" /> Zone Utilization</h3>
                <div className="space-y-3">
                  {[{name:'New Delhi Station - Track 3',u:85},{name:'Ghaziabad Yard',u:62},{name:'Mathura Junction',u:45}].map(z=>(
                    <div key={z.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600 truncate max-w-[200px]">{z.name}</span>
                        <span className="text-xs font-bold text-gray-700">{z.u}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a237e] rounded-full" style={{width:`${z.u}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
