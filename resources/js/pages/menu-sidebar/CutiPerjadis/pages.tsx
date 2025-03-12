import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CutiPerjadis, User } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import CreateCutiPerjadis from './Create/create-cutiperjadis';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cuti Perjadis',
        href: '#',
    },
];

export interface PropsCutiPerjadis {
    cutiperjadis: CutiPerjadis[]
    users: User[]
}

export default function pages({ cutiperjadis, users }: PropsCutiPerjadis) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lokasi Absensi" />
            <div className="flex h-full w-full flex-col gap-4 rounded-xl p-4">
            <h1 className="text-xl font-medium">Tabel Informasi Cuti dan Perjalanan Dinas</h1>
                <DataTable data={cutiperjadis} columns={columns}>
                    <CreateCutiPerjadis cutiperjadis={cutiperjadis} users={users} />
                </DataTable>
            </div>
        </AppLayout>
    );
}
