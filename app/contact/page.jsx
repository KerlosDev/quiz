import React from 'react'

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="space-y-6">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">تواصل معنا</h2>
                        <p className="text-gray-600 mb-4 text-right">
                            نحن هنا لمساعدتك! يمكنك التواصل معنا من خلال النموذج أدناه أو عبر وسائل التواصل المتاحة.
                        </p>
                    </section>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name / الاسم
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email / البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message / الرسالة
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send Message / إرسال الرسالة
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
