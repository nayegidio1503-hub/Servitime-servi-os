import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EmptyModuleProps {
  icon: any;
  title: string;
  description?: string;
}

export function EmptyModule({ icon: Icon, title, description }: EmptyModuleProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest">
        Módulo Estrutural
      </Badge>
      {description && (
        <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
      )}
      <Button disabled variant="outline">
        Configurar Módulo
      </Button>
    </div>
  );
}
