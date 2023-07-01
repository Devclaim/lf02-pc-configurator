import React from "react";
import { Motherboard , GPU , CPU, RAM, Storage, Cooler } from '../RawData/RawDataInterfaces';
import { gpuIsCompatible, cpuIsCompatible, coolerIsCompatible, ramIsCompatible }  from "../Compatibility/CompatibilityFunctions";

type Props = {
    currentMotherboard: Motherboard;
    currentGPU: GPU;
    currentCPU: CPU;
    currentCooler: Cooler;
    currentRAM: RAM;
    currentStorage: Storage;
    ramSlotsUsed: number;
}

export function CurrentBuild({currentMotherboard, currentGPU , currentCPU , currentCooler , currentRAM , currentStorage , ramSlotsUsed}: Props) {
    return(
        <div 
            className={
                `[CoolerField] bg-[white] rounded-lg w-full group text-3xl p-5 space-y-5 `
            }
        >
            <b> Current Build </b>
            <div>
                <p className="border-b-2 border-black pb-5">{currentMotherboard.manufacturer + " " + currentMotherboard.model}</p>
                <p className="border-b-2 border-black p-5">{currentGPU.manufacturer + " " + currentGPU.model}</p>
                <p className="border-b-2 border-black p-5">{currentCPU.manufacturer + " " + currentCPU.model}</p>
                <p className="border-b-2 border-black p-5">{currentCooler.manufacturer + " " + currentCooler.model}</p>
                <p className="border-b-2 border-black p-5">{currentRAM.manufacturer + " " + currentRAM.model}</p>
                <p className="p-5">{currentStorage.manufacturer + " " + currentStorage.model}</p>
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
                        currentStorage.price).toFixed(2)
                        + "€"
                    }
                </b>
            </p>
        </div>
    )
}