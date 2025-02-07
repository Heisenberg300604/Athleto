"use client"

import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { useForceLightMode } from '@/hooks/useForcedLightTheme';
import BrandNavbar from '@/components/BrandNavbar';


export default function AthleteDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  // Mock data - in real application, fetch from API
  const athlete = {
    id: id as string,
    name: 'John Doe',
    sport: 'Football',
    position: 'Striker',
    location: 'New York, USA',
    performanceLevel: 'National',
    verificationStatus: 'Verified',
    sponsorshipStatus: 'Actively Seeking',
    profilePicture: '/ronaldo.jpg',
    achievements: [
      'State Championship 2022',
      'Top Scorer in Regional League',
      'Youth National Team Selection'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    sponsorshipNeeds: ['Equipment', 'Training']
  };

  useForceLightMode();

  return (
    <div className="container mx-auto px-4 py-8">
        <BrandNavbar />

        <button
            onClick={() => router.push("/brand-talent")}
            className="text-black hover:underline mb-4 flex items-center ml-44"
        >
            ← Go Back to Talent List
        </button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Profile Image */}
          <div className="md:col-span-1">
            <img 
              src={athlete.profilePicture} 
              alt={athlete.name} 
              className="w-full rounded-xl shadow-md"
            />
          </div>

          {/* Basic Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">{athlete.name}</h1>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  athlete.verificationStatus === 'Verified' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {athlete.verificationStatus}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Sport:</span> {athlete.sport} | {athlete.position}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> {athlete.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Performance Level:</span> {athlete.performanceLevel}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Sponsorship Status:</span> {athlete.sponsorshipStatus}
              </p>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Achievements</h2>
              <ul className="list-disc list-inside text-gray-600">
                {athlete.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            {/* Sponsorship Needs */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Sponsorship Needs</h2>
              <div className="flex space-x-2">
                {athlete.sponsorshipNeeds.map((need, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium"
                  >
                    {need}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              {athlete.socialMedia.instagram && (
                <a 
                  href={athlete.socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Instagram
                </a>
              )}
              {athlete.socialMedia.linkedin && (
                <a 
                  href={athlete.socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}