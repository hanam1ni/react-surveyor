import ReactSlider, { SliderProps as ReactSliderProps } from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './Slider.module.scss';

interface SliderProps extends Omit<ReactSliderProps, 'onChange'> {
  max: number;
  labels?: string[];
  onChange?: (index: number) => void;
}

interface TooltipProps {
  currentIndex: number;
  max: number;
  labels?: string[];
}

const Tooltip = ({ currentIndex, labels, max }: TooltipProps) => {
  const tooltipPosition = (currentIndex / max) * 100;

  if (labels === undefined || labels[currentIndex] === undefined) {
    return null;
  }

  return (
    <div
      className={`w-fit px-2 py-1 absolute bottom-7 text-white text-sm font-bold bg-gray-400 bg-opacity-20 rounded-lg`}
      style={{ left: `${tooltipPosition}%`, transform: 'translateX(-50%)' }}
    >
      {labels[currentIndex]}
    </div>
  );
};

const Slider = (props: SliderProps) => {
  const handleRender: SliderProps['handleRender'] = (
    node,
    { value: currentIndex }
  ) => {
    return (
      <div>
        <Tooltip
          labels={props.labels}
          currentIndex={currentIndex}
          max={props.max}
        />
        {node}
      </div>
    );
  };

  return (
    <ReactSlider
      {...props}
      handleRender={handleRender}
      onChange={props.onChange as (index: number | number[]) => void}
      className={`mt-4 ${styles.slider} ${props.className}`}
    />
  );
};

export default Slider;
