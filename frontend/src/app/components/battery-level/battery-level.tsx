import React, { FunctionComponent } from 'react';

import './battery-level.scss'

interface ProgressBarProps {
    value: number;
    valueText?: boolean;      // Displays the value or not (default is true)
    textColor?: string;       // Default is dark blue
    lowBatteryLevel: number;  // Default SHOULD be 25
    backgroundColor?: string; // Default is white
    height?: string;
    className?: string;
}

const BatteryProgressBar: FunctionComponent<ProgressBarProps> = ({
    value,
    lowBatteryLevel,
    textColor= 'var(--battery_text)',
    backgroundColor = 'var(--page_background)',
    height = '25px',
    className = '',
}) => {
    const clampedValue = Math.max(0, Math.min(value, 100));
    const percentage = (clampedValue / 100) * 100;
    const batteryGreen = 'var(--battery_green)'
    const batteryRed = 'var(--battery_red)'

    return (
        <div className='battery'>
            <div
                className={`battery-progress-bar-container ${className}`}
                style={{
                    backgroundColor,
                    height,
                }}
                >
                <div
                    className='battery-progress-bar-fill'
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: `${ value > lowBatteryLevel ? batteryGreen : batteryRed }`,
                    }}
                    >
                </div>

                <div 
                    className='battery-progress-text ft-battery'
                    style={{
                        color: textColor,
                    }}
                    >
                    {value}%
                </div>
            </div>
            <div className='battery-droit'>

            </div>
        </div>
    );
};

export default BatteryProgressBar;
