import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Divisi, Employee } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from './columns';
import FilterDivisi from './filter-devisi';
import { Button } from '@/components/ui/button';

interface Props {
    employees: Employee[];
    divisis: Divisi[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Pegawai',
        href: '#',
    },
];

export default function Pages({ employees, divisis }: Props) {
    const [selectedDivisi, setSelectedDivisi] = useState<Divisi[]>([]);

    const handleSelectDivisi = (divisi: Divisi) => {
        setSelectedDivisi(
            (prev) =>
                prev.some((d) => d.id === divisi.id)
                    ? prev.filter((d) => d.id !== divisi.id)
                    : [...prev, divisi],
        );
    };

    const filteredEmployees = selectedDivisi.length > 0 ? employees.filter((emp) => selectedDivisi.some((d) => d.id === emp.devisi_id)) : employees;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lokasi Absensi" />
            <div className="flex h-full w-full flex-col gap-4 rounded-xl p-4">
            <h1 className="text-xl font-medium">Tabel Pegawai</h1>
                <DataTable columns={columns} data={filteredEmployees}>
                    <FilterDivisi divisis={divisis} selectedDivisi={selectedDivisi} onSelectDivisi={handleSelectDivisi} />
                    <Link href={route('employees.create')}>
                        <Button variant={"default"} className='h-8'>Tambah Data</Button>
                    </Link>
                </DataTable>
            </div>
        </AppLayout>
    );
}
