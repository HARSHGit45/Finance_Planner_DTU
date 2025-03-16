import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LoanCal = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateLoan();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate yearly amortization data
    const yearlyData = [];
    let remainingBalance = loanAmount;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      remainingBalance -= principalPayment;

      if (month % 12 === 0 || month === numberOfPayments) {
        yearlyData.push({
          year: Math.ceil(month / 12),
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          balance: remainingBalance
        });
      }
    }

    updateChart(yearlyData);
    return { monthlyPayment, totalPayment, totalInterest, yearlyData };
  };

  const updateChart = (yearlyData) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const gradientPrincipal = ctx.createLinearGradient(0, 0, 0, 400);
    gradientPrincipal.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
    gradientPrincipal.addColorStop(1, 'rgba(79, 70, 229, 0)');

    const gradientInterest = ctx.createLinearGradient(0, 0, 0, 400);
    gradientInterest.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
    gradientInterest.addColorStop(1, 'rgba(239, 68, 68, 0)');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: yearlyData.map(data => `Year ${data.year}`),
        datasets: [
          {
            label: 'Principal',
            data: yearlyData.map(data => data.principal),
            backgroundColor: '#4F46E5',
            borderRadius: 4,
          },
          {
            label: 'Interest',
            data: yearlyData.map(data => data.interest),
            backgroundColor: '#EF4444',
            borderRadius: 4,
          }
        ]
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
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                size: 12
              }
            }
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
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString(undefined, { 
                  maximumFractionDigits: 0 
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
            stacked: true,
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
        animation: {
          duration: 1000,
        }
      }
    });
  };

  const { monthlyPayment, totalPayment, totalInterest } = calculateLoan();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{interestRate}%</div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Loan Term (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{loanTerm} years</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-blue-600 mb-2">Monthly Payment</h4>
            <div className="text-2xl font-bold text-blue-600">
              ₹{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-600 mb-2">Total Principal</h4>
              <div className="text-xl font-bold">₹{loanAmount.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-600 mb-2">Total Interest</h4>
              <div className="text-xl font-bold text-red-500">
                ₹{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="col-span-2 bg-gray-50 rounded-lg p-4">
              <h4 className="text-gray-600 mb-2">Total Payment</h4>
              <div className="text-xl font-bold">
                ₹{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="h-[400px] mb-6">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Understanding Your Loan</h4>
            <p className="text-sm text-gray-600">
              The chart above shows your yearly principal and interest payments. 
              The total height of each bar represents your total yearly payment, 
              split between principal (blue) and interest (red).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCal;