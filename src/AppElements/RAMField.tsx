import { RAM, Motherboard } from '../RawData/RawDataInterfaces';
import { rams } from '../RawData/RAMData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { ramIsCompatible } from '../Compatibility/CompatibilityFunctions';
import { brandFilters } from '../RawData/Filters';
import React from 'react';

type Props = {
    currentRAM: RAM;
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , ram: RAM) => void;
    availableRamSlots: number;
    ramSlotsUsed: number;
    clickMoreRam: () => void;
}

export function RAMField({currentRAM, currentMotherboard, handleClick , availableRamSlots , ramSlotsUsed, clickMoreRam}: Props) {
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
                '[RAMField] bg-[white] rounded-lg w-full group '
                + `${currentMotherboard.manufacturer === 'No Motherboard Selected' ? 'opacity-5' : ''}`
            }
        >
            <summary className='cursor-pointer p-5 sm:p-10 flex flex-wrap justify-between text-2xl items-center'>
                <div className='flex gap-5 items-center'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <div className='flex flex-col text-left'>
                        <b>Memory</b>
                        <span>{availableRamSlots}Slots</span>
                    </div>
                </div>
                <div>
                    <span className={`${ramIsCompatible(currentRAM, currentMotherboard) ? '' : 'text-red-500'} text-left`}> {currentRAM.manufacturer + " " + currentRAM.model} </span>
                    <button 
                        onClick={clickMoreRam} 
                        className={
                            'rounded-lg border-2 p-2 ml-5 '
                            + `${ramSlotsUsed == 0 ? 'border-red-500' : 'border-black'}`
                        }
                    >
                        x{ramSlotsUsed}
                    </button>
                </div>
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
                    rams
                    .sort(
                        (a, b) => (ramIsCompatible(a, currentMotherboard) ? 0 : 1) - (ramIsCompatible(b, currentMotherboard) ? 0 : 1)
                    )
                    .map((ram, index) => {
                        return(
                            <button
                                disabled={!ramIsCompatible(ram, currentMotherboard)}
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${ram == currentRAM ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${ramIsCompatible(ram, currentMotherboard) ? '' : 'opacity-5'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(ram.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, ram)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${ram.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{ram.manufacturer + " " + ram.model}</b>
                                        <b className='text-[green] pl-5'>{ram.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Capacity:</dt>
                                            <dd>{ram.capacity} GB</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Speed:</dt>
                                            <dd>{ram.speed} MHz</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Type:</dt>
                                            <dd>{ram.ramType}</dd>
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