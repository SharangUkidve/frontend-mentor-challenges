import spinner from './spinner.module.scss';

const Spinner = ({ fixed, size }: { fixed?: boolean; size?: number | string }) => {
  return (
    <div className={`${spinner.container} ${fixed ? spinner.fixed : ''}`}>
      <div className={spinner.spinner} style={{ height: size, width: size }}></div>
    </div>
  );
};

Spinner.defaultProps = {
  size: 50,
  fixed: false,
};

export default Spinner;
