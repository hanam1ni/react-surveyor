import ReactSelect, { Props as ReactSelectProp } from 'react-select';

import styles from './Select.module.scss';

export interface SelectOptionType {
  value: string;
  label: string;
}

const Select = (props: ReactSelectProp<SelectOptionType, false>) => {
  return (
    <ReactSelect
      {...props}
      className={`${styles.select} ${props.className}`}
      classNamePrefix="select"
    />
  );
};

export default Select;
