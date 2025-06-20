'use client';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ResultPage = () => {
    const [decryptedData, setDecryptedData] = useState([]);
    const [inputData, setInputData] = useState('');
    const encryptionKey = 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash';

    const handleDecrypt = () => {
        try {
            const parsedData = JSON.parse(inputData);
            const decrypted = parsedData.map(item => {
                const bytes = CryptoJS.AES.decrypt(item.encryptedData, encryptionKey);
                const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
                return JSON.parse(decryptedText);
            });
            setDecryptedData(decrypted);
        } catch (error) {
            console.error('Decryption error:', error);
            alert('Error decrypting data. Please check the input format.');
        }
    };

    const calculateStats = () => {
        if (decryptedData.length === 0) return null;

        const stats = {
            totalAttempts: decryptedData.length,
            averageScore: 0,
            averageTime: 0,
            subjectDistribution: {},
            scoreRanges: {
                '0-20%': 0,
                '21-40%': 0,
                '41-60%': 0,
                '61-80%': 0,
                '81-100%': 0,
            },
        };

        decryptedData.forEach(data => {
            const scorePercentage = (data.score / data.totalQuestions) * 100;
            stats.averageScore += scorePercentage;
            stats.averageTime += data.timeSpent;
            
            // Count subject distribution
            stats.subjectDistribution[data.sub] = (stats.subjectDistribution[data.sub] || 0) + 1;
            
            // Count score ranges
            if (scorePercentage <= 20) stats.scoreRanges['0-20%']++;
            else if (scorePercentage <= 40) stats.scoreRanges['21-40%']++;
            else if (scorePercentage <= 60) stats.scoreRanges['41-60%']++;
            else if (scorePercentage <= 80) stats.scoreRanges['61-80%']++;
            else stats.scoreRanges['81-100%']++;
        });

        stats.averageScore = (stats.averageScore / decryptedData.length).toFixed(2);
        stats.averageTime = Math.round(stats.averageTime / decryptedData.length);

        return stats;
    };

    const renderCharts = (stats) => {
        const scoreRangeData = {
            labels: Object.keys(stats.scoreRanges),
            datasets: [
                {
                    label: 'Number of Students',
                    data: Object.values(stats.scoreRanges),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const subjectData = {
            labels: Object.keys(stats.subjectDistribution),
            datasets: [
                {
                    data: Object.values(stats.subjectDistribution),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
                    <Bar
                        data={scoreRangeData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Score Ranges Distribution'
                                }
                            }
                        }}
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
                    <Pie
                        data={subjectData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    };

    const stats = calculateStats();

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Quiz Results Analysis
                </h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                    <div className="p-6">
                        <textarea
                            className="w-full h-48 p-4 border rounded-lg mb-4"
                            placeholder="Paste your encrypted data array here..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        <button
                            onClick={handleDecrypt}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Decrypt Data
                        </button>
                    </div>
                </div>

                {stats && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-2">Total Attempts</h3>
                                <p className="text-3xl font-bold text-blue-600">{stats.totalAttempts}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-2">Average Score</h3>
                                <p className="text-3xl font-bold text-green-600">{stats.averageScore}%</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-2">Average Time</h3>
                                <p className="text-3xl font-bold text-purple-600">
                                    {Math.floor(stats.averageTime / 60)}:{(stats.averageTime % 60).toString().padStart(2, '0')}
                                </p>
                            </div>
                        </div>

                        {renderCharts(stats)}

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="grid gap-6 p-6">
                                {decryptedData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <h4 className="font-semibold">Quiz Name:</h4>
                                                <p>{item.quizName}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Score:</h4>
                                                <p>{item.score} / {item.totalQuestions} ({((item.score / item.totalQuestions) * 100).toFixed(2)}%)</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Time Spent:</h4>
                                                <p>{item.formattedTime}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Subject:</h4>
                                                <p>{item.sub}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultPage;