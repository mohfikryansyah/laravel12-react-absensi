import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CutiPerjadisSchema } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, ChevronsUpDown, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { PropsCutiPerjadis } from '../pages';

export default function CreateCutiPerjadis({ cutiperjadis, users }: PropsCutiPerjadis) {
    const [open, setOpen] = useState(false);
    const [openKeterangan, setOpenKeterangan] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const form = useForm<z.infer<typeof CutiPerjadisSchema>>({
        resolver: zodResolver(CutiPerjadisSchema),
        defaultValues: {
            user_id: undefined,
            tanggal_awal: undefined,
            tanggal_akhir: undefined,
            keterangan: 'Perjalanan Dinas',
        },
        mode: 'onChange',
    });

    function onSubmit(values: z.infer<typeof CutiPerjadisSchema>) {
        const formatValues = {
            ...values,
            tanggal_awal: format(values.tanggal_awal, 'yyyy-MM-dd'),
            tanggal_akhir: format(values.tanggal_akhir, 'yyyy-MM-dd'),
        };

        router.post(route('cuti-perjalanan-dinas.store'), formatValues, {
            onSuccess: () => {
                form.reset();
                toast.success('Berhasil menambahkan data');
                setIsOpenDialog(false);
            },
            onError: (errors) => {
                console.log(errors);
                toast.error('Gagal menambahkan data');
                Object.entries(errors).forEach(([key, value]) => {
                    form.setError(key as keyof z.infer<typeof CutiPerjadisSchema>, {
                        type: 'server',
                        message: String(value),
                    });
                });
            },
        });
    }
    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                <Button className="h-8">Tambah Data</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cuti atau Perjalanan Dinas</DialogTitle>
                    <DialogDescription>Tambahkan pegawai yang sedang cuti atau perjalanan dinas</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id='cutiperjadis'>
                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pegawai</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                                {field.value ? users.find((user) => user.id === field.value)?.name : 'Pilih pegawai'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content-width-same-as-its-trigger w-auto p-0">
                                            <Command>
                                                <CommandInput placeholder="Contoh: Sri Lutfianti" />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada pegawai yang ditemukan</CommandEmpty>
                                                    <CommandGroup>
                                                        {users?.map((user) => (
                                                            <CommandItem
                                                                key={user.id}
                                                                value={String(user.id)}
                                                                onSelect={(currentValue) => {
                                                                    form.setValue('user_id', Number(currentValue));
                                                                    setOpen(!open);
                                                                }}
                                                            >
                                                                {user.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid-cols-12 space-y-4 md:grid md:space-y-0">
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="tanggal_awal"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Mulai</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'col-span-5 w-full pl-3 text-left font-normal md:rounded-tr-none md:rounded-br-none',
                                                                !field.value && 'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, 'yyyy/MM/dd') : <span>Pilih tanggal</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        // disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* <div className="col-span-2 hidden w-full items-end md:grid">
                                <div className="flex items-center justify-center border bg-[#f9fafb] top-0 px-5 py-[9px] text-xs text-gray-400 shadow-xs">
                                    s/d
                                </div>
                            </div> */}
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="tanggal_akhir"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Akhir</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-full pl-3 text-left font-normal md:rounded-tl-none md:rounded-bl-none',
                                                                !field.value && 'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, 'yyyy/MM/dd') : <span>Pilih tanggal</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        // disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="keterangan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Keterangan</FormLabel>
                                    <Popover open={openKeterangan} onOpenChange={setOpenKeterangan}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                                {field.value ? field.value : 'Pilih keterangan'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content-width-same-as-its-trigger w-auto p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        <CommandItem
                                                            value={'Cuti'}
                                                            onSelect={(currentValue) => {
                                                                form.setValue('keterangan', currentValue as 'Cuti' | 'Perjalanan Dinas');
                                                                setOpenKeterangan(!openKeterangan);
                                                            }}
                                                        >
                                                            Cuti
                                                        </CommandItem>
                                                        <CommandItem
                                                            value={'Perjalanan Dinas'}
                                                            onSelect={(currentValue) => {
                                                                form.setValue('keterangan', currentValue as 'Cuti' | 'Perjalanan Dinas');
                                                                setOpenKeterangan(!openKeterangan);
                                                            }}
                                                        >
                                                            Perjalanan Dinas
                                                        </CommandItem>
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="default" size="sm" className="m-0 bg-blue-500 hover:bg-blue-600">
                                    Submit
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-200">
                                        <TriangleAlert className="h-8 w-8 text-orange-500" />
                                    </div>
                                    <h1 className="mt-4 text-lg font-bold">Peringatan!</h1>
                                    <p className="mt-2 text-gray-700">Periksa kembali data yang telah dimasukkan</p>
                                    <p className="text-gray-700">Data tidak dapat dihapus atau diubah</p>
                                    <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                                        <DialogClose asChild>
                                            <Button variant={'outline'}>Batal</Button>
                                        </DialogClose>
                                        <Button
                                        form='cutiperjadis'
                                            type="submit"
                                            variant={'default'}
                                            className="bg-blue-500 transition-all duration-300 hover:bg-blue-600 active:scale-90"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
