# API Usage Tracking

## Overview
This document explains how to check your remaining API usage for the Home Renovation App's integrated services.

## Quick Check
To check your current API usage, run:
```bash
npm run check-usage
```

## Services Tracked

### 1. **OpenAI API** (AI Features)
- **Used for**: Budget forecasting, receipt parsing, renovation advice chatbot
- **Rate Limits**: Depends on your plan (Free, Plus, or Enterprise)
- **Check Usage**: 
  - Command: `npm run check-usage`
  - Dashboard: https://platform.openai.com/usage
  - API Key: Set `OPENAI_API_KEY` in `.env.local`

### 2. **Airtable API** (MVP Data Storage)
- **Used for**: Projects, Tasks, Expenses, Documents, Photos storage
- **Rate Limits**: 
  - Free: 5 requests/second
  - Plus: 10 requests/second
  - Pro: 20 requests/second
- **Record Limits**: Free plan has 1,000 records per base
- **Check Usage**: 
  - Command: `npm run check-usage`
  - Dashboard: https://airtable.com/account
  - API Key: Set `AIRTABLE_API_KEY` in `.env.local`

### 3. **Notion API** (PRD/Documentation)
- **Used for**: Syncing Product Requirements Document
- **Rate Limits**: 3 requests per second (averaged over 60 seconds)
- **Check Usage**: 
  - Command: `npm run check-usage`
  - Dashboard: No usage dashboard (monitor via API responses)
  - API Key: Set `NOTION_API_KEY` in `.env.local`

## Setting Up API Keys

1. **Copy the example environment file:**
   ```bash
   cp env.example .env.local
   ```

2. **Get your API keys:**
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Airtable**: https://airtable.com/create/tokens
   - **Notion**: https://www.notion.so/my-integrations

3. **Edit `.env.local` and add your keys:**
   ```bash
   OPENAI_API_KEY=sk-...
   AIRTABLE_API_KEY=key...
   NOTION_API_KEY=secret_...
   ```

4. **Run the usage check:**
   ```bash
   npm run check-usage
   ```

## Current Status

Run `npm run check-usage` to see:
- ✅ **Configured**: API key is set and valid
- ❌ **Not Configured**: API key is missing or not set
- ⚠️ **Error**: API key is invalid or service is down

## Usage Monitoring Tips

1. **OpenAI**: 
   - Monitor your usage dashboard regularly
   - Set up billing alerts in OpenAI dashboard
   - Each GPT-4 request costs more than GPT-3.5
   - Vision API (for receipt parsing) has separate pricing

2. **Airtable**:
   - Free plan: 1,000 records per base (plenty for MVP)
   - Rate limits are per-API-key, not per-base
   - Consider upgrading if you hit record limits

3. **Notion**:
   - Rate limits are generous for typical usage
   - Mainly used for PRD sync (infrequent)
   - No billing - free API access with Notion account

## Programmatic Usage

You can also check usage programmatically in your code:

```typescript
import { usageTracker } from '@/lib/usage-tracker';

// Check all services
const summary = await usageTracker.getSummary();
console.log(`Configured: ${summary.configured}/3 services`);

// Check individual service
const openaiUsage = await usageTracker.checkOpenAIUsage();
if (openaiUsage.status === 'configured') {
  console.log('OpenAI is ready!');
}
```

## Troubleshooting

### "Not Configured" Error
- Check that `.env.local` exists in the project root
- Verify API key is not the placeholder value
- Restart dev server after changing environment variables

### "Error" Status
- Verify API key is valid (not expired or revoked)
- Check service status pages:
  - OpenAI: https://status.openai.com/
  - Airtable: https://status.airtable.com/
  - Notion: https://status.notion.so/
- Ensure you have proper permissions/scopes for the API key

## Cost Estimates (MVP Phase)

**Estimated Monthly Costs:**
- **OpenAI**: $20-50/month (depends on usage)
  - Budget forecasting: ~$0.01 per request
  - Receipt parsing: ~$0.02 per image
  - Chatbot: ~$0.01-0.03 per conversation
  
- **Airtable**: $0-20/month
  - Free for <1,000 records
  - Plus: $10/user/month if you need more
  
- **Notion**: $0
  - API access is free with any Notion account

**Total MVP Cost**: ~$20-70/month

## Production Considerations

When moving to production (post-MVP):
- Consider migrating from Airtable to PostgreSQL (cost reduction)
- Implement usage tracking and alerts
- Set up monitoring for rate limits
- Consider caching strategies to reduce API calls
- Implement request queuing for rate limit management

---

**Last Updated**: 2025-11-15
