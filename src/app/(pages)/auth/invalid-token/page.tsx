export default function InvalidTokenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md bg-white shadow-md rounded p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Nieprawidłowy link aktywacyjny
        </h1>
        <p className="text-gray-700 mb-6">
          Link aktywacyjny jest nieprawidłowy, wygasł lub został już wykorzystany.
        </p>
        <a
          href="/auth/register"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Wróć do rejestracji
        </a>
      </div>
    </div>
  )
}
