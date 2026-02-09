
import React, { useMemo, useState } from 'react';
import { 
  ChevronDown, 
  UserPlus, 
  Lock, 
  HardHat, 
  ShieldAlert, 
  TrendingUp, 
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Layers,
  DollarSign
} from 'lucide-react';

interface ProjectRow {
  id?: string;
  macroproyecto: string;
  proyecto: string;
  gerente: string;
  presupuestoCop: string;
  codigoProyecto: string;
}

interface Props {
  rows: ProjectRow[];
  theme: 'light' | 'dark';
  macroClassifications: Record<string, { category: string; responsable: string }>;
  setMacroClassifications: React.Dispatch<React.SetStateAction<Record<string, { category: string; responsable: string }>>>;
}

const Step2Clasificacion: React.FC<Props> = ({ rows, theme, macroClassifications, setMacroClassifications }) => {
  const [viewingMacro, setViewingMacro] = useState<string | null>(null);

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-sm';

  // Obtenemos macroproyectos únicos con sus totales calculados
  const macroStats = useMemo(() => {
    const stats: Record<string, { total: number; count: number; items: ProjectRow[] }> = {};
    rows.forEach(row => {
      const name = row.macroproyecto || "SIN MACROPROYECTO";
      if (!stats[name]) stats[name] = { total: 0, count: 0, items: [] };
      stats[name].total += Number(row.presupuestoCop) || 0;
      stats[name].count += 1;
      stats[name].items.push(row);
    });
    return stats;
  }, [rows]);

  const uniqueMacros = Object.keys(macroStats);

  const categories = [
    { id: 'Obligatorio', label: 'Obligatorio', icon: <Lock size={20} />, color: 'text-red-600', bgColor: 'bg-red-50', methodology: 'Validación Regulatoria' },
    { id: 'Mantenimiento', label: 'Mantenimiento', icon: <HardHat size={20} />, color: 'text-orange-600', bgColor: 'bg-orange-50', methodology: 'Continuidad de Servicio' },
    { id: 'Proteccion EBITDA', label: 'Protección EBITDA', icon: <ShieldAlert size={20} />, color: 'text-rose-600', bgColor: 'bg-rose-50', methodology: 'Caso de Negocio' },
    { id: 'Crecimiento EBITDA', label: 'Crecimiento EBITDA', icon: <TrendingUp size={20} />, color: 'text-emerald-600', bgColor: 'bg-emerald-50', methodology: 'Caso de Negocio' },
    { id: 'Negocios Adyacentes', label: 'Negocios Adyacentes', icon: <Lightbulb size={20} />, color: 'text-indigo-600', bgColor: 'bg-indigo-50', methodology: 'Caso de Negocio' },
  ];

  const handleUpdate = (macro: string, field: 'category' | 'responsable', value: string) => {
    setMacroClassifications(prev => ({
      ...prev,
      [macro]: {
        ...(prev[macro] || { category: '', responsable: '' }),
        [field]: value
      }
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700 space-y-12 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#EF3340] animate-pulse"></div>
             <span className="text-[10px] font-black text-[#EF3340] uppercase tracking-[0.3em]">Governance Step 02</span>
          </div>
          <h3 className={`text-4xl font-black tracking-tighter ${textColor}`}>Clasificación Estratégica</h3>
          <p className={`text-[14px] ${subTextColor} font-medium max-w-2xl`}>
            Defina la categoría de inversión para cada <b>Macroproyecto</b>. El responsable asignado será el garante de la veracidad técnica en las fases de soporte.
          </p>
        </div>
      </div>

      <div className={`rounded-[3.5rem] border overflow-hidden ${cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`font-black uppercase tracking-widest text-[10px] ${theme === 'dark' ? 'bg-[#1a1f26] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              <tr>
                <th className="px-10 py-8">Macroproyecto</th>
                <th className="px-10 py-8">Valor Total (COP)</th>
                <th className="px-10 py-8">Resp. Planeación</th>
                <th className="px-10 py-8">Categoría</th>
                <th className="px-10 py-8 text-center">Iniciativas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {uniqueMacros.map((macro, idx) => {
                const stats = macroStats[macro];
                const config = macroClassifications[macro] || { category: '', responsable: '' };
                const selectedCat = categories.find(c => c.id === config.category);
                const isResponsableMissing = !config.responsable;

                return (
                  <tr key={idx} className={`transition-all border-inherit ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-red-50/10'}`}>
                    <td className="px-10 py-8">
                       <div className="flex flex-col">
                          <span className={`text-[13px] font-black ${textColor}`}>{macro.toUpperCase()}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">ID: CPX-MCR-{idx + 100}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`text-[13px] font-black text-[#EF3340]`}>$ {stats.total.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="relative group">
                          <UserPlus className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isResponsableMissing ? 'text-red-400' : 'text-gray-300'}`} size={14} />
                          <input 
                            type="text"
                            value={config.responsable}
                            onChange={(e) => handleUpdate(macro, 'responsable', e.target.value)}
                            placeholder="Nombre del responsable..."
                            className={`w-full pl-11 pr-4 py-3 text-[11px] font-bold rounded-xl border outline-none transition-all ${
                              isResponsableMissing 
                                ? 'bg-red-50 border-red-200 focus:border-red-500 placeholder:text-red-300' 
                                : theme === 'dark' ? 'bg-[#0b0e14] border-[#2d3748] focus:border-[#EF3340]' : 'bg-gray-50 border-gray-100 focus:border-[#EF3340]'
                            }`}
                          />
                          {isResponsableMissing && (
                            <span className="absolute -bottom-5 left-1 text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">Obligatorio por Sophie</span>
                          )}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="relative">
                        <select
                          value={config.category}
                          onChange={(e) => handleUpdate(macro, 'category', e.target.value)}
                          className={`w-full appearance-none px-4 py-3 text-[11px] font-black rounded-xl border outline-none transition-all cursor-pointer ${
                            config.category ? `${selectedCat?.bgColor} ${selectedCat?.color} border-current` : theme === 'dark' ? 'bg-[#0b0e14] border-[#2d3748]' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <option value="">Categorizar...</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <button 
                         onClick={() => setViewingMacro(macro)}
                         className={`p-3 rounded-xl transition-all flex items-center gap-2 mx-auto ${
                           theme === 'dark' ? 'bg-white/5 text-white hover:bg-[#EF3340]' : 'bg-gray-50 text-gray-400 hover:bg-[#EF3340] hover:text-white'
                         }`}
                       >
                          <Eye size={16} />
                          <span className="text-[10px] font-black uppercase">{stats.count} Ver</span>
                       </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalle de Macroproyecto */}
      {viewingMacro && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className={`w-full max-w-3xl rounded-[3.5rem] border shadow-2xl flex flex-col max-h-[85vh] overflow-hidden ${cardBg}`}>
            <div className="p-10 border-b border-inherit flex justify-between items-center bg-gray-50/5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#EF3340] text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black tracking-tighter ${textColor}`}>{viewingMacro}</h3>
                  <p className="text-[10px] font-black text-[#EF3340] uppercase tracking-[0.3em] mt-1">Iniciativas Relacionadas</p>
                </div>
              </div>
              <button onClick={() => setViewingMacro(null)} className="p-3 hover:bg-red-50 rounded-full transition-all text-gray-400"><X size={28} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-4">
              {macroStats[viewingMacro].items.map((item, i) => (
                <div key={i} className={`p-6 rounded-3xl border flex items-center justify-between transition-all hover:border-[#EF3340]/20 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-black ${textColor}`}>{item.proyecto}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{item.codigoProyecto}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-[10px] font-medium text-gray-400 italic">Gerente: {item.gerente}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Presupuesto</p>
                     <p className={`text-sm font-black ${textColor}`}>$ {Number(item.presupuestoCop).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 border-t border-inherit bg-gray-50/10 flex justify-between items-center">
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inversión Total Agregada</p>
                 <p className="text-2xl font-black text-[#EF3340]">$ {macroStats[viewingMacro].total.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setViewingMacro(null)}
                className="px-10 py-4 bg-gray-900 text-white text-[11px] font-black rounded-2xl hover:bg-black transition-all shadow-xl"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Clasificacion;
