"use client";

import { User } from "@/types/user";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Landmark, User as UserIcon } from "lucide-react";

interface UserDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDrawer({ user, isOpen, onClose }: UserDrawerProps) {
  if (!user) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-2xl overflow-y-auto">
          <DrawerHeader className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-24 w-24 rounded-full border-4 border-primary/10 bg-muted p-1"
              />
              <Badge className="absolute -bottom-1 -right-1 capitalize">
                {user.role}
              </Badge>
            </div>
            <DrawerTitle className="text-2xl">
              {user.firstName} {user.lastName}
            </DrawerTitle>
            <DrawerDescription className="text-base">
              @{user.username} • {user.age} years old • {user.gender}
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <section className="space-y-4">
              <h3 className="font-semibold text-primary">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>
                    {user.address.address}, {user.address.city},<br />
                    {user.address.state}, {user.address.postalCode}, {user.address.country}
                  </span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary">Work & Education</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{user.company.title}</p>
                    <p className="text-muted-foreground">
                      {user.company.name} ({user.company.department})
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{user.university}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary">Financial Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Landmark className="h-4 w-4 text-muted-foreground" />
                  <span>{user.bank.cardType} ({user.bank.currency})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-xs">{user.bank.cardNumber.replace(/\d(?=\d{4})/g, "*")}</span>
                  <span className="text-xs text-muted-foreground">Exp: {user.bank.cardExpire}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary">Additional Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Height</p>
                  <p>{user.height} cm</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p>{user.weight} kg</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Blood Group</p>
                  <p>{user.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Birth Date</p>
                  <p>{new Date(user.birthDate).toLocaleDateString()}</p>
                </div>
              </div>
            </section>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
