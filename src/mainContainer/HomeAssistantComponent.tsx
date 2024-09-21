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
    const [hexColor, setHexColor] = useState<string>('pink');

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get(stateUrl, {
                headers: requiredHeaders,
            });

            console.log('API response:', response.data);
            setStateData(response.data);
        } catch (err) {
            console.error('Error fetching states:', err);
        }
    };

    const getRgbColor = (data?: Record<string, any>): number[] | undefined => {
        if (!data || typeof data !== 'object') {
            return undefined;
        }

        return data.attributes?.rgb_color;
    };


    /**
     * TUTAJ NA RAZIE CZEKAM AŻ ZAPALISZ ŚWIATŁO :P
     */


    // const rgbColor = useMemo(() => {
    //     const isLightThere = getRgbColor(stateData)
    //     if (isLightThere === undefined ) {
    //         setIsLight(false);
    //         return console.warn('Swiatlo wylaczone')
    //     }
    //     setIsLight(true)
    //     return isLightThere;
    // }, [stateData]);

    // setHexColor(rgbColor ? rgbColor.map(val => val.toString(16).padStart(2, '0')).join('') : '');
    // console.log(rgbColor);
    console.log(hexColor);

    return (
        <div >
            {isLight && !_.isEmpty(hexColor) ? ( <input
                type="color"
                id="favcolor"
                name="favcolor"
                value={`#${hexColor}`}
            />): <h3>Uwaga! Światło w pokoju jest wyłączone</h3>}
            <div className={'main-home'}>
                <Menu />
                <FabricCanvas hexColor={hexColor}/>
                {/*<img src={image} alt={'bob'} className={'image-size'} />*/}
            </div>

        </div>
    );
};

export default HomeAssistantComponent;