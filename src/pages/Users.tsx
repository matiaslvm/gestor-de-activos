import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { User } from '../types/user';

export function Users() {
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@empresa.com',
      role: 'ADMIN',
      area: 'IT',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSubmit = (data: Partial<User>) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...data } : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...data as User,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
    setSelectedUser(undefined);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleToggleStatus = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, active: !u.active } : u
    ));
  };

  const handleDelete = (user: User) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestione los usuarios del sistema y sus permisos.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="mt-8">
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(undefined);
            }}
          />
        </div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}