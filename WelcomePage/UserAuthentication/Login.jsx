import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Login as loginUser } from "../../ReduxToolkit/Feature/Auth/Auththunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");
  const { user, loading, error, authMessage } = useSelector((state) => state.auth);


  useEffect(() => {
    if (location.state?.message) {
      setRegistrationMessage(location.state.message);
      if (location.state.registeredEmail) {
        setFormData(prev => ({
          ...prev,
          email: location.state.registeredEmail
        }));
      }
      
      const timer = setTimeout(() => {
        setRegistrationMessage("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const handleChange = (e) => {
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



  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form validation failed:", validationErrors);
      return;
    }
    
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password
    };
    
    console.log("Dispatching login action with email:", payload.email);
    dispatch(loginUser(payload));
  };


  useEffect(() => {
    if (user) {
      console.log("User logged in successfully, redirecting...");
      console.log("User role:", user.role);
      
      navigate("/main/pos");
    }
  }, [user, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold text-white">POS Cloud</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-8">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          {/* Show registration success message */}
          {registrationMessage && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">
              ✅ {registrationMessage}
            </div>
          )}
          
          {/* Show auth message if exists */}
          {authMessage && !error && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">
              {authMessage}
            </div>
          )}
          
          {/* Show error message if exists */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  validationErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="you@company.com"
              />
              {validationErrors.email && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
                  validationErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
                placeholder="••••••••"
              />
              {validationErrors.password && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;