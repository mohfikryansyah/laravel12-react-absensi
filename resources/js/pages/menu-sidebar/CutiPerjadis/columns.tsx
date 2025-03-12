import { CutiPerjadis } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const columns: ColumnDef<CutiPerjadis>[] = [
    {
        id: "No",
        header: "No",
        cell: ({row}) => row.index + 1
    },
    {
        accessorKey: "user.name",
        id: "nama",
        header: "Nama",
        cell: ({row}) => row.original.user.name
    },
    {
        accessorKey: "keterangan",
        id: "keterangan",
        header: "Keterangan",
        cell: ({row}) => row.original.keterangan
    },
    {
        accessorKey: "tanggal_awal",
        id: "Tanggal Mulai",
        header: "Tanggal Mulai",
        cell: ({row}) => format(row.original.tanggal_awal, 'EEEE, d MMMM y', {locale: id})
    },
    {
        accessorKey: "tanggal_akhir",
        id: "Tanggal Berakhir",
        header: "Tanggal Berakhir",
        cell: ({row}) => format(row.original.tanggal_akhir, 'EEEE, d MMMM y', {locale: id})
    },
]