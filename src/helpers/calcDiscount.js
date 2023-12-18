module.exports = {
  calcDiscount(fullPrice, price) {
    const fraction = price / fullPrice;

    return (1 - parseFloat(fraction.toFixed(2))) * 100;
  },
};
