import React, { MouseEventHandler } from 'react';
import { MotherboardField } from './MotherboardField';
import { Motherboard } from '../RawData/RawDataInterfaces';

export function Configurator() {
    const [ currentMotherboard , setCurrentMotherboard] = React.useState<Motherboard>({
        manufacturer: "No Motherboard Selected",
        model: "",
        price: 0,
        socket: "",
        ramSlots: 0,
        ramType: "",
        pcieSlots: 0,
        pcieRequirement: 0,
        sataSlots: 0,
        usbPorts: 0,
        powerRequirement: 0,
    });
    
    const clickMotherboard = (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard):void => {
        console.log(board);
        console.log(e);
        setCurrentMotherboard(board);
    }

    return(
        <div className='bg-[grey]'>
            <div className='[ComponentFields] p-10 flex flex-col space-y-10 items-center'>
                <MotherboardField
                    currentMotherboard={currentMotherboard}
                    handleClick={clickMotherboard}
                />
            </div>
        </div>
    )
}