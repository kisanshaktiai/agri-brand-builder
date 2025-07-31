
import React, { useState, useEffect } from 'react';
import { leadsService, type Lead } from '@/services/LeadsService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const fetchedLeads = await leadsService.getLeads();
      setLeads(fetchedLeads);
    } catch (error) {
      console.error('Error loading leads:', error);
      toast({
        title: "Error",
        description: "Failed to load leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const success = await leadsService.updateLeadStatus(leadId, status);
      if (success) {
        toast({
          title: "Success",
          description: "Lead status updated successfully",
        });
        loadLeads(); // Reload to show updated status
      } else {
        toast({
          title: "Error",
          description: "Failed to update lead status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating lead status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal_sent': return 'bg-purple-100 text-purple-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <Button onClick={loadLeads} variant="outline">
          Refresh
        </Button>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No leads found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{lead.organization_name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {lead.contact_name} • {lead.email}
                    </p>
                  </div>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {lead.organization_type}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {lead.phone}
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> {lead.budget_range || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Timeline:</span> {lead.timeline || 'N/A'}
                    </div>
                  </div>
                  
                  {lead.requirements && (
                    <div className="text-sm">
                      <span className="font-medium">Requirements:</span> {lead.requirements}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateStatus(lead.id, 'contacted')}
                      disabled={lead.status !== 'new'}
                    >
                      Contact
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateStatus(lead.id, 'qualified')}
                      disabled={lead.status === 'new'}
                    >
                      Qualify
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateStatus(lead.id, 'proposal_sent')}
                      disabled={lead.status !== 'qualified'}
                    >
                      Send Proposal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
