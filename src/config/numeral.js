import numeral from 'numeral';

numeral.register('locale', 'ph', {
  delimiters: {
      thousands: ',',
      decimal: '.'
  },
  currency: {
    symbol: '₱'
  }
});
numeral.locale('ph');
