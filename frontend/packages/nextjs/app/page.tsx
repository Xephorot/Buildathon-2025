"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { UserIcon, BuildingOffice2Icon, HeartIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">MediChain</span>
          </h1>
          <p className="text-center text-lg mt-4 mb-8">
            Decentralized Medical Records for Private Insurance
          </p>
          
          {connectedAddress && (
            <div className="flex justify-center items-center space-x-2 flex-col mb-8">
              <p className="my-2 font-medium">Connected Address:</p>
              <Address address={connectedAddress} />
            </div>
          )}

          <div className="text-center text-lg mb-8">
            <p className="mb-4">
              Take control of your medical data with blockchain-powered sovereignty and secure sharing.
            </p>
            <p className="text-sm text-gray-600">
              Built on Avalanche network for private, permissioned access to your health records.
            </p>
          </div>
        </div>

        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <UserIcon className="h-8 w-8 fill-secondary" />
              <h3 className="font-bold text-lg mb-2">Patient Portal</h3>
              <p className="mb-4">
                Manage your medical records, control access permissions, and maintain sovereignty over your health data.
              </p>
              <Link href="/patient" passHref className="btn btn-primary">
                Access Patient Portal
              </Link>
            </div>
            
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <HeartIcon className="h-8 w-8 fill-secondary" />
              <h3 className="font-bold text-lg mb-2">Medical Specialist</h3>
              <p className="mb-4">
                Access authorized patient records to provide informed medical care and accurate diagnoses.
              </p>
              <Link href="/specialist" passHref className="btn btn-primary">
                Specialist Portal
              </Link>
            </div>
            
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BuildingOffice2Icon className="h-8 w-8 fill-secondary" />
              <h3 className="font-bold text-lg mb-2">Insurance Company</h3>
              <p className="mb-4">
                Conduct risk assessment and policy underwriting with authorized access to patient data.
              </p>
              <Link href="/insurance" passHref className="btn btn-primary">
                Insurance Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
