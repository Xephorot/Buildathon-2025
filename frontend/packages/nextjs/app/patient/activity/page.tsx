"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { EyeIcon, ClockIcon, UserIcon, DocumentIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ActivityLog {
  id: string;
  type: 'access' | 'permission_granted' | 'permission_revoked' | 'document_uploaded' | 'document_deleted';
  timestamp: string;
  actor: string;
  actorName?: string;
  description: string;
  documentTitle?: string;
  ipfsHash?: string;
}

const PatientActivity: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [filterType, setFilterType] = useState("all");

  // Mock activity data
  const activities: ActivityLog[] = [
    {
      id: "1",
      type: 'document_uploaded',
      timestamp: "2024-01-25T10:30:00Z",
      actor: connectedAddress || "",
      description: "Uploaded new medical document",
      documentTitle: "Prescription - Antibiotics",
      ipfsHash: "QmX7Y8Z9..."
    },
    {
      id: "2",
      type: 'permission_granted',
      timestamp: "2024-01-24T14:15:00Z",
      actor: connectedAddress || "",
      description: "Granted access to Dr. Maria Rodriguez",
      actorName: "Dr. Maria Rodriguez - Cardiology"
    },
    {
      id: "3",
      type: 'access',
      timestamp: "2024-01-23T09:45:00Z",
      actor: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      actorName: "Dr. Maria Rodriguez",
      description: "Accessed medical record: Annual Physical Examination",
      documentTitle: "Annual Physical Examination"
    },
    {
      id: "4",
      type: 'document_uploaded',
      timestamp: "2024-01-20T16:20:00Z",
      actor: connectedAddress || "",
      description: "Uploaded new medical document",
      documentTitle: "Chest X-Ray",
      ipfsHash: "QmA1B2C3..."
    },
    {
      id: "5",
      type: 'access',
      timestamp: "2024-01-19T11:30:00Z",
      actor: "0x8ba1f109551bD432803012645Hac136c0532925a",
      actorName: "Hospital San Juan - Emergency",
      description: "Accessed medical record: Blood Test Results",
      documentTitle: "Blood Test Results"
    }
  ];

  const filteredActivities = activities.filter(activity => {
    return filterType === "all" || activity.type === filterType;
  });

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
          <p className="mb-4">Please connect your wallet to view your activity log.</p>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'access':
        return <EyeIcon className="h-5 w-5 text-info" />;
      case 'permission_granted':
        return <ShieldCheckIcon className="h-5 w-5 text-success" />;
      case 'permission_revoked':
        return <ShieldCheckIcon className="h-5 w-5 text-error" />;
      case 'document_uploaded':
        return <DocumentIcon className="h-5 w-5 text-primary" />;
      case 'document_deleted':
        return <DocumentIcon className="h-5 w-5 text-error" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'access':
        return 'border-l-info';
      case 'permission_granted':
        return 'border-l-success';
      case 'permission_revoked':
        return 'border-l-error';
      case 'document_uploaded':
        return 'border-l-primary';
      case 'document_deleted':
        return 'border-l-error';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/patient" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Activity Log</h1>
        <p className="text-gray-600">Complete audit trail of all actions on your medical records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ClockIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Activities</h3>
          <div className="text-2xl font-bold text-primary">{activities.length}</div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <EyeIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Record Access</h3>
          <div className="text-2xl font-bold text-info">
            {activities.filter(a => a.type === 'access').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Documents Uploaded</h3>
          <div className="text-2xl font-bold text-success">
            {activities.filter(a => a.type === 'document_uploaded').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ShieldCheckIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">Permissions Changed</h3>
          <div className="text-2xl font-bold text-warning">
            {activities.filter(a => a.type === 'permission_granted' || a.type === 'permission_revoked').length}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-4">
          <span className="font-medium">Filter by activity type:</span>
          <select 
            className="select select-bordered"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="access">Record Access</option>
            <option value="permission_granted">Permissions Granted</option>
            <option value="permission_revoked">Permissions Revoked</option>
            <option value="document_uploaded">Documents Uploaded</option>
            <option value="document_deleted">Documents Deleted</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6">Activity Timeline</h3>
        
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const { date, time } = formatTimestamp(activity.timestamp);
            return (
              <div key={activity.id} className={`border-l-4 ${getActivityColor(activity.type)} pl-6 pb-4`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getActivityIcon(activity.type)}
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      {activity.documentTitle && (
                        <p className="text-sm text-gray-600">Document: {activity.documentTitle}</p>
                      )}
                      {activity.actorName && activity.actor !== connectedAddress && (
                        <p className="text-sm text-gray-600">By: {activity.actorName}</p>
                      )}
                      {activity.ipfsHash && (
                        <p className="text-xs text-gray-500 font-mono">IPFS: {activity.ipfsHash}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{date}</p>
                    <p>{time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <ClockIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No activities found</h3>
            <p className="text-gray-600">
              {filterType !== "all" 
                ? "No activities match the selected filter"
                : "Your activity history will appear here as you use the system"
              }
            </p>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="mt-6 bg-base-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Export Activity Log</h3>
        <p className="text-gray-600 mb-4">Download your complete activity history for your records</p>
        <div className="flex gap-4">
          <button className="btn btn-outline">
            Export as CSV
          </button>
          <button className="btn btn-outline">
            Export as PDF
          </button>
          <button className="btn btn-outline">
            Generate Compliance Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientActivity;