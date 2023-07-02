import { Storage, Motherboard } from '../RawData/RawDataInterfaces';
import { storages } from '../RawData/StorageData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { brandFilters } from '../RawData/Filters';
import React from 'react';

type Props = {
    currentStorage: Storage;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , storage: Storage) => void;
}

export function StorageField({currentStorage, handleClick}: Props) {
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
                '[StorageField] bg-[white] rounded-lg w-full group'
            }
        >
            <summary className='cursor-pointer p-5 sm:p-10 flex flex-wrap justify-between text-2xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>Storage</b>
                </div>
                <span className='text-left'> {currentStorage.manufacturer + " " + currentStorage.model} </span>
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
                    storages
                    .map((storage, index) => {
                        return(
                            <button
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-1 sm:p-5 flex flex-col sm:flex-row cursor-pointer '
                                    + `${storage == currentStorage ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${activeBrandFilters.length > 0 ? activeBrandFilters.includes(storage.manufacturer) ? '' : 'hidden' : ''}`
                                }
                                onClick={(e) => handleClick(e, storage)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${storage.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl sm:pl-5 text-left w-full h-full justify-between'>
                                    <div className='flex justify-between w-full pb-2'> 
                                        <b>{storage.manufacturer + " " + storage.model}</b>
                                        <b className='text-[green] pl-5'>{storage.price + "€"}</b>
                                    </div>
                                    <div>
                                        <div className='grid_item bg-gray-300'>
                                            <dt>Capacity:</dt>
                                            <dd>{storage.capacity} GB</dd>
                                        </div>
                                        <div className='grid_item'>
                                            <dt>Interface:</dt>
                                            <dd>{storage.interface}</dd>
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