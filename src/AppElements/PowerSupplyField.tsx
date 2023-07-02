import { PowerSupply, ComputerComponent } from '../RawData/RawDataInterfaces';
import { powerSupplies } from '../RawData/PowerSupplyData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { brandFilters } from '../RawData/Filters';
import { powerSupplyIsCompatible } from '../Compatibility/CompatibilityFunctions';
import React from 'react';

type Props = {
    currentPowerSupply: PowerSupply;
    computerParts: ComputerComponent[];
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , powerSupply: PowerSupply) => void;
}

export function PowerSupplyField({currentPowerSupply, computerParts, handleClick}: Props) {
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
            }
        >
            <summary className='cursor-pointer p-5 sm:p-10 flex flex-wrap justify-between text-2xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>PowerSupply</b>
                </div>
                <span className={`${powerSupplyIsCompatible(currentPowerSupply, computerParts) ? '' : 'text-red-500'} text-left`}> {currentPowerSupply.manufacturer + " " + currentPowerSupply.model} </span>
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
                    powerSupplies
                    .map((powerSupply, index) => {
                        return(
                            <button
                                disabled={!powerSupplyIsCompatible(powerSupply, computerParts)}
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${powerSupply == currentPowerSupply ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${powerSupplyIsCompatible(powerSupply, computerParts) ? '' : 'opacity-5'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(powerSupply.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, powerSupply)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${powerSupply.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{powerSupply.manufacturer + " " + powerSupply.model}</b>
                                        <b className='text-[green] pl-5'>{powerSupply.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Capacity:</dt>
                                            <dd>{powerSupply.powerRequirement}W</dd>
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