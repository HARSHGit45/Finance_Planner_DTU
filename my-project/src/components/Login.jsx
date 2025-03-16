import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors = {};
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.password) errors.password = "Password is required";

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsSubmitting(true);

            // Simulate API call (replace with actual login API)
            setTimeout(() => {
                toast.success("Login successful!");
                setFormData({ email: "", password: "" });
                setIsSubmitting(false);
            }, 1500);
        }
    };

    return (
        <section className="bg-orange-50 p-4 flex items-center justify-center min-h-screen">
            <Toaster />
            <div className="w-full max-w-sm border-2 border-emerald-950 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="mb-4 w-full border rounded px-3 py-2 focus:outline-none"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="mb-4 w-full border rounded px-3 py-2 focus:outline-none"
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

                    <button
                        type="submit"
                        className={`w-full bg-emerald-900 text-white py-2 rounded mt-4 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Log In"}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <Link to="/signup" className="text-emerald-700">Sign up</Link>
                </p>
            </div>
            <div className="absolute -bottom-2 left-0 right-0">
                {/* Back Wave */}
                <svg 
                    viewBox="0 0 1440 320" 
                    className="w-full absolute bottom-2 opacity-50"
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

export default Login;
