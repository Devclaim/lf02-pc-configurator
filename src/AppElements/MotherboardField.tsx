import React from 'react';
import { Motherboard } from '../RawData/RawDataInterfaces';
import { motherboards } from '../RawData/MottherboardData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { brandFilters } from '../RawData/Filters';

type Props = {
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard) => void;
}

export function MotherboardField({currentMotherboard, handleClick}: Props) {
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
        <details className='[MotherboardField] bg-[white] rounded-lg w-full group'>
            <summary className='cursor-pointer p-10 flex flex-wrap justify-between text-3xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>MOTHERBOARD</b>
                </div>
                <span> {currentMotherboard.manufacturer + " " + currentMotherboard.model} </span>
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
                    motherboards.map((board, index) => {
                        return(
                            <button
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${board == currentMotherboard ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(board.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, board)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${board.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{board.manufacturer + " " + board.model}</b>
                                        <b className='text-[green] pl-5'>{board.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>TDP:</dt>
                                            <dd>{board.powerRequirement}W</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Socket:</dt>
                                            <dd>{board.socket}</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>RAM Slots:</dt>
                                            <dd>{board.ramSlots}x {board.ramType}</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>PCIe Slots:</dt>
                                            <dd>{board.pcieSlots}x 16-Pin PCIe {board.pcieRequirement}.0</dd>
                                        </div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>USB Ports:</dt>
                                            <dd>{board.usbPorts}x USB 4.0</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>SATA Ports:</dt>
                                            <dd>{board.usbPorts}x SATA</dd>
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