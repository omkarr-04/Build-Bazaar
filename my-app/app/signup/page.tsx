"use client"

import { useState } from "react"
import axios from "@/utils/api"
import { useRouter } from "next/navigation"

export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        contact: ""
    })
    const [error, setError] = useState("")
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
    }

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError("Username is required")
            return false
        }
        if (!formData.email.trim()) {
            setError("Email is required")
            return false
        }
        if (!formData.email.includes('@')) {
            setError("Please enter a valid email address")
            return false
        }
        if (!formData.contact.trim()) {
            setError("Contact number is required")
            return false
        }
        if (!/^\d{10}$/.test(formData.contact)) {
            setError("Please enter a valid 10-digit contact number")
            return false
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long")
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setError("")

        if (!validateForm()) {
            return
        }

        try {
            const res = await axios.post("/auth/register", {
                email: formData.email,
                password: formData.password,
                name: formData.username,
                contact: formData.contact
            })
            
            router.push("/login")
        } catch (err: any) {
            if (err.response) {
                switch (err.response.status) {
                    case 409:
                        setError("Email or username already exists")
                        break
                    case 400:
                        setError("Invalid input. Please check your details")
                        break
                    case 422:
                        setError("Email format is invalid")
                        break
                    default:
                        setError("Failed to create account. Please try again later")
                }
            } else if (err.request) {
                setError("Network error. Please check your internet connection")
            } else {
                setError("Something went wrong. Please try again")
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded" role="alert">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your username"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                id="contact"
                                name="contact"
                                type="tel"
                                pattern="[0-9]{10}"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your 10-digit contact number"
                                onChange={handleChange}
                                maxLength={10}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1"> Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm your password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => { router.push('/login') }}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
