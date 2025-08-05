import AuthLayout from "@/layout/auth-layout";
import { UpdateBerita } from "./editable-component";
import AdminLayoutUI from "@/layout/admin-ui";

interface PageProps {
    params: Promise<{ id: number }>
}

export default async function TaskDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <AdminLayoutUI>
            <AuthLayout>
                <div className="w-full h-screen flex justify-center items-center">
                    <UpdateBerita beritaId={id} />
                </div>
            </AuthLayout>
        </AdminLayoutUI>
    );

};