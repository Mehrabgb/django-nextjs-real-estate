'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function LoginAction(prevState, formData) {
    const username = formData.get('username')
    const password = formData.get('password')

    if (!username || !password) {
        return {
            error: "Username and password are required."
        }
    }

    let response
    let data

    try {
        response = await fetch(
            'http://backend:8000/users/login/',
            {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        data = await response.json()
    } catch {
        return {
            error: "Unable to connect to the server. Please try again."
        }
    }

    if (!response.ok) {
        return {
            error: data.detail || "Invalid username or password."
        }
    }

    const cookieStore = await cookies()

    cookieStore.set('refresh_token', data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })

    redirect('/')
}