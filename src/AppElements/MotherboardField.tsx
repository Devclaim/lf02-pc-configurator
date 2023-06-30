import { Motherboard } from '../RawData/RawDataInterfaces';
import { motherboards } from '../RawData/MottherboardData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';

type Props = {
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> ,board: Motherboard) => void;
}

export function MotherboardField({currentMotherboard, handleClick}: Props) {

    return(
        <details className='[MotherboardField] bg-[white] rounded-lg w-full max-w-7xl group'>
            <summary className='cursor-pointer p-10 flex justify-between text-4xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>MOTHERBOARD</b>
                </div>
                <span> {currentMotherboard.manufacturer + " " + currentMotherboard.model} </span>
            </summary>

            <div className='grid grid-cols-1 lg:grid-cols-2 p-5 gap-5'>
                {
                    motherboards.map((board, index) => {
                        return(
                            <button
                                key={index}
                                className= {
                                    'rounded-lg border-4 p-5 flex cursor-pointer '
                                    + `${board == currentMotherboard ? 'border-green-600 bg-green-100' : 'border-black'}`
                                }
                                onClick={(e) => handleClick(e, board)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${board.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl pl-5 text-left w-full h-full justify-between'>
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