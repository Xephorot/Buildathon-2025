"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PatientUpload: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Upload Medical Records</h1>
          <p className="mb-4">Please connect your wallet to upload documents.</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFiles([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/patient" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Upload Medical Records</h1>
        <p className="text-gray-600">Securely encrypt and store your medical documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Select Documents</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag and drop your medical documents here</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn btn-primary">
              Choose Files
            </label>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <p>Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
            <p>Maximum file size: 10MB per file</p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Selected Files:</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DocumentIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="btn btn-ghost btn-sm"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Document Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Document Type</span>
              </label>
              <select className="select select-bordered w-full">
                <option>Select document type</option>
                <option>Medical Report</option>
                <option>Lab Results</option>
                <option>X-Ray/Imaging</option>
                <option>Prescription</option>
                <option>Vaccination Record</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Date of Document</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Healthcare Provider</span>
              </label>
              <input 
                type="text" 
                placeholder="Hospital or clinic name" 
                className="input input-bordered w-full" 
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description (Optional)</span>
              </label>
              <textarea 
                placeholder="Brief description of the document"
                className="textarea textarea-bordered w-full"
                rows={3}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Make this document shareable</span>
                <input type="checkbox" className="checkbox" defaultChecked />
              </label>
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <progress className="progress progress-primary w-full" value={uploadProgress} max="100"></progress>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button 
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="btn btn-primary w-full"
            >
              {isUploading ? "Uploading..." : "Upload Documents"}
            </button>
            <p className="text-xs text-gray-600 text-center">
              Documents will be encrypted before upload and stored securely on IPFS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientUpload;