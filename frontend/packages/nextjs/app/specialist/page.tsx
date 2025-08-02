"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, UserGroupIcon, EyeIcon } from "@heroicons/react/24/outline";

const SpecialistPortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Medical Specialist Portal</h1>
          <p className="mb-4">Please connect your wallet to access patient records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Specialist Dashboard</h1>
        <p className="text-gray-600">Access authorized patient records for informed medical care</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <UserGroupIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authorized Patients</h3>
          <p className="text-gray-600 mb-4">Patients who granted you access</p>
          <div className="text-2xl font-bold text-primary">0</div>
          <p className="text-sm text-gray-500">Active Authorizations</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Accessible Records</h3>
          <p className="text-gray-600 mb-4">Total medical records you can access</p>
          <div className="text-2xl font-bold text-success">0</div>
          <p className="text-sm text-gray-500">Available Records</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <EyeIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Recent Access</h3>
          <p className="text-gray-600 mb-4">Recently viewed patient records</p>
          <div className="text-2xl font-bold text-info">0</div>
          <p className="text-sm text-gray-500">Recent Views</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Patient Search</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search by patient address or name" 
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full">Search Patients</button>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-center">No patients found</p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Access Requests</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600 text-center">No pending access requests</p>
            </div>
            <button className="btn btn-outline w-full">Request Patient Access</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-base-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Patient Records</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Record Type</th>
                <th>Date</th>
                <th>Access Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center text-gray-600">
                  No accessible records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecialistPortal;