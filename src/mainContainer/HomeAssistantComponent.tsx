import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import Menu from "./components/menu/Menu.tsx";
import _ from "lodash";
import {requiredHeaders, stateUrl} from "./config/config.ts";
import "./HomeAssistant.css";
import FabricCanvas from "./canvas/FabricCanvas.tsx";


const HomeAssistantComponent = () => {
    const [stateData, setStateData] = useState<Record<string, any>>({});
    const [isLight, setIsLight] = useState<boolean>(false);
    const [hexColor, setHexColor] = useState<string>('');
    const [rgbColor, setRGBColor] = useState<number[]>([]);

    useEffect(() => {
        fetchStates();
    }, []);

    const API_BASE_URL = 'https://ha.mshomedomain.com/api/states/light.sypialnia_spot_5';
    const stateUrl = `${API_BASE_URL}`;
    const fetchStates = async () => {
        try {
            const response = await axios.get(stateUrl, {
                headers: {
                    'Authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNDRlMWNkYjRmY2Y0ODAzYmNiMjM4ZTMxNWEwNzIwNyIsImlhdCI6MTcyNTgwNjM1OSwiZXhwIjoyMDQxMTY2MzU5fQ.gTJEZ_1uVYftGxTX4Knk4YXKoUDfYuLuKdyoJpxcHcE',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });

            console.log('API response:', response.data);
            await setRGBColor(response.data?.attributes?.rgb_color)
            console.log('rgbColor', rgbColor);
            await setStateData(response.data);
            console.log('API stateData:', stateData);
        } catch (err) {
            console.error('Error fetching states:', err);
        }
    };

    useEffect(() => {
        console.log('getRgbColor called')
        if (_.isEmpty(rgbColor)) {
            setIsLight(false);
        } else {
        setIsLight(true)
       const recalculation = rgbColor?.map(val => val.toString(16).padStart(2, '0')).join('')
            console.log(recalculation, 'recalculation');
        setHexColor(recalculation)
        }
    }, [rgbColor]);

    return (
        <div >
            {isLight ? ( <input
                type="color"
                id="favcolor"
                name="favcolor"
                value={`#${hexColor}`}
            />): <h3>Uwaga!  Światło w pokoju jest wyłączone</h3>}
            <div className={'main-home'}>
                <Menu />
                <FabricCanvas hexColor={`#${hexColor}`}/>
            </div>

        </div>
    );
};

export default HomeAssistantComponent;