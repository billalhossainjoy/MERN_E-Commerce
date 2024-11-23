import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../ui/form";
import CustomForm from "../../common/FormField";
import { FormFieldType } from "@/constant";
import { Key, User } from "lucide-react";
import CustomButton from "../../common/CustomButton";
import AuthProviders from "../AuthProviders";
import { loginUser } from "@/store/features/auth/slice";
import { useAppDispatch } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
export type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    dispatch(loginUser(data)).then((res) => {
      if (res.payload.success) {
        toast({
          title: res.payload.message,
          className:
            "md:bg-transparent border-primary border text-primary shadow-md shadow-primary",
        });
        if (searchParams.get("productId"))
          navigate(
            "/shopping/listing/product/" + searchParams.get("productId")
          );
      } else {
        if (res.payload.error && res.payload.error.field)
          form.setError("password", { message: res.payload.message });
        toast({
          title: res.payload.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <CustomForm<LoginSchemaType>
            name="identifier"
            control={form.control}
            inputType={FormFieldType.INPUT}
            label="Username"
            placeholder="johndoe"
            icon={<User />}
          />

          <CustomForm<LoginSchemaType>
            name="password"
            control={form.control}
            inputType={FormFieldType.PASSWORD}
            label="Password"
            icon={<Key />}
          />

          <p className="w-full text-right text-sm underline text-primary">
            Forgotten password
          </p>
          <CustomButton>Login</CustomButton>
          <AuthProviders />
        </Form>
      </form>
    </>
  );
};
export default LoginForm;
