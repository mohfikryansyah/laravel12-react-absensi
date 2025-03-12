import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Attendance {
    id: number;
    user_id: number;
    user: User;
    latitude?: number | null;
    longitude?: number | null;
    clock_in: string;
    clock_out?: string | null;
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa' | 'Perjalanan Dinas';
    keterangan?: string | null;
    tanggal?: string | null;
    swafoto?: string | null;
    total_jam_kerja?: number | null;
    durasi_jam_kerja?: number | null;
    created_at: string;
    created_at_diffforhumans: string;
    tanggal_formatted: string;
    updated_at: string;
}

export interface Office {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    clock_in: string;
    clock_out: string;
    created_at: string;
    updated_at: string;
  }

  export interface Divisi {
    id: number;
    name: string;
    ketua: number;
  }
  
  export interface Employee {
    id: number;
    devisi_id: number | null; // Bisa null jika onDelete(NULL)
    user_id: number;
    user: User;
    phone_number: string;
    date_of_birth: string; // Format YYYY-MM-DD
    date_joined: string; // Format YYYY-MM-DD
    gender: "Laki-laki" | "Perempuan";
    address: string;
    avatar?: string | null;
    created_at: string;
    updated_at: string;
    division: Divisi;
  }
  
  export interface CutiPerjadis {
    user: User;
    keterangan: "Cuti" | "Perjalanan Dinas";
    tanggal_awal: string;
    tanggal_akhir: string;
  }
