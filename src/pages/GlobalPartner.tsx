import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Zod Schemas ---
const personalSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(5, "Phone is required"),
    country: z.string().min(2, "Country is required"),
});

const legalSchema = z.object({
    hasBusiness: z.boolean().refine(val => val === true, "You must have a business entity"),
    businessId: z.string().min(3, "Business ID (CNPJ/NIF) is required"),
});

const experienceSchema = z.object({
    yearsExperience: z.coerce.number().min(1, "Experience is required"),
    englishLevel: z.string().min(1, "English level is required"),
    expertise: z.array(z.string()).min(1, "Select at least one expertise"),
});

const fitSchema = z.object({
    availability: z.string().min(1, "Availability is required"),
    whyMigma: z.string().min(10, "Please tell us more about why you want to join"),
    isContractor: z.boolean().refine(val => val === true, "You must acknowledge the contractor status"),
});

const finalizeSchema = z.object({
    linkedin: z.string().url("Invalid URL"),
    cv: z.any().optional(), // File handling is complex, keeping simple for now
});

// Combined schema for type inference (though we validate step-by-step)
const formSchema = personalSchema.merge(legalSchema).merge(experienceSchema).merge(fitSchema).merge(finalizeSchema);
type FormData = z.infer<typeof formSchema>;

export const GlobalPartner = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    const scrollToForm = () => {
        const element = document.getElementById('application-form');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-foreground">
            {/* Wrapper com fundo branco para Header + Hero */}
            <div className="bg-white">
                {/* Header - Replicado do Template */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-softGray/20">
                    <div className="flex justify-center items-center py-3 bg-migmaBlack text-white text-sm gap-3">
                        <p className="text-white/60 hidden md:block">Join our global team and work from anywhere</p>
                        <div className="inline-flex gap-1 items-center cursor-pointer" onClick={scrollToForm}>
                            <p>Apply now</p>
                            <svg className="h-4 w-4 inline-flex justify-center items-center" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="py-5">
                        <div className="container">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] to-[#DAA520] opacity-30 blur-2xl rounded-full"></div>
                                        <span
                                            className="relative text-2xl font-semibold tracking-tight bg-gradient-to-br from-[#DAA520] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text"
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                textShadow: '0 1px 0 rgba(184, 134, 11, 0.4), 0 2px 0 rgba(184, 134, 11, 0.3), 0 3px 0 rgba(184, 134, 11, 0.2), 0 4px 0 rgba(184, 134, 11, 0.1), 0 5px 10px rgba(184, 134, 11, 0.15)',
                                                WebkitTextStroke: '0.5px rgba(184, 134, 11, 0.3)'
                                            }}
                                        >
                                            MIGMA INC
                                        </span>
                                    </div>
                                </div>
                                <svg className="h-5 w-5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <nav className="hidden md:flex gap-6 text-migmaBlack/60 items-center">
                                    <a href="#benefits" className="hover:text-migmaBlack transition">Benefits</a>
                                    <a href="#how-it-works" className="hover:text-migmaBlack transition">How it works</a>
                                    <a href="#application-form" className="hover:text-migmaBlack transition">Apply</a>
                                    <button onClick={scrollToForm} className="bg-migmaBlue text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-blue-600 transition">
                                        Get started
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Section A: Hero - Replicado do Template */}
                <section
                    ref={heroRef}
                    className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip bg-gradient-to-b from-white to-softGray/30"
                >
                    <div className="container">
                        <div className="md:flex items-center">
                            <div className="md:w-[478px]">
                                <div className="text-sm inline-flex border border-migmaBlack/10 px-3 py-1 rounded-lg tracking-tight bg-white">
                                    Global Partner Program
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-migmaBlack to-migmaBlue text-transparent bg-clip-text mt-6">
                                    Work with MIGMA from anywhere in the world
                                </h1>
                                <p className="text-xl text-migmaBlack/70 tracking-tight mt-6">
                                    Join the MIGMA Global Partner Program and collaborate with us as a Global Independent Contractor Partner.
                                </p>
                                <div className="flex gap-1 items-center mt-[30px]">
                                    <button onClick={scrollToForm} className="bg-migmaBlue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition">Apply to Become a Global Partner</button>
                                    <button className="border border-migmaBlack text-migmaBlack px-6 py-3 rounded-md hover:bg-migmaBlack hover:text-white transition flex gap-1">
                                        <span>Learn more</span>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                                <motion.img
                                    src="/cog.png"
                                    alt="Cog"
                                    className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
                                    animate={{
                                        translateY: [-30, 30],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        duration: 3,
                                        ease: "easeInOut",
                                    }}
                                />
                                <motion.img
                                    src="/cylinder.png"
                                    width={220}
                                    height={220}
                                    alt="Cylinder image"
                                    className="hidden md:block -top-8 -left-32 md:absolute"
                                    style={{
                                        translateY: translateY,
                                    }}
                                />
                                <motion.img
                                    src="/noodle.png"
                                    width={220}
                                    alt="Noodle image"
                                    className="hidden lg:block top-[524px] left-[448px] absolute rotate-[30deg]"
                                    style={{
                                        rotate: 30,
                                        translateY: translateY,
                                    }}
                                />
                            </div>
                            <h2 className="section-title">How it works</h2>
                            <p className="section-description mt-5">Join our global team in four simple steps</p>
                        </div>
                        <div className="relative border-l-2 border-muted ml-4 md:ml-0 md:pl-8 space-y-12">
                            {[
                                { title: 'Apply', desc: 'Submit your application with your professional details.' },
                                { title: 'Profile Review', desc: 'Our team reviews your experience and qualifications.' },
                                { title: 'Interview', desc: 'A brief call to discuss your fit and opportunities.' },
                                { title: 'Onboarding', desc: 'Get set up with our systems and start working.' },
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-0"
                                >
                                    <div className="absolute -left-[9px] md:-left-[33px] top-1 bg-primary w-4 h-4 rounded-full border-4 border-background shadow-sm" />
                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section D: Application Form */}
                <section id="application-form" className="gradient-section py-24">
                    <div className="container max-w-3xl">
                        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8 sm:p-12">
                                <ApplicationWizard />
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
            );
};

const ApplicationWizard = () => {
    const [step, setStep] = React.useState(1);
            const totalSteps = 5;

            // We use a single form for all steps, but validate per step
            const form = useForm<FormData>({
                resolver: zodResolver(formSchema) as any,
                mode: 'onChange',
                defaultValues: {
                    expertise: [],
        }
    });

                const {register, trigger, formState: {errors}, setValue, watch } = form;
                const expertise = watch('expertise');

    const validateStep = async (currentStep: number) => {
                    let fieldsToValidate: (keyof FormData)[] = [];
                switch (currentStep) {
            case 1: fieldsToValidate = ['fullName', 'email', 'phone', 'country']; break;
                case 2: fieldsToValidate = ['hasBusiness', 'businessId']; break;
                case 3: fieldsToValidate = ['yearsExperience', 'englishLevel', 'expertise']; break;
                case 4: fieldsToValidate = ['availability', 'whyMigma', 'isContractor']; break;
                case 5: fieldsToValidate = ['linkedin']; break;
        }
                const result = await trigger(fieldsToValidate);
                return result;
    };

    const handleNext = async () => {
        const isStepValid = await validateStep(step);
                if (isStepValid) {
                    setStep((s) => Math.min(s + 1, totalSteps));
        }
    };

    const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

                const progress = (step / totalSteps) * 100;

    const onSubmit = (data: FormData) => {
                    console.log("Form Submitted:", data);
                alert("Application Submitted! (Check console for data)");
    };

                return (
                <div>
                    <div className="mb-8">
                        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                            <span>Step {step} of {totalSteps}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Personal Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" placeholder="John Doe" {...register('fullName')} />
                                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
                                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register('phone')} />
                                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country" placeholder="Select Country" {...register('country')} />
                                        {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Legal Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="hasBusiness"
                                            onCheckedChange={(checked) => setValue('hasBusiness', checked as boolean)}
                                            {...register('hasBusiness')}
                                        />
                                        <Label htmlFor="hasBusiness" className="font-normal">I have a valid business registration (CNPJ/NIF/LLC)</Label>
                                    </div>
                                    {errors.hasBusiness && <p className="text-sm text-destructive">{errors.hasBusiness.message}</p>}

                                    <div className="space-y-2">
                                        <Label htmlFor="businessId">Business Registration Number (CNPJ/NIF)</Label>
                                        <Input id="businessId" placeholder="00.000.000/0001-00" {...register('businessId')} />
                                        {errors.businessId && <p className="text-sm text-destructive">{errors.businessId.message}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Experience</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                                    <Input id="yearsExperience" type="number" placeholder="e.g. 5" {...register('yearsExperience')} />
                                    {errors.yearsExperience && <p className="text-sm text-destructive">{errors.yearsExperience.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>English Level</Label>
                                    <Select onValueChange={(val) => setValue('englishLevel', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Basic">Basic</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Advanced">Advanced</SelectItem>
                                            <SelectItem value="Fluent">Fluent/Native</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.englishLevel && <p className="text-sm text-destructive">{errors.englishLevel.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Expertise</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps', 'Design'].map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition">
                                                <Checkbox
                                                    id={`skill-${skill}`}
                                                    checked={expertise?.includes(skill)}
                                                    onCheckedChange={(checked) => {
                                                        const current = expertise || [];
                                                        const updated = checked
                                                            ? [...current, skill]
                                                            : current.filter((s) => s !== skill);
                                                        setValue('expertise', updated);
                                                    }}
                                                />
                                                <Label htmlFor={`skill-${skill}`} className="cursor-pointer flex-1">{skill}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.expertise && <p className="text-sm text-destructive">{errors.expertise.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Fit & Availability</h3>
                                <div className="space-y-2">
                                    <Label>Availability</Label>
                                    <Select onValueChange={(val) => setValue('availability', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time (40h/week)</SelectItem>
                                            <SelectItem value="Part-time">Part-time (20h/week)</SelectItem>
                                            <SelectItem value="Hourly">Hourly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.availability && <p className="text-sm text-destructive">{errors.availability.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="whyMigma">Why MIGMA?</Label>
                                    <Textarea id="whyMigma" placeholder="Tell us why you want to join..." className="min-h-[120px]" {...register('whyMigma')} />
                                    {errors.whyMigma && <p className="text-sm text-destructive">{errors.whyMigma.message}</p>}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isContractor"
                                        onCheckedChange={(checked) => setValue('isContractor', checked as boolean)}
                                        {...register('isContractor')}
                                    />
                                    <Label htmlFor="isContractor" className="font-normal">I understand this is a contractor position.</Label>
                                </div>
                                {errors.isContractor && <p className="text-sm text-destructive">{errors.isContractor.message}</p>}
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Finalize Application</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                                    <Input id="linkedin" placeholder="https://linkedin.com/in/..." {...register('linkedin')} />
                                    {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Upload CV (PDF)</Label>
                                    <div className="border-2 border-dashed border-input rounded-md p-8 text-center hover:bg-muted/50 transition cursor-pointer flex flex-col items-center justify-center gap-2">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        <p className="text-muted-foreground">Click to upload or drag and drop</p>
                                        <p className="text-xs text-muted-foreground/70">PDF only, max 5MB</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex justify-between pt-6 border-t mt-8">
                            {step > 1 ? (
                                <Button type="button" variant="outline" onClick={handlePrev}>
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                            ) : (
                                <div />
                            )}

                            {step < totalSteps ? (
                                <Button type="button" onClick={handleNext}>
                                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button type="submit">
                                    Submit Application <Check className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </form>
                </div >
                );
};
