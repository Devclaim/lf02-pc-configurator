import React, { MouseEventHandler } from 'react';
import { Motherboard } from '../RawData/RawDataInterfaces';
import { motherboards } from '../RawData/MottherboardData';

type Props = {
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard) => void;
}

export function MotherboardField({currentMotherboard, handleClick}: Props) {

    return(
        <details className='[MotherboardField] bg-[white] rounded-lg w-full max-w-5xl'>
            <summary className='cursor-pointer p-10 flex justify-between text-4xl'>
                <b>MOTHERBOARD</b>
                <span> {currentMotherboard.manufacturer + " " + currentMotherboard.model} </span>
            </summary>

            <div className='flex flex-col p-5 space-y-5'>
                {
                    motherboards.map((board, index) => {
                        return(
                            <button
                                key={index}
                                className='rounded-lg border-black border-2 p-5 flex cursor-pointer'
                                onClick={(e) => handleClick(e, board)}
                            >
                                <img
                                    className='w-[25%] object-contain'
                                    src={require(`../Icons/${board.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl px-5 text-left w-full'>
                                    <div className='flex justify-between w-full'> 
                                        <b>{board.manufacturer + " " + board.model}</b>
                                        <b className='text-[green]'>{board.price + " €"}</b>
                                    </div>
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
                            </button>
                        ) 
                    })
                }
            </div>
        </details>
    )
}