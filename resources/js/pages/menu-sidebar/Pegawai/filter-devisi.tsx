import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Building, Building2Icon, Check } from 'lucide-react';
import { Divisi } from '@/types';


interface FilterDivisiProps {
    divisis: Divisi[];
    selectedDivisi: Divisi[];
    onSelectDivisi: (divisi: Divisi) => void;
}

export default function FilterDivisi({ divisis, selectedDivisi, onSelectDivisi }: FilterDivisiProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="max-w-fit justify-between h-8">
                    <Building2Icon />
                    {selectedDivisi.length > 0
                        ? `Divisi (${selectedDivisi.length})`
                        : "Pilih Divisi"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Cari divisi..." />
                    <CommandList>
                        <CommandEmpty>Divisi tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {divisis.map((divisi) => {
                                const isSelected = selectedDivisi.some((d) => d.id === divisi.id);
                                return (
                                    <CommandItem
                                        key={divisi.id}
                                        onSelect={() => onSelectDivisi(divisi)}
                                    >
                                        <Check
                                            className={`mr-2 h-4 w-4 ${
                                                isSelected ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />
                                        {divisi.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}