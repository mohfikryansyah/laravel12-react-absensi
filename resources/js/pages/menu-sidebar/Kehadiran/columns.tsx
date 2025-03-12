import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Attendance, Office } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { statuses } from './data/data';

export const columns = (office: Office): ColumnDef<Attendance>[] => [
    {
        accessorKey: 'user.name',
        id: 'nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" className="pl-2" />,
        cell: ({ row }) => {
            const getInitials = useInitials();
            const user = row.original.user;
            const currentRoute = route().current();

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        {row.original.swafoto ? (
                            <Dialog>
                                <DialogTrigger>
                                    <img src={'/storage/' + row.original.swafoto} alt={user.name} className="size-8" />
                                </DialogTrigger>
                                <DialogContent>
                                    <img src={'/storage/' + row.original.swafoto} alt={user.name} className="w-full h-auto" />
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    {currentRoute !== 'attendances.index' ? (
                        <>{user.name}</>
                    ) : (
                        <Link
                            prefetch
                            href={route('attendances.show', { attendance: row.original.id })}
                            className="hover:text-blue-500 hover:underline"
                        >
                            {row.original.user.name}
                        </Link>
                    )}
                </div>
            );
        },
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
                        <p className={cn(attendance.clock_out < office.clock_out ? 'text-red-500' : 'text-green-500')}>{attendance.clock_out}</p>
                    ) : (
                        <p>-</p>
                    )}
                </>
            );
        },
    },
    {
        accessorKey: 'durasi_jam_kerja',
        id: 'Durasi Kerja',
        header: 'Durasi Kerja',
        cell: ({ row }) => {
            const totalJamKerja = row.original.total_jam_kerja;
            return (
                <span className={cn(!totalJamKerja ? 'text-red-500' : '')}>
                    {totalJamKerja ? row.original.durasi_jam_kerja : 'Durasi Tidak Tersedia'}
                </span>
            );
        },
    },
    {
        accessorKey: 'keterangan',
        header: 'Keterangan',
    },
    {
        accessorKey: 'tanggal_formatted',
        id: 'Tanggal',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    },
];
