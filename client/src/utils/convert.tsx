/* eslint-disable prettier/prettier */
const convert = (price: number) => {
  return Math.round(price * 100) / 100;
};

export default convert;
