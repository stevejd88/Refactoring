const statement = require('./statement');
const playData = require('./plays.json');
const invoiceData = require('./invoices.json');

test('return correct strings', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('Statement for BigCo');
});

test('return correct string 2', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('Hamlet: $650.00 (55 seats)');
});

test('return correct string 3', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('As You Like It: $345.00 (35 seats)');
});

test('return correct string 4', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('Othello: $500.00 (40 seats)');
});

test('return correct string 5', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('Amount owed is $1,495.00');
});

test('return correct string 6', () => {
  const result = statement(invoiceData, playData);

  expect(result).toContain('You earned 47 credits');
});

// expect(result).toContain('Hamlet: $650.00 (55 seats)');
//   expect(result).toContain('As You Like It: $345.00 (35 seats)');
//   expect(result).toContain('Othello: $500.00 (40 seats)');
//   expect(result).toContain('Amount owed is $1,495.00');
//   expect(result).toContain('You earned 47 credits');
