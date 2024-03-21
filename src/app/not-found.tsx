import Link from "next/link";

export default function NotFoundPage() {
  return(
    <section className="min-h-screen text-gray-900">
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link href="/" className="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg hover:underline text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
  );
}
