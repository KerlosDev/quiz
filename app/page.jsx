
import Hero from "./components/Hero";
import Subjects from "./components/Subjects";




export default function Home() {
  return (
   
    <div>

<div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-9xl font-arabicUI2 text-red-500">تم تعطيل الموقع</h1>
            <p className="text-4xl font-arabicUI3 text-white mt-4">اي حد حول فلوس رجعتله بالتوفيق ليكم يشباب </p>
            

            <Link href="/" className="mt-6 bg-blue-500/20 p-5 rounded-xl border-dashed border-blue-500 border-2 font-arabicUI3 text-blue-500 hover:scale-110 ease-in-out transition duration-300">الصفحة الرئيسية</Link>
        </div>

      
  {/*    
      
      <Hero></Hero>
      <Subjects></Subjects>
      */}
      
    </div>
  );
}
