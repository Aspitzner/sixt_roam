import { paths } from "../common/constants";
import axios from "axios";
import RoamModel from "../types/RoamModel";
import ChargerTypeModel from "../types/ChargerTypeModel";

class RoamService {

    private readonly axiosInstance = axios.create({
        baseURL: paths.BASE_URL,
        headers: {
            get: {
                accept: "application/json",
                "Content-Type": "application/json",
            }
        }
    });

    public async newRoam(firstName: string, lastName: string, postalCode: string, phoneNumber: string, email: string, chargerType: string) {

    }

    public async getRoam(roamId: string | null): Promise<RoamModel | null> {
        if (roamId == null)
            return null;
        const resp = await this.axiosInstance.get<RoamModel>(paths.BASE_URL + paths.ROAMS + "/" + roamId, {withCredentials: false}); 
        return resp.data;     
    }

    public async getRoams(): Promise<Array<RoamModel>> {
        const resp = await this.axiosInstance.get<Array<RoamModel>>(paths.BASE_URL + paths.ROAMS, {withCredentials: false}); 
        return resp.data;     
    }

    public async getChargerTypes(): Promise<Array<ChargerTypeModel>> {
        const resp = await this.axiosInstance.get<Array<ChargerTypeModel>>(paths.BASE_URL + paths.CHARGERS, {withCredentials: false}); 
        return resp.data;     
    }

    public async requestRoam(roamId: string, bookingNumber: string, email: string) {
        const resp = await this.axiosInstance.get<Array<string>>(paths.BASE_URL, {withCredentials: false}); 
    }

    public async releaseRoam(roamId: string, bookingNumber: string, email: string): Promise<number> {
        const resp = await this.axiosInstance.get<number>(paths.BASE_URL, {withCredentials: false}); 
        return resp.data; 
    }

}

const roamService = new RoamService(); 
export default roamService; 
