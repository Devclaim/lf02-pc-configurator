import React from 'react';
import { MotherboardField } from './MotherboardField';
import { Motherboard , GPU , CPU, RAM, Storage, Cooler } from '../RawData/RawDataInterfaces';
import { GPUField } from './GPUField';
import { CPUField } from './CPUField';
import { RAMField } from './RAMField';
import { StorageField } from './StorageField';
import { CoolerField } from './CoolerField';
import { CurrentBuild } from './CurrentBuild';

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

    const [ currentCPU , setCurrentCPU] = React.useState<CPU>({
        manufacturer: "No CPU Selected",
        model: "",
        price: 0,
        powerRequirement: 0,
        cores: 0,
        clockSpeed: 0,
        turboClockSpeed: 0,
        socket: ""
    });

    const [ currentRAM , setCurrentRAM] = React.useState<RAM>({
        manufacturer: "No RAM Selected",
        model: "",
        price: 0,
        powerRequirement: 0,
        capacity: 0,
        speed: 0,
        ramType: ""
    });

    const [ currentStorage , setCurrentStorage] = React.useState<Storage>({
        manufacturer: "No Storage Selected",
        model: "",
        price: 0,
        powerRequirement: 0,
        capacity: 0,
        interface: ""
    });

    const [ currentCooler , setCurrentCooler ] = React.useState<Cooler>({
        manufacturer: "No Cooler Selected",
        model: "",
        price: 0,
        powerRequirement: 0,
        socket: ""
    });

    const [ availableRamSlots, setAvailableRamSlots ] = React.useState<number>(0);

    React.useEffect(() => {
        setAvailableRamSlots(currentMotherboard.ramSlots);
    });

    const [ ramSlotsUsed, setRamSlotsUsed ] = React.useState<number>(0);

    const clickMoreRam = () => {
        if(ramSlotsUsed < availableRamSlots) {
            setRamSlotsUsed(ramSlotsUsed + 1)
        } else {
            setRamSlotsUsed(0)
        }
    }
    
    const clickMotherboard = (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard):void => {
        setCurrentMotherboard(board);
    };

    const clickGPU = (e: React.MouseEvent<HTMLButtonElement> , gpu: GPU):void => {
        setCurrentGPU(gpu);
    };

    const clickCPU = (e: React.MouseEvent<HTMLButtonElement> , cpu: CPU):void => {
        setCurrentCPU(cpu);
    };

    const clickRAM = (e: React.MouseEvent<HTMLButtonElement> , ram: RAM):void => {
        setCurrentRAM(ram);
    };

    const clickStorage = (e: React.MouseEvent<HTMLButtonElement> , storage: Storage):void => {
        setCurrentStorage(storage);
    };

    const clickCooler = (e: React.MouseEvent<HTMLButtonElement> , cooler: Cooler):void => {
        setCurrentCooler(cooler);
    };

    return(
        <div className='bg-gray-600 min-h-[200vh] flex flex-col xl:flex-row relative'>
            <div className='[CurrentPC] xl:w-[30%] h-fit xl:sticky top-0 right-0 p-10'>
                <CurrentBuild
                    currentMotherboard={currentMotherboard}
                    currentGPU={currentGPU}
                    currentCPU={currentCPU}
                    currentCooler={currentCooler}
                    currentRAM={currentRAM}
                    currentStorage={currentStorage}
                    ramSlotsUsed={ramSlotsUsed}
                />
            </div>
            <div className='[ComponentFields] p-10 flex flex-col space-y-10 xl:w-[70%]'>
                <MotherboardField
                    currentMotherboard={currentMotherboard}
                    handleClick={clickMotherboard}
                />
                <GPUField
                    currentGPU={currentGPU}
                    currentMotherboard={currentMotherboard}
                    handleClick={clickGPU}
                />
                <CPUField
                    currentCPU={currentCPU}
                    currentMotherboard={currentMotherboard}
                    handleClick={clickCPU}
                />
                <CoolerField
                    currentCooler={currentCooler}
                    currentMotherboard={currentMotherboard}
                    handleClick={clickCooler}
                />
                <RAMField
                    currentRAM={currentRAM}
                    currentMotherboard={currentMotherboard}
                    handleClick={clickRAM}
                    availableRamSlots={availableRamSlots}
                    ramSlotsUsed={ramSlotsUsed}
                    clickMoreRam={clickMoreRam}
                />
                <StorageField
                    currentStorage={currentStorage}
                    handleClick={clickStorage}
                />
            </div>
        </div>
    )
}