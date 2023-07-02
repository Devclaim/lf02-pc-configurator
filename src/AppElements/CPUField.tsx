import { CPU, Motherboard } from '../RawData/RawDataInterfaces';
import { cpus } from '../RawData/CPUData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { cpuIsCompatible } from '../Compatibility/CompatibilityFunctions';
import { brandFilters } from '../RawData/Filters';
import React from 'react';

type Props = {
    currentCPU: CPU;
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , cpu: CPU) => void;
}

export function CPUField({currentCPU, currentMotherboard, handleClick}: Props) {
    const [activeBrandFilters, setActiveBrandFilters] = React.useState<string[]>([])

    function handleBrandClick(e: React.MouseEvent<HTMLButtonElement>) {
        const newFilter: string = e.currentTarget.dataset['brand']!;

        if(!activeBrandFilters.includes(newFilter)) {
            setActiveBrandFilters([...activeBrandFilters, newFilter])
        } else {
            setActiveBrandFilters(activeBrandFilters => activeBrandFilters.filter((filter) => filter != newFilter))
        }
    }

    return(
        <details 
            className={
                '[GPUField] bg-[white] rounded-lg w-full group '
                + `${currentMotherboard.manufacturer === 'No Motherboard Selected' ? 'opacity-5' : ''}`
            }
        >
            <summary className='cursor-pointer p-10 flex flex-wrap justify-between text-3xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>CPU</b>
                </div>
                <span className={`${cpuIsCompatible(currentCPU, currentMotherboard) ? '' : 'text-red-500'}`}> {currentCPU.manufacturer + " " + currentCPU.model} </span>
            </summary>
            <div className='[BrandFilters] text-white bg-slate-700 w-full p-5 gap-5 flex flex-wrap text-2xl items-center'>
                <b>Brand Filters: </b>
                {
                    brandFilters.map((brand, index) =>{
                        return(
                            <button
                                data-brand={brand}
                                key={index}
                                className={`text-xl rounded-2xl ${activeBrandFilters.includes(brand) ? 'bg-white text-black' : ''} border-white border-2 p-2`}
                                onClick={handleBrandClick}
                            >
                                {brand}
                            </button>
                        )
                    })
                }
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 p-5 gap-5'>
                {
                    cpus
                    .sort(
                        (a, b) => (cpuIsCompatible(a, currentMotherboard) ? 0 : 1) - (cpuIsCompatible(b, currentMotherboard) ? 0 : 1)
                    )
                    .map((cpu, index) => {
                        return(
                            <button
                                disabled={!cpuIsCompatible(cpu, currentMotherboard)}
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${cpu == currentCPU ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${cpuIsCompatible(cpu, currentMotherboard) ? '' : 'opacity-5'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(cpu.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, cpu)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${cpu.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{cpu.manufacturer + " " + cpu.model}</b>
                                        <b className='text-[green] pl-5'>{cpu.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>TDP:</dt>
                                            <dd>{cpu.powerRequirement}W</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Socket:</dt>
                                            <dd>{cpu.socket}</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Cores:</dt>
                                            <dd>{cpu.cores}</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Clock Base:</dt>
                                            <dd>{cpu.clockSpeed} GHz</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Clock Turbo:</dt>
                                            <dd>{cpu.turboClockSpeed} GHz</dd>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ) 
                    })
                }
            </div>
        </details>
    )
}