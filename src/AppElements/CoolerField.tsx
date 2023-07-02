import { Cooler, Motherboard } from '../RawData/RawDataInterfaces';
import { coolers } from '../RawData/CoolerData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { brandFiltersCooler } from '../RawData/Filters';
import React from 'react';
import { coolerIsCompatible } from '../Compatibility/CompatibilityFunctions';

type Props = {
    currentCooler: Cooler;
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , cooler: Cooler) => void;
}

export function CoolerField({currentCooler, currentMotherboard, handleClick}: Props) {
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
                '[CoolerField] bg-[white] rounded-lg w-full group '
                + `${currentMotherboard.manufacturer === 'No Motherboard Selected' ? 'opacity-5' : ''}`
            }
        >
            <summary className='cursor-pointer p-5 sm:p-10 flex flex-wrap justify-between text-2xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>Cooler</b>
                </div>
                <span className={`${coolerIsCompatible(currentCooler, currentMotherboard) ? '' : 'text-red-500'} text-left`}> {currentCooler.manufacturer + " " + currentCooler.model} </span>
            </summary>
            <div className='[BrandFilters] text-white bg-slate-700 w-full p-5 gap-5 flex text-2xl items-center flex-wrap'>
                <b>Brand Filters: </b>
                {
                    brandFiltersCooler.map((brand, index) =>{
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
                    coolers
                    .sort(
                        (a, b) => (coolerIsCompatible(a, currentMotherboard) ? 0 : 1) - (coolerIsCompatible(b, currentMotherboard) ? 0 : 1)
                    )
                    .map((cooler, index) => {
                        return(
                            <button
                                disabled={!coolerIsCompatible(cooler, currentMotherboard)}
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${cooler == currentCooler ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${coolerIsCompatible(cooler, currentMotherboard) ? '' : 'opacity-5'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(cooler.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, cooler)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${cooler.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{cooler.manufacturer + " " + cooler.model}</b>
                                        <b className='text-[green] pl-5'>{cooler.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>TDP:</dt>
                                            <dd>{cooler.powerRequirement}W</dd>
                                        </div>
                                        <div className='grid_item '>
                                            <dt>Socket:</dt>
                                            <dd>{cooler.socket}</dd>
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