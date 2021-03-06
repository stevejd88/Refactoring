const playData = require('./plays.json');
const invoiceData = require('./invoices.json');

const statement = (invoice, plays) => {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  // REPLACE call to  volumeCredits VARIABLE WITH QUERY totalVolumeCredits() INLINE VARIABLE
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // REMOVED PLAY PARAMETER FROM AMOUNTFOR FUNC
  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case 'comedy':
        result = 30000;
        if (aPerformance.audience > 30) {
          result += 300 * (aPerformance.audience - 20);
        }
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  // 1.  REMOVE RESULT VARIABLE, AND REPLACE IT WITH CHANGE format() VARIABLE
  // TO A DECLARED FUNCTION format().
  // 2. REPLACE CALLS TO format() variable to usd()
  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(aNumber / 100);
  }

  // 1. EXTRACT VOLUME CREDITS LOGIC
  // 2. RENAME VARIABLES
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }

  // EXTRACT totaAMount variable
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
};

const printStatement = statement(invoiceData, playData);
console.log(printStatement);

module.exports = statement;
