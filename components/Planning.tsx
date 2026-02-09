
import React, { useState } from 'react';
import { Budget } from '../types';
import { 
  RotateCcw,
  FileSpreadsheet,
  ShieldAlert,
  Briefcase,
  BarChart3,
  Clock,
  ArrowRight
} from 'lucide-react';

import ProjectFormModal from './planning/ProjectFormModal';
import RiskMatrixModal from './planning/RiskMatrixModal';
import PortfolioModal from './planning/PortfolioModal';
import EvaluationModelsModal from './planning/EvaluationModelsModal';

import Step1Identificacion from './planning/Step1Identificacion';
import Step2Clasificacion from './planning/Step2Clasificacion';
import Step3Soporte from './planning/Step3Soporte';
import Step4Validacion from './planning/Step4Validacion';
import Step5PressureTest from './planning/Step5PressureTest';
import Step6Consolidacion from './planning/Step6Consolidacion';

interface Props {
  budget: Budget;
  onSave: (b: Budget) => void;
  theme: 'light' | 'dark';
}

interface ProjectRow {
  id?: string;
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

const Planning: React.FC<Props> = ({ budget, onSave, theme }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState('flujo');
  
  // Estado compartido para la clasificación de macroproyectos
  const [macroClassifications, setMacroClassifications] = useState<Record<string, { category: string; responsable: string }>>({});

  // Modales
  const [showForm, setShowForm] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  // DATOS DE PRUEBA
  const [rows, setRows] = useState<ProjectRow[]>([
    {
      tipoProyecto: 'Expansión',
      grupoCapex: 'Red Acceso',
      macroproyecto: 'CORE RED 2027',
      proyecto: 'Despliegue Radiobases Rurales',
      subproyecto: 'Fase 1 Antioquia',
      descripcion: 'Expansión de cobertura en zonas rurales del departamento de Antioquia.',
      codigoProyecto: 'CPX-2027-001',
      director: 'Roberto Gómez',
      gerente: 'Ana Silva',
      rubro: 'Infraestructura',
      subRubro: 'Equipos',
      posicionPresupuestaria: 'PP-01-2027',
      proveedor: 'Ericsson',
      servicios: 'Instalación',
      metrica: 'Sitios',
      cantidad: '45',
      presupuestoCop: '1250000000',
      presupuestoUsd: '294117'
    },
    {
      tipoProyecto: 'Modernización',
      grupoCapex: 'Core Core',
      macroproyecto: 'CORE RED 2027',
      proyecto: 'Upgrade Software Nube',
      subproyecto: 'Migración Q1',
      descripcion: 'Actualización de licencias y núcleos para soporte 5G Standalone.',
      codigoProyecto: 'CPX-2027-002',
      director: 'Roberto Gómez',
      gerente: 'Carlos Ruiz',
      rubro: 'Software',
      subRubro: 'SaaS',
      posicionPresupuestaria: 'PP-02-2027',
      proveedor: 'Nokia',
      servicios: 'Licenciamiento',
      metrica: 'Nodos',
      cantidad: '12',
      presupuestoCop: '850000000',
      presupuestoUsd: '200000'
    },
    {
      tipoProyecto: 'Transformación',
      grupoCapex: 'TI Digital',
      macroproyecto: 'DIGITAL TRANSFORMATION',
      proyecto: 'Portal Autogestión Clientes',
      subproyecto: 'App Móvil 3.0',
      descripcion: 'Nueva experiencia de usuario para reducción de llamadas al call center.',
      codigoProyecto: 'CPX-2027-045',
      director: 'Beatriz Castrillón',
      gerente: 'Luis Ortiz',
      rubro: 'Desarrollo',
      subRubro: 'Custom Dev',
      posicionPresupuestaria: 'PP-TI-09',
      proveedor: 'Interno',
      servicios: 'Desarrollo',
      metrica: 'Apps',
      cantidad: '1',
      presupuestoCop: '420000000',
      presupuestoUsd: '98823'
    },
    {
      tipoProyecto: 'Cumplimiento',
      grupoCapex: 'Legal',
      macroproyecto: 'REGULATORIO NACIONAL',
      proyecto: 'Sistema de Intercepción Ley',
      subproyecto: 'Seguridad Nacional',
      descripcion: 'Actualización obligatoria según decreto vigente de MinTIC.',
      codigoProyecto: 'CPX-REG-001',
      director: 'Andrés Morales',
      gerente: 'Sofía Rey',
      rubro: 'Seguridad',
      subRubro: 'Hardware',
      posicionPresupuestaria: 'PP-REG-01',
      proveedor: 'Fortinet',
      servicios: 'Equipos',
      metrica: 'Gateways',
      cantidad: '2',
      presupuestoCop: '600000000',
      presupuestoUsd: '141176'
    }
  ]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<ProjectRow>({
    tipoProyecto: '', grupoCapex: '', macroproyecto: '', proyecto: '',
    subproyecto: '', descripcion: '', codigoProyecto: '', director: '',
    gerente: '', rubro: '', subRubro: '', posicionPresupuestaria: '',
    proveedor: '', servicios: '', metrica: '', cantidad: '',
    presupuestoCop: '', presupuestoUsd: '',
  });

  const steps = [
    { id: 1, label: 'Identificación' },
    { id: 2, label: 'Clasificación' },
    { id: 3, label: 'Soporte' },
    { id: 4, label: 'Validación' },
    { id: 5, label: 'Pressure test' },
    { id: 6, label: 'Consolidación' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const trm = 4250;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'presupuestoCop') {
        const copValue = Number(value) || 0;
        newData.presupuestoUsd = (copValue / trm).toFixed(0);
      }
      return newData;
    });

    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.proyecto || !formData.presupuestoCop || !formData.macroproyecto) {
       setFormErrors({ proyecto: 'Req', presupuestoCop: 'Req', macroproyecto: 'Req' });
       return;
    }
    if (editingIndex !== null) {
      const newRows = [...rows];
      newRows[editingIndex] = { ...formData };
      setRows(newRows);
    } else {
      setRows(prev => [...prev, { ...formData }]);
    }
    closeModal();
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setFormData(rows[idx]);
    setShowForm(true);
  };

  const handleDelete = (idx: number) => {
    if (confirm('¿Eliminar esta iniciativa del portafolio?')) {
      setRows(rows.filter((_, i) => i !== idx));
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormErrors({});
    setFormData({
      tipoProyecto: '', grupoCapex: '', macroproyecto: '', proyecto: '',
      subproyecto: '', descripcion: '', codigoProyecto: '', director: '',
      gerente: '', rubro: '', subRubro: '', posicionPresupuestaria: '',
      proveedor: '', servicios: '', metrica: '', cantidad: '',
      presupuestoCop: '', presupuestoUsd: '',
    });
  };

  const cardBg = theme === 'dark' ? 'bg-[#0b0e14] border-[#1a1f26]' : 'bg-white border-gray-200 shadow-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className="space-y-8 pb-24 relative animate-in fade-in duration-500">
      
      <ProjectFormModal 
        show={showForm}
        onClose={closeModal}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSaveProject}
        editingIndex={editingIndex}
        theme={theme}
        errors={formErrors}
      />

      <RiskMatrixModal show={showRiskModal} onClose={() => setShowRiskModal(false)} theme={theme} />
      <PortfolioModal show={showPortfolioModal} onClose={() => setShowPortfolioModal(false)} theme={theme} />
      <EvaluationModelsModal show={showEvaluationModal} onClose={() => setShowEvaluationModal(false)} theme={theme} />

      <div className={`p-10 border rounded-[3rem] transition-colors ${cardBg}`}>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className={`text-3xl font-black tracking-tighter mb-1 ${textColor}`}>Planeación Capex 2027</h2>
            <p className={`text-xs font-medium ${subTextColor}`}>Ciclo de demanda y priorización estratégica.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setActiveSubTab('flujo')}
            className={`flex items-center gap-3 px-8 py-3.5 text-[11px] font-black rounded-2xl border transition-all ${
              activeSubTab === 'flujo'
                ? 'bg-[#EF3340] border-[#EF3340] text-white shadow-2xl'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-red-50'
            }`}
          >
            <FileSpreadsheet size={14} />
            PORTAFOLIO ACTIVO
          </button>

          <button onClick={() => setShowRiskModal(true)} className="flex items-center gap-3 px-8 py-3.5 text-[11px] font-black rounded-2xl border border-gray-200 text-gray-500 hover:bg-amber-50">
            <ShieldAlert size={14} className="text-amber-500" /> MATRIZ RIESGO
          </button>
        </div>

        {activeSubTab === 'flujo' && (
          <div className="space-y-12">
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {steps.map(step => (
                  <button key={step.id} onClick={() => setCurrentStep(step.id)} className={`py-5 px-4 border-b-4 text-center transition-all rounded-t-[1.5rem] ${currentStep === step.id ? 'bg-red-50/50 border-[#EF3340]' : 'bg-gray-50/50 border-transparent text-gray-400 hover:bg-gray-100'}`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1.5 ${currentStep === step.id ? 'text-[#EF3340]' : 'text-gray-400'}`}>PASO {step.id}</p>
                    <p className={`text-[11px] font-black truncate ${currentStep === step.id ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                  </button>
                ))}
             </div>

             <div className="min-h-[400px]">
                {currentStep === 1 && <Step1Identificacion rows={rows} onAdd={() => setShowForm(true)} onEdit={handleEdit} onDelete={handleDelete} theme={theme} />}
                {currentStep === 2 && (
                  <Step2Clasificacion 
                    rows={rows} 
                    theme={theme} 
                    macroClassifications={macroClassifications}
                    setMacroClassifications={setMacroClassifications}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Soporte 
                    rows={rows} 
                    theme={theme} 
                    macroClassifications={macroClassifications}
                  />
                )}
                {currentStep === 4 && <Step4Validacion rows={rows} theme={theme} />}
                {currentStep === 5 && <Step5PressureTest rows={rows} theme={theme} />}
                {currentStep === 6 && <Step6Consolidacion rows={rows} theme={theme} onFinalize={() => onSave(budget)} />}
             </div>
          </div>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 md:left-80 p-6 border-t transition-all backdrop-blur-xl z-40 flex justify-between items-center ${theme === 'dark' ? 'bg-[#0b0e14]/90 border-[#1a1f26]' : 'bg-white/90 border-gray-200 shadow-lg'}`}>
        <button onClick={() => { if(confirm('¿Reiniciar progreso?')) setRows([]); }} className="text-gray-400 hover:text-[#EF3340] text-[11px] font-black flex items-center gap-2"><RotateCcw size={18} /> REINICIAR</button>
        <div className="flex gap-4">
          <button onClick={() => setCurrentStep(p => Math.max(1, p - 1))} className={`px-8 py-4 text-[11px] font-black rounded-2xl border ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-700'}`}>ANTERIOR</button>
          <button 
            disabled={currentStep === 6}
            onClick={() => setCurrentStep(p => Math.min(6, p + 1))} 
            className="px-12 py-4 text-[11px] font-black rounded-2xl bg-[#EF3340] text-white shadow-xl flex items-center gap-3 active:scale-95"
          >
            SIGUIENTE <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Planning;
