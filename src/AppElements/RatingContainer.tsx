import { RatingBox } from "./RatingBox"
import React from "react"

export function RatingContainer() {
    const [success, setSuccess] = React.useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSuccess(true);
    }

    return(
        <div className="flex gap-5 items-center">
            {!success && <RatingBox handleClick={handleClick} rateValue={1}></RatingBox>}
			{!success && <RatingBox handleClick={handleClick} rateValue={2}></RatingBox>}
			{!success && <RatingBox handleClick={handleClick} rateValue={3}></RatingBox>}
			{!success && <RatingBox handleClick={handleClick} rateValue={4}></RatingBox>}
			{!success && <RatingBox handleClick={handleClick} rateValue={5}></RatingBox>}
            {success && <div className="text-green-400 font-bold">
                3+ !!!! Thank you! We value your Opinion!
            </div>}
        </div>
    )
}