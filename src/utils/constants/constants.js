export const TicketGoal = 1250; //2500 dollars

export const PrizePercentage = {
    firstPrize: 0.15, // 1
    secondPrize: 0.1, // 1
    thirdPrize: 0.05, // 1
    fourthPrize: 0.01, // 10
    fifthPrize: 0.005, // 10
    sixthPrize: 0.003 // 50, total: (1+1+1+10+10+50) = 73
  };
// total revenue = 2500
// Cost in percentage = 0.15 + 0.1 + 0.05 + 0.1 + 0.05 + 0.15 = 0.6 = 60 %
// profit = 2500 - 0.6 x 2500 = 1000
  export{}