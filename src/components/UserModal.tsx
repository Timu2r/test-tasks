"use client";

import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Landmark, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-0 flex flex-col items-center text-center">
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
          <DialogTitle className="text-2xl">
            {user.firstName} {user.lastName}
          </DialogTitle>
          <DialogDescription className="text-base">
            @{user.username} • {user.age} years old • {user.gender}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section className="space-y-4">
              <h3 className="font-semibold text-primary border-b pb-1">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="break-all">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span>
                    {user.address.address}, {user.address.city},<br />
                    {user.address.state}, {user.address.postalCode}, {user.address.country}
                  </span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary border-b pb-1">Work & Education</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{user.company.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.company.name}
                    </p>
                    <p className="text-muted-foreground text-xs italic">
                      {user.company.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span>{user.university}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary border-b pb-1">Financial Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Landmark className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{user.bank.cardType} ({user.bank.currency})</span>
                </div>
                <div className="flex flex-col gap-1 ml-7">
                  <span className="font-mono text-xs tracking-wider">
                    {user.bank.cardNumber.replace(/\d(?=\d{4})/g, "*")}
                  </span>
                  <span className="text-xs text-muted-foreground">Expires: {user.bank.cardExpire}</span>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-semibold text-primary border-b pb-1">Additional Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Height</p>
                  <p className="font-medium">{user.height} cm</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Weight</p>
                  <p className="font-medium">{user.weight} kg</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Blood Group</p>
                  <p className="font-medium">{user.bloodGroup}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Birth Date</p>
                  <p className="font-medium">{new Date(user.birthDate).toLocaleDateString()}</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-6 pt-0 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
