import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../services/dbService';
import { 
  Mail, 
  Lock, 
  LogIn, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Eye, 
  Activity,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface Props {
  onLogin: (u: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Credenciales requeridas');
      return;
    }

    setLoading(true);
    
    try {
      // Conexión con el servicio MySQL
      const user = await db.authenticateUser(email, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Usuario no encontrado en base de datos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { 
      icon: <TrendingUp size={20} />, 
      title: "Modelado Heurístico", 
      desc: "Algoritmos avanzados para la optimización de inversión CAPEX." 
    },
    { 
      icon: <Sparkles size={20} />, 
      title: "IA Generativa Sophie", 
      desc: "Asistente inteligente para la validación de casos de negocio." 
    },
    { 
      icon: <ShieldCheck size={20} />, 
      title: "Gobernanza 360°", 
      desc: "Control total desde la demanda hasta la ejecución real SAP." 
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#FDFDFD] overflow-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes rotate-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float { animation: float 20s infinite ease-in-out; }
        .bg-mesh {
          background-image: radial-gradient(at 0% 0%, rgba(239, 51, 64, 0.15) 0px, transparent 50%),
                            radial-gradient(at 100% 100%, rgba(239, 51, 64, 0.1) 0px, transparent 50%);
        }
      `}</style>

      {/* Panel Izquierdo Informativo */}
      <div className="hidden lg:flex w-1/2 bg-[#0f1219] relative overflow-hidden flex-col justify-center p-24">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#EF3340] opacity-[0.08] rounded-full blur-[120px] animate-float"></div>
        
        <div className="relative z-10 max-w-md">
          <div className="space-y-12">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#EF3340] flex items-center justify-center text-white shadow-lg">
                  <Cpu size={24} />
                </div>
                <span className="text-[10px] font-black text-[#EF3340] uppercase tracking-[0.4em]">Sophie Engine v.2027</span>
              </div>
              <h2 className="text-7xl font-black text-white tracking-tighter leading-[0.8] mb-8">
                SOPHIE <br />
                <span className="text-gray-600">Portal de</span> <br />
                <span className="text-[#EF3340]">Planeación</span>
              </h2>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Strategic Operations & Planning Heuristic Investment Engine. La inteligencia detrás del despliegue tecnológico.
              </p>
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-5 group cursor-default p-4 rounded-2xl transition-all hover:bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF3340] transition-all group-hover:bg-[#EF3340] group-hover:text-white">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white mb-1">{f.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-white bg-mesh">
        <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-700 relative z-10">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-[#EF3340] to-[#b01e28] rounded-[2rem] flex items-center justify-center text-white shadow-2xl mx-auto mb-8 animate-pulse">
              <Sparkles size={40} />
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tighter">SOPHIE</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Acceso Seguro Claro Colombia</p>
            <div className="w-12 h-1 bg-[#EF3340] mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Identidad Digital</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#EF3340] transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-3xl focus:ring-8 focus:ring-red-500/5 focus:border-[#EF3340] outline-none transition-all font-black text-gray-900 text-sm shadow-sm"
                  placeholder="usuario@claro.com.co"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Llave Maestra</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#EF3340] transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-3xl focus:ring-8 focus:ring-red-500/5 focus:border-[#EF3340] outline-none transition-all font-black text-gray-900 text-sm shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-[#EF3340] text-[10px] font-black rounded-2xl flex items-center gap-4">
                <ShieldCheck size={18} /> {error.toUpperCase()}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#EF3340] hover:bg-[#D62E39] text-white font-black py-6 rounded-[2.5rem] shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] disabled:opacity-70 text-[11px] tracking-[0.2em]"
            >
              {loading ? <RefreshCw className="animate-spin" /> : "INICIAR SESIÓN CON SOPHIE"}
              {!loading && <ChevronRight size={18} />}
            </button>
          </form>

          <div className="mt-20 pt-8 border-t border-gray-100 text-center">
             <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.3em]">
               Protocolo Sophie-Shield • Heuristic Analysis Engine
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export default Login;