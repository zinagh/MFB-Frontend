import { FeeType } from "./FeeType";

export interface FeeDto {
  id: number;
  feeType: FeeType;
  amountPercent: number;
  description: string;
}
