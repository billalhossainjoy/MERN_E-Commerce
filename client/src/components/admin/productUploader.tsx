import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  images?: {
    totalImage: number;
    deleteImages: number;
  };
}

const ProductUploader = <T extends FieldValues>({
  field,
  images,
}: Props<T>) => {
  const [imageDragOver, setImageDragOver] = useState(false);
  const [imageLength, setImageLength] = useState(5);

  useEffect(() => {
    if (images) setImageLength(5 - images.totalImage + images.deleteImages);
  }, [setImageLength, images]);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevFile = field.value ?? [];
    const newFile = e.target.files ? Array.from(e.target.files) : [];

    if (prevFile.length + newFile.length + (5 - imageLength) > 5)
      field.onChange(prevFile);
    else field.onChange([...prevFile, ...newFile]);
  };

  const handleDelete = (indexToRemove: number) => {
    const updatedFiles = field.value.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    field.onChange(updatedFiles);
  };

  return (
    <div
      className={cn("border border-gray-400 rounded border-dashed pt-3", {
        "bg-gray-100": imageDragOver,
      })}
    >
      <div className={"upload-field"}>
        <FormControl>
          <Input
            type="file"
            multiple
            name={field.name}
            id={field.name}
            className={cn("upload-field-input z-10", {
              "-z-10": field.value?.length !== 0,
            })}
            onChange={(e) => handleImages(e)}
            onDragOver={() => setImageDragOver(true)}
            onDragLeave={() => setImageDragOver(false)}
            onDrop={() => setImageDragOver(false)}
          />
        </FormControl>
        {field.value.length == 0 && !imageDragOver && (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <UploadCloud className="text-primary w-10 h-10" />
            <p className="font-semibold">
              Click to upload and{" "}
              <span className="text-primary">drag and drop</span>.
            </p>
            <p className="font-normal text-sm">SVG, PNG JPG or GIF</p>
          </div>
        )}

        {field.value.length == 0 && imageDragOver && (
          <div className="flex flex-col h-full w-full justify-center items-center bg-gray-100">
            <p>Drop the image</p>
          </div>
        )}

        {field.value && (
          <div className="flex gap-3">
            {field.value.map((image: File, index: number) => (
              <div className="relative flex items-start group" key={index}>
                <div className="relative bg-secondary p-2 flex justify-center items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="image"
                    className="w-20"
                  />
                  <div
                    className="absolute h-full w-full top-0 bg-secondary/60 hidden group-hover:block duration-300"
                    onClick={() => handleDelete(index)}
                  >
                    <div className="flex justify-center items-center w-full h-full">
                      <Trash2 className="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {field.value.length > 0 &&
          field.value.length + (5 - imageLength) < 5 && (
            <div>
              <label
                className="h-20 w-20 flex justify-center items-center hover:bg-secondary/60 cursor-pointer bg-secondary"
                htmlFor={field.name}
              >
                +
              </label>
            </div>
          )}
      </div>
    </div>
  );
};
export default ProductUploader;
