import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HomeAffordCal = () => {
  const [annualIncome, setAnnualIncome] = useState(1200000); // ₹12L per year
  const [monthlyDebts, setMonthlyDebts] = useState(20000);
  const [downPayment, setDownPayment] = useState(2000000); // ₹20L
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateAffordability();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm]);

  const calculateAffordability = () => {
    // Monthly income
    const monthlyIncome = annualIncome / 12;
    
    // Maximum monthly payment (using 28% rule)
    const maxMonthlyPayment = monthlyIncome * 0.28;
    
    // Maximum monthly payment considering debts (using 36% rule)
    const maxTotalPayment = monthlyIncome * 0.36;
    const maxPaymentWithDebts = maxTotalPayment - monthlyDebts;
    
    // Use the lower of the two maximums
    const maxAllowedPayment = Math.min(maxMonthlyPayment, maxPaymentWithDebts);
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const maxLoanAmount = maxAllowedPayment * 
      ((1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate);
    
    // Maximum house price
    const maxHousePrice = maxLoanAmount + downPayment;

    updateChart(maxHousePrice, downPayment, maxLoanAmount);
    return { maxHousePrice, maxLoanAmount, maxMonthlyPayment: maxAllowedPayment };
  };

  const updateChart = (maxHousePrice, downPayment, maxLoanAmount) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Down Payment', 'Loan Amount'],
        datasets: [{
          data: [downPayment, maxLoanAmount],
          backgroundColor: ['#4F46E5', '#EF4444'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context) => `₹${context.parsed.toLocaleString()}`
            }
          }
        }
      }
    });
  };

  const { maxHousePrice, maxLoanAmount, maxMonthlyPayment } = calculateAffordability();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Home Affordability Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Annual Income</label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Monthly Debts</label>
              <input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Down Payment</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Interest Rate (%)</label>
              <input
                type="range"
                min="5"
                max="15"
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
                min="5"
                max="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2">{loanTerm} years</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-[300px] mb-6">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-blue-600 mb-2">Maximum House Price</h4>
              <div className="text-2xl font-bold text-blue-600">
                ₹{maxHousePrice.toLocaleString()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-600 mb-2">Maximum Loan Amount</h4>
                <div className="text-xl font-bold">₹{maxLoanAmount.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-600 mb-2">Monthly Payment</h4>
                <div className="text-xl font-bold">₹{maxMonthlyPayment.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Understanding Your Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">28% Rule</h4>
            <p className="text-gray-600">Your monthly mortgage payment should not exceed 28% of your gross monthly income.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">36% Rule</h4>
            <p className="text-gray-600">Your total monthly debt payments should not exceed 36% of your gross monthly income.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Down Payment</h4>
            <p className="text-gray-600">A larger down payment can help you afford a more expensive home and reduce monthly payments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAffordCal;