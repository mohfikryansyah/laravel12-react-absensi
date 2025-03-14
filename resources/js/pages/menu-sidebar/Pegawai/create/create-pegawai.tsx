import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { PegawaiSchema } from '@/schema/schema';
import { Divisi } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, Upload, UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const genders = [
    {
        value: 'Laki-laki',
        label: 'Laki-laki',
    },
    {
        value: 'Perempuan',
        label: 'Perempuan',
    },
];

export default function CreatePegawai({ devisis }: { devisis: Divisi[] }) {
    const [open, setOpen] = useState<{ gender: boolean; divisi: boolean }>({
        gender: false,
        divisi: false,
    });
    const [ isSubmitClicked, setIsSubmitClicked ] = useState(false);
    const [uploadAvatar, setUploadAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleReset = () => {
        setUploadAvatar(null);
        setPreview(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const form = useForm<z.infer<typeof PegawaiSchema>>({
        resolver: zodResolver(PegawaiSchema),
        defaultValues: {
            avatar: undefined,
            name: '',
            date_of_birth: undefined,
            gender: undefined,
            address: '',
            phone_number: '',
            email: '',
            devisi: undefined,
            date_joined: undefined,
        },
        mode: 'onChange',
    });

    function onSubmit(values: z.infer<typeof PegawaiSchema>) {
        const formattedValues = {
            ...values,
            date_of_birth: format(new Date(values.date_of_birth), "yyyy-MM-dd"),
            date_joined: format(new Date(values.date_joined), "yyyy-MM-dd"),
        };
        setIsSubmitClicked(true)
        router.post(route('employees.store'), formattedValues, {    
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Berhasil menambahkan pegawai!')
                form.reset();
                setIsSubmitClicked(false)
            },
            onError: (errors) => {
                toast.error('Error: ' + errors)
                setIsSubmitClicked(false)
                Object.entries(errors).forEach(([key, value]) => {
                    form.setError(key as keyof z.infer<typeof PegawaiSchema>, {
                        type: "server",
                        message: String(value),
                    });
                });
            },
        });
    }

    return (
        <AppLayout>
            <Head title="Lokasi Absensi" />
            <div className="flex h-full w-full flex-col gap-4 rounded-xl p-4">
                <div className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tambah Data Pegawai</CardTitle>
                            <CardDescription>Isi formulir berikut untuk membuat akun dan menambahkan data pegawai.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-2 md:space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="avatar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="items-center not-md:space-y-4 md:flex">
                                                        <Label className="block w-full max-w-[150px]">Avatar</Label>
                                                        {preview ? (
                                                            <img src={preview} alt="" className="aspect-square size-20 rounded-full" />
                                                        ) : (
                                                            <div className="relative flex aspect-square size-20 items-center justify-center rounded-full border-2 border-dotted">
                                                                <UserIcon />
                                                            </div>
                                                        )}

                                                        <div className="flex gap-x-2">
                                                            <label htmlFor="avatar" className="cursor-pointer">
                                                                <Button className="bg-utama md:ml-4" asChild>
                                                                    <span className="flex items-center gap-2">
                                                                        <Upload /> Upload Foto
                                                                    </span>
                                                                </Button>
                                                            </label>

                                                            <Input
                                                                ref={inputRef}
                                                                id="avatar"
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files.length > 0) {
                                                                        setUploadAvatar(e.target.files[0]);
                                                                        const imageUrl = URL.createObjectURL(e.target.files[0]);
                                                                        setPreview(imageUrl);
                                                                        field.onChange(e.target.files[0]);
                                                                    }
                                                                }}
                                                                type="file"
                                                                className="hidden max-w-fit"
                                                            />

                                                            <Button
                                                                variant={'secondary'}
                                                                onClick={handleReset}
                                                                disabled={!uploadAvatar}
                                                                className="md:ml-2"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="md:ml-[150px]" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Nama Lengkap</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="md:ml-[150px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date_of_birth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Tanggal Lahir</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, 'yyyy-MM-dd') : <span>Pilih tanggal</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                // components={{ Dropdown }}
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date > new Date() || date < new Date('1945-01-01')}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <FormMessage className="md:ml-[150px]"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Jenis Kelamin</FormLabel>
                                                    <Popover
                                                        open={open.gender}
                                                        onOpenChange={() => setOpen((prev) => ({ ...prev, gender: !prev.gender }))}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        <span className="mr-auto">{field.value}</span>
                                                                    ) : (
                                                                        <span className="mr-auto">Pilih Jenis Kelamin</span>
                                                                    )}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="popover-content-width-same-as-its-trigger w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Command>
                                                                <CommandList>
                                                                    <CommandGroup>
                                                                        {genders.map((gender) => (
                                                                            <CommandItem
                                                                                key={gender.value}
                                                                                value={gender.value}
                                                                                onSelect={(currentValue) => {
                                                                                    form.setValue(
                                                                                        'gender',
                                                                                        currentValue as 'Laki-laki' | 'Perempuan',
                                                                                    );
                                                                                    setOpen((prev) => ({ ...prev, gender: false }));
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        form.getValues('gender') === gender.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0',
                                                                                    )}
                                                                                />
                                                                                {gender.label}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <FormMessage className="md:ml-[150px]"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Alamat</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="md:ml-[150px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Whatsapp</FormLabel>
                                                    <FormControl>
                                                        <Input type="telp" className="[input:-webkit-autofill]" {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="md:ml-[150px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="md:ml-[150px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="devisi"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Divisi</FormLabel>
                                                    <Popover
                                                        open={open.divisi}
                                                        onOpenChange={() => setOpen((prev) => ({ ...prev, divisi: !prev.divisi }))}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        <span className="mr-auto">
                                                                            {devisis.find((devisi) => devisi.id === field.value)?.name}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="mr-auto">Pilih Divisi</span>
                                                                    )}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="popover-content-width-same-as-its-trigger w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Command>
                                                                <CommandList>
                                                                    <CommandGroup>
                                                                        {devisis.map((devisi) => (
                                                                            <CommandItem
                                                                                key={devisi.id}
                                                                                value={String(devisi.id)}
                                                                                onSelect={(currentValue) => {
                                                                                    form.setValue('devisi', Number(currentValue));
                                                                                    setOpen((prev) => ({ ...prev, divisi: false }));
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        form.getValues('devisi') === devisi.id
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0',
                                                                                    )}
                                                                                />
                                                                                {devisi.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <FormMessage className="md:ml-[150px]"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="date_joined"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="items-center md:flex">
                                                    <FormLabel className="w-full max-w-[150px]">Tanggal bergabung</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, 'yyyy-MM-dd') : <span>Pilih tanggal</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date > new Date() || date < new Date('2000-01-01')}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <FormMessage className="md:ml-[150px]"/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isSubmitClicked}>Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
