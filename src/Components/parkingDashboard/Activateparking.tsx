import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ParkingService from '../../services/ParkingService';

const Activateparking = ({ onSubmit, onCancel, onClose }: { onSubmit: any, onCancel: any, onClose: any }) => {
    const navigate = useNavigate();
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [duration, setDuration] = useState(30);
    const [showPopup, setShowPopup] = useState(false);


    const addMinutes = (date: Date, minutes: number): Date => {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        newDate.setHours(23, 59, 59);
        return newDate;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const startTime: string = new Date().toISOString();
            const endTime: string = addMinutes(new Date(), duration).toISOString();
            console.log('startTime', startTime);
            console.log('endTime', endTime);
            console.log('Form submitted');
            console.log('registrationNumber:', registrationNumber);
            console.log('duration:', duration);


            await ParkingService.activateParking(registrationNumber, startTime, endTime);
            setShowPopup(true);
            setTimeout(() => {
                navigate('/');
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Aktiver parking</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registreringsnummer</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Varighet</label>
                        <select
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                        >
                            <option value={30}>30 min</option>
                            <option value={60}>1t</option>
                            <option value={90}>1t 30 min</option>
                            <option value={120}>2t</option>
                            <option value={150}>2t 30 min</option>
                            <option value={180}>3t</option>
                            <option value={210}>3t 30 min</option>
                            <option value={240}>4t</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-gray-400 text-white px-4 py-2 rounded-md m-2">Aktiver</button>
                        
                    </div>
                </form>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={() => onCancel()}>
                            Lukk vindu
                        </button>
                {showPopup && (
                    <div className="bg-gray-300 p-3 mt-3 rounded-md">
                        Parking aktivert. Redirekte til dashboard...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activateparking;