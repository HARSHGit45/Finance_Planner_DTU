import { useState, useMemo, useEffect } from 'react';
import { RiArrowDownSLine, RiShoppingBasketLine, RiNetflixFill, RiGasStationFill, RiRestaurantLine, RiLightbulbLine, RiDownloadLine } from 'react-icons/ri';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Transactions = () => {
  const [dateRange, setDateRange] = useState('All Time');
  const [category, setCategory] = useState('All Categories');
  const [minAmount, setMinAmount] = useState('0');
  const [maxAmount, setMaxAmount] = useState('1000');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Sample transaction data
  const allTransactions = [
    {
      id: 1,
      title: 'Grocery Shopping',
      date: 'Mar 1, 2023',
      amount: 85.75,
      category: 'Food',
      icon: RiShoppingBasketLine,
    },
    {
      id: 2,
      title: 'Netflix Subscription',
      date: 'Mar 2, 2023',
      amount: 14.99,
      category: 'Entertainment',
      icon: RiNetflixFill,
    },
    {
      id: 3,
      title: 'Gas Station',
      date: 'Mar 5, 2023',
      amount: 45.50,
      category: 'Transportation',
      icon: RiGasStationFill,
    },
    {
      id: 4,
      title: 'Restaurant Dinner',
      date: 'Mar 10, 2023',
      amount: 78.25,
      category: 'Food',
      icon: RiRestaurantLine,
    },
    {
      id: 5,
      title: 'Electric Bill',
      date: 'Mar 15, 2023',
      amount: 120.00,
      category: 'Utilities',
      icon: RiLightbulbLine,
    },
  ];

  // Get all available months from transactions
  const getAvailableMonths = () => {
    const months = allTransactions.map(t => {
      const date = new Date(t.date);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    });
    return [...new Set(months)].sort().reverse();
  };

  // Check for month reset
  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastReset = localStorage.getItem('lastTransactionReset');

    if (!lastReset || new Date(lastReset) < firstDayOfMonth) {
      localStorage.setItem('lastTransactionReset', today.toISOString());
    }
  }, []);

  // Filter transactions based on all criteria
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      const matchesCategory = category === 'All Categories' || transaction.category === category;
      const matchesAmount = transaction.amount >= Number(minAmount) && 
                          transaction.amount <= Number(maxAmount);
      
      let matchesDate = true;
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      
      switch(dateRange) {
        case 'This Week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = transactionDate >= weekAgo;
          break;
        case 'This Month':
          matchesDate = transactionDate.getMonth() === today.getMonth() &&
                       transactionDate.getFullYear() === today.getFullYear();
          break;
        case 'Last 3 Months':
          const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
          matchesDate = transactionDate >= threeMonthsAgo;
          break;
        default: // 'All Time'
          matchesDate = true;
      }

      return matchesCategory && matchesAmount && matchesDate;
    });
  }, [category, minAmount, maxAmount, dateRange]);

  // Download PDF function
  const downloadTransactionsPDF = () => {
    try {
      const doc = new jsPDF();
      const selectedMonthDate = new Date(selectedMonth);
      
      // Filter transactions for selected month
      const monthlyTransactions = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === selectedMonthDate.getMonth() &&
               transactionDate.getFullYear() === selectedMonthDate.getFullYear();
      });

      // Calculate total amount
      const totalAmount = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

      // Add title
      doc.setFontSize(16);
      doc.text(`Transaction Report - ${selectedMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`, 14, 20);

      // Add summary
      doc.setFontSize(12);
      doc.text(`Total Transactions: ${monthlyTransactions.length}`, 14, 30);
      doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, 40);

      // Create table
      const tableColumn = ["Date", "Title", "Category", "Amount"];
      const tableRows = monthlyTransactions.map(t => [
        t.date,
        t.title,
        t.category,
        `$${t.amount.toFixed(2)}`
      ]);

      // Generate table
      autoTable(doc, {
        startY: 50,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 139, 202] }
      });

      // Save PDF
      doc.save(`transactions-${selectedMonth}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Get unique categories for the dropdown
  const categories = ['All Categories', ...new Set(allTransactions.map(t => t.category))];

  // Reset all filters
  const handleReset = () => {
    setDateRange('All Time');
    setCategory('All Categories');
    setMinAmount('0');
    setMaxAmount('1000');
    setSelectedMonth('');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        
        {/* Download PDF Section */}
        <div className="flex items-center gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Month</option>
            {getAvailableMonths().map(month => (
              <option key={month} value={month}>
                {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>
          <button
            onClick={downloadTransactionsPDF}
            disabled={!selectedMonth}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${selectedMonth 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            <RiDownloadLine />
            Download PDF
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Date Range:</span>
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option>All Time</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
            <RiArrowDownSLine className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Category:</span>
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <RiArrowDownSLine className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Amount Range Filters */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Min Amount:</span>
          <input 
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-24 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Max Amount:</span>
          <input 
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-24 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>

        {/* Add Transaction Button */}
        <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <span>+</span>
          Add Transaction
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found matching your filters
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <transaction.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">{transaction.title}</h3>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-medium">${transaction.amount.toFixed(2)}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {transaction.category}
                </span>
                <RiArrowDownSLine className="text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;