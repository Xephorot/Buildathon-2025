"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { UserIcon, DocumentIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AuthorizedPatient {
  id: string;
  address: string;
  name?: string;
  recordsCount: number;
  lastAccess?: string;
  accessExpiresAt: string;
  status: 'active' | 'expiring' | 'expired';
}

const SpecialistPatients: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const authorizedPatients: AuthorizedPatient[] = [
    {
      id: "1",
      address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      name: "Patient #1",
      recordsCount: 5,
      lastAccess: "2024-01-20",
      accessExpiresAt: "2024-03-15",
      status: 'active'
    },
    {
      id: "2",
      address: "0x8ba1f109551bD432803012645Hac136c0532925a",
      name: "Patient #2", 
      recordsCount: 3,
      lastAccess: "2024-01-18",
      accessExpiresAt: "2024-02-10",
      status: 'expiring'
    },
    {
      id: "3",
      address: "0x9cd2f109551bD432803012645Hac136c0532925b",
      recordsCount: 2,
      lastAccess: "2024-01-05",
      accessExpiresAt: "2024-01-25",
      status: 'expired'
    }
  ];

  const filteredPatients = authorizedPatients.filter(patient => {
    const matchesSearch = patient.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authorized Patients</h1>
          <p className="mb-4">Please connect your wallet to view authorized patients.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'expiring':
        return <span className="badge badge-warning">Expiring Soon</span>;
      case 'expired':
        return <span className="badge badge-error">Expired</span>;
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/specialist" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Authorized Patients</h1>
        <p className="text-gray-600">Patients who have granted you access to their medical records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <UserIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
          <div className="text-2xl font-bold text-primary">{authorizedPatients.length}</div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <UserIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Access</h3>
          <div className="text-2xl font-bold text-success">
            {authorizedPatients.filter(p => p.status === 'active').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ClockIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">Expiring Soon</h3>
          <div className="text-2xl font-bold text-warning">
            {authorizedPatients.filter(p => p.status === 'expiring').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Records</h3>
          <div className="text-2xl font-bold text-info">
            {authorizedPatients.reduce((sum, p) => sum + p.recordsCount, 0)}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient address or name..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select 
              className="select select-bordered"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Records Available</th>
                <th>Last Access</th>
                <th>Access Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div>
                      <div className="font-medium">{patient.name || 'Anonymous Patient'}</div>
                      <div className="text-sm text-gray-600 font-mono">
                        {patient.address.slice(0, 10)}...{patient.address.slice(-8)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <DocumentIcon className="h-4 w-4 text-gray-500" />
                      <span>{patient.recordsCount} records</span>
                    </div>
                  </td>
                  <td>
                    {patient.lastAccess 
                      ? new Date(patient.lastAccess).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td>{new Date(patient.accessExpiresAt).toLocaleDateString()}</td>
                  <td>{getStatusBadge(patient.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        href={`/specialist/patients/${patient.id}/records`}
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          if (patient.status === 'expired') {
                            e.preventDefault();
                            alert('Access has expired. Please request renewed access from the patient.');
                          }
                        }}
                      >
                        View Records
                      </Link>
                      {patient.status === 'expiring' && (
                        <button className="btn btn-outline btn-sm">
                          Request Extension
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No patients found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "No patients have granted you access yet"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialistPatients;