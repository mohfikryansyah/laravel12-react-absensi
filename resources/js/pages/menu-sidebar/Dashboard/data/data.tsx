import { Ban, CheckCircle, Circle, CircleOff, ClipboardCheck, HelpCircle, Hospital, Plane, Timer } from "lucide-react";

export const statuses = [
    {
      value: "Hadir",
      label: "Hadir",
      icon: CheckCircle,
      color: "text-green-800 bg-green-100"
    },
    {
      value: "Alpa",
      label: "Tidak Hadir",
      icon: Ban,
      color: "text-red-800 bg-red-100"
    },
    {
      value: "Sakit",
      label: "Sakit",
      icon: Hospital,
      color: "text-yellow-800 bg-yellow-100"
    },
    {
      value: "Izin",
      label: "Izin",
      icon: ClipboardCheck,
      color: "text-blue-800 bg-blue-100"
    },
    {
      value: "Perjalanan Dinas",
      label: "Perjalanan Dinas",
      icon: Plane,
      color: "text-purple-800 bg-purple-100"
    },
  ]