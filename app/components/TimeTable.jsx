'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../api/GlobalApi'
import { PiBaseballHelmetFill } from "react-icons/pi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaFaceAngry } from "react-icons/fa6";
import Swal from 'sweetalert2';


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
    
        // Create a map of subjects and their lessons
        let subjectMap = {};
        let totalLessonsCount = 0;
    
        // Check the data structure and organize lessons
        if (Array.isArray(aronelessons)) {
            aronelessons.forEach(subject => {
                if (subject.lesson && subject.lesson.length > 0) {
                    const subjectName = subject.subjectName;
                    // Preserve the original order of lessons
                    const lessons = subject.lesson.map((lesson, index) => ({
                        subjectName: subjectName,
                        lessonName: lesson.lessonName,
                        originalIndex: index // Keep track of original order
                    }));
                    
                    subjectMap[subjectName] = {
                        name: subjectName,
                        lessons: lessons,
                        totalLessons: lessons.length,
                        remainingLessons: [...lessons], // Copy for tracking
                        lessonsPerDay: 1, // Default initial value
                        currentLessonIndex: 0 // Track which lesson to use next
                    };
                    
                    totalLessonsCount += lessons.length;
                }
            });
        } else {
            const subjects = aronelessons?.timetables || [];
            subjects.forEach(subject => {
                if (subject.lesson && subject.lesson.length > 0) {
                    const subjectName = subject.subjectName;
                    // Preserve the original order of lessons
                    const lessons = subject.lesson.map((lesson, index) => ({
                        subjectName: subjectName,
                        lessonName: lesson.lessonName,
                        originalIndex: index // Keep track of original order
                    }));
                    
                    subjectMap[subjectName] = {
                        name: subjectName,
                        lessons: lessons,
                        totalLessons: lessons.length,
                        remainingLessons: [...lessons], // Copy for tracking
                        lessonsPerDay: 1, // Default initial value
                        currentLessonIndex: 0 // Track which lesson to use next
                    };
                    
                    totalLessonsCount += lessons.length;
                }
            });
        }
    
        const subjectNames = Object.keys(subjectMap);
        
        // If no lessons are found, show an error message
        if (subjectNames.length === 0 || totalLessonsCount === 0) {
            alert("Couldn't find any lessons in the data");
            console.error("Structured data:", aronelessons);
            return;
        }
    
        // Calculate optimal lessons per day for each subject
        // For subjects with many lessons, assign more lessons per day
        subjectNames.forEach(subjectName => {
            const subject = subjectMap[subjectName];
            // Calculate how many lessons per day this subject should have
            // Based on relative size compared to other subjects
            const lessonsPerDay = Math.max(1, Math.ceil(subject.totalLessons / days));
            
            // Limit the lessons per day to a reasonable number (adjust as needed)
            subject.lessonsPerDay = Math.min(lessonsPerDay, 3);
            
            console.log(`Subject ${subjectName}: ${subject.totalLessons} lessons, ${subject.lessonsPerDay} per day`);
        });
    
        // Create the timetable with ordered lessons
        const timetable = [];
        let daySubjectMap = {}; // Track which subjects were used on which days
        
        // Calculate the minimum required days to complete all lessons
        const minRequiredDays = Math.ceil(
            subjectNames.reduce((total, subjectName) => {
                const subject = subjectMap[subjectName];
                return total + Math.ceil(subject.totalLessons / subject.lessonsPerDay);
            }, 0) / subjectsPerDay
        );
        
        if (minRequiredDays > days) {
            alert(`Warning: You may need at least ${minRequiredDays} days to complete all lessons with your current settings.`);
        }
        
        // Function to get subjects for a specific day with smart rotation but ensuring ordered lessons
        const getSubjectsForDay = (day) => {
            // First, get subjects that still have lessons and weren't used recently
            // Check which subjects were used in the last 2 days
            const recentDays = [day-1, day-2].filter(d => d > 0);
            const recentlyUsedSubjects = new Set();
            
            recentDays.forEach(d => {
                if (daySubjectMap[d]) {
                    daySubjectMap[d].forEach(s => recentlyUsedSubjects.add(s));
                }
            });
            
            // Filter subjects that have remaining lessons
            const availableSubjects = subjectNames.filter(subjectName => 
                subjectMap[subjectName].remainingLessons.length > 0
            );
            
            // Sort subjects by priority:
            // 1. Subjects not used recently
            // 2. Subjects with the most remaining lessons relative to their total
            return availableSubjects.sort((a, b) => {
                // First priority: subjects not used recently
                const aRecent = recentlyUsedSubjects.has(a) ? 1 : 0;
                const bRecent = recentlyUsedSubjects.has(b) ? 1 : 0;
                if (aRecent !== bRecent) return aRecent - bRecent;
                
                // Second priority: subjects with highest ratio of remaining lessons
                const aRatio = subjectMap[a].remainingLessons.length / subjectMap[a].totalLessons;
                const bRatio = subjectMap[b].remainingLessons.length / subjectMap[b].totalLessons;
                return bRatio - aRatio;
            });
        };
        
        // Distribute lessons across days, but always take lessons in order
        for (let day = 1; day <= days; day++) {
            const dayLessons = [];
            const todaySubjects = new Set();
            
            // Get prioritized subjects for today
            const prioritizedSubjects = getSubjectsForDay(day);
            
            // Take up to subjectsPerDay subjects
            const selectedSubjects = prioritizedSubjects.slice(0, subjectsPerDay);
            
            // For each selected subject, add the appropriate number of lessons IN ORDER
            selectedSubjects.forEach(subjectName => {
                const subject = subjectMap[subjectName];
                const lessonCount = Math.min(
                    subject.lessonsPerDay, 
                    subject.remainingLessons.length
                );
                
                // Sort the remaining lessons by their original index to maintain order
                subject.remainingLessons.sort((a, b) => a.originalIndex - b.originalIndex);
                
                // Add the lessons to today's schedule in their original order
                for (let i = 0; i < lessonCount; i++) {
                    if (subject.remainingLessons.length > 0) {
                        // Always take the first lesson (which is the earliest in the original order)
                        const lesson = subject.remainingLessons.shift();
                        dayLessons.push(lesson);
                        todaySubjects.add(subjectName);
                    }
                }
            });
            
            // If we still have room for more lessons and there are subjects with remaining lessons,
            // add more lessons from subjects with the most remaining
            if (selectedSubjects.length < subjectsPerDay) {
                const additionalSubjects = prioritizedSubjects.slice(selectedSubjects.length);
                
                // Fill remaining subject slots
                for (let i = 0; i < subjectsPerDay - selectedSubjects.length; i++) {
                    if (i < additionalSubjects.length) {
                        const subjectName = additionalSubjects[i];
                        const subject = subjectMap[subjectName];
                        
                        // Sort to maintain order
                        subject.remainingLessons.sort((a, b) => a.originalIndex - b.originalIndex);
                        
                        if (subject.remainingLessons.length > 0) {
                            const lesson = subject.remainingLessons.shift();
                            dayLessons.push(lesson);
                            todaySubjects.add(subjectName);
                        }
                    }
                }
            }
            
            // Record which subjects were used today
            daySubjectMap[day] = Array.from(todaySubjects);
            
            // Add the day to the timetable
            timetable.push({
                day: day,
                lessons: dayLessons
            });
            
            // Check if all lessons have been distributed
            const remainingLessonsCount = subjectNames.reduce(
                (total, name) => total + subjectMap[name].remainingLessons.length, 0
            );
            
            if (remainingLessonsCount === 0) {
                break;  // Exit the loop if all lessons have been distributed
            }
        }
        
        // Check if we have any remaining lessons that didn't fit
        const remainingLessonsCount = subjectNames.reduce(
            (total, name) => total + subjectMap[name].remainingLessons.length, 0
        );
        
        if (remainingLessonsCount > 0) {
            // Distribute remaining lessons
            const remainingLessons = [];
            
            // Sort lessons from each subject by their original index to maintain order
            subjectNames.forEach(name => {
                const subject = subjectMap[name];
                subject.remainingLessons.sort((a, b) => a.originalIndex - b.originalIndex);
                remainingLessons.push(...subject.remainingLessons);
            });
            
            // Sort remaining lessons by subject name and then by original index
            remainingLessons.sort((a, b) => {
                if (a.subjectName !== b.subjectName) {
                    return a.subjectName.localeCompare(b.subjectName);
                }
                return a.originalIndex - b.originalIndex;
            });
            
            // Sort days by the number of lessons (ascending)
            const dayIndices = Array.from({ length: timetable.length }, (_, i) => i)
                .sort((a, b) => timetable[a].lessons.length - timetable[b].lessons.length);
            
            // Distribute remaining lessons to days with fewer lessons
            for (const lesson of remainingLessons) {
                timetable[dayIndices[0]].lessons.push(lesson);
                // Re-sort after adding a lesson
                dayIndices.sort((a, b) => timetable[a].lessons.length - timetable[b].lessons.length);
            }
            
            alert(`Note: Not all lessons could fit perfectly in your ${days} day schedule. Some days may have more lessons than others.`);
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

            if (checkbox.checked) {
                toast.success('❤️ برافو يبطل', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    className: 'font-arabicUI3 w-fit m-7 text-lg p-4 rounded-lg shadow-lg',
                });
            } else {
                toast.error(' 😡 مذاكرتش ليهه', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    className: 'font-arabicUI3 w-fit m-7 text-lg p-4 rounded-lg shadow-lg',
                });
            }
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
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: " اي انجاز انت عملته هيتمسح  !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفها!',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('generatedTimeTable');
                localStorage.removeItem('checkboxStates');
                setGeneratedTimeTable([]);
                setShowModel(false);
                setProgress(0);
                Swal.fire(
                    'تم الحذف!',
                    'تم حذف الجدول الزمني.',
                    'success'
                )
            }
        })
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
            <ToastContainer></ToastContainer>

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
