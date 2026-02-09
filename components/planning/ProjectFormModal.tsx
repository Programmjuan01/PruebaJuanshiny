
import React from 'react';
import { X, Save, Plus, FolderTree, UserCheck, Calculator, DollarSign } from 'lucide-react';

interface ProjectRow {
  tipoProyecto: string;
  grupoCapex: string;
  macroproyecto: string;
  proyecto: string;
  subproyecto: string;
  descripcion: string;
  codigoProyecto: string;
  director: string;
  gerente: string;
  rubro: string;
  subRubro: string;
  posicionPresupuestaria: string;
  proveedor: string;
  servicios: string;
  metrica: string;
  cantidad: string;
  presupuestoCop: string;
  presupuestoUsd: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  formData: ProjectRow;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSave: (e: React.FormEvent) => void;
  editingIndex: number | null;
  theme: 'light' | 'dark';
  errors: Record<string, string>;
}

// Sub-componente movido fuera para evitar pérdida de foco
const FormSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; theme: string; textColor: string }> = ({ title, icon, children, theme, textColor }) => (
  <div className={`p-8 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-[#161b22] border-[#21262d]' : 'bg-white border-gray-100 shadow-sm'}`}>
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-[#EF3340]/10 text-[#EF3340]' : 'bg-red-50 text-[#EF3340] border border-red-100'}`}>
        {icon}
      </div>
      <h4 className={`text-[11px] font-black uppercase tracking-widest ${textColor}`}>{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

const ProjectFormModal: React.FC<Props> = ({ show, onClose, formData, onInputChange, onSave, editingIndex, theme, errors }) => {
  if (!show) return null;

  const cardBg = theme === 'dark' ? 'bg-[#0b0e14] border-[#1a1f26]' : 'bg-white border-gray-200 shadow-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const currentTrm = localStorage.getItem('global_trm') || '4,250';

  const getInputClasses = (fieldName: string) => {
    const hasError = !!errors[fieldName];
    const baseClasses = `w-full px-4 py-3 text-[11px] font-bold rounded-2xl border transition-all duration-200 outline-none`;
    const themeClasses = theme === 'dark' 
      ? `bg-[#1a1f26] ${hasError ? 'border-red-500' : 'border-[#2d3748]'} text-white focus:border-[#EF3340]` 
      : `bg-white ${hasError ? 'border-red-500' : 'border-gray-200'} text-gray-900 focus:border-[#EF3340] focus:ring-4 focus:ring-red-50`;
    return `${baseClasses} ${themeClasses}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[3rem] border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] transition-colors flex flex-col ${cardBg}`}>
        <div className="px-10 py-10 border-b flex justify-between items-center bg-inherit border-inherit shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#EF3340] rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-red-500/30">
              <Plus size={32} strokeWidth={3} />
            </div>
            <div>
              <h3 className={`text-3xl font-black tracking-tighter ${textColor}`}>
                {editingIndex !== null ? 'EDITAR PROYECTO' : 'NUEVO PROYECTO CAPEX'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-white bg-[#EF3340] px-2 py-0.5 rounded-lg uppercase tracking-widest">Vigencia 2027</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">• Formulario Maestro</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className={`p-4 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-red-50 text-gray-400 hover:text-[#EF3340]'}`}>
            <X size={28} />
          </button>
        </div>
        
        <form onSubmit={onSave} className={`overflow-y-auto p-10 space-y-10 flex-1 ${theme === 'dark' ? 'bg-[#10141b]' : 'bg-gray-50/30'}`}>
          <FormSection title="Estructura y Jerarquía SAP" icon={<FolderTree size={20} />} theme={theme} textColor={textColor}>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Tipo de Proyecto</label>
              <select name="tipoProyecto" value={formData.tipoProyecto} onChange={onInputChange} className={getInputClasses('tipoProyecto')}>
                <option value="">Seleccione...</option>
                <option value="Expansión">Expansión de Red</option>
                <option value="Modernización">Modernización Tecnológica</option>
                <option value="Sostenimiento">Sostenimiento Operativo</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Grupo Capex</label>
              <input name="grupoCapex" value={formData.grupoCapex} onChange={onInputChange} className={getInputClasses('grupoCapex')} placeholder="Ej. Acceso Radio" />
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Macroproyecto</label>
              <input name="macroproyecto" value={formData.macroproyecto} onChange={onInputChange} className={getInputClasses('macroproyecto')} placeholder="Ej. Red 5G" />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Nombre del Proyecto</label>
              <input name="proyecto" value={formData.proyecto} onChange={onInputChange} className={getInputClasses('proyecto')} placeholder="Nombre descriptivo" />
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Código SAP / PRJ-ID</label>
              <input name="codigoProyecto" value={formData.codigoProyecto} onChange={onInputChange} className={`${getInputClasses('codigoProyecto')} font-mono uppercase text-[#EF3340] border-red-100 bg-red-50/10`} placeholder="CPX-2027-XXX" />
            </div>
            <div className="space-y-1.5 lg:col-span-3">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Descripción Detallada / Justificación</label>
              <textarea 
                name="descripcion" 
                value={formData.descripcion} 
                onChange={onInputChange} 
                className={`${getInputClasses('descripcion')} h-32 resize-none leading-relaxed p-4`} 
                placeholder="Detalle el alcance técnico y los beneficios estratégicos de esta inversión..." 
              />
            </div>
          </FormSection>

          <FormSection title="Liderazgo y Responsabilidades" icon={<UserCheck size={20} />} theme={theme} textColor={textColor}>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Director de Área</label>
              <input name="director" value={formData.director} onChange={onInputChange} className={getInputClasses('director')} placeholder="Ej. Juan Carlos López" />
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Gerente Responsable</label>
              <input name="gerente" value={formData.gerente} onChange={onInputChange} className={getInputClasses('gerente')} placeholder="Ej. Martha Rodriguez" />
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Subproyecto / Etapa</label>
              <input name="subproyecto" value={formData.subproyecto} onChange={onInputChange} className={getInputClasses('subproyecto')} placeholder="Fase 01" />
            </div>
          </FormSection>

          <FormSection title="Asignación Contable y Metas" icon={<Calculator size={20} />} theme={theme} textColor={textColor}>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Monto Estimado COP</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs">$</span>
                <input name="presupuestoCop" type="number" value={formData.presupuestoCop} onChange={onInputChange} className={`${getInputClasses('presupuestoCop')} pl-8 text-emerald-600 font-black`} placeholder="0" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Monto Estimado USD</label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={14} />
                <input 
                  name="presupuestoUsd" 
                  readOnly 
                  value={formData.presupuestoUsd} 
                  className={`${getInputClasses('presupuestoUsd')} pl-8 bg-blue-50/20 border-blue-100 text-blue-600 cursor-not-allowed`} 
                  placeholder="0.00" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                   <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">TRM:</span>
                   <span className="text-[9px] font-black text-blue-500">{currentTrm}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Métrica Clave (KPI)</label>
              <input name="metrica" value={formData.metrica} onChange={onInputChange} className={getInputClasses('metrica')} placeholder="Ej. Sitios" />
            </div>
            <div className="space-y-1.5">
              <label className={`text-[9px] font-black uppercase tracking-widest ${subTextColor}`}>Cantidad Objetivo</label>
              <input name="cantidad" type="number" value={formData.cantidad} onChange={onInputChange} className={getInputClasses('cantidad')} placeholder="0" />
            </div>
          </FormSection>
        </form>

        <div className="px-10 py-10 border-t border-inherit flex justify-end gap-4 bg-inherit shrink-0">
            <button type="button" onClick={onClose} className={`px-10 py-4 text-[11px] font-black rounded-2xl border transition-all ${theme === 'dark' ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>CANCELAR</button>
            <button type="submit" onClick={onSave} className="px-14 py-4 text-[11px] font-black rounded-2xl bg-[#EF3340] text-white hover:bg-[#D62E39] transition-all shadow-2xl shadow-red-500/20 flex items-center gap-3 active:scale-95">
              <Save size={20} />
              {editingIndex !== null ? 'CONFIRMAR CAMBIOS' : 'GUARDAR EN PORTAFOLIO'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
