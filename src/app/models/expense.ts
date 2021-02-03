export class Expense {
  date: Date;
  description: String;
  category: String;
  amount: number;

  constructor(
    date: Date,
    description: String,
    category: String,
    amount: number
  ) {
    this.date = date;
    this.description = description;
    this.category = category;
    this.amount = amount;
  }
}
