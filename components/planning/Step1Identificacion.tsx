
import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface ProjectRow {
  tipoProyecto: string;
  proyecto: string;
  codigoProyecto: string;
  gerente: string;
  presupuestoCop: string;
}

interface Props {
  rows: ProjectRow[];
  onAdd: () => void;
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
  theme: 'light' | 'dark';
}

const Step1Identificacion: React.FC<Props> = ({ rows, onAdd, onEdit, onDelete, theme }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className="animate-in slide-in-from-left-4 duration-500 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h3 className={`text-xl font-black ${textColor}`}>Listado de Iniciativas de Inversión</h3>
          <p className="text-xs text-gray-400 mt-1">Capture las demandas operativas para el portafolio 2027.</p>
        </div>
        <button onClick={onAdd} className="px-8 py-3 bg-[#EF3340] text-white rounded-2xl text-[11px] font-black flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
          <Plus size={18} /> REGISTRAR NUEVA
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-inherit">
        <table className="w-full text-left text-[11px]">
          <thead className={`font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-[#1a1f26] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <tr>
              <th className="px-6 py-4">Proyecto</th>
              <th className="px-6 py-4">Responsable</th>
              <th className="px-6 py-4 text-right">Presupuesto Estimado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-inherit">
            {rows.map((row, idx) => (
              <tr key={idx} className={theme === 'dark' ? 'hover:bg-white/5 border-gray-800' : 'hover:bg-gray-50 border-gray-100'}>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`font-black ${textColor}`}>{row.proyecto}</span>
                    <span className="text-[10px] text-gray-400">{row.codigoProyecto}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 font-bold">{row.gerente}</td>
                <td className={`px-6 py-4 text-right font-black ${textColor}`}>$ {Number(row.presupuestoCop).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(idx)} className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => onDelete(idx)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-24 text-center">
                   <div className="flex flex-col items-center gap-4 text-gray-300">
                      <Plus size={48} strokeWidth={1} />
                      <p className="font-bold italic">No hay proyectos registrados. Comience agregando una nueva iniciativa.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Step1Identificacion;
