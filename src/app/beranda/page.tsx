'use client';

import AuthLayout from "@/layout/auth-layout";
import { ActifityOption } from "@/type/data";
import React from "react";
import BerandaLayout from "./beranda-layout";
import BeritaData from "@/components/berita/berita-data";
import RuleData from "@/components/peraturan/peraturan-data";
import { InfoStatisticAdminUser, UserInfo } from "@/components/beranda/user-card";
import { GalleryThumbnails, Newspaper, Settings } from "lucide-react";
import { GalleryData } from "@/components/gallery/gallery-data";
import AdminLayoutUI from "@/layout/admin-ui";
import { ArsipData } from "@/components/arsip/arsip-data";
import { UMKMData } from "@/components/umkm/umkm-data";

export default function BerandaPage() {
    const [option, setOption] = React.useState<ActifityOption>(ActifityOption.beranda);

    function changeOption(d: ActifityOption) {
        setOption(d);
    }

    return (
        <AdminLayoutUI>
            <AuthLayout>
                <BerandaLayout setOption={changeOption} option={option}>
                    {option === ActifityOption.beranda &&
                        <div>
                            <UserInfo />
                            <div className="grid grid-cols-3">
                                <InfoStatisticAdminUser
                                    title="Total Berita"
                                    total={123}
                                    color="#757373"
                                    icon={Newspaper}
                                />
                                <InfoStatisticAdminUser
                                    title="Total Gallery"
                                    total={123}
                                    color="#757373"
                                    icon={GalleryThumbnails}
                                />
                                <InfoStatisticAdminUser
                                    title="Total Peraturan"
                                    total={123}
                                    color="#757373"
                                    icon={Settings}
                                />
                            </div>
                        </div>
                    }
                    {option === ActifityOption.berita &&
                        <div>
                            <BeritaData />
                        </div>
                    }
                    {option === ActifityOption.galery &&
                        <div>
                            <GalleryData />
                        </div>
                    }
                    {option === ActifityOption.peraturan &&
                        <div>
                            <RuleData />
                        </div>
                    }
                    {option === ActifityOption.umkm &&
                        <div>
                            <UMKMData />
                        </div>
                    }
                    {option === ActifityOption.arsip &&
                        <div>
                            <ArsipData />
                        </div>
                    }

                </BerandaLayout>
            </AuthLayout>
        </AdminLayoutUI>
    )
}