import { BeritaDataById, BeritaDataType, PeraturanById } from "./data";

export interface GetMyBeritaPayloadInterface {
    message: string;
    count: number;
    data: BeritaDataType
}

export interface GetBeritaByIdPayloadInterface {
    message: string;
    data: BeritaDataById
}

export interface GetRuleByIdPayloadInterface {
    message: string;
    data: PeraturanById
}

export interface GetRuleByDesaPayloadInterface {
    message: string;
    count: number;
    data: PeraturanById[]
}