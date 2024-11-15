import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Monitor, Users, PlusCircle, LayoutDashboard } from 'lucide-react';
import { AssetForm } from './components/AssetForm';

function App() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Monitor className="h-8 w-8 text-blue-600" />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/assets/new"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Activo
                  </Link>
                  <Link
                    to="/users"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Usuarios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                  </div>
                }
              />
              <Route
                path="/assets/new"
                element={
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Nuevo Activo</h1>
                        <p className="mt-2 text-sm text-gray-700">
                          Complete el formulario para registrar un nuevo activo en el sistema.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <AssetForm onSubmit={handleSubmit} onPrint={handlePrint} />
                    </div>
                  </div>
                }
              />
              <Route
                path="/users"
                element={
                  <div className="px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h1>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;