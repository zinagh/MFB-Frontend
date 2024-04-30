import { FeeDto } from "./FeeDto";

export interface InternationalTransferDto {
  id: number;
  sendOrReceive: boolean;
  objectofTransaction: string;
  amount: number;
  currencyCode: string;
  fees: number;
  approval: boolean;
  employeeApprovalUsername: string;
  status: string;
  bankAccountToMakeTransfert: string;
  internationnalFees: FeeDto;
  date: Date;
}
