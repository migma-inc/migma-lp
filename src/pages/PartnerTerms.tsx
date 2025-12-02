import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const PartnerTerms = () => {
    const navigate = useNavigate();
    const [accepted, setAccepted] = React.useState(false);

    const handleAccept = () => {
        if (accepted) {
            alert("Terms accepted! Redirecting...");
            navigate('/global-partner');
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 font-sans text-foreground py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate('/global-partner')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Application
                </Button>

                <Card className="shadow-lg border-none">
                    <CardHeader className="text-center border-b bg-white rounded-t-lg pb-8 pt-10">
                        <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Legal Agreement</div>
                        <CardTitle className="text-3xl font-bold">MIGMA Global Partner Agreement</CardTitle>
                        <CardDescription className="text-lg mt-2">Independent Contractor Terms & Conditions</CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 sm:p-12 space-y-8 text-justify leading-relaxed text-muted-foreground bg-white">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">1. Relationship of Parties</h3>
                            <p>
                                The Partner is an independent contractor and not an employee of MIGMA.
                                Nothing in this Agreement shall be construed to create a partnership, joint venture,
                                or employer-employee relationship. The Partner shall be responsible for all taxes
                                and social security contributions arising from payments made under this Agreement.
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">2. Services</h3>
                            <p>
                                The Partner agrees to perform the services described in specific Statements of Work (SOW)
                                agreed upon by both parties. Services shall be performed in a professional manner
                                consistent with industry standards.
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">3. Confidentiality</h3>
                            <p>
                                The Partner agrees to keep confidential all proprietary information of MIGMA and its clients.
                                This obligation survives the termination of this Agreement.
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">4. Intellectual Property</h3>
                            <p>
                                All work product created by the Partner in connection with the Services shall be the sole
                                and exclusive property of MIGMA. The Partner hereby assigns all rights, title, and interest
                                in such work product to MIGMA.
                            </p>
                        </div>

                        <div className="h-12" /> {/* Spacer */}
                    </CardContent>
                </Card>

                {/* Sticky Footer for Acceptance */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="accept-terms"
                                checked={accepted}
                                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                            />
                            <Label htmlFor="accept-terms" className="cursor-pointer font-medium">
                                I have read and agree to the Terms & Conditions
                            </Label>
                        </div>
                        <Button onClick={handleAccept} disabled={!accepted} className="w-full sm:w-auto min-w-[200px]">
                            Accept & Continue <Check className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Spacer for sticky footer */}
                <div className="h-24" />
            </div>
        </div>
    );
};
