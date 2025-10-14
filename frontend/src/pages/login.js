import { useState } from "react";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [userDetails, setUserDetails] = useState({
        'name': '', email: '', password: ''
    })

    const handleInput = (e) => {
       const {name, value} = e.target 
       setUserDetails(prevState => ({
            ...prevState,
            [name]: value
       })
       )
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
           const response = await axios.post('/api/auth/login', userDetails)
           console.log(response)

        } catch(err) {
           console.log(err)
        }
    }

    return (
        <div
            className="relative flex min-h-screen items-center justify-center font-montserrat"
        >
            {/* overlay */}

            <div className={`relative overflow-hidden rounded-3xl shadow-2xl bg-white w-[768px] max-w-full min-h-[480px] z-10`}>
                {/* Register Form */}
                {isRegister && (
                    <div className={`absolute top-0 h-full w-1/2 transition-all duration-500 ${isRegister ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"}`}>
                        <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center bg-white h-full px-10 py-8">
                            <h1 className="font-bold text-2xl mb-4">Create Account</h1>
                            <div className="flex space-x-2 mb-4">
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaGooglePlusG /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaFacebookF /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaGithub /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaLinkedinIn /></button>
                            </div>
                            <span className="text-xs mb-2">or use your email for registration</span>
                            <input className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm" name='name' onChange={handleInput} type="text" placeholder="Name" />
                            <input className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm" name='email' onChange={handleInput} type="email" placeholder="Email" />
                            <input className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm" name='password' onChange={handleInput} type="password" placeholder="Password" />
                            <button type="submit" className="bg-indigo-700 text-white px-8 py-2 rounded-lg uppercase font-semibold mt-2">Sign Up</button>
                        </form>
                    </div>
                )}

                {/* Login Form */}
                {!isRegister && (
                    <div className={`absolute top-0 h-full w-1/2 transition-all duration-500 z-20 ${isRegister ? "translate-x-full" : ""}`}>
                        <form onSubmit={handleInput} className={`flex flex-col items-center justify-center bg-white h-full px-10 py-8`}>
                            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
                            <div className="flex space-x-2 mb-4">
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaGooglePlusG /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaFacebookF /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaGithub /></button>
                                <button className="border rounded-lg flex items-center justify-center w-10 h-10 text-indigo-600"><FaLinkedinIn /></button>
                            </div>
                            <span className="text-xs mb-2">or use your email password</span>
                            <input className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm" name='email' onChange={handleInput} type="email" placeholder="Email" />
                            <input className="bg-gray-200 px-3 py-2 rounded-lg mb-2 w-full text-sm" name='password' onChange={handleInput} type="password" placeholder="Password" />
                            <a href="#" className="text-indigo-600 text-xs my-2">Forget Your Password?</a>
                            <button type="submit" className="bg-indigo-700 text-white px-8 py-2 rounded-lg uppercase font-semibold mt-2">Sign In</button>
                        </form>
                    </div>
                )}

                {/* Toggle Panel */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 z-30 ${isRegister ? "-translate-x-full rounded-br-[100px] rounded-tr-[150px]" : "rounded-tl-[150px] rounded-bl-[100px]"}`}>
                    <div className={`bg-gradient-to-r from-indigo-400 to-indigo-700 h-full flex flex-col items-center justify-center text-white px-8 transition-all duration-500`}>
                        {/* Panel Text and Button */}
                        {!isRegister ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <h1 className="font-bold text-2xl mb-4">Hello, Friend!</h1>
                                <p className="text-sm mb-4">Register with your personal details to use all site features</p>
                                <button className="bg-transparent text-white border border-white px-8 py-2 rounded-lg uppercase font-semibold mt-2" onClick={() => setIsRegister(true)}>Sign Up</button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <h1 className="font-bold text-2xl mb-4">Welcome Back!</h1>
                                <p className="text-sm mb-4">Enter your personal details to use all site features</p>
                                <button className="bg-transparent text-white border border-white px-8 py-2 rounded-lg uppercase font-semibold mt-2" onClick={() => setIsRegister(false)}>Sign In</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
