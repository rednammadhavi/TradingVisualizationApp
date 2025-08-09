import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/user';

export default function Dashboard() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getCurrentUser().then(({ data }) => setProfile(data.data));
    }, []);

    return (
        <div className="px-4 py-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {profile ? (
                <div className="bg-white p-6 rounded-lg shadow">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}
