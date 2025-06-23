import React from 'react'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>

                <div className="space-y-6">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">من نحن</h2>
                        <p className="text-gray-600 mb-4 text-right">
                            كويزاتك هي منصة تعليمية متخصصة تهدف إلى مساعدة الطلاب في تحسين مستواهم الدراسي من خلال اختبارات تفاعلية وموارد تعليمية متنوعة.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                        <p className="text-gray-600 mb-4">
                            Quizatak is a specialized educational platform aimed at helping students improve their academic performance through interactive quizzes and diverse educational resources.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-600 mb-4">
                            We strive to provide high-quality educational content and interactive learning experiences that help students achieve their academic goals. Our platform offers:
                        </p>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>Comprehensive subject coverage</li>
                            <li>Interactive quizzes and assessments</li>
                            <li>Personalized learning experiences</li>
                            <li>Progress tracking and analytics</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-gray-600 mb-4">
                            To become the leading educational platform that empowers students to reach their full potential through innovative learning solutions and comprehensive educational resources.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
