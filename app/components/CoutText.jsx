import React from 'react'
import CountUp from './CountUp'

const CoutText = ({number}) => {
    return (

    
        <div className=' border-2 p-3 rounded-xl border-amber-950 w-fit mx-auto'>
            <CountUp
                from={0}
                to={number}
                separator=","
                direction="up"
                duration={1}

                className="count-up-text flex justify-center bg-daark bg-cover text-transparent bg-clip-text mx-auto text-4xl font-arabicUI3"
            />
            <h4 className=' flex justify-center font-arabicUI3 bg-daark bg-cover text-transparent bg-clip-text ' >عدد الاسئلة </h4>

        </div>
    )
}

export default CoutText