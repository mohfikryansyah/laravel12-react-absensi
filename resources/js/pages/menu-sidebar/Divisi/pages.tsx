import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Divisi } from '@/types';
import { Link } from '@inertiajs/react';
import { columns } from './columns';

interface Props {
    devisi: Divisi[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Divisi',
        href: '#',
    },
];

export default function pages({ devisi }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={devisi}>
                    <Link href={route('devisi.create')}>
                        <Button className="h-8">Buat Divisi</Button>
                    </Link>
                </DataTable>
            </div>
        </AppLayout>
    );
}
