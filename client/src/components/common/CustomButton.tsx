import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<Props> = (props, {className }) => {
  return (
    <Button className={cn("",className)} {...props}>
      {props.children}
    </Button>
  );
};
export default CustomButton;
