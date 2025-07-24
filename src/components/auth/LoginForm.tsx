"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const data = await response.json()
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token)
        window.location.href = "/"
      } else {
        // Handle error
        console.error("Login failed")
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </div>
      </form>
    </Card>
  )
}