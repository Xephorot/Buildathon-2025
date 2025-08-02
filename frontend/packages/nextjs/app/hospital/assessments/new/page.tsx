"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { UserIcon, DocumentIcon, ChartBarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PatientRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  provider: string;
  riskFactors: string[];
}

const NewAssessment: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [patientAddress, setPatientAddress] = useState("");
  const [patientFound, setPatientFound] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [assessmentData, setAssessmentData] = useState({
    medicalHistory: 0,
    chronicConditions: 0,
    ageFactor: 0,
    lifestyleFactors: 0
  });

  // Mock patient data
  const patientInfo = {
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    name: "Patient #1",
    age: 35,
    recordsCount: 5
  };

  // Mock records
  const availableRecords: PatientRecord[] = [
    {
      id: "1",
      title: "Annual Physical Examination",
      type: "Medical Report",
      date: "2024-01-15",
      provider: "Hospital San Juan",
      riskFactors: ["High Blood Pressure", "Family History"]
    },
    {
      id: "2",
      title: "Blood Test Results",
      type: "Lab Results",
      date: "2024-01-10",
      provider: "Lab Central",
      riskFactors: ["Elevated Cholesterol"]
    },
    {
      id: "3",
      title: "Chest X-Ray",
      type: "X-Ray/Imaging",
      date: "2024-01-20",
      provider: "Imaging Center",
      riskFactors: []
    }
  ];

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">New Risk Assessment</h1>
          <p className="mb-4">Please connect your wallet to create a risk assessment.</p>
        </div>
      </div>
    );
  }

  const handlePatientSearch = () => {
    if (patientAddress.length > 10) {
      setPatientFound(true);
      setCurrentStep(2);
    }
  };

  const handleRecordSelection = (recordId: string) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const calculateRiskScore = () => {
    const { medicalHistory, chronicConditions, ageFactor, lifestyleFactors } = assessmentData;
    return Math.round((medicalHistory + chronicConditions + ageFactor + lifestyleFactors) / 4);
  };

  const handleCompleteAssessment = () => {
    const riskScore = calculateRiskScore();
    console.log("Assessment completed with risk score:", riskScore);
    // Redirect to assessments list or show success message
  };

  const steps = [
    { number: 1, title: "Patient Search", description: "Find patient by address" },
    { number: 2, title: "Record Selection", description: "Select records to analyze" },
    { number: 3, title: "Risk Analysis", description: "Evaluate risk factors" },
    { number: 4, title: "Review & Submit", description: "Review and complete assessment" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/hospital/assessments" className="btn btn-ghost btn-sm">
            ← Back to Assessments
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">New Risk Assessment</h1>
        <p className="text-gray-600">Create a comprehensive risk evaluation for insurance underwriting</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <div className="ml-3">
                <p className={`font-medium ${currentStep >= step.number ? 'text-primary' : 'text-gray-600'}`}>
                  {step.title}
                </p>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-base-100 p-8 rounded-lg shadow-md">
        {currentStep === 1 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Step 1: Patient Search</h3>
            <div className="max-w-2xl">
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Patient Wallet Address</span>
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="0x..."
                      className="input input-bordered flex-1"
                      value={patientAddress}
                      onChange={(e) => setPatientAddress(e.target.value)}
                    />
                    <button 
                      onClick={handlePatientSearch}
                      className="btn btn-primary"
                      disabled={patientAddress.length < 10}
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                      Search
                    </button>
                  </div>
                </div>
                
                {patientFound && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <UserIcon className="h-12 w-12 text-success" />
                      <div>
                        <h4 className="font-semibold text-success">Patient Found</h4>
                        <p className="text-sm">{patientInfo.name}</p>
                        <p className="text-xs text-gray-600 font-mono">{patientInfo.address}</p>
                        <p className="text-sm text-gray-600">
                          Age: {patientInfo.age} | Available Records: {patientInfo.recordsCount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {patientFound && (
                <div className="mt-6">
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-primary"
                  >
                    Continue to Record Selection
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Step 2: Record Selection</h3>
            <p className="text-gray-600 mb-6">Select the medical records to include in the risk assessment</p>
            
            <div className="space-y-4">
              {availableRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="checkbox mt-1"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => handleRecordSelection(record.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <DocumentIcon className="h-5 w-5 text-gray-500" />
                        <h4 className="font-semibold">{record.title}</h4>
                        <span className="badge badge-outline">{record.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {record.provider} • {new Date(record.date).toLocaleDateString()}
                      </p>
                      {record.riskFactors.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-gray-500">Risk Factors:</span>
                          {record.riskFactors.map((factor, index) => (
                            <span key={index} className="badge badge-warning badge-sm">
                              {factor}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => setCurrentStep(1)}
                className="btn btn-ghost"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(3)}
                disabled={selectedRecords.length === 0}
                className="btn btn-primary"
              >
                Continue to Risk Analysis ({selectedRecords.length} records selected)
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Step 3: Risk Analysis</h3>
            <p className="text-gray-600 mb-6">Evaluate risk factors based on the selected medical records</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Medical History Risk (0-100)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="range range-primary"
                    value={assessmentData.medicalHistory}
                    onChange={(e) => setAssessmentData(prev => ({
                      ...prev,
                      medicalHistory: parseInt(e.target.value)
                    }))}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low Risk</span>
                    <span className="font-medium">{assessmentData.medicalHistory}</span>
                    <span>High Risk</span>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Chronic Conditions (0-100)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="range range-primary"
                    value={assessmentData.chronicConditions}
                    onChange={(e) => setAssessmentData(prev => ({
                      ...prev,
                      chronicConditions: parseInt(e.target.value)
                    }))}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>None</span>
                    <span className="font-medium">{assessmentData.chronicConditions}</span>
                    <span>Multiple</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Age Factor (0-100)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="range range-primary"
                    value={assessmentData.ageFactor}
                    onChange={(e) => setAssessmentData(prev => ({
                      ...prev,
                      ageFactor: parseInt(e.target.value)
                    }))}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Young</span>
                    <span className="font-medium">{assessmentData.ageFactor}</span>
                    <span>Senior</span>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Lifestyle Factors (0-100)</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="range range-primary"
                    value={assessmentData.lifestyleFactors}
                    onChange={(e) => setAssessmentData(prev => ({
                      ...prev,
                      lifestyleFactors: parseInt(e.target.value)
                    }))}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Healthy</span>
                    <span className="font-medium">{assessmentData.lifestyleFactors}</span>
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Calculated Risk Score</h4>
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${
                  calculateRiskScore() >= 80 ? 'text-error' :
                  calculateRiskScore() >= 60 ? 'text-warning' :
                  calculateRiskScore() >= 40 ? 'text-info' : 'text-success'
                }`}>
                  {calculateRiskScore()}
                </div>
                <p className="text-gray-600">out of 100</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => setCurrentStep(2)}
                className="btn btn-ghost"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(4)}
                className="btn btn-primary"
              >
                Continue to Review
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Step 4: Review & Submit</h3>
            <p className="text-gray-600 mb-6">Review the assessment details before submission</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Patient Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {patientInfo.name}</p>
                  <p><span className="font-medium">Address:</span> {patientInfo.address}</p>
                  <p><span className="font-medium">Age:</span> {patientInfo.age}</p>
                </div>

                <h4 className="font-semibold mb-4 mt-6">Records Analyzed</h4>
                <div className="space-y-2">
                  {selectedRecords.map(recordId => {
                    const record = availableRecords.find(r => r.id === recordId);
                    return record ? (
                      <div key={recordId} className="text-sm p-2 bg-gray-50 rounded">
                        <p className="font-medium">{record.title}</p>
                        <p className="text-gray-600">{record.type} • {record.provider}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Risk Assessment Results</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Medical History Risk:</span>
                    <span className="font-medium">{assessmentData.medicalHistory}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chronic Conditions:</span>
                    <span className="font-medium">{assessmentData.chronicConditions}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Factor:</span>
                    <span className="font-medium">{assessmentData.ageFactor}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lifestyle Factors:</span>
                    <span className="font-medium">{assessmentData.lifestyleFactors}/100</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Overall Risk Score:</span>
                    <span className={`font-bold ${
                      calculateRiskScore() >= 80 ? 'text-error' :
                      calculateRiskScore() >= 60 ? 'text-warning' :
                      calculateRiskScore() >= 40 ? 'text-info' : 'text-success'
                    }`}>
                      {calculateRiskScore()}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setCurrentStep(3)}
                className="btn btn-ghost"
              >
                Back
              </button>
              <button 
                onClick={handleCompleteAssessment}
                className="btn btn-primary"
              >
                <ChartBarIcon className="h-5 w-5" />
                Complete Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAssessment;