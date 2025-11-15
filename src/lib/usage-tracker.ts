// API Usage Tracker for Home Renovation App
// Checks remaining usage/limits for Airtable, Notion, and OpenAI APIs

import OpenAI from 'openai';

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface UsageInfo {
  service: string;
  status: 'configured' | 'not_configured' | 'error';
  details?: string;
  limits?: {
    requests?: {
      limit: number | string;
      used?: number;
      remaining?: number | string;
    };
    credits?: {
      limit: number | string;
      used?: number;
      remaining?: number | string;
    };
  };
  message?: string;
}

export class UsageTracker {
  /**
   * Check OpenAI API usage
   * Note: OpenAI doesn't provide direct usage API, but we can check if credentials are valid
   */
  async checkOpenAIUsage(): Promise<UsageInfo> {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
      return {
        service: 'OpenAI',
        status: 'not_configured',
        message: 'OpenAI API key not configured. Set OPENAI_API_KEY in your .env.local file.',
      };
    }

    try {
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
      
      // Make a minimal API call to verify the key works
      await openai.models.list();

      return {
        service: 'OpenAI',
        status: 'configured',
        details: 'API key is valid and working',
        message: 'OpenAI API is configured. Usage details are available in your OpenAI dashboard at https://platform.openai.com/usage',
        limits: {
          credits: {
            limit: 'See dashboard',
            remaining: 'Check https://platform.openai.com/usage',
          },
        },
      };
    } catch (error: any) {
      return {
        service: 'OpenAI',
        status: 'error',
        message: `OpenAI API error: ${error.message}`,
        details: 'Check if your API key is valid and has credits remaining',
      };
    }
  }

  /**
   * Check Airtable API usage
   * Note: Airtable doesn't provide usage limits via API
   */
  async checkAirtableUsage(): Promise<UsageInfo> {
    if (!AIRTABLE_API_KEY || AIRTABLE_API_KEY === 'your_airtable_api_key_here') {
      return {
        service: 'Airtable',
        status: 'not_configured',
        message: 'Airtable API key not configured. Set AIRTABLE_API_KEY in your .env.local file.',
      };
    }

    try {
      // Make a test request to verify credentials
      const response = await fetch('https://api.airtable.com/v0/meta/bases', {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
      });

      if (response.ok) {
        const data: any = await response.json();
        return {
          service: 'Airtable',
          status: 'configured',
          details: `API key is valid. ${data.bases?.length || 0} bases accessible`,
          message: 'Airtable API is configured. Free plan: 1,000 records per base, 5 requests/second. Check your plan at https://airtable.com/account',
          limits: {
            requests: {
              limit: '5 requests/second (Free), 10 requests/second (Plus)',
              remaining: 'Rate limits reset automatically',
            },
          },
        };
      } else {
        return {
          service: 'Airtable',
          status: 'error',
          message: `Airtable API error: ${response.status} ${response.statusText}`,
          details: 'Check if your API key is valid',
        };
      }
    } catch (error: any) {
      return {
        service: 'Airtable',
        status: 'error',
        message: `Airtable API error: ${error.message}`,
      };
    }
  }

  /**
   * Check Notion API usage
   * Note: Notion doesn't provide usage limits via API
   */
  async checkNotionUsage(): Promise<UsageInfo> {
    if (!NOTION_API_KEY || NOTION_API_KEY === 'your_notion_api_key_here') {
      return {
        service: 'Notion',
        status: 'not_configured',
        message: 'Notion API key not configured. Set NOTION_API_KEY in your .env.local file.',
      };
    }

    try {
      // Make a test request to verify credentials
      const response = await fetch('https://api.notion.com/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      });

      if (response.ok) {
        const user: any = await response.json();
        return {
          service: 'Notion',
          status: 'configured',
          details: `API key is valid. User: ${user.name || 'Unknown'}`,
          message: 'Notion API is configured. Rate limit: 3 requests per second (averaged over 60 seconds)',
          limits: {
            requests: {
              limit: '3 requests/second (averaged over 60 seconds)',
              remaining: 'Rate limits reset automatically',
            },
          },
        };
      } else {
        return {
          service: 'Notion',
          status: 'error',
          message: `Notion API error: ${response.status} ${response.statusText}`,
          details: 'Check if your API key is valid and has proper permissions',
        };
      }
    } catch (error: any) {
      return {
        service: 'Notion',
        status: 'error',
        message: `Notion API error: ${error.message}`,
      };
    }
  }

  /**
   * Check all API usage at once
   */
  async checkAllUsage(): Promise<UsageInfo[]> {
    const [openai, airtable, notion] = await Promise.all([
      this.checkOpenAIUsage(),
      this.checkAirtableUsage(),
      this.checkNotionUsage(),
    ]);

    return [openai, airtable, notion];
  }

  /**
   * Get a summary of all API statuses
   */
  async getSummary(): Promise<{
    configured: number;
    notConfigured: number;
    errors: number;
    details: UsageInfo[];
  }> {
    const details = await this.checkAllUsage();
    
    return {
      configured: details.filter(d => d.status === 'configured').length,
      notConfigured: details.filter(d => d.status === 'not_configured').length,
      errors: details.filter(d => d.status === 'error').length,
      details,
    };
  }
}

// Export singleton instance
export const usageTracker = new UsageTracker();

// Helper function to format usage info for display
export function formatUsageInfo(usage: UsageInfo): string {
  let output = `\n📊 ${usage.service} API:\n`;
  output += `   Status: ${usage.status === 'configured' ? '✅ Configured' : usage.status === 'not_configured' ? '❌ Not Configured' : '⚠️  Error'}\n`;
  
  if (usage.details) {
    output += `   Details: ${usage.details}\n`;
  }
  
  if (usage.message) {
    output += `   ${usage.message}\n`;
  }
  
  if (usage.limits) {
    if (usage.limits.requests) {
      output += `   Rate Limit: ${usage.limits.requests.limit}\n`;
      if (usage.limits.requests.remaining) {
        output += `   Remaining: ${usage.limits.requests.remaining}\n`;
      }
    }
    if (usage.limits.credits) {
      output += `   Credits: ${usage.limits.credits.remaining || usage.limits.credits.limit}\n`;
    }
  }
  
  return output;
}
