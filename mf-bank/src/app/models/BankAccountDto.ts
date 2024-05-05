import { FeeDto } from "./FeeDto";
import { InternationalTransferDto } from "./InternationalTransferDto";
import { TypeBankAccount } from "./TypeBankAccount";

export interface BankAccountDto {
  accountNumber: string;
  titulaire: string;
  employeeUsername: string;
  accountBalance: number;
  creationDate: Date;
  activated: boolean;
  deactivationDate: Date;
  type: TypeBankAccount;
  negativeSoldeAllowed: boolean;
  negativeSoldeAmount: number;
  negativeSoldeDepassement: boolean;
  negativeSoldeDepassementDay: Date;
  internationalTransfers: InternationalTransferDto[];
  defaultFees: FeeDto;
}
