import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  User,
  MoreHorizontal,
  Copy,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";

export const PrivateInfoPanel: React.FC = () => {
  const email = "chandansahoo02468@gmail.com";
  const [phone, setPhone] = useState<string>("");
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [bankAccountName, setBankAccountName] = useState<string>("");
  const [isEditingBankAccountName, setIsEditingBankAccountName] =
    useState<boolean>(false);
  const [iban, setIban] = useState<string>("");
  const [isEditingIban, setIsEditingIban] = useState<boolean>(false);
  const [currency, setCurrency] = useState("EUR");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
  };
  useForceLightMode();
  return (
    <div className="space-y-6">
      {/* Contact Information Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 mr-4">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <div className="flex items-center">
                <span className="text-sm">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="ml-2 text-muted-foreground hover:text-primary">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Phone
              </label>

              {isEditingPhone ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-12 border rounded-lg px-3 py-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingPhone(false)}>
                    Save
                  </Button>
                </div>
              ) : (
                <div className="w-full h-12 flex justify-between items-center border rounded-lg px-3 py-2">
                  <div className="text-gray-700">{phone || "Not set"}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingPhone(true)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Card Connection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="mr-3 h-6 w-6 text-muted-foreground" />
              <span className="text-sm">
                Connect your card to receive payment for opportunity by card
              </span>
            </div>
            <Button variant="outline">CONNECT CARD</Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Details */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Bank Account Name
            </label>
            {isEditingBankAccountName ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add bank account name"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="w-full h-12 border rounded-lg px-3 py-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingBankAccountName(false)}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="w-full h-12 flex justify-between items-center border rounded-lg px-3 py-2">
                <div className="text-gray-700">
                  {bankAccountName || "Not set"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingBankAccountName(true)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Iban
            </label>
            {isEditingIban ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add Iban"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="w-full h-12 border rounded-lg px-3 py-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingIban(false)}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="h-12 flex justify-between items-center border rounded-lg px-3 py-2">
                <div className="text-gray-700">{iban || "Not set"}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingIban(true)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Currency
              </label>
              <Select value={currency} onValueChange={setCurrency} >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR €</SelectItem>
                  <SelectItem value="USD">USD $</SelectItem>
                  <SelectItem value="GBP">GBP £</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manager Invite */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="mr-3 h-6 w-6 text-muted-foreground" />
              <span className="text-sm">
                Invite your manager to give access to your Athleto account
              </span>
            </div>
            <Button variant="outline">INVITE</Button>
          </div>
        </CardContent>
      </Card>

      {/* Google Calendar Connection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-muted-foreground" />
              <span className="text-sm">
                Connect your Google calendar to Athleto
              </span>
            </div>
            <Button variant="outline">CONNECT</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
