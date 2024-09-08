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
    console.log('states', states)
    console.log('error', error)
    console.log('loading', loading)


    useEffect(() => {
        fetchStates();
    }, []);

    const API_BASE_URL = 'http://ha.mshomedomain.com/api';

    const stateUrl = `${API_BASE_URL}`;
    console.log(stateUrl);
    const fetchStates = async () => {
        try {
            const response = await axios.get(stateUrl, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNDRlMWNkYjRmY2Y0ODAzYmNiMjM4ZTMxNWEwNzIwNyIsImlhdCI6MTcyNTgwNjM1OSwiZXhwIjoyMDQxMTY2MzU5fQ.gTJEZ_1uVYftGxTX4Knk4YXKoUDfYuLuKdyoJpxcHcE',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
            Hello
        </div>
    );
};

export default HomeAssistantComponent;
