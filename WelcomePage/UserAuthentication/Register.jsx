import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../ReduxToolkit/Feature/Auth/Auththunk";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { user, loading, error } = useSelector((state) => state.auth);

  const validateForm = () => 
    {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) =>
     {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ""
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role
    };
    
    console.log("Registration Payload:", payload);
    dispatch(signup(payload));
  };

useEffect(() => {
  console.log(" Auth State Update:", {
    user,
    loading,
    error
  });

  let isMounted = true;

  if (!loading && !error && user && isMounted) {
    console.log("Registration successful, user:", user);
    setRegistrationSuccess(true);
  
    const timer = setTimeout(() => {
      if (isMounted) {
        console.log("Navigating to login...");
        navigate('/Login', { 
          state: { 
            message: "Registration successful! Please login.",
            registeredEmail: formData.email 
          }
        });
      }
    }, 2000); // Reduce to 2 seconds
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }
  
  if (error && isMounted) {
    setRegistrationSuccess(false);
  }
  
  return () => {
    isMounted = false;
  };
}, [user, loading, error, navigate, formData.email, dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold text-white">POS Cloud</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-8">Create Account</h1>
          <p className="text-gray-400 mt-2">Start your 14-day free trial</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          {/* Show success message during redirection */}
          {registrationSuccess && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">
              <strong>✅ Registration Successful!</strong> Redirecting to login page...
            </div>
          )}
          
          {/* Show error message if exists */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              <strong>Registration Failed:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  validationErrors.fullName 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="John Doe"
                disabled={loading}
              />
              {validationErrors.fullName && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  validationErrors.email 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="you@company.com"
                disabled={loading}
              />
              {validationErrors.email && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  validationErrors.password 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="••••••••"
                minLength="6"
                disabled={loading}
              />
              {validationErrors.password ? (
                <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
              ) : (
                <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                disabled={loading}
              >
                <option value="ROLE_USER">ROLE_USER (Standard User)</option>
                <option value="ROLE_BRANCH_MANAGER">ROLE_BRANCH_MANAGER</option>
                <option value="ROLE_STORE_MANAGER">ROLE_STORE_MANAGER</option>
                <option value="ROLE_BRANCH_CASHIER">ROLE_BRANCH_CASHIER</option>
                <option value="ROLE_STORE_ADMIN">ROLE_STORE_ADMIN</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              </select>
              <p className="text-gray-500 text-xs mt-1">* Required fields</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Login
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;