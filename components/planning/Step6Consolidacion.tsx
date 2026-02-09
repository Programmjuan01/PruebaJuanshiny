
import React from 'react';
import { Send, CheckCircle, PieChart, Info, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProjectRow {
  proyecto: string;
  presupuestoCop: string;
  tipoProyecto: string;
  codigoProyecto?: string;
}

interface Props {
  rows: ProjectRow[];
  theme: 'light' | 'dark';
  onFinalize: () => void;
}

const Step6Consolidacion: React.FC<Props> = ({ rows, theme, onFinalize }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-[#0f1219] border-white/5' : 'bg-white border-gray-100 shadow-sm';
  
  // Obtenemos el último proyecto agregado para el resumen dinámico
  const latestProject = rows.length > 0 ? rows[rows.length - 1] : null;

  // Datos del portafolio consolidado
  const portfolioData = [
    { pos: '4', proyecto: latestProject?.proyecto || 'Proyecto en edición', tipo: latestProject?.tipoProyecto || '—', monto: latestProject ? `$ ${Number(latestProject.presupuestoCop).toLocaleString()}` : '—', vpn: '+18.4 M', isCurrent: true },
    { pos: '1', proyecto: 'Backbone fibra pais', tipo: 'Crecimiento EBITDA', monto: '120 M', vpn: '+95 M', isCurrent: false },
    { pos: '2', proyecto: 'Swap 5G urbano', tipo: 'Jugada estrategica', monto: '80 M', vpn: '+60 M', isCurrent: false },
    { pos: '3', proyecto: 'Modernizacion MSC', tipo: 'Proteccion EBITDA', monto: '25 M', vpn: '+20 M', isCurrent: false },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 space-y-8 pb-10 relative">
      <div className="space-y-1">
        <h3 className={`text-xl font-black tracking-tight ${textColor}`}>6. Consolidación del portafolio inicial</h3>
        <p className="text-[12px] text-gray-500 font-medium">
          Visualiza cómo se inserta este proyecto dentro del portafolio y qué prioridades estratégicas asume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Panel Izquierdo: Resumen del proyecto dinámico */}
        <div className="lg:col-span-4">
          <div className={`p-8 rounded-[2.5rem] border ${cardBg} h-full flex flex-col justify-between`}>
            <div>
              <h4 className="text-[11px] font-black text-[#EF3340] mb-8 tracking-[0.2em] uppercase">Resumen del proyecto</h4>
              <div className="space-y-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nombre de iniciativa:</span>
                  <span className={`text-[13px] font-black leading-tight ${textColor}`}>{latestProject?.proyecto || 'No definido'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tipo de inversión:</span>
                  <span className={`text-[11px] font-bold ${textColor}`}>{latestProject?.tipoProyecto || 'Sin clasificar'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Presupuesto Estimado:</span>
                  <span className="text-[14px] font-black text-[#EF3340]">
                    {latestProject ? `$ ${Number(latestProject.presupuestoCop).toLocaleString()} COP` : '$ 0'}
                  </span>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Score de Riesgo:</span>
                  <span className="bg-[#FFF8E1] text-[#FFB300] px-3 py-1 rounded-xl text-[10px] font-black border border-[#FFECB3]">
                    9 / 25
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-start gap-4">
               <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
               <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                 Este proyecto ha superado todas las validaciones automáticas y el Pressure Test inicial.
               </p>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Tabla de Portafolio */}
        <div className="lg:col-span-8">
          <div className={`p-1 rounded-[2.5rem] border ${cardBg}`}>
            <div className="p-8 border-b border-inherit flex justify-between items-center">
              <h4 className="text-[11px] font-black text-gray-900 tracking-[0.2em] uppercase">Posición en portafolio corporativo</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#EEF2FF] border border-blue-200"></div>
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Proyecto Actual</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-gray-50/50 border-b border-inherit">
                  <tr>
                    <th className="px-8 py-5 font-black text-gray-400 uppercase tracking-widest text-center w-16">#</th>
                    <th className="px-8 py-5 font-black text-gray-400 uppercase tracking-widest">Iniciativa</th>
                    <th className="px-8 py-5 font-black text-gray-400 uppercase tracking-widest text-center">Tipo</th>
                    <th className="px-8 py-5 font-black text-gray-400 uppercase tracking-widest text-center">Monto</th>
                    <th className="px-8 py-5 font-black text-gray-400 uppercase tracking-widest text-center">VPN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit">
                  {portfolioData.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={`transition-all duration-300 ${row.isCurrent ? 'bg-[#EEF2FF] border-l-4 border-l-blue-500' : 'hover:bg-gray-50'}`}
                    >
                      <td className={`px-8 py-5 text-center font-bold ${row.isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
                        {row.pos}
                      </td>
                      <td className={`px-8 py-5 font-black ${row.isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                        {row.proyecto}
                      </td>
                      <td className={`px-8 py-5 text-center font-bold text-gray-400`}>
                        {row.tipo}
                      </td>
                      <td className={`px-8 py-5 text-center font-bold text-gray-400`}>
                        {row.monto}
                      </td>
                      <td className={`px-8 py-5 text-center font-black ${row.isCurrent ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {row.vpn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Finalizar Solicitado - Ubicado al final del flujo de contenido */}
      <div className="flex justify-end pt-12">
        <button 
          onClick={onFinalize}
          className="bg-[#EF3340] hover:bg-[#D62E39] text-white text-[12px] font-black px-16 py-5 rounded-2xl shadow-2xl shadow-red-500/30 transition-all flex items-center gap-4 active:scale-95 uppercase tracking-[0.2em]"
        >
          Finalizar Planeación
          <ArrowRight size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default Step6Consolidacion;
