import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";

interface UserLogin {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface UserGetMe {
  id: string;
  username: string;
  email: string;
}

export interface LoginPayloadInterface {
  message: string;
  token: string;
  user: UserLogin;
}

export interface AuthContextInterface {
  user: UserGetMe | null;
  loggedIn: boolean;
  setLoggedIn: (d: boolean) => void;
  loading: boolean;
  error: Error | null;
}

export enum NamaDesa {
  binalawan = "binalawan",
  liangbunyu = "liangbunyu",
  setabu = "setabu",
  enreukan = "enreukan",
}

export enum ActifityOption {
  beranda = "beranda",
  berita = "berita",
  peraturan = "peraturan",
  galery = "galery",
}

export interface SideBarMenu {
  name: string;
  url: string;
  icon: LucideIcon;
  optionname: ActifityOption | null;
  clickOption: (d: ActifityOption) => void;
}

export interface Berita {
  beritaId: number;
  judul: string;
  isi: string;
  gambarUrl?: string;
  desa: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: number;
    username: string;
  };
}

export interface UpdateBeritaData {
  judul?: string;
  isi?: string;
  gambarUrl?: string;
}

export interface CreateBeritaData {
  judul: string;
  isi: string;
  gambarUrl?: string;
  desa: string;
}

export interface SearchResult {
  hits: string[];
  message: string;
}

export type BeritaDataType = {
  beritaId: number;
  judul: string;
  isi: string;
  createdAt: string;
  desa: string;
  gambarUrl: string;
  authorId: number;
  author: {
    username: string;
    email: string;
  };
};

export type BeritaDataById = {
  beritaId: number;
  judul: string;
  isi: string;
  createdAt: string;
  desa: string;
  gambarUrl: string;
  authorId: number;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchable?: {
    column: string;
    placeholder: string;
  }[];
  filterable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
}

export interface PeraturanById {
  peraturanId:number
  judul:string
  fileUrl:string
  desa:string
  uploadedAt:string
}

export interface Galeri {
  galeriId: number;
  judul: string;
  gambarUrl: string;
  desa: string;
  uploadedAt: string;
}

export interface GaleriData {
  judul: string;
  fileUrl: string;
  desa: string;
}

export interface UpdateUserPayload {
  newusername: string;
  oldpassword: string;
  newpassword: string;
}

export interface CreateAdminPayload {
  username: string;
  email: string;
  password: string;
  status: string;
  desa: string;
}