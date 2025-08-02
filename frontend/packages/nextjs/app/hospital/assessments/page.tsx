"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ChartBarIcon, DocumentMagnifyingGlassIcon, CalendarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface RiskAssessment {
  id: string;
  patientAddress: string;
  patientName?: string;
  assessmentDate: string;
  riskScore: number;
  status: 'completed' | 'in-progress' | 'pending-review';
  recordsAnalyzed: number;
  assessor: string;
}

const InsuranceAssessments: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAssessment, setSelectedAssessment] = useState<RiskAssessment | null>(null);

  // Mock data
  const assessments: RiskAssessment[] = [
    {
      id: "1",
      patientAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      patientName: "Patient #1",
      assessmentDate: "2024-01-20",
      riskScore: 75,
      status: 'completed',
      recordsAnalyzed: 5,
      assessor: "Dr. Insurance Analyst"
    },
    {
      id: "2",
      patientAddress: "0x8ba1f109551bD432803012645Hac136c0532925a",
      patientName: "Patient #2",
      assessmentDate: "2024-01-18",
      riskScore: 45,
      status: 'completed',
      recordsAnalyzed: 3,
      assessor: "Dr. Insurance Analyst"
    },
    {
      id: "3",
      patientAddress: "0x9cd2f109551bD432803012645Hac136c0532925b",
      assessmentDate: "2024-01-22",
      riskScore: 0,
      status: 'in-progress',
      recordsAnalyzed: 2,
      assessor: "Dr. Insurance Analyst"
    }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.patientAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (assessment.patientName && assessment.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || assessment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Risk Assessments</h1>
          <p className="mb-4">Please connect your wallet to view risk assessments.</p>
        </div>
      </div>
    );
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-error';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-info';
    return 'text-success';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'in-progress':
        return <span className="badge badge-warning">In Progress</span>;
      case 'pending-review':
        return <span className="badge badge-info">Pending Review</span>;
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/hospital" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Risk Assessments</h1>
            <p className="text-gray-600">Patient risk evaluations and underwriting analysis</p>
          </div>
          <Link href="/hospital/assessments/new" className="btn btn-primary">
            New Assessment
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Assessments</h3>
          <div className="text-2xl font-bold text-primary">{assessments.length}</div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ChartBarIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <div className="text-2xl font-bold text-success">
            {assessments.filter(a => a.status === 'completed').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <CalendarIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <div className="text-2xl font-bold text-warning">
            {assessments.filter(a => a.status === 'in-progress').length}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <DocumentMagnifyingGlassIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Avg Risk Score</h3>
          <div className="text-2xl font-bold text-info">
            {Math.round(assessments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.riskScore, 0) / 
                       assessments.filter(a => a.status === 'completed').length) || 0}
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
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending-review">Pending Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assessments Table */}
      <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Assessment Date</th>
                <th>Risk Score</th>
                <th>Records Analyzed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>
                    <div>
                      <div className="font-medium">{assessment.patientName || 'Anonymous Patient'}</div>
                      <div className="text-sm text-gray-600 font-mono">
                        {assessment.patientAddress.slice(0, 10)}...{assessment.patientAddress.slice(-8)}
                      </div>
                    </div>
                  </td>
                  <td>{new Date(assessment.assessmentDate).toLocaleDateString()}</td>
                  <td>
                    <div className={`text-2xl font-bold ${getRiskScoreColor(assessment.riskScore)}`}>
                      {assessment.status === 'completed' ? assessment.riskScore : '-'}
                    </div>
                    {assessment.status === 'completed' && (
                      <div className="text-xs text-gray-500">out of 100</div>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <DocumentMagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                      <span>{assessment.recordsAnalyzed} records</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(assessment.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedAssessment(assessment)}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </button>
                      {assessment.status === 'in-progress' && (
                        <Link 
                          href={`/hospital/assessments/${assessment.id}/continue`}
                          className="btn btn-outline btn-sm"
                        >
                          Continue
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No assessments found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "No risk assessments have been completed yet"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Link href="/hospital/assessments/new" className="btn btn-primary">
                Create First Assessment
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Assessment Detail Modal */}
      {selectedAssessment && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Risk Assessment Details</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Patient</p>
                  <p>{selectedAssessment.patientName || 'Anonymous Patient'}</p>
                  <p className="text-sm text-gray-600 font-mono">{selectedAssessment.patientAddress}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Assessment Date</p>
                  <p>{new Date(selectedAssessment.assessmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Assessor</p>
                  <p>{selectedAssessment.assessor}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Records Analyzed</p>
                  <p>{selectedAssessment.recordsAnalyzed} medical records</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Risk Score</p>
                  <div className={`text-4xl font-bold ${getRiskScoreColor(selectedAssessment.riskScore)}`}>
                    {selectedAssessment.status === 'completed' ? selectedAssessment.riskScore : 'In Progress'}
                  </div>
                  {selectedAssessment.status === 'completed' && (
                    <p className="text-sm text-gray-600">out of 100</p>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-700">Status</p>
                  {getStatusBadge(selectedAssessment.status)}
                </div>
              </div>
            </div>

            {selectedAssessment.status === 'completed' && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-4">Risk Analysis Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Medical History Risk:</span>
                    <span className="font-medium">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chronic Conditions:</span>
                    <span className="font-medium">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Factor:</span>
                    <span className="font-medium">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lifestyle Factors:</span>
                    <span className="font-medium">Medium</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Overall Risk Level:</span>
                    <span className={getRiskScoreColor(selectedAssessment.riskScore)}>
                      {selectedAssessment.riskScore >= 80 ? 'High' :
                       selectedAssessment.riskScore >= 60 ? 'Medium-High' :
                       selectedAssessment.riskScore >= 40 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-action">
              <button 
                onClick={() => setSelectedAssessment(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              {selectedAssessment.status === 'completed' && (
                <button className="btn btn-primary">
                  Generate Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceAssessments;