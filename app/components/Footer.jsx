import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 cursor-default text-gray-300">
            <div className="container mx-auto px-6 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">كويزاتك / Quizatak</h3>
                        <p className="text-sm">
                            منصة تعليمية متخصصة للاختبارات التفاعلية
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">روابط سريعة / Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    من نحن / About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    تواصل معنا / Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">قانوني / Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy-policy" className="hover:text-white transition">
                                    سياسة الخصوصية / Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition">
                                    شروط الاستخدام / Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t-2 border-gray-700 pt-8">
                    <p className="text-center font-anton text-xl md:text-2xl">
                        Developed By &nbsp;
                        <a href="https://kerlos.site" className="hover:text-white transition">
                            <span className='hover:scale-105 bg-paton bg-clip-text text-transparent'>
                                Kerlos Hany
                            </span>
                        </a>
                        &nbsp;|&nbsp;
                        <Link href='/'>
                            <span className='bg-paton text-slate-900 px-2 rounded-xl bg-cover font-arabicUI2'>
                                كويزاتك
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer