import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Asset } from '../types/asset';

interface PrintableAssetProps {
  asset: Asset;
}

export function PrintableAsset({ asset }: PrintableAssetProps) {
  const now = new Date();

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-8 print:p-0">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ficha Técnica de Activo</h1>
          <div className="mt-2 text-sm text-gray-500">
            <p>Fecha: {format(now, 'PPP', { locale: es })}</p>
            <p>Hora: {format(now, 'HH:mm:ss')}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <QRCodeSVG
            value={`${window.location.origin}/assets/${asset.id}`}
            size={100}
          />
          <span className="text-sm text-gray-500 mt-2">Escanear para más detalles</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Información General</h2>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Número de Inventario</dt>
              <dd className="mt-1 text-sm text-gray-900">{asset.inventoryNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Número de Serie</dt>
              <dd className="mt-1 text-sm text-gray-900">{asset.serialNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Modelo</dt>
              <dd className="mt-1 text-sm text-gray-900">{asset.model}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1 text-sm text-gray-900">{asset.status}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Especificaciones Técnicas</h2>
          <div className="prose prose-sm">
            <pre className="whitespace-pre-wrap">{asset.specifications.other}</pre>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-4">Observaciones</h2>
          <div className="prose prose-sm">
            <pre className="whitespace-pre-wrap">{asset.observations}</pre>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p>Documento generado automáticamente por el Sistema de Gestión de Activos IT</p>
          <p>Usuario: {asset.createdBy}</p>
          <p>Fecha de creación: {format(new Date(asset.createdAt), 'PPP', { locale: es })}</p>
        </div>
      </div>
    </div>
  );
}