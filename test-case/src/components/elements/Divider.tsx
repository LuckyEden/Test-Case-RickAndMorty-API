import React from 'react';
import classNames from 'classnames';
import { TCTypes } from '../../types';

const Divider: React.FC<TCTypes.DividerProps>
    = ({
        orientation = 'horizontal', // 'horizontal' | 'vertical'
        flexItem = false,
        textAlign = 'center', // 'center' | 'left' | 'right'
        variant = 'fullWidth', // 'fullWidth' | 'inset' | 'middle'
        light = false,
        children,
    }) => {
        const baseClass = classNames(
            'border-0',
            'relative',
            'flex',
            {
                'bg-cGray': !light,
                'bg-gray-100': light,
            }
        );

        const horizontalClass = classNames(
            'border-t',
            {
                'w-full': variant === 'fullWidth',
                'ml-16': variant === 'inset',
                'mx-4': variant === 'middle',
                'h-px': !flexItem,
                'self-stretch': flexItem,
            }
        );

        const verticalClass = classNames(
            'border-l',
            'h-full',
            {
                'w-px': !flexItem,
                'self-stretch': flexItem,
                'h-auto': flexItem,
                'ml-4': variant === 'middle',
                'h-full': variant === 'fullWidth',
            }
        );

        const textAlignClass = classNames(
            'absolute',
            {
                'top-1/2 -translate-y-1/2 left-0': textAlign === 'left' && orientation === 'horizontal',
                'top-1/2 -translate-y-1/2 right-0': textAlign === 'right' && orientation === 'horizontal',
                'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2': textAlign === 'center' && orientation === 'horizontal',
                'left-1/2 -translate-x-1/2 top-0': textAlign === 'center' && orientation === 'vertical',
                'left-1/2 -translate-x-1/2 bottom-0': textAlign === 'center' && orientation === 'vertical',
            }
        );

        return (
            <div
                className={classNames(baseClass, {
                    [horizontalClass]: orientation === 'horizontal',
                    [verticalClass]: orientation === 'vertical',
                })}
                style={{
                    width: orientation === 'vertical' ? (flexItem ? 'auto' : '1px') : '100%',
                    height: orientation === 'vertical' ? '100%' : (flexItem ? 'auto' : '1px'),
                }}
            >
                {children && (
                    <span className={textAlignClass}>
                        {children}
                    </span>
                )}
            </div>
        );
    };

export default Divider;