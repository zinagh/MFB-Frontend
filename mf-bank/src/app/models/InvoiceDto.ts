import { TransactionDto } from "./TransactionDto";

export interface InvoiceDto {
  reference: string;
  statut: string;
  transactionDto: TransactionDto;
}
