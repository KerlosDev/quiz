'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../api/GlobalApi'
import { PiBaseballHelmetFill } from "react-icons/pi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';


const TimeTable = () => {


    const [aronelessons, setArOneLessons] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [days, setDays] = useState(30)
    const [subjectsPerDay, setSubjectsPerDay] = useState(4)
    const [generatedTimeTable, setGeneratedTimeTable] = useState([])
    const [progress, setProgress] = useState(0)





    useEffect(() => {
        getSubjects();
        const savedTimeTable = localStorage.getItem('generatedTimeTable');
        const savedCheckboxes = localStorage.getItem('checkboxStates');
        if (savedTimeTable) {
            setGeneratedTimeTable(JSON.parse(savedTimeTable));
            setShowModel(true);
        }
        if (savedCheckboxes) {
            const checkboxes = JSON.parse(savedCheckboxes);
            setTimeout(() => {
                checkboxes.forEach((checked, index) => {
                    const checkbox = document.querySelectorAll('input[type="checkbox"]')[index];
                    if (checkbox) {
                        checkbox.checked = checked;
                    }
                });
                updateProgress();
            }, 0);
        }
    }, [])

    const getSubjects = () => {
        GlobalApi.timetabledata().then((res) => {
            setArOneLessons(res.timetablejsons[0].timetable);
            console.log(res.timetablejsons[0].timetable);
        });
    };

    const generateTimeTable = () => {
        if (!aronelessons) {
            console.error("No lessons data available");
            return;
        }

        if (days <= 0 || subjectsPerDay <= 0) {
            alert("Please enter valid values for days and subjects per day");
            return;
        }

        // إنشاء مصفوفة مسطحة تحتوي على جميع الدروس مع أسماء المواد
        let allLessons = [];
        let subjectLessons = {};

        // التحقق من بنية البيانات
        if (Array.isArray(aronelessons)) {
            aronelessons.forEach(subject => {
                if (subject.lesson) {
                    subjectLessons[subject.subjectName] = subject.lesson.map(lesson => ({
                        subjectName: subject.subjectName,
                        lessonName: lesson.lessonName
                    }));
                    subject.lesson.forEach(lesson => {
                        allLessons.push({
                            subjectName: subject.subjectName,
                            lessonName: lesson.lessonName
                        });
                    });
                }
            });
        } else {
            const subjects = aronelessons?.timetables || [];
            subjects.forEach(subject => {
                if (subject.lesson) {
                    subjectLessons[subject.subjectName] = subject.lesson.map(lesson => ({
                        subjectName: subject.subjectName,
                        lessonName: lesson.lessonName
                    }));
                    subject.lesson.forEach(lesson => {
                        allLessons.push({
                            subjectName: subject.subjectName,
                            lessonName: lesson.lessonName
                        });
                    });
                }
            });
        }

        // إذا لم يتم العثور على أي دروس، نعرض رسالة خطأ
        if (allLessons.length === 0) {
            alert("Couldn't find any lessons in the data");
            console.error("Structured data:", aronelessons);
            return;
        }

        // حساب عدد الدروس لكل مادة
        const subjectNames = Object.keys(subjectLessons);
        let subjectProgress = {};
        subjectNames.forEach(subject => {
            subjectProgress[subject] = 0;
        });

        // إنشاء الجدول الزمني
        const timetable = [];
        for (let day = 1; day <= days; day++) {
            const dayLessons = [];

            // توزيع الدروس لكل مادة
            subjectNames.forEach(subject => {
                const lessons = subjectLessons[subject];
                const totalLessons = lessons.length;
                const lessonsPerDay = Math.floor(totalLessons / days); // عدد الدروس لكل يوم
                const remainder = totalLessons % days; // الدروس الزائدة

                // عدد الدروس لهذا اليوم
                let lessonsToday = lessonsPerDay;
                if (day <= remainder) {
                    lessonsToday++; // نضيف درسًا إضافيًا للأيام الأولى
                }

                // إضافة الدروس إلى اليوم الحالي
                for (let i = 0; i < lessonsToday; i++) {
                    if (subjectProgress[subject] < totalLessons) {
                        dayLessons.push(lessons[subjectProgress[subject]]);
                        subjectProgress[subject]++;
                    }
                }
            });

            // تحديد عدد المواد في اليوم
            const selectedSubjects = [];
            const shuffledDayLessons = [...dayLessons].sort(() => Math.random() - 0.5); // خلط الدروس
            shuffledDayLessons.forEach(lesson => {
                if (selectedSubjects.length < subjectsPerDay && !selectedSubjects.includes(lesson.subjectName)) {
                    selectedSubjects.push(lesson.subjectName);
                }
            });

            // إضافة دروس المواد المحددة إلى اليوم
            const finalDayLessons = dayLessons.filter(lesson => selectedSubjects.includes(lesson.subjectName));

            timetable.push({
                day: day,
                lessons: finalDayLessons
            });
        }

        setGeneratedTimeTable(timetable);
        setShowModel(true);
        localStorage.setItem('generatedTimeTable', JSON.stringify(timetable));
    };

    const handleTaskClick = (e) => {
        const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            saveCheckboxStates();
            updateProgress();
        }
    };

    const saveCheckboxStates = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);
        localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
    };

    const updateProgress = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const totalCount = checkboxes.length;
        const progressPercentage = (checkedCount / totalCount) * 100;
        setProgress(progressPercentage);
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('generatedTimeTable');
        localStorage.removeItem('checkboxStates');
        setGeneratedTimeTable([]);
        setShowModel(false);
        setProgress(0);
    };

    return (
        <div className='bg-back2 rounded-xl p-2 md:p-8 m-3 md:m-8'>

            <div className="backdrop-blur-lg mx-auto w-fit border border-white/40 text-5xl text-white p-4 m-4 rounded-xl flex flex-row items-center">
                <PiBaseballHelmetFill className=' ' />
                <h2 className='font-arabicUI2'>المنقذ</h2>
            </div>
            <div dir='rtl' className={` backdrop-blur-lg mx-auto  border border-white/40 text-xl ${showModel ? "lg:w-full" : "lg:w-1/4"}  text-white p-4 m-4 rounded-xl flex flex-row items-center `}>
                <p className='font-arabicUI2 text-center flex justify-center '>خلاص يشباب هانت التزم علي قد متقدر بالجدول اللي انت هتعمله عشان انت اللي هتخسر صدقني مش والدك او والدتك او اي حد غيرك دي حياتك انت اصحا وفوق !</p>
            </div>

            <div dir='rtl' className={` ${!showModel ? "w-fit " : "lg:grid-cols-3"} font-arabicUI3 text-white backdrop-blur-xl mx-auto border border-white/40 md:p-8 m-4 grid  rounded-xl`}>
                {showModel ? (
                    <>
                        {generatedTimeTable.map((day, index) => (
                            <div dir='rtl' key={index} className='p-4'>
                                <h2 className='text-2xl font-bold mb-2 border-white/40 border bg-black/20 p-4 rounded-xl w-fit flex place-items-center gap-3'>اليوم {day.day} <FaRegCalendarDays /></h2>
                                <div className='grid grid-cols-1 bg-black/20 border-white/40 border grid-flow-row p-4 rounded-xl  gap-4'>
                                    {day.lessons.map((lesson, lessonIndex) => (
                                        <div id='task' key={lessonIndex} className='flex transition  ease-in-out hover:scale-105 bg-gray-300/10  outline outline-1 outline-gray-400 rounded-xl place-items-center justify-between p-2' onClick={handleTaskClick}>

                                            <div className=' place-items-center flex gap-4'>

                                                {lesson.subjectName == 'لغة عربية' && <Image src='/ar.png' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'جيولوجيا' && <Image src='/geo.png' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'لغة انجليزية' && <Image src='/en.png' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'فيزياء' && <Image src='/ph.png' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'لغة فرنسية' && <Image src='/fr.png' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'كيمياء' && <Image src='/chem.jpg' width={50} height={50} alt='en' />}
                                                {lesson.subjectName == 'احياء' && <Image src='/bio2.jpg' width={50} height={50} alt='en' />}

                                                <div>
                                                    <div className='font-bold'>{lesson.subjectName}</div>
                                                    <div className=' '>{lesson.lessonName}</div>
                                                </div>

                                            </div>

                                            <label className="neon-checkbox  place-items-center">
                                                <input type="checkbox" />
                                                <div className="neon-checkbox__frame ">
                                                    <div className="neon-checkbox__box  ">
                                                        <div className="neon-checkbox__check-container">
                                                            <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                                                                <path d="M3,12.5l7,7L21,5"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="neon-checkbox__glow"></div>
                                                        <div className="neon-checkbox__borders">
                                                            <span></span><span></span><span></span><span></span>
                                                        </div>
                                                    </div>
                                                    <div className="neon-checkbox__effects">
                                                        <div className="neon-checkbox__particles">
                                                            <span></span><span></span><span></span><span></span> <span></span
                                                            ><span></span><span></span><span></span> <span></span><span></span
                                                            ><span></span><span></span>
                                                        </div>
                                                        <div className="neon-checkbox__rings">
                                                            <div className="ring"></div>
                                                            <div className="ring"></div>
                                                            <div className="ring"></div>
                                                        </div>
                                                        <div className="neon-checkbox__sparks">
                                                            <span></span><span></span><span></span><span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}



                        <button onClick={clearLocalStorage} className='buttonn hover:bg-blue-700 m-4 text-black py-2 px-4 rounded'>
                            <span className='text-white text-3xl'>مسح الجدول</span>
                        </button>

                    </>
                ) : (
                    <div dir='rtl' className='mx-auto flex justify-center p-4 font-arabicUI2 text-white'>
                        <div className='gap-y-6 flex flex-col'>
                            <div>
                                <h2 dir='rtl' className='text-2xl flex place-items-center gap-2 font-bold  mb-2'>
                                    عدد الايام
                                    <FaRegCalendarDays />
                                </h2>
                                <input
                                    placeholder='30'
                                    type="number"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="rounded-xl bg-back5 bg-center bg-cover p-3 text-8xl placeholder:text-white/40 font-arabicUI3 w-[4ch] text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>

                            <div>
                                <h2 className='text-2xl flex place-items-center gap-2 font-bold mb-2'> عدد المواد فاليوم
                                    <FaBook />
                                </h2>
                                <input
                                    type="number"
                                    placeholder='4'
                                    value={subjectsPerDay}
                                    onChange={(e) => setSubjectsPerDay(e.target.value)}
                                    className="rounded-xl bg-back6 text-white placeholder:text-white/40 bg-cover active:border-none p-3 text-8xl font-arabicUI3 w-[4ch] text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>

                            <button onClick={generateTimeTable} className='buttonn hover:bg-blue-700 text-black py-2 px-4 rounded'>
                                <span className='text-white text-3xl'>انشاء جدول</span>
                            </button>

                        </div>
                    </div>
                )}


            </div>

            <Link href='https://t.me/ToopSecbot?start=r04854140460'>
                <div dir='rtl' className="backdrop-blur-lg mx-auto gap-3 w-fit border border-white/40 text-xl md:text-5xl text-white p-4 m-4 rounded-xl flex flex-row items-center">
                    <h2 className='font-arabicUI2'>3200 مذكرة ثانوية عامة مجانا  </h2>
                    <FaBook />
                </div>
            </Link>

        </div>
    )
}

export default TimeTable;