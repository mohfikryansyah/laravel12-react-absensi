import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Employee } from '@/types';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, Download } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    employees: Employee[];
}

interface ExportKehadiranForm {
    users: number[];
    startDate: Date;
    endDate: Date;
}

export default function ExportKehadiran({ employees }: Props) {
    const [open, setOpen] = useState(false);

    const form = useForm<ExportKehadiranForm>({
        defaultValues: {
            users: [],
            startDate: undefined,
            endDate: undefined,
        },
    });

    const selectedUsers = form.watch('users');

    const toggleUser = (userId: number) => {
        const currentUsers = form.getValues().users;
        const isSelected = currentUsers.includes(userId);

        if (isSelected) {
            form.setValue(
                'users',
                currentUsers.filter((id) => id !== userId),
            );
        } else {
            form.setValue('users', [...currentUsers, userId]);
        }
    };
    // const queryString = new URLSearchParams(values).toString();

    function onSubmit(values: any) {
        // Pastikan startDate dan endDate valid sebelum diformat
        const formatStartDate = values.startDate ? format(new Date(values.startDate), 'yyyy-MM-dd') : '';
        const formatEndDate = values.endDate ? format(new Date(values.endDate), 'yyyy-MM-dd') : '';

        const queryString = [...values.users.map((user: any) => `users[]=${user}`), `startDate=${formatStartDate}`, `endDate=${formatEndDate}`].join(
            '&',
        );

        router.get(route('attendances.export'), values, {
            preserveScroll: true,
        });

        window.location.href = route('attendances.export') + '?' + queryString;
    }

    const getSelectedUsersText = () => {
        if (selectedUsers.length === 0) return 'Pilih User';
        if (selectedUsers.length === 1) {
            const employee = employees.find((emp) => emp.user_id === selectedUsers[0]);
            return employee ? employee.user.name : '1 User dipilih';
        }
        return `${selectedUsers.length} User dipilih`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 bg-blue-500 hover:bg-blue-600 cursor-pointer">
                    <Download />
                    Export
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export Rekapan Kehadiran</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="export-attendances" className="space-y-4">
                        <FormField
                            control={form.control}
                            name="users"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Pilih User</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                                                {getSelectedUsersText()}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content-width-same-as-its-trigger w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari user..." />
                                                <CommandList>
                                                    <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {employees.map((employee) => (
                                                            <CommandItem
                                                                key={employee.id}
                                                                onSelect={() => toggleUser(employee.user_id)}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Checkbox
                                                                    checked={selectedUsers.includes(employee.user_id)}
                                                                    onCheckedChange={() => toggleUser(employee.user_id)}
                                                                />
                                                                <span>{employee.user.name}</span>
                                                                {selectedUsers.includes(employee.user_id) && <Check className="ml-auto h-4 w-4" />}
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
                            <div className="col-span-5">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Mulai</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'col-span-5 w-full md:rounded-tr-none md:rounded-br-none pl-3 text-left font-normal',
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
                                                        disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 hidden w-full items-end md:grid">
                                <div className="flex items-center justify-center border bg-[#f9fafb] px-5 py-[9px] text-xs text-gray-400 shadow-xs">
                                    to
                                </div>
                            </div>
                            <div className="col-span-5">
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Tanggal Akhir</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-full md:rounded-tl-none md:rounded-bl-none pl-3 text-left font-normal',
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
                                                        disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
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

                        <DialogFooter className="mt-4 sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default">
                                Export
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
