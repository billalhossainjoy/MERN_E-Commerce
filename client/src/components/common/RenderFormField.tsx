import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormFieldProps } from "./FormField";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldType } from "@/constant";
import { EyeIcon, EyeOff, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface RenderFeildProps<T extends FieldValues> {
  props: FormFieldProps<T>;
  field: ControllerRenderProps<T, Path<T>>;
}

const RenderFormField = <T extends FieldValues>({
  props,
  field,
}: RenderFeildProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const { inputType, placeholder, icon, label, options, renderSkeleton } =
    props;

  switch (inputType) {
    case FormFieldType.INPUT:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Input type="text" {...field} placeholder={placeholder} />
          </FormControl>
        </div>
      );
    case FormFieldType.EMAIL:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>

          <FormControl>
            <Input type="email" {...field} placeholder={placeholder} />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Input
              type={showPassword ? "text" : "password"}
              {...field}
              placeholder="********"
            />
          </FormControl>
          {showPassword ? (
            <EyeOff onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <EyeIcon onClick={() => setShowPassword(!showPassword)} />
          )}
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className=" flex gap-2 items-center">
          <FormControl>
            <Checkbox
              className="rounded"
              checked={field.value}
              onCheckedChange={field.onChange}
              id={field.name}
            />
          </FormControl>
          {label && <Label htmlFor={field.name}>{label}</Label>}
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <div className="form-field">
          <FormControl>
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="rounded-lg top-2 border border-gray-400">
                {options?.map((option) => (
                  <FormControl key={option.id}>
                    <SelectItem value={option.id}>{option.label}</SelectItem>
                  </FormControl>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      );
    case FormFieldType.NUMBER:
      return (
        <div className="form-field">
          <div className="text-primary">{icon}</div>
          <FormControl>
            <Input
              type="number"
              value={Number(field.value)}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder={placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton && renderSkeleton(field);
    case FormFieldType.UPLOAD:
      return;
  }
};

export default RenderFormField;