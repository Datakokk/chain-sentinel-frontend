export interface User {
  id: string;
  email: string;
  name?: string;
  wallet_address?: string;
  created_at: string;
  last_login: string;
  is_active: boolean;
  [key: string]: any;
  isActive: boolean;
  roles: string[];
}
