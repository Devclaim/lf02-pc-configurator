import { CPU , Motherboard , Cooler , GPU , RAM , PowerSupply , ComputerComponent } from "../RawData/RawDataInterfaces";

export interface CPUCompatibility {
    isCompatible(cpu: CPU, motherboard: Motherboard, cooler: Cooler): boolean;
}

export interface GPUCompatibility {
    isCompatible(gpu: GPU, motherboard: Motherboard): boolean;
}

export interface RAMCompatibility {
    isCompatible(ram: RAM, motherboard: Motherboard): boolean;
}

export interface CoolerCompatibility {
    isCompatible(cooler: Cooler, cpu: CPU): boolean;
}

export interface PowerSupplyCompatibility {
    isCompatible(powerSupply: PowerSupply, components: ComputerComponent[]): boolean;
}