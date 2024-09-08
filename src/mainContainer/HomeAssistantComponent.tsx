// src/components/HomeAssistantComponent.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';

interface State {
    state: string;
    attributes?: Record<string, unknown>;
    last_changed: string;
    last_updated: string;
}

interface Entity {
    entity_id: string;
    state: string;
    attributes?: Record<string, unknown>;
    last_changed: string;
    last_updated: string;
}

const HomeAssistantComponent = () => {
    const [states, setStates] = useState<Entity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get('http://localhost:8123/api/states', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNDRlMWNkYjRmY2Y0ODAzYmNiMjM4ZTMxNWEwNzIwNyIsImlhdCI6MTcyNTgwNjM1OSwiZXhwIjoyMDQxMTY2MzU5fQ.gTJEZ_1uVYftGxTX4Knk4YXKoUDfYuLuKdyoJpxcHcE',
                    'Content-Type': 'application/json',
                },
            });
            setStates(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching states:', err);
            setError('Failed to fetch states');
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {states.map((state, index) => (
                        <li key={index}>
                            <strong>{state.entity_id}:</strong> {state.state}
                            {state.attributes && Object.keys(state.attributes).length > 0 && (
                                <span> Attributes: {JSON.stringify(state.attributes)}</span>
                            )}
                            <br />
                            Last Changed: {state.last_changed}
                            <br />
                            Last Updated: {state.last_updated}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomeAssistantComponent;
