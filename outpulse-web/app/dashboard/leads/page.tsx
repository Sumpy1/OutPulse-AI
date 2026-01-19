"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, Mail, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

const leads = [
  { id: 1, name: "Alice Johnson", company: "TechScale Inc.", email: "alice@techscale.io", score: 98, status: "Contacted" },
  { id: 2, name: "Bob Smith", company: "CloudFlow", email: "bob@cloudflow.com", score: 92, status: "New" },
  { id: 3, name: "Charlie Davis", company: "DataSync", email: "charlie@datasync.net", score: 85, status: "Replied" },
  { id: 4, name: "Diana Prince", company: "GrowthOps", email: "diana@growthops.com", score: 95, status: "New" },
  { id: 5, name: "Ethan Hunt", company: "Infrascore", email: "ethan@infrascore.com", score: 88, status: "Contacted" },
];

export default function LeadsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-orange-600">Leads</h2>
          <p className="text-muted-foreground">Prospects identified and scored by your ICP rules.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><ExternalLink className="mr-2 h-4 w-4" /> Export</Button>
            <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-100">Find More Leads</Button>
        </div>
      </div>

      <Card className="border-orange-100">
        <CardHeader className="border-b border-orange-50 bg-orange-50/10">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Database</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search leads..." className="pl-8" />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-orange-50/30 transition-colors">
                  <TableCell className="font-semibold">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell className="text-center font-bold text-orange-600">{lead.score}%</TableCell>
                  <TableCell>
                    <Badge variant={lead.status === "Replied" ? "default" : "secondary"} className={lead.status === "Replied" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}>
                        {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><Mail className="h-4 w-4 text-gray-400" /></Button>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4 text-gray-400" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
