import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Upload, 
  Clock,
  Briefcase,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ProjectRow {
  macroproyecto: string;
}

interface Props {
  rows: ProjectRow[];
  theme: 'light' | 'dark';
  macroClassifications: Record<string, { category: string; responsable: string }>;
}

const Step3Soporte: React.FC<Props> = ({ rows, theme, macroClassifications }) => {
  const [selectedMacro, setSelectedMacro] = useState<string | null>(null);

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-sm';

  // Macroproyectos únicos
  const uniqueMacros: string[] = Array.from(new Set(rows.map(r => r.macroproyecto))).filter((m): m is string => !!m && (m as string).trim() !== "");

  // Mapeo de Categoría a Tipo de Evaluación (Gobernanza SOPHIE)
  const getRequiredEvalType = (category: string) => {
    if (category === 'Obligatorio') return 'Evidencia Regulatoria';
    if (category === 'Mantenimiento') return 'Matriz de Riesgo';
    if (['Proteccion EBITDA', 'Crecimiento EBITDA', 'Negocios Adyacentes'].includes(category)) return 'Caso de Negocio';
    return null;
  };

  const selectedConfig = selectedMacro ? macroClassifications[selectedMacro] : null;
  const activeEvalType = selectedConfig ? getRequiredEvalType(selectedConfig.category) : null;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700 space-y-12 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#EF3340] animate-pulse"></div>
             <span className="text-[10px] font-black text-[#EF3340] uppercase tracking-[0.3em]">SOPHIE Governanace</span>
          </div>
          <h3 className={`text-4xl font-black tracking-tighter ${textColor}`}>Desarrollo de Soportes</h3>
          <p className={`text-[14px] ${subTextColor} font-medium max-w-2xl leading-relaxed`}>
            De acuerdo a la clasificación asignada por SOPHIE, cada <b>Macroproyecto</b> debe cargar su respectivo modelo de evaluación técnica y financiera.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Listado Izquierdo: Macroproyectos */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-6 mb-4">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estructura Capex</span>
             <span className="text-[10px] font-black text-gray-300">{uniqueMacros.length} TOTAL</span>
          </div>
          {uniqueMacros.map((macro, idx) => {
            const macroStr = macro as string;
            const config = macroClassifications[macroStr];
            const isActive = selectedMacro === macroStr;
            const isClassified = !!config?.category;

            return (
              <button 
                key={idx}
                onClick={() => setSelectedMacro(macroStr)}
                className={`w-full p-6 text-left rounded-[2.5rem] border transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#EF3340] border-[#EF3340] shadow-2xl shadow-red-500/20 -translate-y-1' 
                    : `${cardBg} hover:border-[#EF3340]/30`
                }`}
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#EF3340]/10 group-hover:text-[#EF3340]'
                  }`}>
                    <Briefcase size={22} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[13px] font-black tracking-tight ${isActive ? 'text-white' : textColor}`}>{(macroStr).toUpperCase()}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isActive ? 'text-white/60' : isClassified ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {config?.category || 'Sin Clasificación'}
                    </p>
                  </div>
                  {isClassified ? <CheckCircle2 size={16} className={isActive ? 'text-white' : 'text-emerald-500'} /> : <AlertCircle size={16} className="text-amber-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel Derecho: Bloques de Evaluación (Imagen Réplica) */}
        <div className="lg:col-span-8">
          <div className={`h-full min-h-[650px] rounded-[3.5rem] border p-12 flex flex-col items-center justify-center ${cardBg}`}>
            {!selectedMacro ? (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-[3rem] flex items-center justify-center text-gray-200 mx-auto border-2 border-dashed border-gray-100">
                   <FileSearch size={48} strokeWidth={1} />
                </div>
                <h4 className={`text-xl font-black ${textColor}`}>Seleccione Macroproyecto</h4>
                <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto italic">SOPHIE requiere la selección de una unidad de inversión para habilitar los modelos de soporte.</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-500">
                <div className="text-left border-b border-inherit pb-10 mb-12 flex justify-between items-end">
                  <div>
                    <h4 className={`text-4xl font-black tracking-tighter ${textColor}`}>{selectedMacro}</h4>
                    <div className="flex items-center gap-3 mt-3">
                       <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[9px] font-black rounded-lg uppercase tracking-widest">Responsable: {selectedConfig?.responsable || 'TBD'}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase italic">ID: CPX-MACRO-{selectedMacro.slice(0,3)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.4em] mb-10 text-center border-b border-gray-100 pb-4">EVALUACIÓN</h5>
                  
                  {/* RÉPLICA DE LOS BLOQUES GRISES DE LA IMAGEN */}
                  <EvaluationBlock 
                    label="Evidencia Regulatoria" 
                    isActive={activeEvalType === 'Evidencia Regulatoria'} 
                    theme={theme}
                  />
                  
                  <EvaluationBlock 
                    label="Matriz de Riesgo" 
                    isActive={activeEvalType === 'Matriz de Riesgo'} 
                    theme={theme}
                  />
                  
                  <EvaluationBlock 
                    label="Caso de Negocio" 
                    isActive={activeEvalType === 'Caso de Negocio'} 
                    theme={theme}
                  />

                  {/* Advertencia si no hay clasificación */}
                  {!activeEvalType && (
                    <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100 flex items-center gap-5 text-amber-700">
                       <AlertCircle size={24} className="shrink-0" />
                       <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-widest">Macroproyecto Sin Clasificar</p>
                          <p className="text-[11px] font-medium leading-tight">Por favor, regrese al <b>Paso 2</b> para definir la categoría estratégica de este macroproyecto y habilitar su evaluación.</p>
                       </div>
                    </div>
                  )}
                </div>

                <div className="mt-14 pt-8 border-t border-inherit flex flex-col items-center gap-6">
                   <button 
                     disabled={!activeEvalType}
                     className={`w-full py-6 rounded-[2rem] text-[11px] font-black tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 ${
                       activeEvalType 
                        ? 'bg-gray-900 text-white hover:bg-black' 
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                     }`}
                   >
                      <Upload size={18} /> CARGAR MODELO / SOPORTE
                   </button>
                   <div className="flex items-center gap-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <span>SOPHIE ENGINE VALIDATION</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span>ENCRIPTACIÓN AES-256</span>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface EvalBlockProps {
  label: string;
  isActive: boolean;
  theme: 'light' | 'dark';
}

const EvaluationBlock: React.FC<EvalBlockProps> = ({ label, isActive, theme }) => {
  return (
    <div className={`p-10 rounded-[2.5rem] border-2 transition-all relative group flex items-center justify-between ${
      isActive 
        ? 'bg-gray-200 border-[#EF3340]/20 cursor-pointer hover:shadow-2xl hover:bg-gray-300/80 -translate-x-1' 
        : 'bg-gray-50 border-transparent opacity-20 cursor-not-allowed'
    }`}>
      <div className="flex flex-col">
        <span className={`text-lg font-bold tracking-tight ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
          {label}
        </span>
        {isActive && (
           <span className="text-[10px] font-black text-[#EF3340] uppercase tracking-widest mt-1">Requerido por Gobernanza</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isActive ? (
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#EF3340] shadow-sm">
                <ChevronRight size={20} strokeWidth={3} />
             </div>
          </div>
        ) : (
          <Lock size={20} className="text-gray-300" />
        )}
      </div>
      
      {/* Indicador Sophie de activación */}
      {isActive && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-16 bg-[#EF3340] rounded-full shadow-lg shadow-red-500/20"></div>
      )}
    </div>
  );
};

export default Step3Soporte;