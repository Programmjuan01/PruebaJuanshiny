
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Mail, 
  Building2,
  CheckCircle2,
  X,
  Save,
  Pencil,
  Trash2,
  Lock,
  Eye,
  FileEdit,
  BarChart,
  ShieldAlert
} from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
}

const UserManagement: React.FC<Props> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Carlos Rodriguez', email: 'crodriguez@claro.com.co', role: 'ADMIN', area: 'TI Infraestructura', status: 'ACTIVO' },
    { id: '2', name: 'Maria Lopez', email: 'mlopez@claro.com.co', role: 'DIR', area: 'Finanzas', status: 'ACTIVO' },
    { id: '3', name: 'Juan Perez', email: 'jperez@claro.com.co', role: 'RESP', area: 'Operaciones Red', status: 'ACTIVO' },
    { id: '4', name: 'Auditor Externo', email: 'audit@claro.com.co', role: 'AUDIT', area: 'Auditoría', status: 'ACTIVO' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '', email: '', role: 'RESP', area: '', status: 'ACTIVO'
  });

  const cardBg = theme === 'dark' ? 'bg-[#0d1117] border-[#1a1f26]' : 'bg-white border-gray-200 shadow-sm';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';

  const roleConfigs = {
    'ADMIN': { label: 'Administrador', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', desc: 'Acceso total a configuración, usuarios y logs.' },
    'DIR': { label: 'Director', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', desc: 'Aprobación de proyectos y visualización estratégica.' },
    'RESP': { label: 'Responsable', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', desc: 'Gestión técnica y carga de planeación mensual.' },
    'AUDIT': { label: 'Auditor', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', desc: 'Solo lectura y acceso a reportes de cumplimiento.' }
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'RESP', area: '', status: 'ACTIVO' });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
    } else {
      setUsers([...users, { ...formData, id: Math.random().toString(36).substr(2, 9) } as User]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if(confirm('¿Está seguro de revocar el acceso a este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-3xl font-black tracking-tighter mb-1 ${textColor}`}>Administración de Accesos</h2>
          <p className={`text-xs font-medium ${subTextColor}`}>Control de identidades y privilegios de la Suite Capex.</p>
        </div>
        
        <div className={`p-1 rounded-2xl border flex gap-1 ${theme === 'dark' ? 'bg-[#0b0e14] border-[#1a1f26]' : 'bg-gray-100 border-gray-200'}`}>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${activeTab === 'users' ? 'bg-white text-[#EF3340] shadow-sm' : 'text-gray-500'}`}
          >
            USUARIOS
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${activeTab === 'roles' ? 'bg-white text-[#EF3340] shadow-sm' : 'text-gray-500'}`}
          >
            PERFILES Y PERMISOS
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard theme={theme} title="Usuarios Totales" value={users.length.toString()} icon={<Users size={20} />} />
            <StatCard theme={theme} title="Administradores" value={users.filter(u => u.role === 'ADMIN').length.toString()} icon={<ShieldCheck size={20} />} />
            <StatCard theme={theme} title="Responsables" value={users.filter(u => u.role === 'RESP').length.toString()} icon={<FileEdit size={20} />} />
            <StatCard theme={theme} title="Accesos Activos" value={users.filter(u => u.status === 'ACTIVO').length.toString()} icon={<CheckCircle2 size={20} />} />
          </div>

          <div className={`border rounded-[3rem] overflow-hidden ${cardBg}`}>
            <div className="p-8 border-b border-inherit flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar colaborador..."
                  className={`w-full pl-12 pr-4 py-3.5 text-xs font-bold rounded-2xl border outline-none transition-all ${theme === 'dark' ? 'bg-[#1a1f26] border-[#2d3748] focus:border-[#EF3340]' : 'bg-gray-50 border-gray-100 focus:border-red-200 focus:ring-4 focus:ring-red-50'}`}
                />
              </div>
              <button 
                onClick={() => handleOpenModal()}
                className="bg-[#EF3340] hover:bg-[#D62E39] text-white text-[11px] font-black px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-red-500/20 flex items-center gap-3 active:scale-95"
              >
                <UserPlus size={18} />
                REGISTRAR COLABORADOR
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className={`font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-[#1a1f26] text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                  <tr>
                    <th className="px-10 py-6">Identidad</th>
                    <th className="px-10 py-6">Perfil</th>
                    <th className="px-10 py-6">Área / Dirección</th>
                    <th className="px-10 py-6 text-center">Estado</th>
                    <th className="px-10 py-6 text-center">Gestión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit">
                  {users.map(u => (
                    <tr key={u.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-white/5 border-gray-800' : 'hover:bg-red-50/20 border-gray-100'}`}>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-[#EF3340] text-sm shadow-sm">
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className={`text-[13px] font-black tracking-tight ${textColor}`}>{u.name.toUpperCase()}</p>
                            <p className="text-gray-400 font-bold flex items-center gap-1.5 mt-0.5"><Mail size={12} /> {u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black border ${roleConfigs[u.role].bg} ${roleConfigs[u.role].color} ${roleConfigs[u.role].border}`}>
                          {roleConfigs[u.role].label.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-10 py-6 font-bold text-gray-500 flex items-center gap-2">
                        <Building2 size={14} className="text-gray-300" />
                        {u.area.toUpperCase()}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center">
                          <div className={`flex items-center gap-2 font-black text-[9px] px-3 py-1 rounded-lg border ${u.status === 'ACTIVO' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-gray-400 bg-gray-50 border-gray-200'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVO' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                            {u.status}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleOpenModal(u)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Editar"><Pencil size={18} /></button>
                          <button onClick={() => handleDelete(u.id)} className="p-2.5 text-gray-400 hover:text-[#EF3340] hover:bg-red-50 rounded-xl transition-all" title="Eliminar"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(roleConfigs).map(([key, config]) => (
            <div key={key} className={`p-8 rounded-[2.5rem] border flex flex-col transition-all ${cardBg}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${config.bg} ${config.color} border ${config.border} shadow-sm`}>
                  <ShieldCheck size={28} />
                </div>
                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${config.bg} ${config.color} ${config.border}`}>
                  PERFIL: {key}
                </span>
              </div>
              
              <h3 className={`text-xl font-black mb-2 ${textColor}`}>{config.label}</h3>
              <p className={`text-sm font-medium mb-8 ${subTextColor}`}>{config.desc}</p>
              
              <div className="space-y-4 pt-6 border-t border-inherit">
                <h4 className={`text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4`}>Matriz de Capacidades</h4>
                <PermissionItem label="Visualización de Dashboard" active={true} />
                <PermissionItem label="Edición de Planeación (FollowUp)" active={key === 'ADMIN' || key === 'RESP'} />
                <PermissionItem label="Aprobación de Proyectos" active={key === 'ADMIN' || key === 'DIR'} />
                <PermissionItem label="Gestión de Usuarios" active={key === 'ADMIN'} />
                <PermissionItem label="Auditoría IA" active={true} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Usuario */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-xl rounded-[3rem] border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] transition-colors flex flex-col ${cardBg}`}>
            <div className="p-10 border-b border-inherit flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-[#EF3340] rounded-2xl flex items-center justify-center shadow-inner">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black tracking-tighter ${textColor}`}>
                    {editingUser ? 'EDITAR ACCESOS' : 'REGISTRAR COLABORADOR'}
                  </h3>
                  <p className="text-[10px] text-[#EF3340] font-black uppercase tracking-widest mt-1">Protocolo de Seguridad Claro S.A.</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-3 hover:bg-red-50 hover:text-[#EF3340] rounded-full transition-all">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Nombre Completo</label>
                    <input 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-5 py-4 text-xs font-bold rounded-2xl border outline-none transition-all ${theme === 'dark' ? 'bg-[#1a1f26] border-[#2d3748] focus:border-[#EF3340]' : 'bg-gray-50 border-gray-100 focus:border-red-300 focus:ring-4 focus:ring-red-50'}`}
                      placeholder="Ej. Carlos Arturo Rodriguez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">E-mail Corporativo</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-5 py-4 text-xs font-bold rounded-2xl border outline-none transition-all ${theme === 'dark' ? 'bg-[#1a1f26] border-[#2d3748] focus:border-[#EF3340]' : 'bg-gray-50 border-gray-100 focus:border-red-300 focus:ring-4 focus:ring-red-50'}`}
                      placeholder="usuario@claro.com.co"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Perfil de Acceso</label>
                    <select 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value as any})}
                      className={`w-full px-5 py-4 text-xs font-bold rounded-2xl border outline-none ${theme === 'dark' ? 'bg-[#1a1f26] border-[#2d3748]' : 'bg-gray-50 border-gray-100'}`}
                    >
                      <option value="ADMIN">ADMINISTRADOR (ROOT)</option>
                      <option value="DIR">DIRECTOR (ESTRATÉGICO)</option>
                      <option value="RESP">RESPONSABLE (OPERATIVO)</option>
                      <option value="AUDIT">AUDITOR (LECTURA)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Área / Dirección</label>
                    <input 
                      value={formData.area}
                      onChange={e => setFormData({...formData, area: e.target.value})}
                      className={`w-full px-5 py-4 text-xs font-bold rounded-2xl border outline-none transition-all ${theme === 'dark' ? 'bg-[#1a1f26] border-[#2d3748]' : 'bg-gray-50 border-gray-100'}`}
                      placeholder="Ej. Operaciones Red"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Estado del Acceso</label>
                    <div className="flex gap-4">
                      {['ACTIVO', 'INACTIVO'].map(s => (
                        <button 
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s as any})}
                          className={`flex-1 py-3 text-[10px] font-black rounded-xl border transition-all ${formData.status === s ? 'bg-red-50 border-[#EF3340] text-[#EF3340]' : 'bg-transparent border-gray-200 text-gray-400'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                </div>
              </div>

              <div className="pt-10 flex justify-end gap-4 border-t border-inherit">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`px-8 py-4 text-[11px] font-black rounded-2xl border transition-all ${theme === 'dark' ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  DESCARTAR
                </button>
                <button 
                  type="submit"
                  className="bg-[#EF3340] hover:bg-[#D62E39] text-white text-[11px] font-black px-12 py-4 rounded-2xl transition-all shadow-2xl shadow-red-500/30 flex items-center gap-3 active:scale-95"
                >
                  <Save size={20} />
                  {editingUser ? 'ACTUALIZAR PERFIL' : 'CONFIRMAR ACCESO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PermissionItem: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <div className="flex items-center justify-between py-1">
    <span className={`text-[11px] font-bold ${active ? 'text-gray-600' : 'text-gray-300 line-through decoration-gray-200'}`}>{label}</span>
    {active ? <CheckCircle2 size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-gray-200" />}
  </div>
);

const StatCard: React.FC<{ theme: 'light' | 'dark'; title: string; value: string; icon: React.ReactNode }> = ({ theme, title, value, icon }) => (
  <div className={`p-8 border rounded-[2rem] flex items-center gap-6 transition-all ${theme === 'dark' ? 'bg-[#0d1117] border-[#1a1f26]' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
    <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#EF3340] flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className={`text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </div>
  </div>
);

export default UserManagement;
