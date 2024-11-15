import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, X } from 'lucide-react';
import { User, UserRole } from '../types/user';

interface UserFormProps {
  user?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<User>>({
    defaultValues: user
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {user ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete la información del usuario.
            </p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">Este campo es requerido</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">Email inválido</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  {...register('role', { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="MANAGER">Gestor</option>
                  <option value="USER">Usuario</option>
                  <option value="READONLY">Solo lectura</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Área</label>
                <input
                  type="text"
                  {...register('area', { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </button>
      </div>
    </form>
  );
}