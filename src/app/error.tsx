"use client";

import Link from "next/link";
export default function ErrorPage() {
  return (
    <section className="min-h-screen text-gray-900">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Something&apos;s error.
          </p>
          <p className="mb-4 text-lg font-light">
            Sorry, there was an error processing your request.
          </p>
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium hover:underline focus:outline-none focus:ring-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
