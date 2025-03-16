import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [timeframe, setTimeframe] = useState('daily');
  
  // Sample data - replace with your actual data
  const netWorth = 150000;
  const accounts = {
    checking: 5000,
    savings: 25000,
    investment: 115000,
    cash: 5000
  };

  const spendingData = {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [120, 85, 150, 95, 180, 220, 90]
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [850, 920, 780, 1100]
    }
  };

  const chartData = {
    labels: spendingData[timeframe].labels,
    datasets: [{
      label: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Spending`,
      data: spendingData[timeframe].data,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      borderWidth: 2,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'rgb(59, 130, 246)',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
      tension: 0.4
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          callback: (value) => `$${value}`,
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        titleFont: {
          size: 13,
          weight: 'bold'
        },
        bodyColor: '#666',
        bodyFont: {
          size: 12
        },
        padding: 12,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-6 items-stretch justify-center min-h-screen p-4 mt-20'>
        <div className='bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 h-[400px] flex flex-col items-center justify-center'>
            <h2 className='text-xl font-bold mb-3'>Net Worth</h2>
            <p className='text-4xl font-bold text-green-600'>
                ${netWorth.toLocaleString()}
            </p>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 h-[400px] flex flex-col'>
            <h2 className='text-xl font-bold mb-4 text-center'>Account Balances</h2>
            <div className='space-y-3 flex-grow flex flex-col justify-center'>
                <div className='flex justify-between items-center'>
                    <span className='font-medium'>Checking</span>
                    <span className='text-gray-700'>${accounts.checking.toLocaleString()}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='font-medium'>Savings</span>
                    <span className='text-gray-700'>${accounts.savings.toLocaleString()}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='font-medium'>Investment</span>
                    <span className='text-gray-700'>${accounts.investment.toLocaleString()}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='font-medium'>Cash</span>
                    <span className='text-gray-700'>${accounts.cash.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 h-[400px] flex flex-col'>
            <h2 className='text-xl font-bold mb-4 text-center'>Spending Trends</h2>
            <div className='flex justify-center mb-4'>
                <div className='bg-gray-200 p-1 rounded-lg inline-flex'>
                    <button 
                        className={`px-4 py-2 rounded-md transition-all duration-200 ${
                            timeframe === 'daily' 
                            ? 'bg-white text-blue-800 shadow-sm transform translate-y-[1px]' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setTimeframe('daily')}
                    >
                        Daily
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md transition-all duration-200 ${
                            timeframe === 'weekly' 
                            ? 'bg-white text-blue-800 shadow-sm transform translate-y-[1px]' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setTimeframe('weekly')}
                    >
                        Weekly
                    </button>
                </div>
            </div>
            <div className='flex-grow'>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    </div>
  );
};

export default Home;