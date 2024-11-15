import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Printer, Save } from 'lucide-react';
import { Asset, AssetType, AssetStatus } from '../types/asset';

interface AssetFormProps {
  initialData?: Partial<Asset>;
  onSubmit: (data: Partial<Asset>) => void;
  onPrint?: () => void;
}

export function AssetForm({ initialData, onSubmit, onPrint }: AssetFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Asset>>({
    defaultValues: initialData
  });

  const now = new Date();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      {/* Info Header */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-4 sm:px-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha</p>
              <p className="text-sm text-gray-900">{format(now, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</p>
              <p className="text-sm text-gray-900">{format(now, 'HH:mm:ss')}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Ubicación</p>
              <p className="text-sm text-gray-900">Argentina, Córdoba Capital</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Número de Inventario
              </label>
              <input
                type="text"
                {...register('inventoryNumber', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {errors.inventoryNumber && (
                <p className="mt-1 text-sm text-red-600">Este campo es requerido</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Número de Serie
              </label>
              <input
                type="text"
                {...register('serialNumber', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tipo de Activo
              </label>
              <select
                {...register('type', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="COMPUTER">Computadora</option>
                <option value="MONITOR">Monitor</option>
                <option value="KEYBOARD">Teclado</option>
                <option value="MOUSE">Mouse</option>
                <option value="HEADSET">Auriculares</option>
                <option value="HUB">Hub</option>
                <option value="CABLE">Cable</option>
                <option value="OTHER">Otro</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <select
                {...register('status', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="AVAILABLE">Disponible</option>
                <option value="IN_USE">En Uso</option>
                <option value="MAINTENANCE">En Mantenimiento</option>
                <option value="BROKEN">Roto</option>
                <option value="DISPOSED">Descartado</option>
              </select>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Especificaciones
              </label>
              <textarea
                {...register('specifications.other')}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Procesador, RAM, Almacenamiento, etc."
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Observaciones
              </label>
              <textarea
                {...register('observations')}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <Printer className="h-5 w-5" />
            Imprimir Ficha
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Save className="h-5 w-5" />
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}