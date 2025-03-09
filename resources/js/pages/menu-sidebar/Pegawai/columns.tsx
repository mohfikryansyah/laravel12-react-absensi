import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useInitials } from "@/hooks/use-initials";
import { Employee } from "@/types";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Trash, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "user.name",
        id: "nama",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" className="pl-2" />,
        cell: ({ row }) => {
            const getInitials = useInitials();
            const user = row.original.user;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        {row.original.avatar ? (
                            <img key={row.original.avatar} src={'/storage/' + row.original.avatar} alt={user.name} className="size-8" />
                        ) : (
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <span>{user.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "devisi.name",
        id: "Divisi",
        header: "Divisi",
    },
    {
        accessorKey: "gender",
        id: "Jenis Kelamin",
        header: "Jenis Kelamin",
    },
    {
        accessorKey: "date_of_birth",
        id: "Tanggal Lahir",
        header: "Tanggal Lahir",
        cell: ({ row }) => {
            const tanggalLahir = row.original.date_of_birth
            const formatTanggalLahir = format(tanggalLahir, 'EEEE, d MMMM yyyy', {locale: id})
            return <span>{formatTanggalLahir}</span>
        }
    },
    {
        accessorKey: "phone_number",
        id: "Nomor Telepon",
        header: "Nomor Telepon",
    },
    {
        accessorKey: "address",
        id: "Alamat",
        header: "Alamat",
        cell: ({row}) => <div className="w-[200px] truncate">
            <span title={row.original.address}>{row.original.address}</span>
        </div>
    },
    {
        accessorKey: "date_joined",
        id: "Tanggal Bergabung",
        header: "Tanggal Bergabung",
        cell: ({ row }) => {
            const tanggalBergabung = row.original.date_joined
            const formatTanggalBergabung = format(tanggalBergabung, 'EEEE, d MMMM yyyy', {locale: id})
            return <span>{formatTanggalBergabung}</span>
        }
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

            const handleDeleteRow = (employee: Employee) => {
                setDisableButton(true);
                router.delete(route("employees.destroy", { employee: employee }), {
                    onSuccess: () => {
                        toast.success("Baris berhasil dihapus!");
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                    onError: () => {
                        toast.error("Terjadi kesalahan saat menghapus baris.");
                        setDisableButton(false);
                        setIsOpenDialog(false);
                    },
                });
            };

            return (
                <>
                    <div className="flex items-center">

                        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="m-0">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="rounded-full h-14 w-14 bg-red-200 flex items-center justify-center">
                                        <TriangleAlert className="h-8 w-8 text-red-500" />
                                    </div>
                                    <h1 className="font-bold text-lg mt-4">
                                        Hapus Data Pegawai
                                    </h1>
                                    <p className="text-gray-400 mt-2">
                                        Apakah Anda yakin ingin menghapus ini?
                                    </p>
                                    <div className="grid grid-cols-2 mt-4 gap-x-2 w-full">
                                        <DialogClose asChild>
                                            <Button variant={"outline"}>
                                                Batal
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            variant={"default"}
                                            className="bg-red-500 hover:bg-red-600 active:scale-90 transition-all duration-300"
                                            disabled={disableButton}
                                            onClick={() =>
                                                handleDeleteRow(row.original)
                                            }
                                            aria-label="Delete row"
                                        >
                                            Ya, saya yakin!
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </>
            );
        },
    },
]