import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Attendance, User } from '@/types';
import { Camera, UserCircle } from 'lucide-react';

interface Props {
    marker: {
        user: User;
        clock_in: Attendance['clock_in'];
        clock_out?: Attendance['clock_out'];
        swafoto?: string | null;
    };
    office: {
        clock_in: string;
        clock_out: string;
    };
    status: {
        color: string;
        label: string;
    };
}

export default function PopupContent({ marker, office, status }: Props) {
    return (
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
        </div>
    );
}
