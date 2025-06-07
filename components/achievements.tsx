// components/Achievements.tsx
import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

type Achievement = {
    name: string;
    details: string;
    // Add other fields if your table has more columns
};

const Achievements = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('achievements').select('*');

            if (error) console.error('Error fetching achievements:', error);
            else setAchievements(data);
        };

        fetchAchievements();
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold">Achievements</h2>
            <ul>
                {achievements.map((ach, index) => (
                    <li key={index}>
                        <p>{ach.name}</p>
                        <p>{ach.details}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;
