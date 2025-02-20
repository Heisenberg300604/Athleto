"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandLeaderboardPage from "../brand-leaderboard/page";
import LeaderboardPage from "../athlete-leaderboard/page";
import BrandNavbar from "@/components/BrandNavbar";
export default function TabbedLeaderboard() {
  return (
    <>
    <BrandNavbar/>
    <div className="container mx-auto p-8 max-w-7xl">
      <Tabs defaultValue="athletes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="athletes">Athletes Leaderboard</TabsTrigger>
          <TabsTrigger value="brands">Brands Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="athletes">
          <LeaderboardPage />
        </TabsContent>

        <TabsContent value="brands">
          <BrandLeaderboardPage />
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}