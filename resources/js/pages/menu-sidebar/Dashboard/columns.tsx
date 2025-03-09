import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { cn } from '@/lib/utils';
import { Attendance, Office } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { statuses } from './data/data';
import { Badge } from '@/components/ui/badge';

export const columns = (office: Office): ColumnDef<Attendance>[] => [
    {
        accessorKey: 'user.name',
        id: 'nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" className='pl-2' />,
        cell: ({ row }) => <span className='pl-2'>{row.original.user.name}</span>
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue('status'));

            if (!status) {
                return null;
            }

            return (
                <Badge className={cn(status.color)}>
                    {status.icon && <status.icon className="mr-2 h-4 w-4" />}
                    <span>{status.label}</span>
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'clock_in',
        id: 'Jam Masuk',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jam Masuk" />,
        cell: ({ row }) => {
            const attendance = row.original;
            return (
                <>
                    <p className={cn(attendance.clock_in > office.clock_in ? 'text-red-500' : 'text-green-500')}>{attendance.clock_in}</p>
                </>
            );
        },
    },
    {
        accessorKey: 'clock_out',
        id: 'Jam Keluar',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jam Keluar" />,
        cell: ({ row }) => {
            const attendance = row.original;
            return (
                <>
                    {attendance.clock_out ? (
                        <p className={cn(attendance.clock_out < office.clock_out ? 'text-red-500' : 'text-green-500')}>{attendance.clock_out }</p>
                    ) : <p>-</p>}
                </>
            );
        },
    },
    {
        accessorKey: 'durasi_jam_kerja',
        header: 'Durasi Kerja',
        cell: ({ row }) => {
            const totalJamKerja = row.original.total_jam_kerja
            return <span className={cn(!totalJamKerja ? "text-red-500" : "")}>{totalJamKerja ? row.original.durasi_jam_kerja : "Durasi Tidak Tersedia" }</span>
        }
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
    },
    {
        accessorKey: 'tanggal_formatted',
        id: "Tanggal Presensi",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    },
];
