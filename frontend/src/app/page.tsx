"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              <span className="inline-block font-bold">Vaultify</span>
            </Link>
          </div>
          <nav className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 h-[calc(100vh-80px)] flex items-center">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Your passwords{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                secure
              </span>
              , your life{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                simple
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Store your passwords securely with Vaultify and access them
              anytime, anywhere. Modern password management made easy.
            </p>
            <div className="space-x-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="min-h-screen py-20 bg-gradient-to-b from-zinc-900 to-zinc-800 text-white flex items-center justify-center"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-16">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl mb-4">
                Features
              </h2>
              <p className="max-w-[85%] leading-normal text-zinc-300 sm:text-lg sm:leading-7">
                Discover what makes Vaultify the best choice for password
                management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
              <div className="bg-zinc-800/50 rounded-xl cursor-pointer p-8 backdrop-blur-sm border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Secure Storage</h3>
                <p className="text-zinc-300">
                  End-to-end encryption ensures your passwords remain private
                  and secure
                </p>
              </div>

              <div className="bg-zinc-800/50 rounded-xl cursor-pointer p-8 backdrop-blur-sm border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Password Generator</h3>
                <p className="text-zinc-300">
                  Create strong, unique passwords with our advanced generator
                </p>
              </div>

              <div className="bg-zinc-800/50 rounded-xl cursor-pointer p-8 backdrop-blur-sm border border-zinc-700/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Easy Access</h3>
                <p className="text-zinc-300">
                  Access your passwords securely from any device, anywhere
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    Why Choose Vaultify?
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Military-Grade Encryption
                        </h3>
                        <p className="text-muted-foreground">
                          Your data is protected with AES-256 encryption, the
                          same standard used by governments and military
                          organizations.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Zero-Knowledge Architecture
                        </h3>
                        <p className="text-muted-foreground">
                          We can't access your passwords. Your encryption key
                          never leaves your device.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6 text-pink-600 dark:text-pink-400"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          24/7 Support
                        </h3>
                        <p className="text-muted-foreground">
                          Our dedicated support team is always ready to help you
                          with any questions or concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-30 blur-xl"></div>
                  <div className="relative bg-zinc-900 rounded-xl shadow-xl p-8">
                    <div className="space-y-4">
                      <div className="h-2 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                      <h3 className="text-2xl font-bold">Try Vaultify Today</h3>
                      <p className="text-muted-foreground">
                        Join thousands of users who trust Vaultify with their
                        password security.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Completely Free
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Unlimited Passwords
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Cross-Platform Support
                        </li>
                      </ul>
                      <Link href="/auth/register" className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity">
                          Start
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/burakzaferozcan"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              burakzaferozcan
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/burakzaferozcan/vaultify"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
