import CustomForm from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constant";
import { cn } from "@/lib/utils";
import { AddressSchema, AddressSchemaType } from "@/schema/address.schema";
import { addAddress, editAddress } from "@/store/features/address/slice";
import { useAppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addressTypeOptions } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  updateData?: AddressSchemaType;
}

const AddressForm: React.FC<Props> = ({ updateData }) => {
  const dispatch = useAppDispatch();
  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      _id: updateData?._id || undefined,
      userId: updateData?.userId || undefined,
      address: updateData?.address || "",
      city: updateData?.city || "",
      pincode: updateData?.pincode || "",
      addressType: updateData?.addressType || "HOME",
      phone: updateData?.phone || "",
      notes: updateData?.notes || "",
    },
  });
	const navigate= useNavigate()

  const onSubmit = (data: AddressSchemaType) => {
    try {
      const updatedData = {
        _id: updateData?._id,
        userId: updateData?.userId,
        ...data,
      };

		if (updateData) {
			dispatch(editAddress(updatedData));
			navigate("/shopping/dashboard/address");
	  }
      else dispatch(addAddress(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="border p-6 rounded-lg space-y-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <h1 className="text-xl font-semibold ">
          {updateData?.address ? "Update your address" : "Add new address"}
        </h1>
        <CustomForm<AddressSchemaType>
          name="address"
          control={form.control}
          inputType={FormFieldType.TEXTAREA}
          label="Full Address"
          placeholder="Type full address here"
        />
        <CustomForm<AddressSchemaType>
          name="city"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="City"
          placeholder="Dhaka"
        />
        <CustomForm<AddressSchemaType>
          name="pincode"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="Post Code"
          placeholder="1230"
        />
        <CustomForm<AddressSchemaType>
          name="addressType"
          control={form.control}
          inputType={FormFieldType.RADIO}
          label="Address Type"
          options={addressTypeOptions}
        />
        <CustomForm<AddressSchemaType>
          name="phone"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="Phone"
          placeholder="015******53"
        />
        <CustomForm<AddressSchemaType>
          name="notes"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="Notes"
          placeholder="Suggest your route."
        />
        <Button className={cn("px-20", { "w-full": updateData })}>
          {updateData ? "Update Address" : "Add"}
        </Button>
      </Form>
    </form>
  );
};
export default AddressForm;
