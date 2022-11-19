import { paths } from "../common/constants";
import OfferModel from "../types/OfferModel";
import axios from "axios";

export class RoamService {

    private readonly axiosInstance = axios.create({
        baseURL: paths.BASE_URL,
    });

    private readonly basePath = paths.BASE_URL;

    public async newRoam(firstName: string, lastName: string, postalCode: string, phoneNumber: string, email: string, chargerType: string) {

    }

    public async getRoam(roamId: string): Promise<Array<string>> {
        const resp = await this.axiosInstance.get<Array<string>>(this.basePath, {}); 
        return resp.data;     
    }

    public async getRoams(): Promise<Array<string>> {
        const resp = await this.axiosInstance.get<Array<string>>(this.basePath, {}); 
        return resp.data;     
    }

    public async getChargerTypes(): Promise<Array<string>> {
        const resp = await this.axiosInstance.get<Array<string>>(this.basePath, {}); 
        return resp.data;     
    }

    public async requestRoam(roamId: string, bookingNumber: string, email: string) {
        const resp = await this.axiosInstance.get<Array<string>>(this.basePath, {}); 
    }

    public async releaseRoam(roamId: string, bookingNumber: string, email: string): Promise<number> {
        const resp = await this.axiosInstance.get<number>(this.basePath, {}); 
        return resp.data; 
    }

}

