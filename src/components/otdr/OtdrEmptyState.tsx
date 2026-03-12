import { BookOpen } from "lucide-react";

interface Props {
  icon?: React.ReactNode;
  message: string;
}

const OtdrEmptyState = ({ icon, message }: Props) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/40 py-16">
    {icon || <BookOpen size={28} className="mb-2 text-muted-foreground/40" />}
    <p className="mt-2 text-sm text-muted-foreground">{message}</p>
  </div>
);

export default OtdrEmptyState;
