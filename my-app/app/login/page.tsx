"use client"

import { useState } from "react"
import axios from "@/utils/api"
import { useRouter } from "next/navigation"
import { login } from "@/utils/auth"
import { useAuth } from "@/contexts/AuthContext"

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const router = useRouter()
    const { setProfile } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            login(formData.email, formData.password)
            const res = await axios.post("/auth/login", formData)
            console.log("formdata : ", res.data.token)
            localStorage.setItem("token", res.data.token)
            setProfile(res.data.token)

            setTimeout(() => {
                router.push("/profile")
            }, 2000)
        } catch (err) {
            setError("Invalid email or password")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 relative mb-4 group">
                        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute inset-2 bg-blue-100 rounded-full"></div>
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 rounded-full"></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-500 rounded-t-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => { router.push('/signup') }}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
