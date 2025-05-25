export interface TransactionAnalysis {
  transaction_hash: string;
  risk_score: number;
  is_fraud: boolean;
  analyzed_at: string;
  user_id?: string;
}
