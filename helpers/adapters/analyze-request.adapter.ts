import { AnalyzedTransaction } from "@/core/analysis/interface/analyzed-transaction";
import { AnalyzeRequestDTO } from "@/core/analysis/interface/analyze-request.dto";

export const toAnalyzeRequestDTO = (
  tx: AnalyzedTransaction
): AnalyzeRequestDTO => ({
  id_transaccion: 0,
  hash: tx.hash,
  amount: tx.amount,
  origin_address: tx.origin,
  destination_address: tx.destination,
  date: tx.analysis_timestamp,
});
