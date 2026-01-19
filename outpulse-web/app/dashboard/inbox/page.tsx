"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, User, Bot, HelpCircle } from "lucide-react";

const mockMessages = [
  { id: 1, sender: "Alice Johnson", company: "TechScale Inc.", lastMessage: "Yes, I'd be interested in a demo next Tuesday.", time: "10:30 AM", unread: true },
  { id: 2, sender: "Charlie Davis", company: "DataSync", lastMessage: "How does the pricing work for 50 users?", time: "Yesterday", unread: false },
];

export default function InboxPage() {
  const [selected, setSelected] = useState(mockMessages[0]);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar - Threads */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-green-600">Inbox</h2>
          <p className="text-xs text-muted-foreground">Recent replies to your outreach</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`p-4 border-b cursor-pointer transition-colors hover:bg-green-50/50 ${selected.id === msg.id ? "bg-green-50 border-l-4 border-green-600" : ""}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm">{msg.sender}</span>
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{msg.lastMessage}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{msg.company}</span>
                {msg.unread && <div className="h-2 w-2 rounded-full bg-green-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50/50">
        <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              {selected.sender[0]}
            </div>
            <div>
              <h3 className="font-bold">{selected.sender}</h3>
              <p className="text-xs text-muted-foreground">{selected.company}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs font-semibold">
            <HelpCircle className="mr-2 h-4 w-4" /> Ask AI for drafting
          </Button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
               <div className="max-w-[70%] bg-white p-3 rounded-lg shadow-sm border text-sm">
                  Hi {selected.sender}, I saw {selected.company} is scaling their engineering team. We've helped similar teams automate their prospecting. Interested in a quick chat?
                  <div className="mt-1 text-[10px] text-muted-foreground flex items-center gap-1">
                    <Bot className="h-3 w-3" /> Sent by OutPulse Ai
                  </div>
               </div>
            </div>

            <div className="flex justify-end">
               <div className="max-w-[70%] bg-green-600 text-white p-3 rounded-lg shadow-lg text-sm">
                  {selected.lastMessage}
               </div>
            </div>
        </div>

        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <Input placeholder="Type your response as a human..." className="flex-1" />
            <Button className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-center mt-2 text-muted-foreground italic">
            OutPulse will stop automated follow-ups once you reply manually.
          </p>
        </div>
      </div>
    </div>
  );
}
