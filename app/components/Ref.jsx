import React from 'react'
import CodeGen from './CodeGen'
import { IoPersonSharp } from "react-icons/io5";

const Ref = () => {
    return (
        <div className='p-4 md:p-6 lg:p-8'>
            <div className='bg-non3 bg-cover rounded-xl shadow-blue-800/40 shadow-xl lg:p-5 lg:m-5 m-2 pt-5 px-2 p-1'>
                <h3 dir='rtl' className='gap-2 font-arabicUI3  text-3xl lg:text-5xl text-white mx-auto flex justify-center rounded-xl outline-dashed outline-white outline-2 bg-black/10 backdrop-blur-xl p-4 w-fit'>دعوة الاصدقاء <IoPersonSharp /></h3>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-4 bg-white rounded-xl'>
                    <CodeGen />
                    <p dir='rtl' className='col-span-1 sm:leading-relaxed md:leading-relaxed lg:leading-relaxed md:col-span-2  xl:col-span-1 text-xl lg:text-2xl  leading-relaxed bg-green-500/30 text-green-700 h-fit m-4 border-4 text-center rounded-xl border-green-500 rounded-r-xl font-arabicUI3 p-2'>
                        لو عاوز تفعل كل الامتحانات اللي عالموقع خلي عشر صحاب يعملو حساب فالموقع وبعد ميعملو حساب خليهم يدخلو علي الصفحة دي ويحطو الكود بتاعهم
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Ref;