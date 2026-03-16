import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyModule } from "@/components/layout/EmptyModule";

interface StructuralPageProps {
  title: string;
  description: string;
  icon: any;
  badge?: string;
}

export default function StructuralPage({ title, description, icon, badge }: StructuralPageProps) {
  return (
    <div>
      <PageHeader title={title} description={description} badge={badge || "Módulo Estrutural"} />
      <div className="bg-card border border-border rounded-lg shadow-sm">
        <EmptyModule icon={icon} title={title} description={description} />
      </div>
    </div>
  );
}
