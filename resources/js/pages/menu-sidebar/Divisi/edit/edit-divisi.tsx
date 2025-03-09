import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { DivisiSchema } from '@/schema/schema';
import { Divisi, User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function EditDivisi({ users, devisi }: { users: User[], devisi: Divisi }) {
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof DivisiSchema>>({
        resolver: zodResolver(DivisiSchema),
        defaultValues: {
            name: devisi.name,
            ketua: devisi.ketua,
        },
    });

    function onSubmit(values: z.infer<typeof DivisiSchema>) {
        router.put(route('devisi.update', {devisi: devisi.id}), values, {
            onSuccess: () => {
                form.reset();
                toast.success('Berhasil membuat divisi baru');
            },
            onError: (errors) => {
                console.log(errors)
                toast.error('Error: ' + errors);
                Object.entries(errors).forEach(([key, value]) => {
                    form.setError(key as keyof z.infer<typeof DivisiSchema>, {
                        type: 'server',
                        message: String(value),
                    });
                });
            },
        });
    }

    return (
        <AppLayout>
            <div className="flex max-w-3xl flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Buat Divisi Baru</CardTitle>
                        <CardDescription>Isi formulir berikut untuk membuat Divisi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Divisi</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ketua"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ketua Divisi</FormLabel>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={'outline'}>
                                                            {field.value ? (
                                                                <span className="mr-auto">{users.find((user) => user.id === field.value)?.name}</span>
                                                            ) : (
                                                                <span className="mr-auto">Pilih user</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="popover-content-width-same-as-its-trigger w-auto p-0" align="start">
                                                    <Command>
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {users.map((user) => (
                                                                    <CommandItem
                                                                        key={user.id}
                                                                        value={String(user.id)}
                                                                        onSelect={(currentValue) => {
                                                                            form.setValue('ketua', Number(currentValue));
                                                                            setOpen(!open);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                form.getValues('ketua') === user.id ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {user.name}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
