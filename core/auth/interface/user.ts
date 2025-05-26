export interface User {
  id: string;
  email: string;
  wallet_address?: string;
  created_at: string;
  last_login: string;
  is_active: boolean; // o camelCase si lo prefieres: isActive
  roles: string[];
}
