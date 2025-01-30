import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-9xl font-arabicUI2 text-red-500">404</h1>
            <p className="text-4xl font-arabicUI3 text-white mt-4">بطل لعب فالصفحات يبطيخة </p>
            

            <Link href="/" className="mt-6 bg-blue-500/20 p-5 rounded-xl border-dashed border-blue-500 border-2 font-arabicUI3 text-blue-500 hover:scale-110 ease-in-out transition duration-300">الصفحة الرئيسية</Link>
        </div>
    );
}
