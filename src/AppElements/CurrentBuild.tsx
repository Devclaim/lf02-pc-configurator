import React from "react";
import { Motherboard , GPU , CPU, RAM, Storage, Cooler, PowerSupply } from '../RawData/RawDataInterfaces';
import { gpuIsCompatible, cpuIsCompatible, coolerIsCompatible, ramIsCompatible, powerSupplyIsCompatible }  from "../Compatibility/CompatibilityFunctions";

type Props = {
    currentMotherboard: Motherboard;
    currentGPU: GPU;
    currentCPU: CPU;
    currentCooler: Cooler;
    currentRAM: RAM;
    currentStorage: Storage;
    currentPowerSupply: PowerSupply;
    ramSlotsUsed: number;
}

export function CurrentBuild({currentMotherboard, currentGPU , currentCPU , currentCooler , currentRAM , currentStorage , currentPowerSupply ,ramSlotsUsed}: Props) {
    return(
        <div 
            className={
                `[CoolerField] bg-[white] rounded-lg w-full group text-3xl p-5 space-y-5 `
            }
        >
            <b> Current Build </b>
            <div className="text-2xl [&_p]:border-black [&_p:not(:last-child)]:border-b-2 [&_p]:p-4">
                <p>{currentMotherboard.manufacturer + " " + currentMotherboard.model}</p>
                <p className={`${gpuIsCompatible(currentGPU, currentMotherboard) ? '' : 'text-red-500'}`}>{currentGPU.manufacturer + " " + currentGPU.model}</p>
                <p className={`${cpuIsCompatible(currentCPU, currentMotherboard) ? '' : 'text-red-500'}`}>{currentCPU.manufacturer + " " + currentCPU.model}</p>
                <p className={`${coolerIsCompatible(currentCooler, currentMotherboard) ? '' : 'text-red-500'}`}>{currentCooler.manufacturer + " " + currentCooler.model}</p>
                <p className={`${ramIsCompatible(currentRAM, currentMotherboard) ? '' : 'text-red-500'}`}>{currentRAM.manufacturer + " " + currentRAM.model + " x" + ramSlotsUsed}</p>
                <p>{currentStorage.manufacturer + " " + currentStorage.model}</p>
                <p className={`${powerSupplyIsCompatible(currentPowerSupply, [currentMotherboard, currentCPU, currentGPU, currentCooler]) ? '' : 'text-red-500'}`}>{currentPowerSupply.manufacturer + " " + currentPowerSupply.model}</p>
            </div>
            <p className="flex justify-between">
                <b>Price:</b>
                <b className="text-[green]"> 
                    {
                        (currentMotherboard.price +
                        currentGPU.price +
                        currentCPU.price +
                        currentCooler.price +
                        (currentRAM.price * ramSlotsUsed) +
                        currentStorage.price
                        +currentPowerSupply.price).toFixed(2)
                        + "€"
                    }
                </b>
            </p>
        </div>
    )
}