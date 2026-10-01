'use server'

import { redirect } from "next/navigation"

export default async function RegisterAction(prevState, formData) {
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    const password2 = formData.get('password2')

    if (!username || !email || !password || !password2) {
        return {
            error: "All fields are required."
        }
    }

    if (password !== password2) {
        return {
            error: "Passwords do not match."
        }
    }

    let response
    let data

    try {
        response = await fetch('http://backend:8000/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        data = await response.json()
    } catch {
        return {
            error: "Unable to connect to the server. Please try again."
        }
    }

    if (!response.ok) {
        return {
            error: data.detail || "Registration failed. Please check your information."
        }
    }

    redirect('/login')
}