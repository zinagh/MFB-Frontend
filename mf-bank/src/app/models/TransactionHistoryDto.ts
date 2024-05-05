import { TransactionDto } from "./TransactionDto";

export interface TransactionHistoryDto {
  reference: string;
  source: string;
  destination: string;
  amount: number;
  date: Date;
}
