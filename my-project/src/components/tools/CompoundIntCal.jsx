import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CompoundIntCal = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12); // monthly by default
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateCompoundInterest();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [principal, rate, time, compoundingFrequency]);

  const calculateCompoundInterest = () => {
    const r = rate / 100;
    const n = compoundingFrequency;
    const t = time;
    const p = principal;

    const amount = p * Math.pow(1 + r/n, n * t);
    const interest = amount - p;

    // Generate yearly data for the chart
    const yearlyData = [];
    for (let year = 0; year <= t; year++) {
      const yearAmount = p * Math.pow(1 + r/n, n * year);
      yearlyData.push(yearAmount);
    }

    updateChart(yearlyData);
    return { amount, interest };
  };

  const updateChart = (yearlyData) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = Array.from({ length: yearlyData.length }, (_, i) => `Year ${i}`);

    chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Balance',
          data: yearlyData,
          borderColor: '#025241',
          backgroundColor: 'rgba(2, 82, 65, 0.1)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `₹${context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            }
          }
        }
      }
    });
  };

  const frequencyOptions = [
    { value: 1, label: 'Annually' },
    { value: 2, label: 'Semi-Annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' }
  ];

  const { amount, interest } = calculateCompoundInterest();

  return (
    <div className="border-2 border-emerald-950 rounded-xl p-6 shadow-sm text-emerald-950">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Principal Amount</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-950"
            />
          </div>

          <div>
            <label className="block mb-2">Interest Rate (%)</label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{rate}%</div>
          </div>

          <div>
            <label className="block mb-2">Time Period (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{time} years</div>
          </div>

          <div>
            <label className="block mb-2">Compounding Frequency</label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-950"
            >
              {frequencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className=" mb-2">Principal Amount</h4>
              <div className="text-xl font-bold">₹{principal.toLocaleString()}</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h4 className=" mb-2">Total Interest</h4>
              <div className="text-xl font-bold text-green-600">
                ₹{interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="bg-blue-100 rounded-lg p-4">
            <h4 className="text-blue-800 mb-2">Final Amount</h4>
            <div className="text-2xl font-bold text-blue-800">
              ₹{amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        <div>
          <div className="h-[400px] mb-6">
            <canvas ref={chartRef}></canvas>
          </div>

          {/* Additional Information */}
          <div className="border-2 border-emerald-950 rounded-lg p-4">
            <h4 className="font-medium mb-2">Understanding Compound Interest</h4>
            <p className=" text-sm">
              Compound interest is calculated on the initial principal and also on the accumulated interest 
              of previous periods. The more frequently interest is compounded, the more your money will grow.
            </p>
            <div className="mt-4 text-sm">
              <div className="flex justify-between">
                <span>Compounding Frequency:</span>
                <span className="font-medium">
                  {frequencyOptions.find(f => f.value === compoundingFrequency)?.label}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Times Compounded:</span>
                <span className="font-medium">{compoundingFrequency * time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundIntCal;