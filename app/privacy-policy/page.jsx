import React from 'react'

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

                <div className="space-y-6">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">سياسة الخصوصية</h2>
                        <p className="text-gray-600 mb-4 text-right">
                            نحن نقدر خصوصية زوارنا ونلتزم بحمايتها. تشرح هذه السياسة كيفية جمع معلوماتك الشخصية واستخدامها.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                        <p className="text-gray-600 mb-4">
                            We value the privacy of our visitors and are committed to protecting it. This policy explains how we collect and use your personal information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>Basic account information (name, email)</li>
                            <li>Quiz results and progress</li>
                            <li>Usage data and analytics</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>To provide and improve our services</li>
                            <li>To track your progress in quizzes</li>
                            <li>To personalize your learning experience</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
