
import React from 'react';
import { Budget, Expense } from '../types';
import { 
  TrendingUp,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

interface Props {
  budget: Budget;
  expenses: Expense[];
  onAddExpense: (e: Expense) => void;
  onRemoveExpense: (id: string) => void;
  theme: 'light' | 'dark';
}

const Dashboard: React.FC<Props> = ({ theme }) => {
  const areaData = [
    { name: 'ENE', planeado: 120, real: 100 },
    { name: 'FEB', planeado: 230, real: 210 },
    { name: 'MAR', planeado: 180, real: 250 },
    { name: 'ABR', planeado: 290, real: 280 },
    { name: 'MAY', planeado: 340, real: 320 },
  ];

  const executionAreaData = [
    { name: 'RED', pct: 85 },
    { name: 'TI', pct: 45 },
    { name: 'SERV', pct: 70 },
    { name: 'MARK', pct: 20 },
    { name: 'RRHH', pct: 95 },
  ];

  const cardBg = theme === 'dark' ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-4xl font-black mb-2 tracking-tighter ${textColor}`}>Control de Inversión</h2>
          <p className={`text-sm font-medium ${subTextColor}`}>Analítica predictiva y ejecución de capital Claro Colombia.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-[#EF3340]/10 border border-[#EF3340]/20 text-[#EF3340] text-[10px] font-black uppercase tracking-widest">
            LIVE SAP SYNC
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard 
          theme={theme} 
          title="Presupuesto Q3" 
          value="$ 842 M" 
          icon={<Zap size={20} />} 
          status="up" 
          trend="+12%"
        />
        <KPICard 
          theme={theme} 
          title="Ejecutado Real" 
          value="$ 315 M" 
          icon={<Activity size={20} />} 
          status="neutral"
          trend="42% total"
        />
        <KPICard 
          theme={theme} 
          title="Comprometido" 
          value="$ 128 M" 
          icon={<CheckCircle2 size={20} />} 
          status="up"
          trend="PO Activas"
        />
        <KPICard 
          theme={theme} 
          title="Alertas de Riesgo" 
          value="02" 
          icon={<AlertCircle size={20} />} 
          status="down"
          trend="-4.2% Eficiencia"
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className={`lg:col-span-2 border rounded-[3.5rem] p-12 transition-all ${cardBg}`}>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className={`text-lg font-black tracking-tight ${textColor}`}>Curva de Ejecución (S)</h3>
              <p className={`text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1`}>Proyección vs Realidad SAP</p>
            </div>
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#EF3340]"></div>
                 <span className="text-[10px] font-black text-gray-400">PLAN</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                 <span className="text-[10px] font-black text-gray-400">REAL</span>
               </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorPlaneado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF3340" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF3340" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: '900' }}
                />
                {/* Fixed: removed invalid 'glow' property from activeDot */}
                <Area type="monotone" dataKey="planeado" stroke="#EF3340" fill="url(#colorPlaneado)" strokeWidth={4} dot={{ r: 4, fill: '#EF3340', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                <Area type="monotone" dataKey="real" stroke="#cbd5e1" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`border rounded-[3.5rem] p-12 transition-all ${cardBg}`}>
          <h3 className={`text-lg font-black tracking-tight mb-1 ${textColor}`}>Distribución Capex</h3>
          <p className={`text-[10px] font-black text-gray-400 uppercase tracking-widest mb-12`}>Por Dirección Operativa</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionAreaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="pct" fill="#EF3340" radius={[12, 12, 12, 12]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ title: string; value: string; icon: React.ReactNode; status: string; trend: string; theme: 'light' | 'dark'; color?: string }> = ({ title, value, icon, trend, theme, color }) => (
  <div className={`p-8 rounded-[3rem] border transition-all flex flex-col justify-between min-h-[200px] ${theme === 'dark' ? 'bg-[#0f1219] border-white/5 hover:border-[#EF3340]/30' : 'bg-white border-gray-100 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1'}`}>
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-800'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-black text-[#EF3340] bg-red-50 px-3 py-1 rounded-full uppercase tracking-tighter">{trend}</span>
    </div>
    <div>
      <h4 className={`text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1`}>{title}</h4>
      <div className={`text-3xl font-black tracking-tighter ${color || (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}>{value}</div>
    </div>
  </div>
);

export default Dashboard;
