import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { Attendance, BreadcrumbItem, Employee, Office } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './columns';
import ExportKehadiran from './export-kehadiran';
import FilterRentangTanggal from './filter-rentang-tanggal';
import { statuses } from './data/data';

interface Dasboard {
    attendances: Attendance[];
    office: Office;
    employees: Employee[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Kehadiran',
        href: '#',
    },
];

export default function pages({ attendances, office, employees }: Dasboard) {
    const [tanggalAwal, setTanggalAwal] = useState<Date | null>(null);
    const [tanggalAkhir, setTanggalAkhir] = useState<Date | null>(null);

    const filteredAttendances = attendances.filter((attendance) => {
        if (!attendance.tanggal) return true;

        const attendanceDate = new Date(attendance.tanggal);
        const startDate = tanggalAwal ? new Date(tanggalAwal) : null;
        let endDate = tanggalAkhir ? new Date(tanggalAkhir) : null;

        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        if (startDate && endDate) {
            return attendanceDate >= startDate && attendanceDate <= endDate;
        } else if (startDate) {
            return attendanceDate >= startDate;
        } else if (endDate) {
            return attendanceDate <= endDate;
        }

        return true;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kehadiran" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-xl font-medium">Tabel Kehadiran Pegawai</h1>
                <DataTable columns={columns(office)} data={filteredAttendances} columnFilter='status' titleFilter='Status' optionsFilter={statuses}>
                    <FilterRentangTanggal attendances={attendances} setTanggalAwal={setTanggalAwal} setTanggalAkhir={setTanggalAkhir} />
                    <ExportKehadiran employees={employees} />
                </DataTable>
            </div>
        </AppLayout>
    );
}
