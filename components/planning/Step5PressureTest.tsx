
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  Save, 
  Info,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

interface ProjectRow {
  proyecto: string;
  codigoProyecto: string;
  tipoProyecto: string;
  presupuestoCop: string;
  severity?: string;
  macroproyecto?: string;
  grupoCapex?: string;
  metodologia?: string;
  kpiPrincipal?: string;
}

interface Props {
  rows: ProjectRow[];
  theme: 'light' | 'dark';
}

const Step5PressureTest: React.FC<Props> = ({ rows, theme }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(rows.length > 0 ? 0 : null);
  const [decision, setDecision] = useState('Sin decisión');
  const [comments, setComments] = useState('');
  
  // Filtros
  const [filterType, setFilterType] = useState('Todos');
  const [filterMethod, setFilterMethod] = useState('Todas');
  const [filterSeverity, setFilterSeverity] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const [checklist, setChecklist] = useState({
    soporte: true,
    riesgo: false,
    metodologia: true,
    supuestos: true,
    contratos: false
  });

  const [finalOptions, setFinalOptions] = useState({
    reducirAlcance: false,
    reducirPresupuesto: false,
    reducirUnidades: false
  });

  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      const matchType = filterType === 'Todos' || row.tipoProyecto === filterType;
      const matchMethod = filterMethod === 'Todas' || row.metodologia === filterMethod;
      const matchSeverity = filterSeverity === 'Todas' || row.severity === filterSeverity;
      const matchSearch = searchQuery === '' || 
        row.proyecto.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.codigoProyecto.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchMethod && matchSeverity && matchSearch;
    });
  }, [rows, filterType, filterMethod, filterSeverity, searchQuery]);

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-sm';

  const selectedProject = selectedIdx !== null ? filteredRows[selectedIdx] : null;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFinalOption = (key: keyof typeof finalOptions) => {
    setFinalOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filterInputClass = "w-full px-4 py-3 text-[11px] font-medium text-black bg-[#DB0011]/10 rounded-xl border border-[#DB0011]/20 outline-none hover:bg-[#DB0011]/15 focus:border-[#DB0011] focus:ring-0 transition-all placeholder:text-gray-500";

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h3 className={`text-2xl font-black tracking-tighter ${textColor}`}>5. Pressure test a los proyectos de inversion</h3>
        <p className="text-sm text-gray-400 leading-relaxed max-w-4xl">
          Revisa la coherencia de cada línea presupuestal, los resultados del modelo (VPN, riesgo) y el resultado de la revisión del validador antes de enviarla a Comité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatusMiniCard label="TOTAL LÍNEAS" value="16" active theme={theme} />
        <StatusMiniCard label="SIN OBSERVACIONES" value="12" theme={theme} />
        <StatusMiniCard label="CON ADVERTENCIAS" value="2" theme={theme} />
        <StatusMiniCard label="CON ERRORES" value="2" theme={theme} />
        <StatusMiniCard label="SIN DECISIÓN" value="0" theme={theme} />
      </div>

      {/* Barra de Filtros con Estilo Mejorado */}
      <div className={`p-8 rounded-[2rem] border grid grid-cols-1 md:grid-cols-4 gap-6 items-end ${cardBg}`}>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tipo de proyecto</label>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={filterInputClass}
          >
            <option>Todos</option>
            <option>Crecimiento EBITDA</option>
            <option>Protección EBITDA</option>
            <option>Mantenimiento</option>
            <option>Negocios Adyacentes</option>
            <option>Obligatorio</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Metodología</label>
          <select 
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className={filterInputClass}
          >
            <option>Todas</option>
            <option>Estrategia de Producto</option>
            <option>Smart Capex</option>
            <option>Metodología valor en riesgo vs. probabilidad</option>
            <option>Urgencia vs. Costo</option>
            <option>Metodología de VPN/Inversión total</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Severidad</label>
          <select 
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className={filterInputClass}
          >
            <option>Todas</option>
            <option>Sin observaciones</option>
            <option>Advertencias</option>
            <option>Errores criticos</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Buscar</label>
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input 
              type="text" 
              placeholder="Codigo o nombre..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${filterInputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-12">
          <div className={`border rounded-[2.5rem] overflow-hidden ${cardBg}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead className={`font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-[#1a1f26] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                  <tr>
                    <th className="px-4 py-5 w-10 text-center">#</th>
                    <th className="px-4 py-5">Codigo</th>
                    <th className="px-4 py-5">Proyecto</th>
                    <th className="px-4 py-5">Tipo</th>
                    <th className="px-4 py-5">Metodologia</th>
                    <th className="px-4 py-5">Grupo Capex</th>
                    <th className="px-4 py-5">KPI principal</th>
                    <th className="px-4 py-5 text-center">Severidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit">
                  {filteredRows.map((row, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedIdx(idx)}
                      className={`cursor-pointer transition-all ${selectedIdx === idx ? 'bg-[#EF3340]/5 border-l-4 border-l-[#EF3340]' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-5 text-center text-gray-400 font-bold">{idx + 1}</td>
                      <td className="px-4 py-5 font-black text-[#EF3340]">{row.codigoProyecto}</td>
                      <td className="px-4 py-5 font-black text-gray-600 truncate max-w-[150px]">{row.proyecto}</td>
                      <td className="px-4 py-5 font-bold text-gray-500">{row.tipoProyecto}</td>
                      <td className="px-4 py-5 font-bold text-gray-500">{row.metodologia || 'Estrategia de Producto'}</td>
                      <td className="px-4 py-5 font-bold text-gray-500">{row.grupoCapex || 'Capex Fijo'}</td>
                      <td className="px-4 py-5 font-bold text-gray-500">{row.kpiPrincipal || 'VPN/I: 0.67'}</td>
                      <td className="px-4 py-5 text-center">
                        <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase border ${
                          row.severity === 'Errores criticos' ? 'bg-red-50 text-red-600 border-red-100' : 
                          row.severity === 'Advertencias' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {row.severity || 'Sin observaciones'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedProject && (
          <div className="lg:col-span-12">
            <div className={`p-10 rounded-[3rem] border flex flex-col transition-all shadow-xl ${cardBg} mt-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className={`text-xl font-black tracking-tighter ${textColor}`}>{selectedProject.proyecto}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 leading-relaxed">
                      Código: <span className="text-[#EF3340] font-black">{selectedProject.codigoProyecto}</span> | Tipo: {selectedProject.tipoProyecto} | Metodología: {selectedProject.metodologia || 'Estrategia de Producto'}
                    </p>
                    <p className="text-gray-500 font-bold text-[10px] mt-1 uppercase tracking-widest">Inversión (USD): $ 120.00 M USD</p>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-6">
                    <h5 className="text-[11px] font-black text-gray-900 mb-4 tracking-tight">Resumen del modelo</h5>
                    <div className="grid grid-cols-2 gap-y-3 text-[11px] font-bold">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-gray-400 text-[9px] uppercase tracking-widest">VPN modelo:</span>
                          <span className={textColor}>$ 80.00 M USD</span>
                       </div>
                       <div className="flex flex-col gap-0.5">
                          <span className="text-gray-400 text-[9px] uppercase tracking-widest">VPN/I:</span>
                          <span className="text-emerald-600">0.67</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[11px] font-black text-gray-900 mb-3 tracking-tight">Validaciones automáticas</h5>
                    <div className="space-y-2">
                       <ValidationPill type="success" text="OK: VPN no es negativo." />
                       <ValidationPill type="success" text="OK: VPN/I no es negativo." />
                       <ValidationPill type="success" text="OK: VPN/I no es bajo." />
                       <ValidationPill type="info" text="OK: VPN/I dentro de rango esperado." />
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-8 space-y-4">
                    <h5 className="text-[11px] font-black text-gray-900 mb-4 text-center tracking-tight">Checklist de revisión del validador</h5>
                    <div className="flex flex-col gap-5 items-center bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                       <FormCheckItem checked={checklist.soporte} onChange={() => toggleCheck('soporte')} text="He revisado los archivos de soporte de probabilidad." />
                       <FormCheckItem checked={checklist.riesgo} onChange={() => toggleCheck('riesgo')} text="He revisado los soportes del valor en riesgo (VR) y su calculo." />
                       <FormCheckItem checked={checklist.metodologia} onChange={() => toggleCheck('metodologia')} text="La metodologia aplicada es coherente con el tipo de proyecto." />
                       <FormCheckItem checked={checklist.supuestos} onChange={() => toggleCheck('supuestos')} text="Los supuestos de VPN / VPN/I son consistentes con la informacion disponible." />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Comentarios del validador</label>
                    <div className="w-full px-6 py-4 bg-white border border-dashed border-blue-200 rounded-2xl text-[11px] font-medium text-gray-600">
                      Requiere ajuste de soportes/supuestos antes de comite.
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-8 space-y-6">
                    <h5 className="text-[11px] font-black text-gray-900 tracking-tight">Decisión del Comité</h5>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Decisión</label>
                      <div className="relative">
                        <select value={decision} onChange={(e) => setDecision(e.target.value)} className="w-full appearance-none px-6 py-4 text-[11px] font-black rounded-2xl border border-gray-200 bg-white outline-none focus:border-[#EF3340]">
                          <option>Sin decisión</option>
                          <option>Rechazar</option>
                          <option>Modificar</option>
                          <option>Aprobar</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Comentarios al responsable</label>
                      <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Escribe aquí tus comentarios..." className="w-full h-32 px-6 py-5 text-[11px] font-bold rounded-[2rem] border border-gray-100 bg-gray-50 outline-none focus:border-[#EF3340] resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-2">
                    <FinalCheckItem checked={finalOptions.reducirAlcance} onChange={() => toggleFinalOption('reducirAlcance')} text="Reducir alcance" />
                    <FinalCheckItem checked={finalOptions.reducirPresupuesto} onChange={() => toggleFinalOption('reducirPresupuesto')} text="Reducir presupuesto" />
                    <FinalCheckItem checked={finalOptions.reducirUnidades} onChange={() => toggleFinalOption('reducirUnidades')} text="Reducir unidades" />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="bg-[#EF3340] hover:bg-[#D62E39] text-white text-[12px] font-black px-14 py-5 rounded-2xl shadow-xl flex items-center gap-3">
                      <Save size={18} /> Guardar decisión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusMiniCard: React.FC<{ label: string, value: string, active?: boolean, theme: string }> = ({ label, value, active }) => (
  <div className={`p-6 rounded-[1.5rem] border flex flex-col items-start transition-all ${
    active ? 'bg-[#EF3340]/10 border-[#EF3340]/40' : 'bg-[#EF3340]/5 border-[#EF3340]/10'
  }`}>
    <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-black">{label}</p>
    <p className="text-2xl font-black text-black">{value}</p>
  </div>
);

const ValidationPill: React.FC<{ type: 'success' | 'info'; text: string }> = ({ type, text }) => (
  <div className={`flex items-center gap-4 px-5 py-2.5 rounded-xl border text-[10px] font-black tracking-tight ${
    type === 'success' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100' : 'bg-blue-50/50 text-blue-600 border-blue-100'
  }`}>
    <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${type === 'success' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
      <CheckCircle2 size={12} strokeWidth={4} />
    </div>
    <span className="tracking-tight uppercase">{text}</span>
  </div>
);

const FormCheckItem: React.FC<{ checked: boolean; onChange: () => void; text: string }> = ({ checked, onChange, text }) => (
  <div onClick={onChange} className="flex flex-col items-center gap-2 group cursor-pointer text-center max-w-[320px]">
    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-[#EF3340] border-[#EF3340]' : 'bg-white border-gray-200 group-hover:border-[#EF3340]'}`}>
      {checked && <CheckSquare size={12} className="text-white" strokeWidth={4} />}
    </div>
    <span className={`text-[10px] font-bold ${checked ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'}`}>{text}</span>
  </div>
);

const FinalCheckItem: React.FC<{ checked: boolean; onChange: () => void; text: string }> = ({ checked, onChange, text }) => (
  <label className="flex items-center gap-3 group cursor-pointer w-fit">
    <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${checked ? 'bg-[#EF3340] border-[#EF3340]' : 'bg-white border-gray-300 group-hover:border-[#EF3340]'}`}>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {checked && <CheckSquare size={12} className="text-white" strokeWidth={4} />}
    </div>
    <span className={`text-[11px] font-bold uppercase tracking-widest ${checked ? 'text-[#EF3340]' : 'text-gray-400'}`}>{text}</span>
  </label>
);

export default Step5PressureTest;
