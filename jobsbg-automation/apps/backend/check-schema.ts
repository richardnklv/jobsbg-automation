import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function checkSchema() {
  console.log('Checking database schema...\n');
  
  // Check if cv table exists and get its structure
  const { data: tables, error: tableError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', 'cv');

  if (tableError) {
    console.error('Error checking tables:', tableError);
    return;
  }

  if (tables.length === 0) {
    console.log('❌ CV table does not exist yet');
    return;
  }

  console.log('✅ CV table exists');

  // Get column information for cv table
  const { data: columns, error: columnError } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, is_nullable')
    .eq('table_schema', 'public')
    .eq('table_name', 'cv');

  if (columnError) {
    console.error('Error checking columns:', columnError);
    return;
  }

  console.log('\nCV table structure:');
  columns.forEach(col => {
    console.log(`- ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
  });

  // Check candidate table too
  const { data: candidateColumns, error: candidateError } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, is_nullable')
    .eq('table_schema', 'public')
    .eq('table_name', 'candidate');

  if (!candidateError && candidateColumns.length > 0) {
    console.log('\nCandidate table structure:');
    candidateColumns.forEach(col => {
      console.log(`- ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
  }
}

checkSchema().then(() => process.exit(0)).catch(console.error);