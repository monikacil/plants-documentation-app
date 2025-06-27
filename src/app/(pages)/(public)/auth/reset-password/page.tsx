import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md bg-white shadow-md rounded p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Password successfully changed!
        </h1>
        <p className="text-gray-700 mb-6">
          You can now login with your new password.
        </p>
        <Link
          href="/public"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}
