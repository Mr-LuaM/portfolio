"use client"; 
// components/Profile.tsx
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';  // Import the createClient function
import { Profile } from '../lib/types';  // Import the Profile type
import Image from 'next/image';  // Import the next/image component
import { ThemeSwitcher } from './theme-switcher';
import ActionButtons from './actionButtons';
import HackathonBadge from './hackathonBadge';
import Achievements from './achievements';

const ProfileComponent = () => {
    const [profile, setProfile] = useState<Profile | null>(null); // Use the Profile type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();  // Initialize Supabase client here

            try {
                const { data, error } = await supabase.from('profile').select('*').single();
                if (error) throw error;
                setProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="mb-8 animate-fade-in">
            <div className="flex items-center gap-4 md:gap-6">
                {/* Profile Image */}
                <Image
                    src={profile?.image_url || '/fallback-image.jpg'} // Fallback image if profile image is unavailable
                    alt="Bryl Lim"
                    width={160}
                    height={160}
                    className="rounded-sm "
                />
                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h1 className="text-lg md:text-2xl font-bold truncate">{profile?.name || 'Bryl Lim'}</h1>
                        <ThemeSwitcher />
                    </div>
                    {/* Location and Bio */}
                    <p className="text-xs md:text-sm text-foreground/70 mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="truncate">{profile?.location || 'Manila, Philippines'}</span>
                    </p>
                    <p className="text-sm md:text-base mt-1.5 md:mt-2">
                        Senior Full-stack Engineer and Certified GenAI Leader
                    </p>
                    {/* Action Buttons and Hackathon Badge */}
                    <div className="mt-4 flex gap-6 items-center justify-start md:justify-start">
                        <ActionButtons />
                        <HackathonBadge />
                    </div>
     
                </div>
            </div>
        </section>
    );
};

export default ProfileComponent;
