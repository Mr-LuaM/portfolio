"use client";
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';  // Import the createClient function
import { Experience } from '../lib/types';  // Import the Experience type

const ExperienceSection = () => {
    const [experiences, setExperiences] = useState<Experience[] | null>(null); // Use the Experience type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            const supabase = createClient();  // Initialize Supabase client here

            try {
                const { data, error } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
                if (error) throw error;
                setExperiences(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Find the latest experience to highlight
    const latestExperience = experiences ? experiences[0] : null;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h2 className="text-lg font-bold">Experience</h2>
            </div>

            {/* Experience List */}
            <div className="relative space-y-4 mt-4">
                {experiences?.map((experience) => (
                    <div
                        key={experience.id}
                        className="relative pl-6 group/role "
                    >
                        {/* Small black dot on hover */}
                        <div
                            className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 
                            transition-colors group-hover:border-black group-hover:bg-black"
                        ></div>

                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-black transition-colors">
                                {experience.role}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-black">{experience.company}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">
                                    {new Date(experience.start_date).getFullYear()}
                                </span>
                            </div>
                         
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceSection;
