import { cn } from '@/lib/utils';
import { Office } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Eye } from 'lucide-react';

export default function TabEditView({ office }: { office: Office }) {

    const page = usePage();

    return (
        <div className="mx-auto flex max-w-max gap-x-1 rounded-xl border bg-gray-100 dark:bg-black p-2">
            <Link
                href={route('office.index')}
                className={cn(
                    'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 transition duration-75 outline-none hover:bg-white',
                    route('office.index').endsWith(page.url) ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-black',
                )}
                prefetch
            >
                <Eye className="size-5" />
                View
            </Link>
            <Link
                href={route('office.edit', { office: office.id })}
                className={cn(
                    'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 transition duration-75 outline-none hover:bg-white',
                    route('office.edit', { office: office.id }).endsWith(page.url) ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-black',
                )}
                prefetch
            >
                <Edit className="size-5" />
                Edit
            </Link>
        </div>
    );
}
