import React from "react";
import diagramBase from './diagram-base.png'

type Props = {
    src: string;
    descr: string;
}

export default function ZoomableImage({src, descr}: Props) {
    const [state, setState] = React.useState('0% 0%');

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const { left, top, width, height } = target?.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.screenY - (top + 100)) / height * 100;
        setState( `${x}% ${y}%` );
    }

    return(
        <div>
            <div className="App-header">
			<p className='font-bold'>
				{descr}
			</p>
		    </div>
            <figure 
                onMouseMove={handleMouseMove}
                className="bg-no-repeat w-full"
                style ={{backgroundImage: `url(${src})` , backgroundPosition: state}}
            >
                <img 
                    src={src}
                    className="hover:opacity-0 block"
                    alt="checkDieURLNochmal"
                />
            </figure>
        </div>

    )
}