import Link from "next/link";

export default function InvalidTokenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md bg-white shadow-md rounded p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Invalid token!
        </h1>
        <p className="text-gray-700 mb-6">
          Link is invalid or expired.
        </p>
        <Link
          href="/public"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Back to register
        </Link>
      </div>
    </div>
  );
}
