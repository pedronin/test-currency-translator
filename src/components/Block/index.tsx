import React from 'react';

import styles from './Input.module.scss';
import { setInputVal, setSelectCoin, setCurrInput, convert } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';

const coinsArray = [
  { name: 'usdtez', symbol: 'USDT' },
  { name: 'bitcoin', symbol: 'BTC' },
  { name: 'ethereum', symbol: 'ETH' },
];

interface IInput {
  position: string;
}

const Block: React.FC<IInput> = ({ position }) => {
  const dispatch = useAppDispatch();
  const { leftInputVal, rightInputVal, leftSelectCoin, rightSelectCoin } = useAppSelector(
    (state) => state.slice,
  );

  const onChangeCoin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectCoin({ position: position, text: e.target.value }));
    dispatch(setCurrInput('left'));
    dispatch(convert());
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputVal({ position: position, text: e.target.value }));
    dispatch(setCurrInput(position));
    dispatch(convert());
  };

  return (
    <div className={styles.root}>
      <input
        onChange={onChangeValue}
        value={position === 'left' ? leftInputVal : rightInputVal}
        className={styles.input}
        type="number"
      />
      <select
        onChange={onChangeCoin}
        value={position === 'left' ? leftSelectCoin : rightSelectCoin}
        className={styles.select}>
        {coinsArray.map((obj, i) => (
          <option className={styles.option} value={obj.name} key={i}>
            {obj.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Block;
