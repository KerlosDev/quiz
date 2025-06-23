"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { HiSparkles, HiOutlineSparkles, HiClock } from "react-icons/hi";
import { FaWhatsapp, FaMoneyBillWave, FaGift, FaMedal, FaRocket, FaCrown, FaRegCrown, FaUserGraduate } from "react-icons/fa";
import { BsShieldCheck, BsStarFill, BsCheckCircleFill, BsKey, BsLightning, BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { RiVipCrownFill, RiTimeLine } from 'react-icons/ri';
import { MdLocalOffer, MdCelebration } from 'react-icons/md';
import "react-toastify/dist/ReactToastify.css";

// Constants and configurations
const BENEFITS = [
    {
        icon: <FaRocket />,
        text: "وصول فوري للمحتوى",
        description: "ابدأ التعلم فوراً بعد التفعيل"
    },
    {
        icon: <FaUserGraduate />,
        text: "شهادة إتمام معتمدة",
        description: "احصل على شهادة بعد إكمال كل مستوى"
    },
    {
        icon: <FaGift />,
        text: "هدايا ومكافآت حصرية",
        description: "مكافآت خاصة للمتفوقين"
    },
    {
        icon: <BsStars />,
        text: "محتوى حصري VIP",
        description: "محتوى إضافي للأعضاء المميزين"
    }
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
};

const Page = () => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); const [remainingSpots, setRemainingSpots] = useState(15);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hoveredBenefit, setHoveredBenefit] = useState(null);

    const isValidCode = code.length === 6;

    const handleCodeChange = (e) => {
        // Only allow numbers and limit to 6 digits
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setCode(value);
    };

    useEffect(() => {
        // Set initial random number on client side
        setRemainingSpots(Math.floor(Math.random() * 10) + 5);

        const timer = setInterval(() => {
            setRemainingSpots(prev => Math.max(prev - 1, 3));
        }, 300000); // Decrease every 5 minutes

        return () => clearInterval(timer);
    }, []);

    const validCodes = [
        "395820", "104293", "782104", "645291", "908473",
        "231089", "504327", "813649", "729104", "186205",
        "304782", "912478", "620134", "537809", "158362",
        "749130", "831607", "264519", "970246", "148903",
    ];

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        if (!isValidCode) {
            toast.error("الرجاء إدخال كود مكون من 6 أرقام", {
                className: "font-arabicUI3",
                position: "top-center"
            });
            return;
        }

        setLoading(true);

        try {
            if (validCodes.includes(code)) {
                setShowSuccess(true);
                localStorage.setItem("premiumAccess", "true");
                toast.success("🎉 مبروك! تم تفعيل العضوية الذهبية بنجاح", {
                    className: "font-arabicUI3",
                    position: "top-center",
                });
                await new Promise(resolve => setTimeout(resolve, 2000));
                window.location.href = "/";
            } else {
                toast.error("عذراً، هذا الكود غير صالح. يرجى المحاولة مرة أخرى", {
                    className: "font-arabicUI3",
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("حدث خطأ. يرجى المحاولة مرة أخرى", {
                className: "font-arabicUI3",
                position: "top-center"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppClick = () => {
        window.open("https://wa.me/201080506463", "_blank");
    };

    const renderPriceSection = () => (
        <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 p-8 rounded-2xl mb-8 border border-yellow-500/30 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex flex-col items-center relative z-10">


                <span dir="ltr" className="text-yellow-400 font-arabicUI3 flex place-items-center gap-3 mb-2 text-lg">عرض  لفترة محدودة <HiClock className="text-yellow-400" /></span>
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-7xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">55</span>
                    <span className="text-2xl text-slate-300 font-arabicUI2">جنيه</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-arabicUI2">
                    <span className="line-through text-slate-500">100 جنيه</span>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-sm">خصم 45%</span>
                </div>

            </div>
        </motion.div>
    );

    const renderBenefits = () => (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {BENEFITS.map((benefit, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                    onHoverStart={() => setHoveredBenefit(index)}
                    onHoverEnd={() => setHoveredBenefit(null)}
                >
                    <div className="flex flex-col gap-3 bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-yellow-500/30 transition-all duration-300 hover:bg-slate-800/70">
                        <div className="p-3 rounded-lg bg-yellow-500/10 w-fit group-hover:scale-110 transition-all duration-300">
                            {React.cloneElement(benefit.icon, { className: "text-2xl text-yellow-400" })}
                        </div>
                        <div>
                            <h3 className="text-lg font-arabicUI3 text-slate-200 group-hover:text-yellow-400 transition-colors duration-300">
                                {benefit.text}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1 font-arabicUI2">
                                {benefit.description}
                            </p>
                        </div>
                        <AnimatePresence>
                            {hoveredBenefit === index && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <BsStars className="text-xl text-yellow-400 animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderCodeInput = () => (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="relative group">
                <input
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="أدخل كود التفعيل - 6 أرقام"
                    className={`w-full py-4 px-6 pl-12 rounded-xl bg-slate-800/50 border text-slate-200 font-arabicUI2 focus:outline-none transition-all duration-300 ${code.length > 0 ? (isValidCode ? 'border-green-500/50' : 'border-yellow-500/50') : 'border-slate-700'
                        } group-hover:border-yellow-500/30 placeholder-slate-500`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:scale-110">
                    <BsKey className={isValidCode ? 'text-green-500' : 'text-yellow-500'} />
                    {code.length > 0 && !loading && (
                        <div className="absolute inset-0 animate-ping opacity-75">
                            <BsKey className={isValidCode ? 'text-green-500' : 'text-yellow-500'} />
                        </div>
                    )}
                </div>
                {code.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2"
                    >
                        {isValidCode ? (
                            <BsCheckCircleFill className="text-green-400" />
                        ) : (
                            <span className="text-sm text-slate-400">
                                {6 - code.length} أرقام متبقية
                            </span>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Code verification hint */}
            <div className="text-center text-sm text-slate-400">
                {code.length > 0 && !isValidCode && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        يجب إدخال 6 أرقام للتفعيل
                    </motion.p>
                )}
            </div>

            <motion.button
                whileHover={isValidCode ? { scale: 1.02 } : {}}
                whileTap={isValidCode ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading || !isValidCode}
                className={`w-full py-4 px-6 rounded-xl text-white font-arabicUI3 text-lg transition-all duration-300 relative overflow-hidden group ${isValidCode
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-lg hover:shadow-yellow-500/20'
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 cursor-not-allowed opacity-50'
                    }`}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                            جاري التحقق...
                        </>
                    ) : (
                        <>
                            {isValidCode ? "تفعيل العضوية الذهبية" : "أدخل كود صحيح"}
                            {isValidCode && <RiVipCrownFill className="text-xl group-hover:animate-bounce" />}
                        </>
                    )}
                </span>
                {isValidCode && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 transform transition-transform duration-300 group-hover:scale-105"></div>
                )}
            </motion.button>

            <p className="text-center text-sm text-slate-400 mt-2">
                بالضغط على زر التفعيل، أنت توافق على شروط الاستخدام
            </p>
        </form>
    );

    return (
        <div dir="rtl" className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-yellow-500/5 to-transparent opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Limited Time Offer Banner */}
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl p-4 mb-8 border border-yellow-500/30 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-center gap-3 text-yellow-400 font-arabicUI3">
                        <HiSparkles className="text-2xl animate-pulse" />
                        <span>تم اشتراك 64 طالب .. الحق مكانك  فكلية احلامك بسرعة</span>
                        <HiSparkles className="text-2xl animate-pulse" />
                    </div>
                </motion.div>

                {/* Header Section with enhanced animation */}
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4"
                    >
                        <div className="relative">
                            <FaCrown className="text-6xl text-yellow-400 animate-pulse" />
                            <div className="absolute inset-0 text-yellow-400 animate-ping opacity-75">
                                <FaCrown className="text-6xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-arabicUI3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"
                    >
                        العضوية الذهبية VIP
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-400 text-lg md:text-xl font-arabicUI2 max-w-2xl mx-auto"
                    >
                        استثمر في مستقبلك التعليمي مع أقوى باقة تعليمية متكاملة
                    </motion.p>
                </div>

                {/* Main VIP Card with enhanced design */}
                <div className="max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-3xl border border-yellow-500/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-yellow-400"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                        <div className="relative z-10">
                            {/* Price Section with Special Offer */}
                            {renderPriceSection()}

                            {/* Payment Instructions with Enhanced Design */}
                            <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-xl p-6 mb-8 border border-slate-700/50 backdrop-blur-sm">
                                <h4 className="text-xl font-arabicUI3 text-yellow-400 mb-4 flex items-center gap-2">
                                    <FaMoneyBillWave />
                                    خطوات الاشتراك
                                </h4>                                    <ol className="space-y-4">
                                    {[
                                        'قم بتحويل 55 جنيه على فودافون كاش',
                                        'تواصل معنا على واتساب لإرسال كود التفعيل',
                                        'أدخل كود التفعيل للحصول على العضوية الذهبية'
                                    ].map((step, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="text-slate-300 font-arabicUI2">{step}</span>
                                        </motion.li>
                                    ))}
                                </ol>
                            </div>

                            {/* Contact Buttons with Hover Effects */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWhatsAppClick}
                                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-arabicUI3 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                                >
                                    <FaWhatsapp className="text-2xl" />
                                    تواصل على واتساب
                                </motion.button>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 font-arabicUI3 border border-slate-600"
                                >
                                    <FaMoneyBillWave className="text-2xl text-yellow-400" />
                                    <span dir="ltr">01080506463</span>
                                </motion.div>
                            </div>

                            {/* Enhanced Code Input */}
                            {renderCodeInput()}
                        </div>
                    </motion.div>
                </div>


            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default Page;

