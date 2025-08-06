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

import { ArsipData, UmkmData, NamaDesa } from "./data";

interface BaseResponse {
  success: boolean;
  message: string;
}

export interface GetArsipByIdPayloadInterface extends BaseResponse {
  data: ArsipData;
}

export interface GetAllArsipPayloadInterface extends BaseResponse {
  data: ArsipData[];
}

export interface GetArsipByDesaPayloadInterface {
  data: ArsipData[];
}

export interface GetArsipByJenisPayloadInterface extends BaseResponse {
  count: number;
  data: ArsipData[];
}

export interface CreateArsipPayloadInterface extends BaseResponse {
  data: ArsipData;
}

export interface UpdateArsipPayloadInterface extends BaseResponse {
  data: ArsipData;
}

export interface DeleteArsipPayloadInterface extends BaseResponse {
  message: string;
}

export interface GetUmkmByIdPayloadInterface extends BaseResponse {
  data: UmkmData;
}

export interface GetAllUmkmPayloadInterface extends BaseResponse {
  data: UmkmData[];
}

export interface GetUmkmByDesaPayloadInterface {
  data: UmkmData[];
}

export interface CreateUmkmPayloadInterface extends BaseResponse {
  data: UmkmData;
}

export interface UpdateUmkmPayloadInterface extends BaseResponse {
  data: UmkmData;
}

export interface DeleteUmkmPayloadInterface extends BaseResponse {
  message: string;
}

export interface BeritaData {
  beritaId: number;
  judul: string;
  konten: string;
  gambarUrl?: string;
  desa?: NamaDesa;
  kategori?: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    userId: number;
    username: string;
    email: string;
  };
}

export interface GetBeritaByDesaPayloadInterface {
  data: BeritaData[];
}

export interface SearchBeritaPayloadInterface extends BaseResponse {
  data: BeritaData[];
  count: number;
}

export interface CreateBeritaPayloadInterface extends BaseResponse {
  data: BeritaData;
}

export interface UpdateBeritaPayloadInterface extends BaseResponse {
  data: BeritaData;
}

export interface DeleteBeritaPayloadInterface extends BaseResponse {
  message: string;
}