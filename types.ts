
export enum AppPhase {
  LOGIN = 'LOGIN',
  PORTAL_HOME = 'PORTAL_HOME',
  // Módulo Capex
  CAPEX_DASHBOARD = 'CAPEX_DASHBOARD',
  CAPEX_PLANNING = 'CAPEX_PLANNING',
  CAPEX_FOLLOWUP = 'CAPEX_FOLLOWUP',
  // Nuevos Módulos de Planeación Tecnológica
  TECH_ROADMAP = 'TECH_ROADMAP',
  TECH_ARCHITECTURE = 'TECH_ARCHITECTURE',
  TECH_INVENTORY = 'TECH_INVENTORY',
  TECH_WATCH = 'TECH_WATCH', 
  // Sistema
  USER_MGMT = 'ADMIN_USUARIOS',
  BUDGET_PARAMETERS = 'PARAMETROS_PRESUPUESTO',
  DATABASE_CONFIG = 'CONFIGURACION_DB'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DIR' | 'RESP' | 'AUDIT';
  area: string;
  status?: 'ACTIVO' | 'INACTIVO';
}

export interface DBConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  pass: string;
  ssl: boolean;
}

export type TechDecision = 'ACCIONAR' | 'MONITOREAR' | 'DESCARTAR';
export type BusinessCaseStatus = 'BORRADOR' | 'REVISION_TECNICA' | 'EVALUACION_FINANCIERA' | 'COMITE_DIRECTIVO' | 'APROBADO' | 'RECHAZADO';

export interface TechTrend {
  id: string;
  name: string; 
  description: string;
  quarter: string;
  category: string;
  impact: 'ALTO' | 'MEDIO' | 'BAJO';
  decision: TechDecision;
  leader: string;
  categorization: string; 
  probability: 'Alta' | 'Media' | 'Baja' | '';
  contextTrigger: string;
  strategicRecommendation: {
    roadmap: string;
    criticalConsiderations: string;
    kpis: string;
    vendors: string;
    technicalDetails: string;
  };
  businessImpact: {
    quantifiable: string;
    strategic: string;
  };
  supportData: {
    internal: string;
    external: string;
  };
  status: BusinessCaseStatus;
}

export interface Budget {
  totalIncome: number;
  fixedCosts: FixedCost[];
  savingsTarget: number;
  currency: string;
}

export interface FixedCost {
  id: string;
  category: string;
  amount: number;
  description: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

export interface AIInsight {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}
