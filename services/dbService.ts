
import { DBConfig, User } from '../types';

/**
 * Servicio encargado de gestionar la persistencia en MySQL corporativo.
 * En esta versión, simula la conectividad mediante una capa de abstracción
 * que podría conectarse a un backend Node.js / PHP que hable con el motor MySQL.
 */

class DBService {
  private config: DBConfig | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const saved = localStorage.getItem('mysql_config');
    if (saved) {
      this.config = JSON.parse(saved);
      this.isConnected = true;
    } else {
      // Configuración por defecto para XAMPP (MySQL Local)
      this.config = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smartbudget',
        port: 3306
      } as unknown as DBConfig;
      this.isConnected = true;
      localStorage.setItem('mysql_config', JSON.stringify(this.config));
    }
  }

  public async saveConfig(newConfig: DBConfig): Promise<boolean> {
    // Aquí se realizaría un fetch a un endpoint de validación en el servidor
    this.config = newConfig;
    localStorage.setItem('mysql_config', JSON.stringify(newConfig));
    this.isConnected = true;
    return true;
  }

  public async getTableData(tableName: string): Promise<any[]> {
    if (!this.isConnected) {
      console.warn('Persistencia: No hay conexión con MySQL. Usando datos locales.');
      return [];
    }
    // Lógica para SELECT * FROM tableName
    console.log(`FETCH MySQL: SELECT * FROM ${tableName}`);
    return [];
  }

  public async persistTransaction(query: string, params: any[]): Promise<boolean> {
    if (!this.isConnected) return false;
    // Lógica para INSERT / UPDATE / DELETE
    console.log(`QUERY MySQL: ${query}`, params);
    return true;
  }

  public async authenticateUser(email: string, pass: string): Promise<User | null> {
    if (!this.isConnected || !this.config) {
      console.error('MySQL Error: No hay configuración establecida.');
      return null;
    }

    console.log(`[MySQL] Authenticating: ${email} via PHP API...`);

    try {
      // Hacemos la petición real al archivo PHP que acabamos de crear
      const response = await fetch('http://localhost/smartbudget-pro/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: pass,
          db_config: this.config // Enviamos la config de conexión (localhost, root, etc)
        })
      });

      if (!response.ok) return null;

      const user = await response.json();
      
      // Mapeamos la respuesta al tipo User
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as any,
        area: user.area,
        status: user.status
      };
    } catch (error) {
      console.error('API Connection Error:', error);
      return null;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const db = new DBService();
