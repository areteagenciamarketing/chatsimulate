
export interface ScrapedContent {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  url: string;
  hasBeenCommented: boolean;
}

export interface ScrapingRule {
  id: string;
  name: string;
  targetUsers: string[];
  frequency: "hourly" | "daily" | "weekly";
  keywords: string[];
  autoComment: boolean;
  commentTemplate: string;
  isActive: boolean;
}

export interface NewRuleFormData {
  name: string;
  targetUsers: string[];
  frequency: "hourly" | "daily" | "weekly";
  keywords: string[];
  autoComment: boolean;
  commentTemplate: string;
  isActive: boolean;
}
