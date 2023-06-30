import { GPU, Motherboard } from '../RawData/RawDataInterfaces';
import { gpus } from '../RawData/GPUData';
import { ReactComponent as ArrowDownSvg } from '../Icons/arrow-down.svg';
import { gpuIsCompatible } from '../Compatibility/CompatibilityFunctions';

type Props = {
    currentGPU: GPU;
    currentMotherboard: Motherboard;
    handleClick: (e: React.MouseEvent<HTMLButtonElement> , gpu: GPU) => void;
}

export function GPUField({currentGPU, currentMotherboard, handleClick}: Props) {
    return(
        <details className='[GPUField] bg-[white] rounded-lg w-full max-w-7xl group'>
            <summary className='cursor-pointer p-10 flex justify-between text-4xl'>
                <div className='flex gap-5'>
                    <ArrowDownSvg
                        className='group-open:rotate-180 h-full'
                    />
                    <b>GPU</b>
                </div>
                <span className={`${gpuIsCompatible(currentGPU, currentMotherboard) ? '' : 'text-red-500'}`}> {currentGPU.manufacturer + " " + currentGPU.model} </span>
            </summary>

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
                                    'rounded-lg border-4 p-5 flex cursor-pointer '
                                    + `${gpu == currentGPU ? 'border-green-600 bg-green-100' : 'border-black'} `
                                    + `${gpuIsCompatible(gpu, currentMotherboard) ? '' : 'opacity-5'}`
                                }
                                onClick={(e) => handleClick(e, gpu)}
                            >
                                <img
                                    className='w-[20%] object-contain'
                                    src={require(`../Icons/${gpu.manufacturer}-logo.png`)}
                                />
                                <div className='flex flex-col text-2xl pl-5 text-left w-full h-full justify-between'>
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