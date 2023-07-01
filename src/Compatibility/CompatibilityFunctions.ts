import { CPU, ComputerComponent, Cooler, GPU, Motherboard, PowerSupply, RAM } from "../RawData/RawDataInterfaces";

export function cpuIsCompatible(cpu: CPU, motherboard: Motherboard): boolean {
    return cpu.socket === motherboard.socket;
}

export function gpuIsCompatible(gpu: GPU, motherboard: Motherboard): boolean {
    return motherboard.pcieRequirement >= gpu.pcieRequirement;
};

export function ramIsCompatible(ram: RAM, motherboard: Motherboard): boolean {
    return ram.ramType === motherboard.ramType;
};

export function coolerIsCompatible(cooler: Cooler, motherboard: Motherboard): boolean {
    return cooler.socket === motherboard.socket;
}

export function powerSupplyIsCompatible(powerSupply: PowerSupply, components: ComputerComponent[]): boolean {
    const totalPowerRequirement = components.reduce((total, component) => total + (component.powerRequirement || 0), 0);
    return powerSupply.powerRequirement >= totalPowerRequirement;
}
