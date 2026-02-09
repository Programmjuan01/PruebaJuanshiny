
import React, { useState, useEffect } from 'react';
import { AppPhase, User, Budget, Expense } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import FollowUp from './components/FollowUp';
import UserManagement from './components/UserManagement';
import TechWatch from './components/TechWatch';
import BudgetParameters from './components/BudgetParameters';
import DatabaseSettings from './components/DatabaseSettings';
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  ShieldCheck,
  Milestone,
  Network,
  TrendingUp,
  Cpu,
  Bell,
  Eye,
  Settings,
  Settings2,
  Zap,
  ArrowRight,
  ListChecks,
  Database,
  Server
} from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [dbConnected, setDbConnected] = useState(true);
  const [budget, setBudget] = useState<Budget>({
    totalIncome: 1250000,
    fixedCosts: [],
    savingsTarget: 250000,
    currency: 'COP'
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [openCats, setOpenCats] = useState<Record<string, boolean>>({
    inversion: true,
    estrategia: true,
    admin: true
  });

  const toggleCat = (cat: string) => {
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('budget_user');
    const savedTheme = localStorage.getItem('app_theme') as 'light' | 'dark';
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPhase(AppPhase.PORTAL_HOME);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('app_theme', newTheme);
  };

  const handleLogin = (u: any) => {
    const fullUser: User = { 
      ...u, 
      role: u.email.includes('admin') ? 'ADMIN' : 'RESP', 
      area: 'Operaciones',
      status: 'ACTIVO'
    };
    setUser(fullUser);
    localStorage.setItem('budget_user', JSON.stringify(fullUser));
    setPhase(AppPhase.PORTAL_HOME);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('budget_user');
    setPhase(AppPhase.LOGIN);
  };

  if (phase === AppPhase.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  const themeClasses = theme === 'dark' 
    ? "bg-[#0b0e14] text-gray-200" 
    : "bg-[#FDFDFD] text-gray-800";

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-all duration-500 ${themeClasses}`}>
      <style>{`
        .card-perspective { perspective: 2000px; }
        .card-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .card-perspective:hover .card-inner { transform: rotateY(180deg); }
        .card-front, .card-back {
          position: absolute; width: 100%; height: 100%;
          -webkit-backface-visibility: hidden; backface-visibility: hidden;
          border-radius: 3.5rem;
        }
        .card-back { transform: rotateY(180deg); }
      `}</style>

      <aside className={`w-full md:w-80 flex flex-col sticky top-0 md:h-screen z-[60] transition-all duration-500 ${theme === 'dark' ? 'bg-[#0f1219]/90 border-r border-white/5' : 'bg-white/80 border-r border-gray-100'} backdrop-blur-2xl`}>
        <div className="p-10">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setPhase(AppPhase.PORTAL_HOME)}>
            <div className="w-12 h-12 bg-gradient-to-br from-[#EF3340] to-[#b01e28] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_-5px_rgba(239,51,64,0.4)] transition-transform group-hover:scale-110">
              <Cpu size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className={`text-sm font-black tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PORTAL</h1>
              <h1 className={`text-sm font-black tracking-tighter text-[#EF3340]`}>TECNOLÓGICO</h1>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 space-y-4 scrollbar-hide py-4">
          <NavItem active={phase === AppPhase.PORTAL_HOME} onClick={() => setPhase(AppPhase.PORTAL_HOME)} icon={<LayoutDashboard size={18} />} label="Home Central" theme={theme} />

          <div className="space-y-1">
            <NavCategory label="Inversión & CAPEX" isOpen={openCats.inversion} onToggle={() => toggleCat('inversion')} icon={<TrendingUp size={16} />} theme={theme} />
            {openCats.inversion && (
              <div className="space-y-1 pl-4 animate-in slide-in-from-top-2 duration-300">
                <NavItem active={phase === AppPhase.CAPEX_DASHBOARD} onClick={() => setPhase(AppPhase.CAPEX_DASHBOARD)} icon={<Activity size={18} />} label="Dashboard Capex" theme={theme} isSubItem />
                <NavItem active={phase === AppPhase.CAPEX_PLANNING} onClick={() => setPhase(AppPhase.CAPEX_PLANNING)} icon={<FileText size={18} />} label="Planeación 2027" theme={theme} isSubItem />
                <NavItem active={phase === AppPhase.CAPEX_FOLLOWUP} onClick={() => setPhase(AppPhase.CAPEX_FOLLOWUP)} icon={<Milestone size={18} />} label="Seguimiento 0+n" theme={theme} isSubItem />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <NavCategory label="Estrategia Tech" isOpen={openCats.estrategia} onToggle={() => toggleCat('estrategia')} icon={<Eye size={16} />} theme={theme} />
            {openCats.estrategia && (
              <div className="space-y-1 pl-4 animate-in slide-in-from-top-2 duration-300">
                <NavItem active={phase === AppPhase.TECH_WATCH} onClick={() => setPhase(AppPhase.TECH_WATCH)} icon={<Zap size={18} />} label="Vigilancia Tech" theme={theme} isSubItem />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <NavCategory label="Administración" isOpen={openCats.admin} onToggle={() => toggleCat('admin')} icon={<Settings size={16} />} theme={theme} />
            {openCats.admin && (
              <div className="space-y-1 pl-4 animate-in slide-in-from-top-2 duration-300">
                <NavItem active={phase === AppPhase.USER_MGMT} onClick={() => setPhase(AppPhase.USER_MGMT)} icon={<ShieldCheck size={18} />} label="Accesos y Roles" theme={theme} isSubItem />
                <NavItem active={phase === AppPhase.BUDGET_PARAMETERS} onClick={() => setPhase(AppPhase.BUDGET_PARAMETERS)} icon={<Settings2 size={18} />} label="Parámetros Presupuesto" theme={theme} isSubItem />
                <NavItem active={phase === AppPhase.DATABASE_CONFIG} onClick={() => setPhase(AppPhase.DATABASE_CONFIG)} icon={<Database size={18} />} label="Configuración MySQL" theme={theme} isSubItem />
              </div>
            )}
          </div>
        </nav>

        <div className="p-8 mt-auto">
          <div className={`p-6 rounded-[2rem] flex flex-col gap-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <button onClick={toggleTheme} className="p-3 rounded-xl bg-white shadow-sm text-gray-400 hover:text-[#EF3340] transition-all">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] text-gray-400 hover:text-[#EF3340] font-black tracking-widest transition-colors">
                <LogOut size={16} /> SALIR
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className={`h-24 flex items-center justify-between px-12 sticky top-0 z-50 transition-all duration-500 ${theme === 'dark' ? 'bg-[#0b0e14]/70 border-b border-white/5' : 'bg-[#FDFDFD]/70 border-b border-gray-100'} backdrop-blur-xl`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#EF3340] animate-pulse glow-red"></div>
              <h2 className={`text-[11px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {phase.replace(/_/g, ' ')}
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
               <Server size={14} className="text-emerald-500" />
               <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Conexión MySQL: Estable</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <button className="text-gray-400 hover:text-[#EF3340] relative p-2">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#EF3340] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sesión Activa</span>
                <span className={`text-[12px] font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name.toUpperCase()}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center font-black text-[#EF3340] shadow-sm">
                {user?.name[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-[1400px] mx-auto min-h-screen">
          {phase === AppPhase.PORTAL_HOME && <PortalHome user={user} theme={theme} setPhase={setPhase} />}
          {phase === AppPhase.CAPEX_DASHBOARD && <Dashboard budget={budget} expenses={expenses} theme={theme} onAddExpense={()=>{}} onRemoveExpense={()=>{}} />}
          {phase === AppPhase.CAPEX_PLANNING && <Planning budget={budget} onSave={(b) => { setBudget(b); setPhase(AppPhase.CAPEX_DASHBOARD); }} theme={theme} />}
          {phase === AppPhase.CAPEX_FOLLOWUP && <FollowUp theme={theme} />}
          {phase === AppPhase.TECH_WATCH && <TechWatch theme={theme} />}
          {phase === AppPhase.USER_MGMT && <UserManagement theme={theme} />}
          {phase === AppPhase.BUDGET_PARAMETERS && <BudgetParameters theme={theme} />}
          {phase === AppPhase.DATABASE_CONFIG && <DatabaseSettings theme={theme} />}
        </div>
      </main>
    </div>
  );
};

const NavCategory: React.FC<{ label: string; isOpen: boolean; onToggle: () => void; icon: React.ReactNode; theme: string }> = ({ label, isOpen, onToggle, icon, theme }) => {
  const isDark = theme === 'dark';
  return (
    <button onClick={onToggle} className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all group ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 group-hover:text-[#EF3340] transition-colors">{icon}</span>
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>{label}</span>
      </div>
      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; theme: 'light' | 'dark'; disabled?: boolean; isSubItem?: boolean }> = ({ active, onClick, icon, label, theme, disabled, isSubItem }) => {
  const isDark = theme === 'dark';
  return (
    <button disabled={disabled} onClick={onClick} className={`w-full flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 ${disabled ? 'opacity-20 cursor-not-allowed' : active ? isDark ? 'bg-white/5 text-white border border-white/10 shadow-lg' : 'bg-red-50 text-[#EF3340] border border-red-100 shadow-sm' : isDark ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-[#EF3340] hover:bg-gray-50'} ${isSubItem ? 'scale-[0.98]' : ''}`}>
      <div className="flex items-center gap-4">
        <span className={`${active ? 'text-[#EF3340]' : ''} transition-transform duration-300 ${active ? 'scale-110' : ''}`}>{icon}</span>
        <span className={`text-[11px] font-black tracking-tight ${active ? 'translate-x-1' : ''} transition-transform`}>{label}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-[#EF3340] glow-red"></div>}
    </button>
  );
};

const PortalHome: React.FC<{ user: User | null; theme: string; setPhase: (p: AppPhase) => void }> = ({ user, theme, setPhase }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="max-w-4xl">
        <div className="inline-block px-5 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
          <span className="text-[10px] font-black text-[#EF3340] uppercase tracking-[0.2em]">Persistencia MySQL Centralizada</span>
        </div>
        <h2 className={`text-6xl font-black tracking-tighter mb-6 leading-[0.9] ${textColor}`}>
          Arquitectura de Datos <br />
          <span className="text-[#EF3340]">Escalable & Robusta.</span>
        </h2>
        <p className="text-gray-400 font-medium text-xl leading-relaxed max-w-2xl">
          Toda la información del portal se sincroniza en tiempo real con el clúster MySQL corporativo, asegurando integridad en Capex y Roadmaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ModuleCard theme={theme} title="Gestión Capex" subtitle="Capital Expenditure" icon={<TrendingUp size={32} />} desc="Control financiero y ciclo de vida de inversión desde la demanda hasta la ejecución real SAP." detailedDesc="Optimice el despliegue de capital mediante el seguimiento preciso de PEPs, solicitudes de pedido y órdenes de compra. Integre flujos de trabajo de aprobación multinivel y asegure el cumplimiento de los objetivos financieros con auditorías en tiempo real." features={["Seguimiento SAP batch", "Auditoría IA", "Planeación 0+n"]} color="#EF3340" onClick={() => setPhase(AppPhase.CAPEX_DASHBOARD)} />
        <ModuleCard theme={theme} title="Vigilancia Tech" subtitle="Trends & Radar" icon={<Eye size={32} />} desc="Monitoreo de tendencias trimestrales y toma de decisiones estratégicas sobre nuevas tecnologías." detailedDesc="Explore el horizonte tecnológico a través de un radar especializado que identifica tendencias emergentes en IA, conectividad y arquitectura. Evalúe el impacto estratégico y financiero de cada innovación para construir casos de negocio robustos." features={["Radar de Tendencias", "Workflow de Casos", "Impacto Predictivo"]} color="#10B981" onClick={() => setPhase(AppPhase.TECH_WATCH)} />
      </div>
    </div>
  );
};

const ModuleCard: React.FC<{ theme: string; title: string; subtitle: string; icon: React.ReactNode; desc: string; detailedDesc?: string; features?: string[]; color: string; onClick?: () => void; disabled?: boolean }> = ({ theme, title, subtitle, icon, desc, detailedDesc, features, color, onClick, disabled }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`card-perspective w-full h-[480px] ${disabled ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="card-inner w-full h-full">
        <div className={`card-front p-12 border flex flex-col ${isDark ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]'}`}>
          <div className="flex justify-between items-start mb-12">
            <div className={`p-5 rounded-3xl bg-gray-50 text-gray-800 transition-all duration-500 group-hover:bg-[#EF3340] group-hover:text-white`} style={{ color: color }}>
              {icon}
            </div>
          </div>
          <h3 className={`text-3xl font-black tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className="text-[#EF3340] text-[10px] font-black uppercase tracking-[0.3em] mb-6">{subtitle}</p>
          <p className="text-gray-400 font-medium leading-relaxed mb-12 flex-1">{desc}</p>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#EF3340] animate-pulse">
            Pasa el mouse para más detalle <ArrowRight size={14} strokeWidth={3} />
          </div>
        </div>
        <div className={`card-back p-12 border flex flex-col justify-between ${isDark ? 'bg-[#1a1f26] border-[#EF3340]/40' : 'bg-[#0f1219] border-[#EF3340]/40 text-white shadow-2xl'}`}>
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-[#EF3340]/20 flex items-center justify-center text-[#EF3340]">
                  <ListChecks size={20} />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest text-white">Capacidades Core</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-10 font-medium">{detailedDesc}</p>
            <div className="space-y-4 mb-10">
              {features?.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF3340]"></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={!disabled ? onClick : undefined} className="w-full py-5 bg-[#EF3340] text-white text-[10px] font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-[#D62E39] transition-all tracking-[0.2em]">
            ACCEDER AL MÓDULO <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
