import React from 'react';
import RegisterForm from '../components/RegisterForm';


const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;