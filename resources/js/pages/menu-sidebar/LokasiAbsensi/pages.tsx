import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapLeaflet, { defaultMarkerIcon } from '@/components/ui/map-leaflet';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Office } from '@/types';
import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import TabEditView from './tab-edit-view';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lokasi Presensi',
        href: '#',
    },
];

export default function pages({ office }: { office: Office }) {
    const mapRef = useRef<L.Map | null>(null);
    const circleRef = useRef<L.Circle | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const lat = office.latitude;
    const lng = office.longitude;
    const latLng = L.latLng(lat, lng);

    const updateMapElements = () => {
        if (!mapRef.current) return;

        if (circleRef.current) {
            mapRef.current.removeLayer(circleRef.current);
        }

        if (markerRef.current) {
            mapRef.current.removeLayer(markerRef.current);
        }

        circleRef.current = L.circle(latLng, {
            color: 'red',
            radius: office.radius,
        }).addTo(mapRef.current);

        markerRef.current = L.marker(latLng, {
            icon: defaultMarkerIcon,
        })
            .addTo(mapRef.current)
            .bindPopup('Lokasi Absensi');

        mapRef.current.setView(latLng, 13);
    };

    useEffect(() => {
        const checkMapLoaded = setInterval(() => {
            if (mapRef.current) {
                setMapLoaded(true);
                clearInterval(checkMapLoaded);
            }
        }, 100);

        return () => clearInterval(checkMapLoaded);
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            const timer = setTimeout(() => {
                updateMapElements();
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [mapLoaded, office.radius, office.latitude, office.longitude]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lokasi Absensi" />
            <div className="flex h-full max-w-5xl flex-col gap-4 rounded-xl p-4">
                <TabEditView office={office} />
                <Card>
                    <CardHeader>
                        <CardTitle>Lokasi Absensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-y-6 md:grid-cols-3">
                            <div>
                                <h1 className="">Lokasi</h1>
                                <p className="font-bold">{office.name}</p>
                            </div>
                            <div>
                                <h1 className="">Jam Masuk</h1>
                                <p className="font-bold">{office.clock_in}</p>
                            </div>
                            <div>
                                <h1 className="">Jam Keluar</h1>
                                <p className="font-bold">{office.clock_out}</p>
                            </div>
                            <div>
                                <h1 className="">Radius</h1>
                                <p className="font-bold">
                                    {office.radius} <span className="font-normal text-gray-500">meter</span>
                                </p>
                            </div>
                            <div>
                                <h1 className="">Latitude</h1>
                                <p className="font-bold">{office.latitude}</p>
                            </div>
                            <div>
                                <h1 className="">Longitude</h1>
                                <p className="font-bold">{office.longitude}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="h-full p-0">
                    <MapLeaflet mapRef={mapRef} center={[lat, lng]} zoom={13} />
                </div>
            </div>
        </AppLayout>
    );
}
