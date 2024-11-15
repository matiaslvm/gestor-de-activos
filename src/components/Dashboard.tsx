import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Monitor, Cpu, Keyboard, Mouse, Headphones, Cable, Box, Search } from 'lucide-react';
import { Asset, AssetType, AssetStatus } from '../types/asset';

interface DashboardProps {
  assets: Asset[];
}

export function Dashboard({ assets }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<AssetType | 'ALL'>('ALL');
  const [showDeleted, setShowDeleted] = useState(false);

  const now = new Date();

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.inventoryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || asset.type === filterType;
    const matchesStatus = showDeleted ? asset.status === 'DISPOSED' : asset.status !== 'DISPOSED';
    return matchesSearch && matchesType && matchesStatus;
  });

  const assetsByType = assets.reduce((acc, asset) => {
    if (asset.status !== 'DISPOSED') {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
    }
    return acc;
  }, {} as Record<AssetType, number>);

  const assetCards = [
    { type: 'COMPUTER', icon: <Cpu className="h-6 w-6" />, count: assetsByType.COMPUTER || 0, label: 'Computadoras' },
    { type: 'MONITOR', icon: <Monitor className="h-6 w-6" />, count: assetsByType.MONITOR || 0, label: 'Monitores' },
    { type: 'KEYBOARD', icon: <Keyboard className="h-6 w-6" />, count: assetsByType.KEYBOARD || 0, label: 'Teclados' },
    { type: 'MOUSE', icon: <Mouse className="h-6 w-6" />, count: assetsByType.MOUSE || 0, label: 'Mouse' },
    { type: 'HEADSET', icon: <Headphones className="h-6 w-6" />, count: assetsByType.HEADSET || 0, label: 'Auriculares' },
    { type: 'CABLE', icon: <Cable className="h-6 w-6" />, count: assetsByType.CABLE || 0, label: 'Cables' },
    { type: 'OTHER', icon: <Box className="h-6 w-6" />, count: assetsByType.OTHER || 0, label: 'Otros' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Date and Location */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {format(now, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {format(now, 'HH:mm:ss')}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Número de registro actual: {assets.length + 1}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Ubicación</p>
              <p className="text-sm text-gray-900">Área de Transformación Digital & TI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar por número de registro o inventario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as AssetType | 'ALL')}
              >
                <option value="ALL">Todos los tipos</option>
                <option value="COMPUTER">Computadoras</option>
                <option value="MONITOR">Monitores</option>
                <option value="KEYBOARD">Teclados</option>
                <option value="MOUSE">Mouse</option>
                <option value="HEADSET">Auriculares</option>
                <option value="CABLE">Cables</option>
                <option value="OTHER">Otros</option>
              </select>
            </div>
            <div className="sm:w-48">
              <button
                onClick={() => setShowDeleted(!showDeleted)}
                className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                  showDeleted
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {showDeleted ? 'Ver Activos' : 'Ver Eliminados'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Type Cards */}
      {!showDeleted && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assetCards.map((card) => (
            <div
              key={card.type}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-blue-50 p-3">
                      {card.icon}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.label}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {card.count}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assets List */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {showDeleted ? 'Activos Eliminados' : 'Activos Registrados'}
          </h3>
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nº Registro
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nº Inventario
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Registro
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAssets.map((asset) => (
                          <tr key={asset.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {asset.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {asset.inventoryNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {asset.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                asset.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                                asset.status === 'IN_USE' ? 'bg-blue-100 text-blue-800' :
                                asset.status === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {asset.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(asset.createdAt), 'dd/MM/yyyy HH:mm')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}