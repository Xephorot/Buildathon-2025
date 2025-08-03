"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserIcon,
  ClockIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";

const PatientSidebar = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/patient",
      icon: <DocumentTextIcon className="h-5 w-5" />,
    },
    {
      label: "Mis Registros",
      href: "/patient/records",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    },
    {
      label: "Subir Documentos",
      href: "/patient/upload",
      icon: <CloudArrowUpIcon className="h-5 w-5" />,
    },
    {
      label: "Permisos de Acceso",
      href: "/patient/permissions",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      label: "Historial de Actividad",
      href: "/patient/activity",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      label: "Mi Perfil",
      href: "/patient/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 bg-base-100 min-h-screen p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-8 text-primary">Panel del Paciente</h2>
      
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-content"
                  : "text-base-content hover:bg-base-200"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default PatientSidebar;