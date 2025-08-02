"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, EyeIcon, ShareIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  provider: string;
  size: string;
  isShared: boolean;
  description?: string;
}

const PatientRecords: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Mock data
  const records: MedicalRecord[] = [
    {
      id: "1",
      title: "Annual Physical Examination",
      type: "Medical Report",
      date: "2024-01-15",
      provider: "Hospital San Juan",
      size: "2.3 MB",
      isShared: true,
      description: "Complete annual physical examination with blood work and vital signs"
    },
    {
      id: "2",
      title: "Blood Test Results",
      type: "Lab Results",
      date: "2024-01-10",
      provider: "Lab Central",
      size: "1.1 MB",
      isShared: true,
      description: "Complete blood count and metabolic panel"
    },
    {
      id: "3",
      title: "Chest X-Ray",
      type: "X-Ray/Imaging",
      date: "2024-01-20",
      provider: "Imaging Center",
      size: "5.7 MB",
      isShared: false,
      description: "Chest X-ray for routine screening"
    },
    {
      id: "4",
      title: "Prescription - Antibiotics",
      type: "Prescription",
      date: "2024-01-25",
      provider: "Dr. Maria Rodriguez",
      size: "0.5 MB",
      isShared: false,
      description: "Antibiotic prescription for respiratory infection"
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const recordTypes = ["all", ...new Set(records.map(r => r.type))];

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">My Medical Records</h1>
          <p className="mb-4">Please connect your wallet to view your records.</p>
        </div>
      </div>
    );
  }

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleDeleteRecord = (recordId: string) => {
    if (confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
      console.log("Deleting record:", recordId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/patient" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Medical Records</h1>
            <p className="text-gray-600">View and manage your encrypted medical documents</p>
          </div>
          <Link href="/patient/upload" className="btn btn-primary">
            Upload New Record
          </Link>
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
                placeholder="Search records by title or provider..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select 
              className="select select-bordered"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {recordTypes.map(type => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="flex items-start justify-between mb-4">
              <DocumentIcon className="h-8 w-8 text-primary" />
              <div className="flex gap-2">
                {record.isShared && (
                  <span className="badge badge-success badge-sm">Shared</span>
                )}
                <span className="badge badge-outline badge-sm">{record.type}</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{record.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{record.description}</p>
            
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p><span className="font-medium">Provider:</span> {record.provider}</p>
              <p><span className="font-medium">Date:</span> {new Date(record.date).toLocaleDateString()}</p>
              <p><span className="font-medium">Size:</span> {record.size}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleViewRecord(record)}
                className="btn btn-primary btn-sm flex-1"
              >
                <EyeIcon className="h-4 w-4" />
                View
              </button>
              <Link 
                href="/patient/permissions"
                className="btn btn-outline btn-sm"
              >
                <ShareIcon className="h-4 w-4" />
              </Link>
              <button 
                onClick={() => handleDeleteRecord(record.id)}
                className="btn btn-error btn-sm"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No records found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "Upload your first medical record to get started"
            }
          </p>
          {!searchTerm && filterType === "all" && (
            <Link href="/patient/upload" className="btn btn-primary">
              Upload First Record
            </Link>
          )}
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">{selectedRecord.title}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Type</p>
                  <p>{selectedRecord.type}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Date</p>
                  <p>{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Provider</p>
                  <p>{selectedRecord.provider}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">File Size</p>
                  <p>{selectedRecord.size}</p>
                </div>
              </div>
              
              {selectedRecord.description && (
                <div>
                  <p className="font-medium text-gray-700">Description</p>
                  <p>{selectedRecord.description}</p>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Document Preview</p>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Document preview will be displayed here</p>
                  <button className="btn btn-primary btn-sm mt-2">Download Original</button>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button 
                onClick={() => setSelectedRecord(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              <button className="btn btn-primary">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;