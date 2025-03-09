import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MapLeaflet, { defaultMarkerIcon } from '@/components/ui/map-leaflet';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Attendance, BreadcrumbItem, Office } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import L from 'leaflet';
import { Camera, UserCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { statuses } from '../Kehadiran/data/data';
import FilterRentangTanggal from '../Kehadiran/filter-rentang-tanggal';

interface Dasboard {
    attendances: Attendance[];
    countAttendancesToday: number;
    countAttendances: number;
    countEmployees: number;
    office: Office;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '#',
    },
];

export default function pages({ attendances, countAttendancesToday, countAttendances, countEmployees, office }: Dasboard) {
    const mapRef = useRef<L.Map | null>(null);
    const circleRef = useRef<L.Circle | null>(null);
    const lat = office.latitude;
    const lng = office.longitude;
    const latLng = L.latLng(lat, lng);

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const today = format(new Date(), 'yyyy-MM-dd');
    const [tanggalAwal, setTanggalAwal] = useState<Date | null>(null);
    const [tanggalAkhir, setTanggalAkhir] = useState<Date | null>(null);

    const filteredAttendances = attendances.filter((attendance) => {
        if (!attendance.tanggal) return true;

        const attendanceDate = new Date(attendance.tanggal);
        const startDate = tanggalAwal ? new Date(tanggalAwal) : null;
        let endDate = tanggalAkhir ? new Date(tanggalAkhir) : null;

        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        if (!startDate && !endDate) {
            const attendanceDateString = format(attendanceDate, 'yyyy-MM-dd');
            return attendanceDateString === today;
        }

        if (startDate && endDate) {
            if (!(attendanceDate >= startDate && attendanceDate <= endDate)) {
                return false;
            }
        } else if (startDate) {
            if (!(attendanceDate >= startDate)) {
                return false;
            }
        } else if (endDate) {
            if (!(attendanceDate <= endDate)) {
                return false;
            }
        }

        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(attendance.status);
        return matchesStatus;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!mapRef.current) return;

            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            if (circleRef.current) {
                mapRef.current.removeLayer(circleRef.current);
            }

            circleRef.current = L.circle(latLng, {
                color: 'red',
                radius: office.radius,
            }).addTo(mapRef.current);

            filteredAttendances.forEach((marker) => {
                const status = statuses.find((status) => status.value === marker.status);
                const lat = marker.latitude ?? 0;
                const lng = marker.longitude ?? 0;
                const lokasiAbsensiPegawai = L.latLng(lat, lng);
                let popupContent = ReactDOMServer.renderToString(
                    <div className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <UserCircle className="text-xl text-gray-500" />
                            <h1 className="font-bold text-gray-800">{marker.user.name}</h1>
                        </div>

                        <Badge className={cn('mt-2 w-full px-2 py-1 text-xs font-bold', status?.color)}>{status?.label}</Badge>

                        <div className="my-2 flex justify-between rounded-lg text-sm text-gray-700">
                            <div className="flex flex-col items-start gap-y-2">
                                <span className="font-medium">Jam Masuk:</span>
                                <span
                                    className={cn(
                                        'rounded-md px-2 py-1 font-semibold',
                                        marker.clock_in > office.clock_in ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500',
                                    )}
                                >
                                    {marker.clock_in}
                                </span>
                            </div>
                            <div className="flex flex-col items-start gap-y-2">
                                <span className="font-medium">Jam Keluar:</span>
                                <span
                                    className={cn(
                                        'rounded-md px-2 py-1 font-semibold',
                                        marker.clock_out
                                            ? marker.clock_out > office.clock_out
                                                ? 'bg-green-100 text-green-500'
                                                : 'bg-red-100 text-red-500'
                                            : 'bg-gray-200 text-gray-500',
                                    )}
                                >
                                    {marker.clock_out || '-'}
                                </span>
                            </div>
                        </div>

                        {marker.swafoto ? (
                            <div className="relative mt-3">
                                <img src={'/storage/' + marker.swafoto} className="h-auto w-[200px] rounded-lg border" alt="Swafoto" />
                                <div className="absolute top-1 left-1 rounded-full bg-black/50 p-1 text-white">
                                    <Camera className="text-sm" />
                                </div>
                            </div>
                        ) : (
                            <p className="mt-3 text-xs text-gray-500 italic">Swafoto tidak tersedia</p>
                        )}
                    </div>,
                );

                if (mapRef.current) {
                    L.marker(lokasiAbsensiPegawai, { icon: defaultMarkerIcon }).addTo(mapRef.current).bindPopup(popupContent);
                }
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [filteredAttendances, office.radius, latLng, mapRef.current]);

    const handleStatusChange = (status: string, checked: boolean) => {
        setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col gap-4 rounded-xl p-4">
                <div className="flex md:flex-row flex-col gap-y-4 w-full gap-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Total Presensi Hari Ini</CardTitle>
                            <CardDescription>Jumlah pegawai yang melakukan presensi hari ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-4xl">{filteredAttendances.length}</h1>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Total Presensi Keseluruhan</CardTitle>
                            <CardDescription>Jumlah keseluruhan presensi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-4xl">{countAttendances}</h1>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Total Pegawai</CardTitle>
                            <CardDescription>Jumlah keseluruhan pegawai</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-4xl">{countEmployees}</h1>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex md:h-full h-[500px] w-full">
                    <Card className="flex flex-1 flex-col">
                        <CardHeader className="flex md:flex-row gap-y-2 flex-col items-center justify-between">
                            <CardTitle>Peta Presensi</CardTitle>

                            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="md:ml-auto w-full md:w-fit">
                                        Filter Status {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {statuses.map((status) => {
                                        const countForStatus = filteredAttendances.filter((attendance) => attendance.status === status.value).length;

                                        return (
                                            <div key={status.value} onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenuCheckboxItem
                                                    checked={selectedStatuses.includes(status.value)}
                                                    onSelect={(e) => e.preventDefault()}
                                                    onCheckedChange={(checked) => handleStatusChange(status.value, checked)}
                                                >
                                                    <div className="flex w-full items-center justify-between gap-2">
                                                        <Badge className={cn('px-2 py-1 text-xs font-bold', status.color)}>{status.label}</Badge>
                                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                                                            {countForStatus}
                                                        </span>
                                                    </div>
                                                </DropdownMenuCheckboxItem>
                                            </div>
                                        );
                                    })}
                                    {selectedStatuses.length > 0 && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedStatuses([])}>
                                                Reset Filter
                                            </Button>
                                        </>
                                    )}
                                </DropdownMenuContent>
                                <FilterRentangTanggal attendances={attendances} setTanggalAkhir={setTanggalAkhir} setTanggalAwal={setTanggalAwal} />
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col">
                            <MapLeaflet mapRef={mapRef} center={[lat, lng]} zoom={13} className="overflow-hidden rounded-xl" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
