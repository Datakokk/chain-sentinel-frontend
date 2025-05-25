export interface AnalyzedTransaction {
  hash: string;
  origin: string;
  destination: string;
  amount: number;
  prediction_result: "fraud" | "not_fraud";
  real_label?: "fraud" | "not_fraud";
  analysis_timestamp: string;
  user_id?: string;
}
