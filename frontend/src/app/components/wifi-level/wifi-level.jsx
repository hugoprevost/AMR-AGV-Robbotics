import React, { useState } from 'react';
import { ReactInternetSpeedMeter } from "react-internet-meter";
import './wifi-level.scss';

import wifiHigh from '../../assets/img/header/wifiHigh.svg'
import wifiMedium from '../../assets/img/header/wifiMedium.svg'
import wifiLow from '../../assets/img/header/wifiLow.svg'
import wifiNull from '../../assets/img/header/wifiNull.svg'
  
const Wifi = () => {
    const [wifiSpeed, setwifiSpeed] = useState("Checking ... ");
    // console.log(`${wifiSpeed} Mbps`)

    let wifiImage =null
    if (wifiSpeed >= 50){
        wifiImage = <img src={ wifiHigh } alt='Conexion wifi High' className='robot-state'/>
    } else if (wifiSpeed >= 15 && wifiSpeed < 50){
        wifiImage = <img src={ wifiMedium } alt='Conexion wifi Medium' className='robot-state'/>
    } else  if (wifiSpeed >= 1 && wifiSpeed < 15){
        wifiImage = <img src={ wifiLow } alt='Conexion wifi Low' className='robot-state'/>
    } else {
        wifiImage = <img src={ wifiNull } alt='Conexion wifi null' className='robot-state'/>
    }

    return (
        <>
            <div>
                <ReactInternetSpeedMeter
                    pingInterval={15000} // milliseconds
                    thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
                    threshold={15}
                    imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
                    downloadSize="2550420" //bytes
                    callbackFunctionOnNetworkDown={(speed)=>console.log(`Internet speed is down ${speed}`)}
                    callbackFunctionOnNetworkTest={(speed)=>setwifiSpeed(speed)}
                />
                <div>
                    {wifiImage }
                </div>
            </div>
        </>
    )
}
  
export default Wifi;