export interface Asset {
  id: string;
  inventoryNumber: string;
  serialNumber: string;
  model: string;
  type: AssetType;
  status: AssetStatus;
  specifications: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    other?: string;
  };
  location: string;
  assignedTo?: string;
  previousUser?: string;
  purchaseDate?: string;
  lastMaintenance?: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type AssetType = 
  | 'COMPUTER'
  | 'MONITOR'
  | 'KEYBOARD'
  | 'MOUSE'
  | 'HEADSET'
  | 'HUB'
  | 'CABLE'
  | 'OTHER';

export type AssetStatus = 
  | 'AVAILABLE'
  | 'IN_USE'
  | 'MAINTENANCE'
  | 'BROKEN'
  | 'DISPOSED';