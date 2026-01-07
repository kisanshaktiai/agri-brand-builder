import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface LeadSubmissionData {
  action?: 'validate' | 'submit';
  email?: string;
  organization_name?: string;
  organization_type?: string;
  contact_name?: string;
  phone?: string;
  company_size?: string;
  expected_farmers?: number;
  budget_range?: string;
  timeline?: string;
  current_solution?: string;
  requirements?: string;
  how_did_you_hear?: string;
  lead_source?: string;
  metadata?: Record<string, unknown>;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let body: LeadSubmissionData;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const action = body.action || 'submit';

    // ========== VALIDATE ACTION ==========
    if (action === 'validate') {
      const rawEmail = (body.email || "").toString().trim();
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!rawEmail) {
        return new Response(
          JSON.stringify({ valid: false, error: "Email is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!emailRegex.test(rawEmail)) {
        console.log("❌ Invalid email format received:", rawEmail);
        return new Response(
          JSON.stringify({ valid: false, error: "Invalid email format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const emailLower = rawEmail.toLowerCase();
      console.log("🔎 Checking lead email existence:", emailLower);

      const { count, error } = await supabase
        .from("leads")
        .select("id", { head: true, count: "exact" })
        .eq("email", emailLower);

      if (error) {
        console.error("💥 Email existence check failed:", error);
        return new Response(
          JSON.stringify({ valid: false, error: "Email check failed" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const exists = (count ?? 0) > 0;
      if (exists) {
        console.log("🚫 Email already exists in leads:", emailLower);
        return new Response(
          JSON.stringify({ valid: true, exists: true, message: "Email already exists" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("✅ Email is available:", emailLower);
      return new Response(
        JSON.stringify({ valid: true, exists: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========== SUBMIT ACTION ==========
    console.log("📥 Processing lead submission");

    // Validate required fields
    const requiredFields = ["organization_name", "organization_type", "contact_name", "email"];
    const missingFields = requiredFields.filter(
      (field) => !body[field as keyof LeadSubmissionData]
    );

    if (missingFields.length > 0) {
      console.log("❌ Missing required fields:", missingFields);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const rawEmail = (body.email || "").toString().trim();
    
    if (!emailRegex.test(rawEmail)) {
      console.log("❌ Invalid email format:", rawEmail);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate organization_type
    const validOrgTypes = ["agri_company", "ngo", "university", "government", "cooperative", "other"];
    if (!validOrgTypes.includes(body.organization_type || "")) {
      console.log("❌ Invalid organization_type:", body.organization_type);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid organization_type. Must be one of: ${validOrgTypes.join(", ")}`,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for existing email
    const emailLower = rawEmail.toLowerCase();
    console.log("🔎 Checking for existing lead with email:", emailLower);

    const { count: existingCount, error: checkError } = await supabase
      .from("leads")
      .select("id", { head: true, count: "exact" })
      .eq("email", emailLower);

    if (checkError) {
      console.error("💥 Email check failed:", checkError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to check email uniqueness" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if ((existingCount ?? 0) > 0) {
      console.log("🚫 Email already exists:", emailLower);
      return new Response(
        JSON.stringify({
          success: false,
          error: "A lead with this email already exists",
          code: "DUPLICATE_EMAIL",
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare lead data
    const leadData = {
      organization_name: (body.organization_name || "").toString().trim(),
      organization_type: body.organization_type,
      contact_name: (body.contact_name || "").toString().trim(),
      email: emailLower,
      phone: body.phone ? body.phone.toString().trim() : null,
      company_size: body.company_size || null,
      expected_farmers: body.expected_farmers ? Number(body.expected_farmers) : null,
      budget_range: body.budget_range || null,
      timeline: body.timeline || null,
      current_solution: body.current_solution || null,
      requirements: body.requirements || null,
      how_did_you_hear: body.how_did_you_hear || null,
      lead_source: body.lead_source || "website",
      status: "new" as const,
      priority: "medium" as const,
      metadata: {
        ...body.metadata,
        submitted_via: "edge_function",
        submitted_at: new Date().toISOString(),
      },
    };

    console.log("📝 Inserting lead:", { email: leadData.email, organization: leadData.organization_name });

    const { data, error } = await supabase
      .from("leads")
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error("💥 Database insertion error:", error);

      if (error.code === "23505") {
        return new Response(
          JSON.stringify({
            success: false,
            error: "A lead with this email already exists",
            code: "DUPLICATE_EMAIL",
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: `Database error: ${error.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Lead created successfully:", data.id);

    return new Response(
      JSON.stringify({
        success: true,
        lead_id: data.id,
        message: "Lead submitted successfully",
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("💥 Unexpected error in submit-lead:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
