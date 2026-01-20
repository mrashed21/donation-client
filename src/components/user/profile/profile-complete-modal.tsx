"use client";

import { useCreateUserProfile } from "@/api/user/user.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProfileCompleteModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutateAsync, isPending } = useCreateUserProfile();

  const { register, handleSubmit, setValue, watch } = useForm<any>({
    defaultValues: {
      user_type: "donor",
      gender: "male",
      has_disease: false,
      smokes: false,
      takes_drugs: false,
      is_available: true,
    },
  });

  const hasDisease = watch("has_disease");

  const onSubmit = async (values: any) => {
    try {
      await mutateAsync({
        ...values,
        profile_completed: true,
      });

      toast.success("Profile completed successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input {...register("phone_number", { required: true })} />
          </div>

          {/* WhatsApp */}
          <div>
            <Label>WhatsApp Number</Label>
            <Input {...register("whatsapp_number")} />
          </div>

          {/* DOB */}
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" {...register("date_of_birth")} />
          </div>

          {/* Age */}
          <div>
            <Label>Age</Label>
            <Input type="number" {...register("age")} />
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <Select onValueChange={(v: any) => setValue("gender", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Blood Group */}
          <div>
            <Label>Blood Group</Label>
            <Input {...register("blood_group")} />
          </div>

          {/* Weight */}
          <div>
            <Label>Weight (kg)</Label>
            <Input type="number" {...register("weight")} />
          </div>

          {/* Division */}
          <div>
            <Label>Division</Label>
            <Input {...register("division")} />
          </div>

          {/* District */}
          <div>
            <Label>District</Label>
            <Input {...register("district")} />
          </div>

          {/* Disease */}
          <div>
            <Label>Has Disease?</Label>
            <Select
              onValueChange={(v: any) => setValue("has_disease", v === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasDisease && (
            <div className="col-span-2">
              <Label>Disease Details</Label>
              <Input {...register("disease_details")} />
            </div>
          )}

          {/* Smokes */}
          <div>
            <Label>Smokes?</Label>
            <Select onValueChange={(v) => setValue("smokes", v === "true")}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Drugs */}
          <div>
            <Label>Takes Drugs?</Label>
            <Select
              onValueChange={(v) => setValue("takes_drugs", v === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Facebook */}
          <div className="col-span-2">
            <Label>Facebook Profile</Label>
            <Input {...register("facebook_link")} />
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Complete Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompleteModal;
