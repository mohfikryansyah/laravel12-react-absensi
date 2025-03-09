import { Divisi } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const columns: ColumnDef<Divisi>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        id: 'nama',
        header: 'Nama Divisi',
    },
    {
        accessorKey: 'ketua_divisi.name',
        id: 'Ketua Divisi',
        header: 'Ketua Divisi',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

            const handleDeleteRow = (devisi: Divisi) => {
                setDisableButton(true);
                router.delete(route('devisi.destroy', { devisi: devisi }), {
                    onSuccess: () => {
                        toast.success('Baris berhasil dihapus!');
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                    onError: () => {
                        toast.error('Terjadi kesalahan saat menghapus baris.');
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                });
            };

            return (
                <>
                    <div className="flex items-center">
                        {/* <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="m-0 cursor-pointer hover:bg-red-100">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-200">
                                        <TriangleAlert className="h-8 w-8 text-red-500" />
                                    </div>
                                    <h1 className="mt-4 text-lg font-bold">Hapus Divisi</h1>
                                    <p className="mt-2 text-gray-400">Apakah Anda yakin ingin menghapus ini?</p>
                                    <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                                        <DialogClose asChild>
                                            <Button variant={'outline'}>Batal</Button>
                                        </DialogClose>
                                        <Button
                                            variant={'default'}
                                            className="bg-red-500 transition-all duration-300 hover:bg-red-600 active:scale-90"
                                            disabled={disableButton}
                                            onClick={() => handleDeleteRow(row.original)}
                                            aria-label="Delete row"
                                        >
                                            Ya, saya yakin!
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog> */}
                        <Link href={route('devisi.edit', { devisi: row.original.id })}>
                            <Button variant={'ghost'} size="sm" className="hover:bg-orange-100 cursor-pointer">
                                <Edit className="size-4 text-orange-500" />
                            </Button>
                        </Link>
                    </div>
                </>
            );
        },
    },
];
