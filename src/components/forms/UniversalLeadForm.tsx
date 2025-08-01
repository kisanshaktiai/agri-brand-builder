import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, Share2, Copy, QrCode, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StepByStepLeadForm from './StepByStepLeadForm';

interface UniversalLeadFormProps {
  trigger?: 'button' | 'popup' | 'embed';
  buttonText?: string;
  autoOpen?: boolean;
  onSuccess?: () => void;
  shareableUrl?: string;
  enableSharing?: boolean;
}

export const UniversalLeadForm: React.FC<UniversalLeadFormProps> = ({
  trigger = 'button',
  buttonText = 'Get Started',
  autoOpen = false,
  onSuccess,
  shareableUrl,
  enableSharing = false
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const { toast } = useToast();

  const generateShortUrl = (): string => {
    // Create a working short URL that points to the actual lead form page
    const baseUrl = window.location.origin;
    return `${baseUrl}/lead-form`;
  };

  useEffect(() => {
    if (enableSharing) {
      const shortUrl = shareableUrl || generateShortUrl();
      setGeneratedUrl(shortUrl);
      
      // Generate embed code with the working URL
      const embedHtml = `<iframe src="${shortUrl}" width="100%" height="600" frameborder="0" style="border: none; border-radius: 8px;"></iframe>`;
      setEmbedCode(embedHtml);
    }
  }, [shareableUrl, enableSharing]);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.();
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedUrl)}`;
    window.open(qrUrl, '_blank');
  };

  const shareToSocial = (platform: string) => {
    const text = "Transform your agricultural operations with KisanShakti AI";
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatedUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + generatedUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy to clipboard with instructions
        copyToClipboard(
          `${text}\n\n${generatedUrl}\n\n#KisanShaktiAI #AgricultureTechnology #AIForFarming`,
          'Instagram post content'
        );
        toast({
          title: "Instagram Content Ready!",
          description: "Post content copied to clipboard. Paste it in Instagram with your image.",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (trigger === 'embed') {
    return (
      <div className="w-full">
        <StepByStepLeadForm onSuccess={onSuccess} />
        
        {enableSharing && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Share This Form</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            {showShareOptions && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="share-url">Share URL</Label>
                  <div className="flex mt-1">
                    <Input
                      id="share-url"
                      value={generatedUrl}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(generatedUrl, 'Share URL')}
                      variant="outline"
                      size="sm"
                      className="rounded-l-none border-l-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <div className="flex mt-1">
                    <textarea
                      id="embed-code"
                      value={embedCode}
                      readOnly
                      className="flex-1 min-h-[60px] px-3 py-2 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                      onClick={() => copyToClipboard(embedCode, 'Embed code')}
                      variant="outline"
                      size="sm"
                      className="rounded-l-none border-l-0 self-start mt-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={generateQRCode}
                    variant="outline"
                    size="sm"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                  
                  <Button
                    onClick={() => shareToSocial('twitter')}
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  >
                    Twitter
                  </Button>
                  
                  <Button
                    onClick={() => shareToSocial('facebook')}
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                  >
                    Facebook
                  </Button>
                  
                  <Button
                    onClick={() => shareToSocial('linkedin')}
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  >
                    LinkedIn
                  </Button>
                  
                  <Button
                    onClick={() => shareToSocial('whatsapp')}
                    variant="outline"
                    size="sm"
                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    onClick={() => shareToSocial('instagram')}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 border-purple-200"
                  >
                    Instagram
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (trigger === 'popup') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Lead Form</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <StepByStepLeadForm onSuccess={handleSuccess} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Lead Form</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <StepByStepLeadForm onSuccess={handleSuccess} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UniversalLeadForm;
