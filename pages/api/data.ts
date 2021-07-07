// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generator, groupMonthlyAmountsBy, generateSavings, generateIncome } from '../../src/tools';
import _ from 'lodash';
import { Category, Transaction } from '../../common/types';

type Data = {
  transactions: Transaction[]
  summaries: any[]
  savings: any[]
  income: any[]
  categories: Category[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = [{ name: 'Lebensmittel', color: '#00C49F' }, { name: 'Wohnen', color: '#0088FE' }, { name: 'Verkehr', color: '#FFBB28' }, { name: 'Internet', color: '#FF8042' }];
  let transactions = _.sortBy(generator(categories), ['date']);
  var summaries = groupMonthlyAmountsBy(transactions, (t: Transaction) => t.date.getMonth());
  var savings = generateSavings();
  var income = generateIncome();
  income.map(i => {
    return Object.assign(i, { expenses: _.round(Math.random() * i.income / 2 + 500, 2) });
  })
  res.status(200).json({ transactions, summaries, savings, income, categories });
}