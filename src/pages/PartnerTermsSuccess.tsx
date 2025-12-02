import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const PartnerTermsSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#D2DCFF] flex items-center justify-center py-24 px-4">
            <Card className="max-w-2xl w-full border-none shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 sm:p-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Your agreement has been accepted
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Thank you. Your acceptance of the MIGMA Global Independent Contractor Terms & Conditions has been recorded. Our team will contact you with your onboarding details and next steps.
                    </p>
                    <Button onClick={() => navigate('/global-partner')}>
                        Go to MIGMA homepage
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

