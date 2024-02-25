import {FetchHelper} from '../utils/FetchHelper';


const BASE_URL = 'http://localhost:8080'
const ALL_PARKING_API_URL = BASE_URL + '/api/parking/all';

export type IParkingService = {
    getAllParking: () => Promise<any>;
    getParkingID: (id:number) => Promise<any>;
    activateParking: (registrationNumber: string, startTime: string, endTime: string) => Promise<any>;
}

const ParkingService: IParkingService = {
    getAllParking: async () => {
        try {
            const response = await FetchHelper.get(ALL_PARKING_API_URL);
            return response.json();
        } catch (error) {
            console.error("error", error);
        }
    },
    getParkingID: async (id:number) => {
        try {
            const response = await FetchHelper.get(ALL_PARKING_API_URL + '/api/parking/'+ id);
            return response.json();
        } catch (error) {
            console.error("cant get the id of the parking", error);
        }
    },
    activateParking: async (registrationNumber: string, startTime: string, endTime: string): Promise<void> => {
        try {
            await FetchHelper.post(BASE_URL + '/api/parking', {
                registrationNumber: registrationNumber,
                startTime: startTime,
                endTime: endTime
            });
            console.log('Parking activated successfully');
        } catch (error) {
            console.error('Failed to activate parking:', error);
            throw error;
        }
    }
};

export default ParkingService;