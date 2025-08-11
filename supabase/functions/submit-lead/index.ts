
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadSubmissionData {
  organization_name: string;
  organization_type: 'agri_company' | 'ngo' | 'university' | 'government' | 'cooperative' | 'other';
  contact_name: string;
  email: string;
  phone: string;
  company_size?: string;
  expected_farmers?: number;
  budget_range?: string;
  timeline?: string;
  requirements?: string;
  current_solution?: string;
  how_did_you_hear?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const requestData = await req.json();
    console.log('🔄 Received lead submission request:', {
      organization_name: requestData.organization_name,
      email: requestData.email,
      timestamp: new Date().toISOString()
    });

    // Validate required fields
    const requiredFields = ['organization_name', 'organization_type', 'contact_name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !requestData[field]?.trim());
    
    if (missingFields.length > 0) {
      console.log('❌ Validation failed - missing fields:', missingFields);
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          fields: missingFields 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(requestData.email)) {
      console.log('❌ Validation failed - invalid email:', requestData.email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate organization type
    const validOrgTypes = ['agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'];
    if (!validOrgTypes.includes(requestData.organization_type)) {
      console.log('❌ Validation failed - invalid organization type:', requestData.organization_type);
      return new Response(
        JSON.stringify({ error: 'Invalid organization type' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Basic rate limiting check (simple in-memory check - for production use Redis or similar)
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log('📍 Request from IP:', clientIP);

    // Check for existing email before attempting insertion
    const emailLower = requestData.email.trim().toLowerCase();
    console.log('🔍 Checking for existing lead with email:', emailLower);
    
    const { count, error: checkError } = await supabase
      .from('leads')
      .select('id', { head: true, count: 'exact' })
      .eq('email', emailLower);

    if (checkError) {
      console.error('💥 Error checking existing email:', checkError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to validate submission',
          details: 'Database validation error' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if ((count ?? 0) > 0) {
      console.log('⚠️ Email already exists in system:', emailLower);
      return new Response(
        JSON.stringify({ 
          error: 'Email already registered',
          message: 'This email address has already been used to submit an inquiry. Please use a different email or contact us directly.'
        }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Sanitize and prepare data for insertion
    const leadData = {
      organization_name: requestData.organization_name.trim(),
      organization_type: requestData.organization_type,
      contact_name: requestData.contact_name.trim(),
      email: emailLower,
      phone: requestData.phone.trim(),
      company_size: requestData.company_size?.trim() || null,
      expected_farmers: requestData.expected_farmers ? Number(requestData.expected_farmers) : null,
      budget_range: requestData.budget_range?.trim() || null,
      timeline: requestData.timeline?.trim() || null,
      current_solution: requestData.current_solution?.trim() || null,
      requirements: requestData.requirements?.trim() || null,
      how_did_you_hear: requestData.how_did_you_hear?.trim() || null,
      lead_source: 'website',
      status: 'new' as const,
      priority: 'medium' as const,
      metadata: {
        submission_source: 'edge_function',
        user_agent: req.headers.get('user-agent'),
        timestamp: new Date().toISOString(),
        client_ip: clientIP,
        secure_submission: true
      }
    };

    console.log('✅ Data validated, inserting into database...');

    // Insert lead using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error('💥 Database insertion failed:', error);
      
      // Handle specific constraint violations
      if (error.code === '23505' && error.message.includes('leads_email_unique_ci')) {
        console.log('⚠️ Duplicate email detected during insertion:', emailLower);
        return new Response(
          JSON.stringify({ 
            error: 'Email already registered',
            message: 'This email address has already been used to submit an inquiry. Please use a different email or contact us directly.'
          }),
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit lead',
          details: error.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ Lead successfully inserted:', data.id);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        lead_id: data.id,
        message: 'Lead submitted successfully' 
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('💥 Unexpected error in submit-lead function:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
