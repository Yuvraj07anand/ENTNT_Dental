import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            ENTNT Dental Center
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Management Dashboard
          </h2>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;