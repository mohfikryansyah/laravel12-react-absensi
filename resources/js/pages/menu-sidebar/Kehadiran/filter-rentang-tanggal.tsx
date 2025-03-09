import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Attendance } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon, Filter } from 'lucide-react';
import { useState } from 'react';

interface Props {
    attendances: Attendance[];
    setTanggalAwal: (tanggalAwal: Date | null) => void;
    setTanggalAkhir: (tanggalAkhir: Date | null) => void;
}

export default function FilterRentangTanggal({ attendances, setTanggalAwal, setTanggalAkhir }: Props) {
    const [tanggalAwal, setLocalTanggalAwal] = useState<Date | null>(null);
    const [tanggalAkhir, setLocalTanggalAkhir] = useState<Date | null>(null);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='md:w-fit w-full'>
                        <Filter />
                        {tanggalAwal ? (
                            tanggalAkhir ? (
                                `${format(tanggalAwal, 'yyyy-MM-dd')} - ${format(tanggalAkhir, 'yyyy-MM-dd')}`
                            ) : (
                                format(tanggalAwal, 'yyyy-MM-dd')
                            )
                        ) : (
                            <span>Filter tanggal</span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Rentang Tanggal</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-2">
                        <Popover>
                            <Label className="ml-1">Tanggal Awal</Label>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn('col-span-5 mt-0.5 w-full pl-3 text-left font-normal md:rounded-tr-none md:rounded-br-none')}
                                >
                                    {tanggalAwal ? format(tanggalAwal, 'yyyy-MM-dd') : <span>Pilih tanggal</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={tanggalAwal ?? undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            setTanggalAwal(date);
                                            setLocalTanggalAwal(date);
                                        }
                                    }}
                                    disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <Label className="ml-1">Tanggal Akhir</Label>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn('col-span-5 mt-0.5 w-full pl-3 text-left font-normal md:rounded-tr-none md:rounded-br-none')}
                                >
                                    {tanggalAkhir ? format(tanggalAkhir, 'yyyy-MM-dd') : <span>Pilih tanggal</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={tanggalAkhir ?? undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            setTanggalAkhir(date);
                                            setLocalTanggalAkhir(date);
                                        }
                                    }}
                                    disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <DropdownMenuSeparator className="mt-3" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setTanggalAkhir(null);
                                    setLocalTanggalAkhir(null);
                                    setTanggalAwal(null);
                                    setLocalTanggalAwal(null);
                                }}
                                className={cn('col-span-5 mt-0.5 w-full pl-3 text-left font-normal md:rounded-tr-none md:rounded-br-none')}
                            >
                                Clear Filters
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
