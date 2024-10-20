export default function() {
  return (
<main className="flex min-h-screen items-center justify-center bg-[url('https://thumbs.dreamstime.com/b/folder-not-found-composition-web-hosting-isometric-icons-desktop-computer-parts-error-users-characters-vector-272646828.jpg')] px-6 py-24 sm:py-32 lg:px-8">
<div className="bg-white opacity-[0.8] rounded-lg shadow-lg p-10 text-center max-w-md">
  <div className="mb-4">
    <img src="https://image.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg" alt="Error illustration" className="mx-auto w-24 h-24" />
  </div>
  <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
  <h2 className="mt-2 text-2xl font-bold text-gray-700">Page not found</h2>
  <p className="mt-4 text-gray-600">We can’t seem to find the page you’re looking for.</p>
  
  <div className="mt-6">
    <a href="/home" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg px-5 py-2.5 shadow-lg transition duration-200">
      Go Back Home
    </a>
    <a href="#" className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
      Contact Support &rarr;
    </a>
  </div>
</div>
</main>
  );
}
