import CustomForm from "@/components/common/FormField";
import { FormFieldType } from "@/constant";
import {  AddressSchemaType } from "@/schema/address.schema";
import { addressTypeOptions } from "../Dashboard";
import { Form } from "@/components/ui/form";

interface Props {
  form: any;
  submitHandler: (data: AddressSchemaType) => void;
}

const CustomAddressForm: React.FC<Props> = ({ form, submitHandler }) => {
  return (
    <>
      <form
        className="border p-6 rounded-lg space-y-3"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <Form {...form}>
          <div>
            <h1 className="text-xl font-semibold ">Custom Address</h1>
          </div>
          <CustomForm<AddressSchemaType>
            name="name"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Full Name"
            placeholder="Type full name here"
          />
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
        </Form>
      </form>
    </>
  );
};
export default CustomAddressForm;
