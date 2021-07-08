export type Category = {
  name: string,
  color: string
}

export type Transaction = {
  date: Date,
  group: string,
  amount: number,
  description: string
}

export type Goal = {
  name: string
  currentValue: number
  expectedValue: number
}