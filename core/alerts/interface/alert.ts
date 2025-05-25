export interface Alert {
  id?: string;
  user_id: string;
  from_address: string;
  to_address: string;
  type: "critical" | "warning" | "info";
  message: string;
  tx_hash?: string;
  created_at: string;
  read?: boolean;
}
