import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  User,
  Plus,
  Instagram,
  Facebook,
  Edit2,
  Upload,
  X,
  Pencil,
  Linkedin,
  LinkedinIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { Checkbox } from "@/components/ui/checkbox";

interface PublicInfoProps {
  isEditing: boolean;
  onToggleEdit: (editing: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  status: string;
  about: string;
  tags: string[];
  socialAccounts: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  video?: File | null;
  gender: string;
  dateOfBirth: string;
  country: string;
  city: string;
  talent: string;
  talentStatus: string;
  hideGender: boolean;
  hideDateOfBirth: boolean;
}

export const PublicInfoPanel: React.FC<PublicInfoProps> = ({
  isEditing,
  onToggleEdit,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [socialAccounts, setSocialAccounts] = useState({
    instagram: "",
    facebook: "",
    linkedIn: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "Chandan",
      lastName: "Sahoo",
      status: "Private",
      about: "",
      tags: [],
      socialAccounts: {},
      video: null,
      gender: "",
      dateOfBirth: "",
      country: "",
      city: "",
      talent: "",
      talentStatus: "",
      hideGender: false,
      hideDateOfBirth: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      tags,
      socialAccounts,
    });
    onToggleEdit(false);
  };

  const cancelEditing = () => {
    reset();
    onToggleEdit(false);
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("video", file);
    }
  };

  useForceLightMode();

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Public Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleEdit(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Chandan Sahoo</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  About
                </h3>
                <p className="text-sm text-muted-foreground">Not filled yet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="block text-sm font-medium text-muted-foreground mb-1">
                Status
              </p>
              <p className="text-sm">Private</p>
              <p className="text-xs text-muted-foreground">
                Your profile currently invisible to brands
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Gender", value: "Not specified", hideField: true },
                {
                  label: "Date of Birth",
                  value: "Not specified",
                  hideField: true,
                },
                { label: "Country", value: "Not specified" },
                { label: "City", value: "Not specified" },
                { label: "Talent", value: "Not specified" },
                { label: "Talent Status", value: "Not specified" },
              ].map(({ label, value, hideField }) => (
                <div key={label}>
                  <p className="block text-sm font-medium text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="text-sm">{value}</p>
                  {hideField && (
                    <p className="text-xs text-muted-foreground">
                      Required field to apply for opportunity
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: Instagram,
                color: "text-pink-500",
                label: "Instagram",
                placeholder: "Add your Instagram account",
              },
              {
                icon: Facebook,
                color: "text-blue-600",
                label: "Facebook",
                placeholder: "Add your Facebook account",
              },
              {
                icon: LinkedinIcon,
                color: "text-blue-400",
                label: "LinkedIn",
                placeholder: "Add your LinkedIn account",
              },
            ].map(({ icon: Icon, color, label, placeholder }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`mr-3 h-5 w-5 ${color}`} />
                  <span className="text-sm text-muted-foreground">
                    {placeholder}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  ADD
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No tags added yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {["Upload Video", "Attach YouTube Video"].map((action) => (
                <div
                  key={action}
                  className="border border-dashed rounded-lg p-6 text-center hover:bg-accent transition-colors">
                  <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Public Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter first name"
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-destructive text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter last name"
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-destructive text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">About</label>
            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.value === "private"
                      ? "Your profile is currently invisible to brands"
                      : "Your profile is visible to brands"}
                  </p>
                </div>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: "gender",
                label: "Gender",
                hideName: "hideGender",
                options: ["Male", "Female", "Other", "Prefer not to say"],
              },
              {
                name: "dateOfBirth",
                label: "Date of Birth",
                hideName: "hideDateOfBirth",
                type: "date",
              },
              {
                name: "country",
                label: "Country",
                options: ["United States", "Canada", "UK", "Australia"],
              },
              {
                name: "city",
                label: "City",
                type: "text",
              },
              {
                name: "talent",
                label: "Talent",
                options: ["Actor", "Model", "Influencer", "Dancer"],
              },
              {
                name: "talentStatus",
                label: "Talent Status",
                options: ["Beginner", "Intermediate", "Professional"],
              },
            ].map(({ name, label, hideName, options, type = "select" }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-2">
                  {label}
                </label>
                {hideName && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Controller
                      name={hideName as keyof FormData}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          checked={value as boolean}
                          onCheckedChange={onChange}
                        />
                      )}
                    />
                    <label className="text-xs text-muted-foreground">
                      Hide from public info
                    </label>
                  </div>
                )}
                <Controller
                  name={name as keyof FormData}
                  control={control}
                  render={({ field }) =>
                    type === "select" ? (
                      <Select 
                      onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Select ${label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {options?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option.toLowerCase()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={type}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    )
                  }
                />
                {name !== "city" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Required field to apply for opportunity
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              icon: Instagram,
              color: "text-pink-500",
              label: "Instagram",
              placeholder: "Enter Instagram handle",
            },
            {
              icon: Facebook,
              color: "text-blue-600",
              label: "Facebook",
              placeholder: "Enter Facebook profile link",
            },
            {
              icon: LinkedinIcon,
              color: "text-blue-400",
              label: "LinkedIn",
              placeholder: "Enter LinkedIn handle",
            },
          ].map(({ icon: Icon, color, label, placeholder }) => (
            <div key={label}>
              <label className="flex items-center text-sm font-medium mb-2">
                <Icon className={`mr-2 h-5 w-5 ${color}`} />
                {label}
              </label>
              <Input
                placeholder={placeholder}
                value={
                  socialAccounts[
                    label.toLowerCase() as keyof typeof socialAccounts
                  ]
                }
                onChange={(e) =>
                  setSocialAccounts({
                    ...socialAccounts,
                    [label.toLowerCase()]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="mr-2"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addTag}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-dashed rounded-lg p-6 text-center hover:bg-accent transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="upload-video"
              />
              <label
                htmlFor="upload-video"
                className="cursor-pointer flex flex-col items-center">
                <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload Video</p>
              </label>
            </div>
            <div className="border border-dashed rounded-lg p-6">
              <Input placeholder="Paste YouTube video URL" className="mb-2" />
              <Button variant="outline" className="w-full" onClick={(e)=>e.preventDefault()}>
                Attach YouTube Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={cancelEditing}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
