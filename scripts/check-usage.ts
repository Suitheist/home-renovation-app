#!/usr/bin/env ts-node
// Script to check API usage for all configured services

import { usageTracker, formatUsageInfo } from '../src/lib/usage-tracker';

async function main() {
  console.log('🔍 Checking API Usage for Home Renovation App...\n');
  console.log('='.repeat(60));

  const summary = await usageTracker.getSummary();

  // Display each service's status
  for (const usage of summary.details) {
    console.log(formatUsageInfo(usage));
    console.log('-'.repeat(60));
  }

  // Display summary
  console.log('\n📈 Summary:');
  console.log(`   ✅ Configured: ${summary.configured}/3 services`);
  console.log(`   ❌ Not Configured: ${summary.notConfigured}/3 services`);
  console.log(`   ⚠️  Errors: ${summary.errors}/3 services`);
  
  if (summary.notConfigured > 0) {
    console.log('\n💡 Tip: Configure missing API keys in your .env.local file');
    console.log('   See env.example for required variables');
  }

  if (summary.configured === 3) {
    console.log('\n✨ All services are configured and working!');
  }

  console.log('\n' + '='.repeat(60));
}

main().catch(error => {
  console.error('❌ Error checking usage:', error);
  process.exit(1);
});
