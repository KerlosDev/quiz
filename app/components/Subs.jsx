import React from 'react'; 
import QuizV from './QuizV';

const Subs = () => {
    
    
    return (
        <div className='m-5  bg-quiz  bg-cover  p-4 rounded-xl bg-center'>
            <div className=' absolute w-80 h-80 bg-slate-900 left-0 top-48 rounded-full blur-2xl -z-20'></div>

            <div className='p-5'>
                
               <QuizV />
            </div>
        </div>
    );
};

export default Subs;
