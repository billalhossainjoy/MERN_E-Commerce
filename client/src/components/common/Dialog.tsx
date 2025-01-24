import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";

interface Props {
  children: React.ReactNode;
  className: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CustomDialog: React.FC<Props> = ({
  children,
  className,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(className)}>{children}</DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
