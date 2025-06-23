import React from 'react'

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8 text-center">Terms & Conditions</h1>

                <div className="space-y-6">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">شروط الاستخدام</h2>
                        <p className="text-gray-600 mb-4 text-right">
                            باستخدام موقعنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
                        <p className="text-gray-600 mb-4">
                            By using our website, you agree to comply with these terms and conditions. Please read them carefully.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>Use the service responsibly and ethically</li>
                            <li>Do not share account credentials</li>
                            <li>Respect other users and their content</li>
                            <li>Follow quiz guidelines and rules</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Content Usage</h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>All content is protected by copyright</li>
                            <li>Users may not reproduce or distribute content without permission</li>
                            <li>Quiz results and certificates are personal</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
