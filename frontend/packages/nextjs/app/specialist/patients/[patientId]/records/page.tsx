"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { DocumentIcon, EyeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PatientRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  provider: string;
  size: string;
  description?: string;
}

interface PatientInfo {
  id: string;
  address: string;
  name?: string;
  accessExpiresAt: string;
}

const PatientRecords: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const params = useParams();
  const patientId = params.patientId as string;
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  // Mock patient info
  const patientInfo: PatientInfo = {
    id: patientId,
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    name: "Patient #1",
    accessExpiresAt: "2024-03-15"
  };

  // Mock records data
  const records: PatientRecord[] = [
    {
      id: "1",
      title: "Annual Physical Examination",
      type: "Medical Report",
      date: "2024-01-15",
      provider: "Hospital San Juan",
      size: "2.3 MB",
      description: "Complete annual physical examination with blood work and vital signs"
    },
    {
      id: "2",
      title: "Blood Test Results",
      type: "Lab Results",
      date: "2024-01-10",
      provider: "Lab Central",
      size: "1.1 MB",
      description: "Complete blood count and metabolic panel"
    },
    {
      id: "3",
      title: "Chest X-Ray",
      type: "X-Ray/Imaging",
      date: "2024-01-20",
      provider: "Imaging Center",
      size: "5.7 MB",
      description: "Chest X-ray for routine screening"
    },
    {
      id: "4",
      title: "Prescription - Antibiotics",
      type: "Prescription",
      date: "2024-01-25",
      provider: "Dr. Maria Rodriguez",
      size: "0.5 MB",
      description: "Antibiotic prescription for respiratory infection"
    },
    {
      id: "5",
      title: "Vaccination Record",
      type: "Vaccination Record",
      date: "2024-01-05",
      provider: "Health Center",
      size: "0.8 MB",
      description: "COVID-19 booster vaccination record"
    }
  ];

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Patient Records</h1>
          <p className="mb-4">Please connect your wallet to view patient records.</p>
        </div>
      </div>
    );
  }

  const handleViewRecord = (record: PatientRecord) => {
    setSelectedRecord(record);
    // Log access for audit trail
    console.log(`Accessing record ${record.id} for patient ${patientId}`);
  };

  const isAccessExpired = new Date(patientInfo.accessExpiresAt) < new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/specialist/patients" className="btn btn-ghost btn-sm">
            ← Back to Patients
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Patient Medical Records</h1>
        <p className="text-gray-600">Authorized medical records for this patient</p>
      </div>

      {/* Patient Info Card */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserIcon className="h-12 w-12 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">{patientInfo.name || 'Anonymous Patient'}</h3>
              <p className="text-gray-600 font-mono text-sm">{patientInfo.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Access expires:</p>
            <p className={`font-semibold ${isAccessExpired ? 'text-error' : 'text-success'}`}>
              {new Date(patientInfo.accessExpiresAt).toLocaleDateString()}
            </p>
            {isAccessExpired && (
              <span className="badge badge-error badge-sm mt-1">Expired</span>
            )}
          </div>
        </div>
      </div>

      {isAccessExpired && (
        <div className="alert alert-error mb-6">
          <div>
            <h3 className="font-bold">Access Expired</h3>
            <div className="text-xs">Your access to this patient&apos;s records has expired. Please request renewed access.</div>
          </div>
        </div>
      )}

      {/* Records Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Records</h3>
          <div className="text-2xl font-bold text-primary">{records.length}</div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <CalendarIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Latest Record</h3>
          <div className="text-sm font-bold text-success">
            {records.length > 0 
              ? new Date(Math.max(...records.map(r => new Date(r.date).getTime()))).toLocaleDateString()
              : 'N/A'
            }
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Record Types</h3>
          <div className="text-sm font-bold text-info">
            {new Set(records.map(r => r.type)).size} types
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <EyeIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">Last Viewed</h3>
          <div className="text-sm font-bold text-warning">Today</div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Medical Records</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Date</th>
                <th>Provider</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <DocumentIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{record.title}</div>
                        {record.description && (
                          <div className="text-sm text-gray-600">{record.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">{record.type}</span>
                  </td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.provider}</td>
                  <td>{record.size}</td>
                  <td>
                    <button 
                      onClick={() => handleViewRecord(record)}
                      disabled={isAccessExpired}
                      className="btn btn-primary btn-sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {records.length === 0 && (
          <div className="text-center py-12">
            <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No records available</h3>
            <p className="text-gray-600">This patient hasn&apos;t shared any records with you yet.</p>
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">{selectedRecord.title}</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Document Type</p>
                  <p>{selectedRecord.type}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Date</p>
                  <p>{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Healthcare Provider</p>
                  <p>{selectedRecord.provider}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">File Size</p>
                  <p>{selectedRecord.size}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-2">Description</p>
                <p className="text-gray-600">{selectedRecord.description}</p>
                
                <div className="mt-4">
                  <p className="font-medium text-gray-700 mb-2">Patient Information</p>
                  <p className="text-sm text-gray-600">
                    Patient: {patientInfo.name || 'Anonymous'}<br/>
                    Address: {patientInfo.address}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-4">Document Preview</p>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Encrypted document preview will be displayed here</p>
                <div className="space-x-2">
                  <button className="btn btn-primary btn-sm">View Full Document</button>
                  <button className="btn btn-outline btn-sm">Download PDF</button>
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
                Download Original
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;