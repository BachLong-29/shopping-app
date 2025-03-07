"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WrapperContent from "@/components/layout/WrapperContent";
import { useProfile } from "./context/ProfileContext";
import withMyTask from "@/components/forms/withMyTask";

const ProfilePage = () => {
  const profile = useProfile();
  return (
    <>
      <WrapperContent>
        <div className="flex flex-col items-center">
          <Image
            src="/images/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full border"
          />
          <h2 className="text-xl font-semibold mt-2">{profile?.user?.name}</h2>

          <div className="space-y-4 w-[50%]">
            <div>
              <Label>Email</Label>
              <Input type="email" value="nguyenvanZZ@example.com" readOnly />
            </div>
            <div>
              <Label>Birthday</Label>
              <Input type="date" value="1995-05-15" readOnly />
            </div>
            <div>
              <Label>Gender</Label>
              <Input type="text" value="Male" readOnly />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="text" value="+1234567890" readOnly />
            </div>
            <div>
              <Label>Address</Label>
              <Input type="text" value="123 Street, City, Country" readOnly />
            </div>
          </div>
        </div>
      </WrapperContent>

      <WrapperContent>
        <div className="w-full flex justify-end gap-4">
          <Button className="w-auto bg-gray-400 hover:bg-gray-600">
            Cancel
          </Button>
          <Button className="w-auto bg-blue-500 hover:bg-blue-600">
            Edit Profile
          </Button>
        </div>
      </WrapperContent>
    </>
  );
};

export default withMyTask(ProfilePage);
