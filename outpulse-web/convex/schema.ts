import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    role: v.union(v.literal('admin'), v.literal('rep')),
    companyId: v.optional(v.id("companies")),
  }).index("by_token", ["tokenIdentifier"]),

  companies: defineTable({
    userId: v.id("users"),
    name: v.optional(v.string()), // Optional initially
    domain: v.string(),
    description: v.optional(v.string()),
    offer: v.optional(v.string()),
    valueProp: v.optional(v.string()),
    onboardingStatus: v.union(
      v.literal('pending_url'),
      v.literal('scraping'),
      v.literal('learning'),
      v.literal('gap_questions'),
      v.literal('icp_confirmation'),
      v.literal('active')
    ),
  }).index("by_user", ["userId"]),

  knowledgeGaps: defineTable({
    companyId: v.id("companies"),
    question: v.string(),
    answer: v.optional(v.string()),
    status: v.union(v.literal('pending'), v.literal('answered')),
  }).index("by_company", ["companyId"]),

  icps: defineTable({
    companyId: v.id("companies"),
    targetIndustry: v.array(v.string()),
    companySizeRange: v.string(),
    jobTitles: v.array(v.string()),
    region: v.array(v.string()),
    status: v.union(v.literal('draft'), v.literal('approved')),
  }).index("by_company", ["companyId"]),

  leads: defineTable({
    icpId: v.id("icps"),
    companyId: v.id("companies"),
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    score: v.number(),
    status: v.union(
      v.literal('new'),
      v.literal('contacted'),
      v.literal('replied'),
      v.literal('converted'),
      v.literal('unresponsive')
    ),
    linkedinUrl: v.optional(v.string()),
  })
  .index("by_company", ["companyId"])
  .index("by_company_status", ["companyId", "status"]),

  messages: defineTable({
    leadId: v.id("leads"),
    companyId: v.id("companies"),
    direction: v.union(v.literal('outbound'), v.literal('inbound')),
    content: v.string(),
    sentAt: v.number(),
    status: v.union(v.literal('sent'), v.literal('delivered'), v.literal('read')),
  })
  .index("by_lead", ["leadId"])
  .index("by_company", ["companyId"]),
});
