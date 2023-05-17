import { ReactNode } from 'react';
import { getComputedClassName } from '../../utils';

import cdr from './country-details-row.module.scss';

interface CountryDetailRowProps {
  label: string;
  value: ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
}

const CountryDetailRow = ({ label, value, className, labelClassName, valueClassName }: CountryDetailRowProps) => {
  return (
    <div className={getComputedClassName(cdr.country_meta_info, className)}>
      <span className={getComputedClassName(cdr.country_meta_label, labelClassName)}>{label}</span>
      <span className={getComputedClassName(cdr.country_meta_value, valueClassName)}>{value || 'N/A'}</span>
    </div>
  );
};

export default CountryDetailRow;
