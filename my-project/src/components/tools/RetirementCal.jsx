import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RetirementCal = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateRetirement();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentAge, retirementAge, monthlyInvestment, currentSavings, expectedReturn, inflationRate]);

  const calculateRetirement = () => {
    const years = retirementAge - currentAge;
    const monthlyRate = (expectedReturn - inflationRate) / 100 / 12;
    const totalMonths = years * 12;
    
    let futureValue = currentSavings;
    const yearlyData = [futureValue];
    
    for (let i = 1; i <= years; i++) {
      futureValue = futureValue * (1 + expectedReturn / 100) + monthlyInvestment * 12;
      yearlyData.push(futureValue);
    }

    updateChart(yearlyData);
    return { futureValue, yearlyData };
  };

  const updateChart = (yearlyData) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(2, 82, 65, 0.2)');
    gradient.addColorStop(1, 'rgba(2, 82, 65,  0)');

    const labels = Array.from({ length: yearlyData.length }, (_, i) => currentAge + i);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio Value',
          data: yearlyData,
          borderColor: '#025241',
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#025241',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: '#666',
            bodyColor: '#666',
            bodyFont: {
              size: 14,
              weight: '500',
            },
            padding: 12,
            borderColor: '#e5e7eb',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => {
                return `Age ${tooltipItems[0].label}`;
              },
              label: (context) => {
                return `₹${context.parsed.y.toLocaleString(undefined, { 
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 12,
              },
              color: '#666',
            }
          },
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              color: '#e5e7eb',
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 12,
              },
              color: '#666',
              callback: (value) => `₹${value.toLocaleString(undefined, { 
                maximumFractionDigits: 0,
                notation: 'compact',
                compactDisplay: 'short'
              })}`
            }
          }
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
        animation: {
          duration: 1000,
        }
      }
    });
  };

  const { futureValue, yearlyData } = calculateRetirement();
  const totalInvestment = currentSavings + monthlyInvestment * 12 * (retirementAge - currentAge);
  const totalReturns = futureValue - totalInvestment;

  return (
    <div className=" rounded-xl p-6 shadow-sm text-emerald-950 border-2 border-emerald-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Current Age</label>
            <input
              type="range"
              min="20"
              max="70"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{currentAge} years</div>
          </div>

          <div>
            <label className="block mb-2">Retirement Age</label>
            <input
              type="range"
              min={currentAge + 1}
              max="80"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{retirementAge} years</div>
          </div>

          <div>
            <label className="block mb-2">Monthly Investment</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-950"
            />
          </div>

          <div>
            <label className="block mb-2">Current Savings</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-950"
            />
          </div>

          <div>
            <label className="block mb-2">Expected Return (%)</label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{expectedReturn}%</div>
          </div>

          <div>
            <label className="block mb-2">Inflation Rate (%)</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{inflationRate}%</div>
          </div>
        </div>

        <div>
          <div className="h-[400px] mb-6">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className=" mb-2">Total Investment</h4>
              <div className="text-xl font-bold">₹{totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className=" mb-2">Total Returns</h4>
              <div className="text-xl font-bold text-green-600">
                ₹{totalReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="col-span-2 bg-blue-100 rounded-lg p-4">
              <h4 className="mb-2 text-blue-800">Retirement Corpus</h4>
              <div className="text-2xl font-bold text-blue-800">
                ₹{futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCal;