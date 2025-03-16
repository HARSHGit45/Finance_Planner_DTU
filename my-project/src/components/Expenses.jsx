import React, { useState } from "react";

const Expenses = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    income: "",
    rent: "",
    food: "",
    education: "",
    clothing: "",
    miscellaneous: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Expense details submitted successfully!");
  };

  return (
    <section className="bg-orange-50 min-h-screen pb-32 relative overflow-hidden">
      <div className="max-w-lg mx-auto mt-28 p-6 shadow-lg rounded-lg relative z-10 border-2 border-emerald-950">
        <h2 className="text-2xl font-bold text-center mb-4 ">Expense Tracker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Info */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="income"
            placeholder="Monthly Income"
            value={formData.income}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Expense Categories */}
          <h3 className="font-semibold mt-4">Monthly Expenses:</h3>
          <input
            type="number"
            name="rent"
            placeholder="Rent"
            value={formData.rent}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="food"
            placeholder="Food"
            value={formData.food}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="clothing"
            placeholder="Clothing"
            value={formData.clothing}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="miscellaneous"
            placeholder="Miscellaneous"
            value={formData.miscellaneous}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#012c23] text-white py-2 rounded-lg hover:bg-[#0b5223]"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Bottom Wave Background */}
      <div className="absolute -bottom-20 left-0 right-0">
        {/* Back Wave */}
        <svg
          viewBox="0 0 1440 320"
          className="w-full absolute bottom-0 opacity-50"
          preserveAspectRatio="none"
        >
          <path
            fill="#012c23"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,133.3C672,149,768,203,864,208C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Front Wave */}
        <svg
          viewBox="0 0 1440 320"
          className="w-full relative"
          preserveAspectRatio="none"
        >
          <path
            fill="#012c23"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Expenses;
