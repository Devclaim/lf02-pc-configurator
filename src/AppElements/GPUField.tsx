import { GPU, Motherboard } from '../RawData/RawDataInterfaces';
import { gpus } from '../RawData/GPUData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { gpuIsCompatible } from '../Compatibility/CompatibilityFunctions';
import { brandFilters } from '../RawData/Filters';
import React from 'react';

type Props = {
    currentGPU: GPU;
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , gpu: GPU) => void;
}

export function GPUField({currentGPU, currentMotherboard, handleClick}: Props) {
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
                    <b>GPU</b>
                </div>
                <span className={`${gpuIsCompatible(currentGPU, currentMotherboard) ? '' : 'text-red-500'}`}> {currentGPU.manufacturer + " " + currentGPU.model} </span>
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
                    gpus
                    .sort(
                        (a, b) => (gpuIsCompatible(a, currentMotherboard) ? 0 : 1) - (gpuIsCompatible(b, currentMotherboard) ? 0 : 1)
                    )
                    .map((gpu, index) => {
                        return(
                            <button
                                disabled={!gpuIsCompatible(gpu, currentMotherboard)}
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${gpu == currentGPU ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${gpuIsCompatible(gpu, currentMotherboard) ? '' : 'opacity-5'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(gpu.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, gpu)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${gpu.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{gpu.manufacturer + " " + gpu.model}</b>
                                        <b className='text-[green] pl-5'>{gpu.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>TDP:</dt>
                                            <dd>{gpu.powerRequirement}W</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>PCIe Req.:</dt>
                                            <dd>{gpu.pcieRequirement}.0</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>VRAM:</dt>
                                            <dd>{gpu.memory} GB</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Comp. Units:</dt>
                                            <dd>{gpu.computeUnits} TFLOPS</dd>
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