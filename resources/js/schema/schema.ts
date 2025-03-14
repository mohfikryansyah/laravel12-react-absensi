import { z } from "zod";

export const LokasiAbsensiSchema = z.object({
    name: z.string().min(2).max(50),
    radius: z.number(),
    clock_in: z.string(),
    clock_out: z.string(),
    latitude: z.union([z.number(), z.string().regex(/^\d+(\.\d+)?$/, {
            message: "Hanya angka atau angka dengan titik yang diperbolehkan.",
          }).nonempty()]),
    longitude: z.union([z.number(), z.string().regex(/^\d+(\.\d+)?$/, {
            message: "Hanya angka atau angka dengan titik yang diperbolehkan.",
          }).nonempty()]),
})

export const PegawaiSchema = z.object({
  name: z.string().min(2, 'Nama setidaknya memiliki 2 karakter').max(50),
  email: z.string().email('Email tidak valid').min(2).max(50),
  devisi: z.number(),
  phone_number: z.string().min(8, 'Minimal 8 karakter').max(15, 'Maksimal 15 karakter'),
  date_of_birth: z.date(),
  date_joined: z.date(),
  gender: z.enum(['Laki-laki', 'Perempuan']),
  address: z.string().min(2, 'Alamat setidaknya memiliki 5 karakter').max(200, 'Alamat tidak boleh lebih dari 200 karakter'),
  avatar: z.instanceof(File).refine((file) => file.size <= 1 * 1024 * 1024, {message: 'Foto tidak boleh lebih dari 1MB'}).refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Format harus JPG/JPEG").optional(), 
})

export const DivisiSchema = z.object({
  name: z.string().min(2).max(100),
  ketua: z.number(),
})

export const CutiPerjadisSchema = z.object({
  user_id: z.number(),
  tanggal_awal: z.date(),
  tanggal_akhir: z.date(),
  keterangan: z.enum(['Cuti', 'Perjalanan Dinas']),
})