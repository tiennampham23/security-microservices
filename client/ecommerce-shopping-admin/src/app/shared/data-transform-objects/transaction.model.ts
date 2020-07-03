export interface TransactionModel {
  id: string;
  valueBefore: number;
  value: number;
  valueAfter: number;
  createdAt: string;
  note: string;
  name: string;
}
