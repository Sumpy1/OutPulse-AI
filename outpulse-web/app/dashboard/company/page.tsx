"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function CompanyProfilePage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Company Profile</h2>
        <p className="text-muted-foreground">Manage your company's core information learned by OutPulse Ai.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Identity</CardTitle>
            <CardDescription>How OutPulse represents you to prospects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" defaultValue="Your Business Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="domain">Website URL</Label>
              <Input id="domain" defaultValue="https://example.com" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value Proposition</CardTitle>
            <CardDescription>The core messaging used for outreach.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="offer">The Offer</Label>
              <Textarea id="offer" placeholder="What exactly are you selling?" defaultValue="AI-powered automation for sales teams." className="min-h-[100px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valueProp">Main Selling Point</Label>
              <Textarea id="valueProp" placeholder="Why should they choose you?" defaultValue="We save teams 20+ hours a week by automating the entire prospecting funnel." className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
