type Props = {
    rateValue: number;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function RatingBox({rateValue, handleClick}: Props) {
    return(
        <button 
            onClick={handleClick}
            className="bg-[white] rounded-lg p-2 text-black min-w-[50px] hover:bg-slate-400 hover:cursor-pointer"
        >
            {rateValue}
        </button>
    )
}