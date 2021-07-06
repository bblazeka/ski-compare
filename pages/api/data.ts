// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generator, groupMonthlyAmountsBy, generateSavings, generateIncome } from '../../tools/tools';
import _ from 'lodash';

type Data = {
  transactions: Transaction[]
  summaries: any[]
  savings: any[]
  income: any[]
}

type Transaction = {
  date: Date,
  group: string,
  amount: number,
  description: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let transactions = generator();
  var summaries = groupMonthlyAmountsBy(transactions, (t: Transaction) => t.date.getMonth());
  var savings = generateSavings();
  var income = generateIncome();
  income.map(i => {
    return Object.assign(i, { expenses: _.round(Math.random() * i.income / 2 + 500, 2) });
  })
  res.status(200).json({ transactions, summaries, savings, income });
}