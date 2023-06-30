import React from 'react';
import { MotherboardField } from './MotherboardField';
import { Motherboard , GPU } from '../RawData/RawDataInterfaces';
import { GPUField } from './GPUField';

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

    const [ currentGPU , setCurrentGPU] = React.useState<GPU>({
        manufacturer: "No GPU Selected",
        model: "",
        price: 0,
        powerRequirement: 0,
        memory: 0,
        computeUnits: 0,
        pcieRequirement: 0,
    });
    
    const clickMotherboard = (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard):void => {
        console.log(board);
        console.log(e);
        setCurrentMotherboard(board);
    }

    const clickGPU = (e: React.MouseEvent<HTMLButtonElement> , gpu: GPU):void => {
        console.log(gpu);
        console.log(e);
        setCurrentGPU(gpu);
    }

    return(
        <div className='bg-[grey] h-[200vh]'>
            <div className='[ComponentFields] p-10 flex flex-col space-y-10 items-center'>
                <MotherboardField
                    currentMotherboard={currentMotherboard}
                    handleClick={clickMotherboard}
                />
                <GPUField
                    currentGPU={currentGPU}
                    currentMotherboard={currentMotherboard}
                    handleClick={clickGPU}
                />
            </div>
        </div>
    )
}