import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SipCal = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateSIP();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [monthlyInvestment, investmentPeriod, expectedReturn]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = investmentPeriod * 12;
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = futureValue - totalInvestment;

    // Generate yearly data for the chart
    const yearlyData = [];
    for (let year = 0; year <= investmentPeriod; year++) {
      const monthsCompleted = year * 12;
      const valueAtYear = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      yearlyData.push(valueAtYear);
    }

    updateChart(yearlyData);
    return { futureValue, totalInvestment, totalReturns };
  };

  const updateChart = (yearlyData) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(2, 82, 65, 0.2)');
    gradient.addColorStop(1, 'rgba(2, 82, 65, 0)');

    const labels = Array.from({ length: yearlyData.length }, (_, i) => `Yr ${i}`);

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
                return tooltipItems[0].label;
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

  const { futureValue, totalInvestment, totalReturns } = calculateSIP();

  return (
    <div className="border-2 border-emerald-950 rounded-xl p-6 shadow-sm text-emerald-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
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
            <label className="block mb-2">Investment Period (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{investmentPeriod} years</div>
          </div>

          <div>
            <label className="block mb-2">Expected Return (%)</label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{expectedReturn}%</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className="text-blue-800 mb-2">Total Investment</h4>
              <div className="text-xl font-bold text-blue-800">
                ₹{totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className="text-gray-600 mb-2">Total Returns</h4>
              <div className="text-xl font-bold text-green-600">
                ₹{totalReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="bg-blue-100 rounded-lg p-4">
            <h4 className="text-blue-800 mb-2">Maturity Amount</h4>
            <div className="text-2xl font-bold text-blue-800">
              ₹{futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="border-2 border-emerald-950 rounded-lg p-4">
            <h4 className="font-medium mb-4">Investment Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="">Monthly Investment</span>
                <span className="font-medium">₹{monthlyInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="">Yearly Investment</span>
                <span className="font-medium">₹{(monthlyInvestment * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="">Expected Rate</span>
                <span className="font-medium">{expectedReturn}% p.a.</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="h-[400px] mb-6">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="border-2 border-emerald-950 rounded-lg p-4">
            <h4 className="font-medium mb-2">Understanding SIP Returns</h4>
            <p className="text-sm">
              A Systematic Investment Plan (SIP) helps you invest a fixed amount regularly. 
              The power of compounding and rupee cost averaging can help your wealth grow over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCal;