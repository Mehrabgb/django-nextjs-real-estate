'use client'

import Link from 'next/link'
import RegisterAction from '@/actions/registeraction'
import { useActionState } from "react"

export default function RegisterForm() {
    const [state, formaction] = useActionState(RegisterAction, {})

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-text">
                        Create Account
                    </h1>

                    <p className="mt-2 text-text-muted">
                        Create your account and start shopping
                    </p>
                </div>

                {state?.error && (
                    <div
                        role="alert"
                        className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                    >
                        {state.error}
                    </div>
                )}

                <form className="space-y-5" action={formaction}>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text">
                            Username
                        </label>

                        <input
                            name="username"
                            type="text"
                            placeholder="Choose a username"
                            className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-text outline-none transition focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-text outline-none transition focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-text outline-none transition focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text">
                            Confirm Password
                        </label>

                        <input
                            name="password2"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-text outline-none transition focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary py-3 font-medium text-text-on-primary transition hover:bg-primary-hover"
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-text-muted">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    )
}