import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
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
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "@/components/spinner";
import { supabase } from "@/lib/supabase";

interface PublicInfoProps {
  isEditing: boolean;
  onToggleEdit: (editing: boolean) => void;
}

interface AthleteData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  video_link: string;
  is_verified: boolean;
  skills: string;
  location: string;
  gender: string;
  date_of_birth: string;
  status: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  talent_level: string;
  affiliations: string;
  achievements: string;
  sponsorship_status: string;
  sponsorship_needs: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  about: string;
  video_link: string;
  skills: string;
  location: string;
  gender: string;
  date_of_birth: string;
  status: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  talent_level: string;
  affiliations: string;
  achievements: string;
  sponsorship_status: string;
  sponsorship_needs: string;
}

// Add a helper function to format date
const formatDate = (date: string) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

// Add this helper function
const formatYoutubeUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  return url;
};

export const PublicInfoPanel: React.FC<PublicInfoProps> = ({
  isEditing,
  onToggleEdit,
}) => {
  const { athlete, loading } = useUser();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: athlete?.social_links?.instagram || "",
    facebook: athlete?.social_links?.facebook || "",
    linkedin: athlete?.social_links?.linkedin || "",
  });
  const [youtubeUrl, setYoutubeUrl] = useState<string>(athlete?.video_link || "");
  useForceLightMode();
  console.log(athlete)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      about: "",
      video_link: "",
      skills: "",
      location: "",
      gender: "",
      date_of_birth: "",
      status: "private",
      social_links: {},
      talent_level: "",
      affiliations: "",
      achievements: "",
      sponsorship_status: "",
      sponsorship_needs: "",
    },
  });

  useForceLightMode();

  // Update the form when `athlete` changes
  useEffect(() => {
    if (athlete) {
      reset({
        first_name: athlete.first_name || "",
        last_name: athlete.last_name || "",
        about: athlete.about || "",
        video_link: athlete.video_link || "",
        skills: athlete.skills || "",
        location: athlete.location || "",
        gender: athlete.gender || "",
        date_of_birth: athlete.date_of_birth || "",
        status: athlete.status || "private",
        social_links: athlete.social_links || {},
        talent_level: athlete.talent_level || "",
        affiliations: athlete.affiliations || "",
        achievements: athlete.achievements || "",
        sponsorship_status: athlete.sponsorship_status || "",
        sponsorship_needs: athlete.sponsorship_needs || "",
      });

      // Set skills array from comma-separated string
      if (athlete.skills) {
        setSkills(athlete.skills.split(',').map(skill => skill.trim()));
      }

      // Set social links
      if (athlete.social_links) {
        setSocialLinks(athlete.social_links);
      }

      // Set YouTube URL
      setYoutubeUrl(athlete.video_link || "");
    }
  }, [athlete, reset]);

  // Add this function to update social links
  const updateSocialLink = async (platform: 'instagram' | 'facebook' | 'linkedin', value: string) => {
    try {
      if (!athlete?.id) return;

      const updatedSocialLinks = {
        ...athlete.social_links,
        [platform]: value
      };

      const { error } = await supabase
        .from('athletes')
        .update({ 
          social_links: updatedSocialLinks,
          updated_at: new Date().toISOString()
        })
        .eq('id', athlete.id);

      if (error) throw error;

      setSocialLinks(prev => ({
        ...prev,
        [platform]: value
      }));
    } catch (error) {
      console.error('Error updating social link:', error);
    }
  };

  // Update useEffect to set initial social links
  useEffect(() => {
    if (athlete?.social_links) {
      setSocialLinks({
        instagram: athlete.social_links.instagram || "",
        facebook: athlete.social_links.facebook || "",
        linkedin: athlete.social_links.linkedin || "",
      });
    }
  }, [athlete]);

  // Add function to update YouTube URL
  const updateYoutubeUrl = async () => {
    try {
      if (!athlete?.id) return;

      console.log('Saving URL:', youtubeUrl);

      const { data, error } = await supabase
        .from('athletes')
        .update({ 
          video_link: youtubeUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', athlete.id);

      if (error) throw error;
      
      console.log('Save response:', data);
    } catch (error) {
      console.error('Error updating YouTube URL:', error);
    }
  };

  if (loading || !athlete) return <Spinner />;

  const onSubmit = async (data: FormData) => {
    try {
      if (!athlete?.id) return;

      const updatedData = {
        first_name: data.first_name,
        last_name: data.last_name,
        about: data.about,
        video_link: data.video_link,
        skills: skills.join(', '),
        location: data.location,
        gender: data.gender,
        date_of_birth: formatDate(data.date_of_birth),
        status: data.status,
        social_links: socialLinks,
        talent_level: data.talent_level,
        affiliations: data.affiliations,
        achievements: data.achievements,
        sponsorship_status: data.sponsorship_status,
        sponsorship_needs: data.sponsorship_needs,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('athletes')
        .update(updatedData)
        .eq('id', athlete.id);

      if (error) throw error;

      onToggleEdit(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Add function to update individual fields
  const updateField = async (field: string, value: string | number | object) => {
    try {
      if (!athlete?.id) return;

      const formattedValue = field === 'date_of_birth' ? formatDate(value as string) : value;

      const { error } = await supabase
        .from('athletes')
        .update({ 
          [field]: formattedValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', athlete.id);

      if (error) throw error;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  // Add function to update skills
  const updateSkills = async (newSkills: string[]) => {
    try {
      if (!athlete?.id) return;

      const { error } = await supabase
        .from('athletes')
        .update({ 
          skills: newSkills.join(', '),
          updated_at: new Date().toISOString()
        })
        .eq('id', athlete.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  const addSkill = async () => {
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setNewSkill("");
      await updateSkills(updatedSkills);
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    await updateSkills(updatedSkills);
  };

  // Add function to update tags
  const updateTags = async (newTags: string[]) => {
    try {
      if (!athlete?.id) return;

      const { error } = await supabase
        .from('athletes')
        .update({ 
          tags: newTags.join(', '),
          updated_at: new Date().toISOString()
        })
        .eq('id', athlete.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating tags:', error);
    }
  };

  const addTag = async () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setNewTag("");
      await updateTags(updatedTags);
    }
  };

  const removeTag = async (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    await updateTags(updatedTags);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("video_link", URL.createObjectURL(file));
    }
  };

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
                <span className="font-medium">{athlete.first_name} {athlete.last_name}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  About
                </h3>
                <p className="text-sm text-muted-foreground">
                  {athlete.about || "Not filled yet"}
                </p>
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
              <p className="text-sm capitalize">{athlete.status || "Not set"}</p>
              <p className="text-xs text-muted-foreground">
                {athlete.status === "private" 
                  ? "Your profile is currently invisible to brands"
                  : "Your profile is visible to brands"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Gender", value: athlete.gender },
                { label: "Date of Birth", value: athlete.date_of_birth },
                { label: "Location", value: athlete.location },
                { label: "Phone", value: athlete.phone },
                { label: "Talent Level", value: athlete.talent_level },
                { label: "Sponsorship Status", value: athlete.sponsorship_status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="block text-sm font-medium text-muted-foreground mb-1">
                    {label}
                  </p>
                  <p className="text-sm capitalize">{value || "Not set"}</p>
                </div>
              ))}
            </div>

            {athlete.skills && (
              <div>
                <p className="block text-sm font-medium text-muted-foreground mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {athlete.skills.split(',').map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
                value: athlete.social_links?.instagram,
              },
              {
                icon: Facebook,
                color: "text-blue-600",
                label: "Facebook",
                value: athlete.social_links?.facebook,
              },
              {
                icon: LinkedinIcon,
                color: "text-blue-400",
                label: "LinkedIn",
                value: athlete.social_links?.linkedin,
              },
            ].map(({ icon: Icon, color, label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`mr-3 h-5 w-5 ${color}`} />
                  <span className="text-sm">
                    {value ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {value}
                      </a>
                    ) : (
                      `Add your ${label} account`
                    )}
                  </span>
                </div>
                {!value && (
                  <Button variant="outline" size="sm" onClick={() => onToggleEdit(true)}>
                    ADD
                  </Button>
                )}
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
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Current URL: {athlete?.video_link || 'No URL set'}
              </div>
              
              {athlete?.video_link ? (
                <div className="aspect-video">
                  <iframe
                    src={formatYoutubeUrl(athlete.video_link)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
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
              )}
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
                name="first_name"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter first name"
                    className={errors.first_name ? "border-destructive" : ""}
                    onBlur={async () => {
                      await updateField('first_name', field.value);
                    }}
                  />
                )}
              />
              {errors.first_name && (
                <p className="text-destructive text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter last name"
                    className={errors.last_name ? "border-destructive" : ""}
                    onBlur={async () => {
                      await updateField('last_name', field.value);
                    }}
                  />
                )}
              />
              {errors.last_name && (
                <p className="text-destructive text-xs mt-1">
                  {errors.last_name.message}
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
                  onBlur={async () => {
                    await updateField('about', field.value);
                  }}
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
                name: "date_of_birth",
                label: "Date of Birth",
                hideName: "hideDateOfBirth",
                type: "date",
              },
              {
                name: "location",
                label: "Location",
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
                          checked={Boolean(value)}
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
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your location"
                      value={typeof field.value === 'string' ? field.value : ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        updateField('location', e.target.value);
                      }}
                    />
                  )}
                />
                {name !== "location" && (
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
              platform: 'instagram' as const,
            },
            {
              icon: Facebook,
              color: "text-blue-600",
              label: "Facebook",
              placeholder: "Enter Facebook profile link",
              platform: 'facebook' as const,
            },
            {
              icon: LinkedinIcon,
              color: "text-blue-400",
              label: "LinkedIn",
              placeholder: "Enter LinkedIn handle",
              platform: 'linkedin' as const,
            },
          ].map(({ icon: Icon, color, label, placeholder, platform }) => (
            <div key={label}>
              <label className="flex items-center text-sm font-medium mb-2">
                <Icon className={`mr-2 h-5 w-5 ${color}`} />
                {label}
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder={placeholder}
                  value={socialLinks[platform]}
                  onChange={(e) => setSocialLinks(prev => ({
                    ...prev,
                    [platform]: e.target.value
                  }))}
                  className="flex-1"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => updateSocialLink(platform, socialLinks[platform])}
                >
                  Save
                </Button>
              </div>
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
                  title="Remove tag"
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
              <div className="flex gap-2">
                <Input 
                  placeholder="Paste YouTube video URL" 
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="mb-2" 
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={updateYoutubeUrl}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => onToggleEdit(false)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
