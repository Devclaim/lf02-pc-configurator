export interface ComputerComponent {
    manufacturer: string;
    model: string;
    price: number;
    powerRequirement: number;
}

export interface Motherboard extends ComputerComponent {
    socket: string;
    ramSlots: number;
    ramType: string;
    pcieSlots: number;
    pcieRequirement: number;
    sataSlots: number;
    usbPorts: number;
}

export interface CPU extends ComputerComponent {
    cores: number;
    clockSpeed: number;
    socket: string;
}

export interface GPU extends ComputerComponent {
    memory: number;
    computeUnits: number;
    pcieRequirement: number;
}

export interface RAM extends ComputerComponent {
    capacity: number;
    speed: number;
    ramType: string;
}

export interface Storage extends ComputerComponent {
    capacity: number;
    interface: string;
}

export interface Cooler extends ComputerComponent {
    socket: string;
}

export interface PowerSupply extends ComputerComponent {
    wattage: number;
}
