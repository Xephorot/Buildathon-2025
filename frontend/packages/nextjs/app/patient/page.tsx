"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, ShieldCheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PatientDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Patient Portal</h1>
          <p className="mb-4">Please connect your wallet to access your medical records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
        <p className="text-gray-600">Manage your medical records and control access permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">My Records</h3>
          <p className="text-gray-600 mb-4">View and manage your medical documents</p>
          <div className="text-2xl font-bold text-primary">0</div>
          <p className="text-sm text-gray-500">Total Records</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ShieldCheckIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Permissions</h3>
          <p className="text-gray-600 mb-4">Currently granted access permissions</p>
          <div className="text-2xl font-bold text-success">0</div>
          <p className="text-sm text-gray-500">Active Grants</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ClockIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600 mb-4">Latest access and permission changes</p>
          <div className="text-2xl font-bold text-warning">0</div>
          <p className="text-sm text-gray-500">Recent Events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/patient/upload" className="btn btn-primary w-full">
              <DocumentIcon className="h-5 w-5" />
              Upload New Record
            </Link>
            <Link href="/patient/records" className="btn btn-outline w-full">
              <DocumentIcon className="h-5 w-5" />
              View All Records
            </Link>
            <Link href="/patient/permissions" className="btn btn-outline w-full">
              <ShieldCheckIcon className="h-5 w-5" />
              Manage Permissions
            </Link>
            <Link href="/patient/activity" className="btn btn-outline w-full">
              <ClockIcon className="h-5 w-5" />
              Activity Log
            </Link>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">No recent activity</p>
                <p className="text-xs text-gray-600">Your recent uploads and permission changes will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;