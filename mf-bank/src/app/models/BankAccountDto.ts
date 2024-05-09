import { FeeDto } from "./FeeDto";
import { InternationalTransferDto } from "./InternationalTransferDto";
import { TypeBankAccount } from "./TypeBankAccount";

export interface BankAccountDto {
  accountNumber?: string;
  titulaire?: string;
  employeeUsername?: string;
  account_balance?: number;
  creation_date?: Date;
  activated?: boolean;
  deactivation_date?: Date;
  type?: TypeBankAccount;
  negativeSoldeAllowed?: boolean;
  negativeSoldeAmount?: number;
  negativeSoldeDepassement?: boolean;
  negativeSoldeDepassementDay?: Date;
  internationalTransfers?: InternationalTransferDto[];
  defaultFees?: FeeDto;
}
