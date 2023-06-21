import { CPU, ComputerComponent, Cooler, GPU, Motherboard, PowerSupply, RAM } from "../RawData/RawDataInterfaces";
import { CPUCompatibility, CoolerCompatibility, GPUCompatibility, PowerSupplyCompatibility, RAMCompatibility } from "./CompatibilityInterfaces";

const cpuCompatibility: CPUCompatibility = {
    isCompatible(cpu: CPU, motherboard: Motherboard): boolean {
        return cpu.socket === motherboard.socket && cpu.powerRequirement <= motherboard.powerRequirement;
    }
};
  
const gpuCompatibility: GPUCompatibility = {
    isCompatible(gpu: GPU, motherboard: Motherboard): boolean {
        return gpu.powerRequirement <= motherboard.powerRequirement;
    }
};

const ramCompatibility: RAMCompatibility = {
    isCompatible(ram: RAM, motherboard: Motherboard): boolean {
        return ram.ramType === motherboard.ramType;
    }
};

const coolerCompatibility: CoolerCompatibility = {
    isCompatible(cooler: Cooler, cpu: CPU): boolean {
        return cooler.socket === cpu.socket;
    }
};

const powerSupplyCompatibility: PowerSupplyCompatibility = {
    isCompatible(powerSupply: PowerSupply, components: ComputerComponent[]): boolean {
        const totalPowerRequirement = components.reduce((total, component) => total + (component.powerRequirement || 0), 0);
        return powerSupply.wattage >= totalPowerRequirement;
    }
};