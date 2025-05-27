export interface AnalyzeRequestDTO {
  id_transaccion: number;
  hash: string;
  amount: number;
  origin_address: string;
  destination_address: string;
  date: string; // ISO 8601
}
