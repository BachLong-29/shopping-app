"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "./context/ProfileContext";
import withMyTask from "@/components/forms/withMyTask";

const ProfilePage = () => {
  const profile = useProfile();
  return (
    <div className="flex justify-center items-center h-[84vh]">
      <Card className="w-[500px] shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/images/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full border"
          />
          <h2 className="text-xl font-semibold mt-2">{profile?.user?.name}</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withMyTask(ProfilePage);
