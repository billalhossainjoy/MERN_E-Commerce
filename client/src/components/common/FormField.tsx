import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldType } from "@/constant";
import { Label } from "../ui/label";
import RenderFormField from "./RenderFormField";
import { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export interface FormFieldProps<T extends FieldValues> {
  children?: React.ReactNode;
  name: Path<T>;
  control: Control<T>;
  inputType: FormFieldType;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  options?: { id: string; label: string }[];
  multiple?: boolean;
  renderSkeleton?: (
    feild: ControllerRenderProps<T, Path<T>>
  ) => React.ReactNode;
}

const CustomForm = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const { name, control, label, inputType } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && inputType !== FormFieldType.CHECKBOX && (
            <Label className="text-sm text-gray-500">{label}</Label>
          )}
          <RenderFormField props={props} field={field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomForm;
