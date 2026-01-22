"use client";

import { useCreateUserProfile } from "@/api/user/user.api";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import DatePickerInput from "@/components/ui/DatePickerInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { areas } from "@/data/area";
import { districts, divisions } from "@/data/div-dis";
import { BDPhoneInput } from "bd-number-validator";
import {
  Calendar,
  Droplet,
  Heart,
  Link,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ProfileCompleteModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutateAsync, isPending } = useCreateUserProfile();

  const { register, handleSubmit, setValue, watch, control } = useForm<any>({
    defaultValues: {
      user_type: "donor",
      gender: "male",
      has_disease: false,
      smokes: false,
      takes_drugs: false,
      is_available: true,
      division: null,
      district: null,
      area: null,
    },
  });

  /* ===================== WATCHERS ===================== */
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const selectedArea = watch("area");
  const hasDisease = watch("has_disease");
  const dob = watch("date_of_birth");
  const lastDonateDate = watch("last_donate_date");

  /* ===================== HELPERS ===================== */
  const mapOption = (item: any) => ({
    label: item.name,
    value: item.id,
  });

  const canDonateAgain = () => {
    if (!lastDonateDate) return true;
    const nextEligibleDate = new Date(lastDonateDate);
    nextEligibleDate.setDate(nextEligibleDate.getDate() + 120);
    return new Date() >= nextEligibleDate;
  };

  /* ===================== OPTIONS ===================== */
  const divisionOptions = divisions.map(mapOption);
  const districtOptions = selectedDivision
    ? districts
        .filter((d) => d.division_id === selectedDivision.value)
        .map(mapOption)
    : [];
  const areaOptions = selectedDistrict
    ? areas
        .filter(
          (a: any) =>
            a.district_name.toLowerCase() ===
            selectedDistrict.label.toLowerCase(),
        )
        .map(mapOption)
    : [];

  /* ===================== HANDLERS ===================== */
  const handleDivisionChange = (option: any) => {
    setValue("division", option, { shouldDirty: true });
    setValue("district", null);
    setValue("area", null);
  };

  const handleDistrictChange = (option: any) => {
    setValue("district", option, { shouldDirty: true });
    setValue("area", null);
  };

  /* ===================== SUBMIT ===================== */
  const onSubmit = async (values: any) => {
    try {
      await mutateAsync({
        ...values,
        division: values.division?.label,
        district: values.district?.label,
        area: values.area?.label,
        profile_completed: true,
        is_available: canDonateAgain(),
      });

      toast.success("Profile completed successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ===================== RENDER ===================== */
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-[80%] min-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-6 border-b">
          <DialogTitle className="text-2xl font-bold">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-base">
            Please fill in your details to help us serve you better. All fields
            marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 pt-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
              {/* Date of Birth */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Date of Birth *
                </Label>
                <DatePickerInput
                  value={dob}
                  onChange={(date) =>
                    setValue("date_of_birth", date, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender *</Label>
                <Select
                  onValueChange={(v) => setValue("gender", v)}
                  defaultValue="male"
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Droplet className="w-4 h-4 text-red-600" />
                  Blood Group *
                </Label>
                <Select onValueChange={(v) => setValue("blood_group", v)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((bg) => (
                      <SelectItem key={bg} value={bg}>
                        <span className="font-semibold">{bg}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Weight (kg) *</Label>
                <Input
                  type="number"
                  {...register("weight")}
                  placeholder="e.g., 65"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Phone className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number *</Label>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                  }}
                  render={({ field }) => (
                    <BDPhoneInput
                      value={field.value || ""}
                      showLabel={false}
                      showError
                      onValueChange={(val) => field.onChange(val)}
                      wrapperClass="flex items-center gap-3 bg-white border-gray-200 rounded-md px-3 py-2 border"
                      prefixClass="text-gray-700 font-semibold text-base"
                      inputClass="flex-1 outline-none text-base placeholder-gray-400"
                      errorClass="text-sm text-red-500 mt-2 ml-1"
                    />
                  )}
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">WhatsApp Number</Label>
                <Controller
                  name="whatsapp_number"
                  control={control}
                  render={({ field }) => (
                    <BDPhoneInput
                      value={field.value || ""}
                      showLabel={false}
                      showError
                      onValueChange={(val) => field.onChange(val)}
                      wrapperClass="flex items-center gap-3 bg-white border-gray-200 rounded-md px-3 py-2 border"
                      prefixClass="text-gray-700 font-semibold text-base"
                      inputClass="flex-1 outline-none text-base placeholder-gray-400"
                      errorClass="text-sm text-red-500 mt-2 ml-1"
                    />
                  )}
                />
              </div>

              {/* Facebook */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Link className="w-4 h-4" />
                  Facebook Profile (Optional)
                </Label>
                <Input
                  {...register("facebook_link")}
                  placeholder="https://facebook.com/yourprofile"
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
              {/* Division */}
              <div className="space-y-2">
                <CustomSelect
                  name="Division"
                  placeholder="Select Division"
                  options={divisionOptions}
                  value={selectedDivision}
                  isSearchable={true}
                  onChange={handleDivisionChange}
                />
              </div>

              {/* District */}
              <div className="space-y-2">
                <CustomSelect
                  name="District"
                  placeholder="Select District"
                  options={districtOptions}
                  value={selectedDistrict}
                  isSearchable={true}
                  onChange={handleDistrictChange}
                  isDisabled={!selectedDivision}
                />
              </div>

              {/* Area */}
              <div className="space-y-2">
                <CustomSelect
                  name="Area / Thana"
                  placeholder="Select Area"
                  options={areaOptions}
                  value={selectedArea}
                  isSearchable={true}
                  onChange={(opt) =>
                    setValue("area", opt, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                  isDisabled={!selectedDistrict}
                />
              </div>
            </div>
          </div>

          {/* Health Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Heart className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Health Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
              {/* Disease */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Has Disease?</Label>
                <Select
                  onValueChange={(v) => setValue("has_disease", v === "true")}
                  defaultValue="false"
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Smokes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Smokes?</Label>
                <Select
                  onValueChange={(v) => setValue("smokes", v === "true")}
                  defaultValue="false"
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Drugs */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Takes Drugs?</Label>
                <Select
                  onValueChange={(v) => setValue("takes_drugs", v === "true")}
                  defaultValue="false"
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasDisease && (
                <div className="space-y-2 md:col-span-3">
                  <Label className="text-sm font-medium">Disease Details</Label>
                  <Input
                    {...register("disease_details")}
                    placeholder="Please specify your condition"
                    className="bg-white"
                  />
                </div>
              )}

              {/* Last Donate Date */}
              <div className="space-y-2 md:col-span-3">
                <Label className="text-sm font-medium">
                  Last Donation Date (Optional)
                </Label>
                <DatePickerInput
                  value={lastDonateDate}
                  onChange={(date) =>
                    setValue("last_donate_date", date, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                />
                {lastDonateDate && !canDonateAgain() && (
                  <p className="text-sm text-amber-600 mt-2">
                    ⚠️ You'll be eligible to donate again after 120 days from
                    your last donation.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompleteModal;
