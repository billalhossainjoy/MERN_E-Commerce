import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { z } from "zod";
import { signUpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "../../common/FormField";
import { FormFieldType } from "@/constant";
import CustomButton from "../../common/CustomButton";
import { Key, Mail, User } from "lucide-react";
import AuthProviders from "../AuthProviders";
import { registerUser } from "@/store/features/auth/slice";
import { useAppDispatch } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      termsPolicy: undefined,
    },
  });

  const onSubmit = (data: SignUpSchemaType) => {
    dispatch(registerUser(data))
      .then((res) => {
        if (res.payload.success) {
          toast({
            title: res.payload.message,
            className:
              "bg-transparent border-primary border text-primary shadow-md shadow-primary",
          });
        } else {
          toast({
            title: "Sign up failed",
            variant: "destructive",
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast({
          title: "Sign up failed",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <CustomForm<SignUpSchemaType>
            name="username"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Username"
            placeholder="johndoe"
            icon={<User />}
          />
          <CustomForm<SignUpSchemaType>
            name="email"
            control={form.control}
            inputType={FormFieldType.EMAIL}
            label="Email"
            placeholder="johndoe@example.com"
            icon={<Mail />}
          />
          <CustomForm<SignUpSchemaType>
            name="password"
            control={form.control}
            inputType={FormFieldType.PASSWORD}
            label="Password"
            icon={<Key />}
          />
          <CustomForm<SignUpSchemaType>
            name="termsPolicy"
            control={form.control}
            inputType={FormFieldType.CHECKBOX}
            label="Please accept terms and conditions."
          />
          <CustomButton>Sign Up</CustomButton>
          <AuthProviders />
        </Form>
      </form>
    </>
  );
};
export default SignUpForm;
