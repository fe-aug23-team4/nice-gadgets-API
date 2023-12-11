export function calcDiscount(fullPrice: number, price: number) {
  return (1 - fullPrice / price) * 100;
}
