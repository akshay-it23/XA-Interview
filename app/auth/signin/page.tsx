"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                // --- Sign In ---
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    setError(result.error);
                } else {
                    router.push("/dashboard");
                    router.refresh();
                }
            } else {
                // --- Register ---
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error);
                } else {
                    // Auto sign-in after registration
                    const result = await signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        redirect: false,
                    });

                    if (result?.ok) {
                        router.push("/dashboard");
                        router.refresh();
                    }
                }
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-xl border p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {isLogin
                            ? "Sign in to your InterviewX account"
                            : "Start your interview prep journey"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Akshay"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Sign In"
                                : "Create Account"}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                        className="text-primary hover:underline"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>

                {/* OAuth buttons will be added in Day 5! */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            OAuth providers coming in Day 5
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
