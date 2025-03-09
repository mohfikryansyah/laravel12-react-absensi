import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MapLeaflet, { defaultMarkerIcon } from '@/components/ui/map-leaflet';
import AppLayout from '@/layouts/app-layout';
import { LokasiAbsensiSchema } from '@/schema/schema';
import { BreadcrumbItem, Office } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import L from 'leaflet';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import TabEditView from './tab-edit-view';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lokasi Presensi',
        href: route('office.index'),
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function EditLokasiAbsensi({ office }: { office: Office }) {
    const lat = office.latitude;
    const lng = office.longitude;
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Layer | null>(null);
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                form.setValue('latitude', e.latlng.lat);
                form.setValue('longitude', e.latlng.lng);
                if (markerRef.current) {
                    markerRef.current.remove();
                }

                if (mapRef.current) {
                    const newMarker = L.marker(e.latlng, { icon: defaultMarkerIcon }).addTo(mapRef.current);
                    markerRef.current = newMarker;
                }
            },
        });
        return null;
    };

    const [processing, setProcessing] = useState<boolean>(false);

    const form = useForm<z.infer<typeof LokasiAbsensiSchema>>({
        resolver: zodResolver(LokasiAbsensiSchema),
        defaultValues: {
            name: office.name,
            radius: office.radius,
            clock_in: office.clock_in,
            clock_out: office.clock_out,
            latitude: office.latitude,
            longitude: office.longitude,
        },
        mode: 'onChange',
    });

    function onSubmit(values: z.infer<typeof LokasiAbsensiSchema>) {
        setProcessing(true);
        const date = new Date();
        const formatDate = format(date, 'EEEE, d MMMM yyyy, HH:mm:ss', { locale: id });
        router.put(route('office.update', { office: office.id }), values, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    'Berhasil memperbarui data lokasi.',
                );
                form.reset();
                setProcessing(false);
            },
            onError: (errors) => {
                setProcessing(false);
                Object.keys(errors).forEach((key) => {
                    form.setError(key as keyof z.infer<typeof LokasiAbsensiSchema>, {
                        type: 'server',
                        message: errors[key],
                    });
                });
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full max-w-5xl flex-col gap-4 rounded-xl p-4">
                <Head title="Ubah Lokasi" />
                <TabEditView office={office} />
                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Lokasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="DPMPTSP" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="clock_in"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jam Masuk</FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="block" placeholder="07:00:00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="clock_out"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jam Keluar</FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="block" placeholder="16:00:00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="radius"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Radius <span className="text-gray-400">(meter)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="1000"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value) | 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="latitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Latitude</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1000" {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="longitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Longitude</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1000" {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" disabled={processing} className="mt-4">
                                    Simpan
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <MapLeaflet center={[lat, lng]} mapRef={mapRef}>
                    <MapClickHandler />
                </MapLeaflet>
            </div>
        </AppLayout>
    );
}
