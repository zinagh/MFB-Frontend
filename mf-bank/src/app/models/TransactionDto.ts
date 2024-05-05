import { TransactionHistoryDto } from "./TransactionHistoryDto";
import { InvoiceDto } from "./InvoiceDto";
import { BankAccountDto } from "./BankAccountDto";

export interface TransactionDto {
  reference: string;
  destination: string;
  source: string;
  montant: number;
  date_heure: Date;
  type: string;
  description: string;
  validation: boolean;
  cancelBysender: boolean;
  cancelByreceiver: boolean;
  bankAccountDto?: BankAccountDto; // Le '?' indique que cet attribut est optionnel
  bankAccountForRecieverDto?: BankAccountDto;
}
