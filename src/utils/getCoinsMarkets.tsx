import axios from 'axios';
import { IResponseItem } from '../redux/types';

const getCoinsMarkets = async (coinsArray: string[]) => {
  try {
    const { data } = await axios.request({
      // url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsArray.join(',')}`,
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsArray.join(',')}`,
    });
    const sorted = data.map((obj: IResponseItem) => {
      return {
        id: obj.id,
        current_price: obj.current_price,
        symbol: obj.symbol,
      };
    });
    return sorted;
  } catch (error) {
    console.error(error);
    alert('Ошибка при загрузке данных');
  }
};

export default getCoinsMarkets;
