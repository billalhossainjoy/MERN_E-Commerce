import AddressForm from "@/components/shopping/Dashboard/adress/addressForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  deleteAddress,
  fetchAllAddress,
} from "@/store/features/address/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DashboardAddress: React.FC = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const { isLoading, addressList } = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAllAddress());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get("update-address")) setUpdateModal(true);
    else setUpdateModal(false);
  }, [searchParams]);

  return (
    <div className="container m-auto p-4 space-y-6">
      <h1 className="font-bold text-2xl">Address Book</h1>
      <Separator className="" />

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {addressList.map((address, index) => (
              <Card key={index}>
                <CardContent className="space-y-2">
                  <CardTitle className="pt-6 font-bold texg-xl flex justify-between">
                    <h1>
                      Title:{" "}
                      <span className="font-bold">{address.addressType}</span>
                    </h1>
                    <div className="flex gap-1">
                      <Edit
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          navigate(
                            "/shopping/dashboard/address?update-address=" +
                              address._id!
                          )
                        }
                      />
                      <Trash
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => dispatch(deleteAddress(address._id!))}
                      />
                    </div>
                  </CardTitle>
                  <div className="font-bold">
                    <h1>
                      Address:{" "}
                      <span className="font-light">{address.address}</span>
                    </h1>
                    <h1>
                      city: <span className="font-light">{address.city}</span>
                    </h1>
                    <h1>
                      Post Code:{" "}
                      <span className="font-light">{address.pincode}</span>
                    </h1>
                    <h1>
                      Phone: <span className="font-light">{address.phone}</span>
                    </h1>
                    {address.notes && (
                      <h1>
                        Notes:{" "}
                        <span className="font-light">{address.notes}</span>{" "}
                      </h1>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <AddressForm />
      <Dialog open={updateModal} onOpenChange={setUpdateModal}>
        <DialogContent>
          <AddressForm
            updateData={addressList.find(
              (address) => address._id == searchParams.get("update-address")
            )}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DashboardAddress;
