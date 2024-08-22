import { ComponentProps, forwardRef, useEffect, useState } from 'react';
import styles from '@/styles/Select.module.css';

interface SelectProps extends ComponentProps<'div'> {
  setValue: (type: 'categoryId' | 'priceUnit', value: string) => void;
  type: 'categoryId' | 'priceUnit';
  clearErrors: (value: any) => void;
  options: any[];
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
      const [showOptions, setShowOptions] = useState<boolean>(false);
      const [selectedOption, setSelectedOption] = useState<string>('');

      const { setValue, clearErrors, type, options, ...other } = props;
      const onSelectClick = () => {
        setShowOptions(!showOptions);
      };
      const onOptionClick = (value: string) => {
        setSelectedOption(value);
        clearErrors(type);
        if (type === 'categoryId') {
          const category = options.find(option => option.title === value)
          setValue(type, category.id);
        } else {
          setValue(type, value);
        }
      };

      useEffect(() => {
        setValue(type, options[0].title);
        if (type === 'categoryId') {
          setValue(type, options[0].id);
        } else {
          setValue(type, options[0].title);
        }
      }, []);

      return (
          <div className={styles.select} onClick={onSelectClick} ref={ref} {...other}>
            <p className={styles.selectedOption}>{selectedOption || options[0].title}</p>
            {
                showOptions && <div className={styles.optionsList}>
                  {options.map(option => {
                    return (
                        <p key={option.id}
                           className={styles.option}
                           onClick={() => onOptionClick(option.title)}>
                          {option.title}
                        </p>
                    );
                  })}
                </div>
            }
          </div>
      );
    }
);

