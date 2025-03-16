import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Insights = () => {
  const [timeframe, setTimeframe] = useState('Daily');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const data = [
    { category: 'Food', amount: 25, percentage: 30 },
    { category: 'Rent', amount: 15, percentage: 18 },
    { category: 'Clothing', amount: 10, percentage: 12 },
    { category: 'Education', amount: 8, percentage: 10 },
    { category: 'Miscellaneous', amount: 20, percentage: 24 },
    { category: 'Other', amount: 5, percentage: 6 },
  ];

  const getDataForTimeframe = (timeframe) => {
    switch(timeframe) {
      case 'Weekly':
        return data.map(item => ({
          ...item,
          amount: item.amount * 7
        }));
      case 'Monthly':
        return data.map(item => ({
          ...item,
          amount: item.amount * 30
        }));
      default:
        return data;
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const timeframeData = getDataForTimeframe(timeframe);

      // Create new chart
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: timeframeData.map(item => item.category),
          datasets: [{
            data: timeframeData.map(item => item.amount),
            backgroundColor: '#025241',
            borderRadius: 4,
            barThickness: 40,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'white',
              titleColor: '#666',
              bodyColor: '#666',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                label: (context) => `₹${context.raw}`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#666'
              },
              border: {
                display: false
              }
            },
            y: {
              grid: {
                color: '#e5e7eb',
                drawBorder: false,
                drawTicks: false
              },
              ticks: {
                color: '#666',
                callback: (value) => `₹${value}`
              },
              border: {
                display: false
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [timeframe]);

  // Update data when timeframe changes
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="p-32 bg-orange-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-950">Category Trends</h2>
        
        {/* Timeframe Toggle */}
        <div className="flex rounded-lg p-1">
          {['Daily', 'Weekly', 'Monthly'].map((period) => (
            <button
              key={period}
              onClick={() => handleTimeframeChange(period)}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeframe === period
                  ? 'bg-emerald-950 text-white/90 shadow'
                  : 'text-emerald-950'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-xl p-6 shadow-sm border-2 border-emerald-950">
        <div className="h-[400px] w-full">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Legend Section */}
        <div className="mt-6 space-y-3">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#025241]"></div>
                <span className="text-emerald-950">{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-950">
                 ₹{timeframe === 'Weekly' 
                    ? (item.amount * 7).toFixed(2) 
                    : timeframe === 'Monthly' 
                      ? (item.amount * 30).toFixed(2) 
                      : item.amount.toFixed(2)
                  }/{timeframe.toLowerCase().slice(0, -2)}
                </span>
                <span className="w-16 text-right font-medium">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;