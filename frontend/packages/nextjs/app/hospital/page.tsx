"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ChartBarIcon, DocumentMagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const HospitalPortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hospital Company Portal</h1>
          <p className="mb-4">Please connect your wallet to access risk assessment tools.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Insurance Company Dashboard</h1>
        <p className="text-gray-600">Risk assessment and policy underwriting with authorized patient data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Risk Assessments</h3>
          <p className="text-gray-600 mb-4">Completed risk evaluations</p>
          <div className="text-2xl font-bold text-primary">0</div>
          <p className="text-sm text-gray-500">Total Assessments</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentMagnifyingGlassIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authorized Records</h3>
          <p className="text-gray-600 mb-4">Patient records available for review</p>
          <div className="text-2xl font-bold text-success">0</div>
          <p className="text-sm text-gray-500">Available Records</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ShieldCheckIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Policies</h3>
          <p className="text-gray-600 mb-4">Policies under management</p>
          <div className="text-2xl font-bold text-info">0</div>
          <p className="text-sm text-gray-500">Active Policies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/hospital/assessments/new" className="btn btn-primary w-full">
              <ChartBarIcon className="h-5 w-5" />
              New Risk Assessment
            </Link>
            <Link href="/hospital/assessments" className="btn btn-outline w-full">
              <DocumentMagnifyingGlassIcon className="h-5 w-5" />
              View All Assessments
            </Link>
            <button className="btn btn-outline w-full">
              <ShieldCheckIcon className="h-5 w-5" />
              Policy Management
            </button>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600 text-center text-sm">No recent activity</p>
              <p className="text-gray-500 text-xs text-center">Your recent assessments and policy updates will appear here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-base-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Assessments</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Assessment Date</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center text-gray-600">
                  No assessments completed yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalPortal;