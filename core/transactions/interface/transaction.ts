export interface Transaction {
  hash: string;
  from_address: string;
  to_address: string;
  value: number;
  timestamp: number;
  user_id?: string;
  status?: "pending" | "safe" | "suspicious";
  analysis_id?: string;
  [key: string]: any;
}
