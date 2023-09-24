import React from 'react';

import styles from './Wrapper.module.scss';
import { useAppDispatch } from '../../Hook/redux';
import { convert, reverseCoin, setCourseData } from '../../redux/slice';
import getCoinsMarkets from '../../utils/getCoinsMarkets';
import Block from '../Block';

const coinsArray = ['usdtez', 'bitcoin', 'ethereum'];

const Wrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async (coinsArray: string[]) => {
      const data = await getCoinsMarkets(coinsArray);
      dispatch(setCourseData(data));
      dispatch(convert());
    })(coinsArray);
  }, []);

  const onClickReverseCoins = () => {
    dispatch(reverseCoin());
    dispatch(convert());
  };

  return (
    <div className={styles.root}>
      <Block position="left" />
      <span onClick={onClickReverseCoins} className={styles.reverse}>
        ⇆
      </span>
      <Block position="right" />
    </div>
  );
};

export default Wrapper;
