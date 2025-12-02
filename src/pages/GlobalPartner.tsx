import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => {
        const element = document.getElementById('application-form');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            {/* Wrapper com gradiente azul para Header + Hero */}
            <div style={{ background: "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)" }} className="pt-[100px]">
                {/* Header - Replicado do Template */}
                <header className={`fixed top-0 left-0 right-0 backdrop-blur-sm z-50 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
                    <div className={`flex justify-center items-center py-3 text-sm gap-3 transition-colors duration-300 ${isScrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <p className={`hidden md:block transition-colors duration-300 ${isScrolled ? 'text-black/60' : 'text-white/60'}`}>Join our global team and work from anywhere</p>
                        <div className="inline-flex gap-1 items-center cursor-pointer" onClick={scrollToForm}>
                            <p>Apply now</p>
                            <svg className="h-4 w-4 inline-flex justify-center items-center" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div className={`py-3 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
                        <div className="container">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src="/logo2.png" 
                                        alt="MIGMA INC" 
                                        className="h-16 md:h-20 w-auto"
                                    />
                                </div>
                                <svg className={`h-5 w-5 md:hidden transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <nav className={`hidden md:flex gap-6 items-center transition-colors duration-300 ${isScrolled ? 'text-black/60' : 'text-black/60'}`}>
                                    <a href="#benefits" className="hover:text-black transition">Benefits</a>
                                    <a href="#how-it-works" className="hover:text-black transition">How it works</a>
                                    <a href="#application-form" className="hover:text-black transition">Apply</a>
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
                    className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip"
                >
                    <div className="container">
                        <div className="md:flex items-center">
                            <div className="md:w-[478px]">
                                <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
                                    Global Partner Program
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
                                    Work with MIGMA from anywhere in the world
                                </h1>
                                <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                                    Join the MIGMA Global Partner Program and collaborate with us as a Global Independent Contractor Partner.
                                </p>
                                <div className="flex gap-1 items-center mt-[30px]">
                                    <button onClick={scrollToForm} className="btn btn-primary">Apply to Become a Global Partner</button>
                                    <button className="btn btn-text flex gap-1">
                                        <span>Learn more</span>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                                <motion.img
                                    src="/foto1.png"
                                    alt="Global Network"
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
                                    src="/foto2.png"
                                    width={220}
                                    height={220}
                                    alt="USD Symbol"
                                    className="hidden md:block -top-8 -left-32 md:absolute rotate-[15deg]"
                                    style={{
                                        translateY: translateY,
                                        rotate: 15,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Foto3 entre seções para efeito 3D */}
            <div className="relative w-full overflow-x-clip -mt-32 mb-32">
                <motion.img
                    src="/foto3.png"
                    width={220}
                    alt="Global Network Connections"
                    className="hidden lg:block absolute top-1/2 right-1/4 -translate-y-1/2 rotate-[30deg]"
                    style={{
                        rotate: 30,
                        translateY: translateY,
                        zIndex: 10,
                    }}
                />
            </div>

            {/* Section B: Benefits Grid */}
            <section id="benefits" className="gradient-section py-24 overflow-x-clip relative">
                <div className="container">
                    {/* Heading centralizado inspirado no template */}
                    <div className="section-heading mb-16">
                        <div className="flex justify-center">
                            <div className="tag">Why join MIGMA</div>
                        </div>
                        <h2 className="section-title mt-5">
                            Work with freedom and earn in USD
                        </h2>
                        <p className="section-description mt-5">
                            Join a global team of talented professionals and enjoy the benefits of working remotely with competitive compensation.
                        </p>
                    </div>

                    {/* Elementos 3D decorativos com parallax */}
                    <motion.img
                        src="/foto4.png"
                        alt="Trophy Success"
                        width={262}
                        height={262}
                        className="hidden md:block absolute right-4 top-16 rotate-[15deg]"
                        style={{
                            translateY: translateY,
                            rotate: 15,
                        }}
                    />
                    <motion.img
                        src="/foto5.png"
                        alt="Global Location"
                        width={248}
                        height={248}
                        className="hidden md:block absolute bottom-8 left-0"
                        style={{
                            translateY: translateY,
                        }}
                    />

                    {/* Grid de benefícios */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Card 1: Earn in USD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group"
                        >
                            <div className="relative h-full bg-white rounded-2xl p-8 shadow-[0_7px_14px_#EAEAEA] hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#F1F1F1]">
                                <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <img src="/money-icon.svg" alt="Money" className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Earn in USD</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Competitive compensation paid in US Dollars, regardless of your location.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2: Work Remotely */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group"
                        >
                            <div className="relative h-full bg-white rounded-2xl p-8 shadow-[0_7px_14px_#EAEAEA] hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#F1F1F1]">
                                <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <img src="/remote-work-icon.svg" alt="Remote Work" className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Work Remotely</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Complete freedom to work from anywhere. All you need is a reliable internet connection.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3: Business Registration */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group"
                        >
                            <div className="relative h-full bg-white rounded-2xl p-8 shadow-[0_7px_14px_#EAEAEA] hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#F1F1F1]">
                                <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <img src="/business-icon.svg" alt="Business" className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Business Entity Required</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You must have a valid business entity (CNPJ, NIF, or equivalent) to invoice us.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section C: Who is this for? */}
            <section id="who-is-this-for" className="bg-white py-24">
                <div className="container max-w-3xl">
                    <div className="section-heading mb-16">
                        <h2 className="section-title">Who is the MIGMA Global Partner Program for?</h2>
                        <p className="section-description mt-5">
                            We are looking for ambitious people and companies who want to work with MIGMA as independent contractors and help us expand globally.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You live in Brazil, Portugal, Angola, Mozambique, Cape Verde or any other country.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You have (or are able to obtain) a valid business or tax registration (CNPJ, NIF or equivalent).</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You are comfortable working with clients, sales, service, operations or consulting.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You are open to being paid per result, commission or project.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You like the idea of growing with an international ecosystem instead of a traditional job.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You like to receive payments in USD.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground">You enjoy working with the United States visa process.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section D: Timeline */}
            <section id="how-it-works" className="bg-white py-24">
                <div className="container max-w-3xl">
                    <div className="section-heading mb-16">
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

            {/* Section E: Application Form */}
            <section id="application-form" className="gradient-section py-24">
                <div className="container max-w-3xl">
                    <div className="text-center mb-8">
                        <h2 className="section-title">Apply to become a MIGMA Global Partner</h2>
                        <p className="section-description mt-5">
                            Tell us more about you, your experience and why you want to work with MIGMA. If your profile matches what we are looking for, you will receive an email to schedule an interview.
                        </p>
                    </div>
                    <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-8 sm:p-12">
                            <ApplicationWizard />
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Section F: Testimonials */}
            <TestimonialsSection />

            {/* Section G: Call to Action */}
            <CallToActionSection scrollToForm={scrollToForm} />

            {/* Footer */}
            <FooterSection />
        </div>
    );
};

// Testimonials Section
const TestimonialsSection = () => {
    const testimonials = [
        {
            text: "Working with MIGMA as a Global Partner has been an incredible experience. The flexibility and support are unmatched.",
            imageSrc: "/avatar-1.png",
            name: "Sarah Chen",
            username: "@sarahchen_dev",
        },
        {
            text: "The opportunity to work remotely while earning in USD has transformed my career. Highly recommend joining the program.",
            imageSrc: "/avatar-2.png",
            name: "Marcus Rodriguez",
            username: "@marcus_tech",
        },
        {
            text: "MIGMA's Global Partner Program offers the perfect balance of independence and collaboration.",
            imageSrc: "/avatar-3.png",
            name: "Priya Patel",
            username: "@priya_design",
        },
        {
            text: "As a contractor, I appreciate the professional structure and competitive compensation MIGMA provides.",
            imageSrc: "/avatar-4.png",
            name: "David Kim",
            username: "@davidkim_dev",
        },
        {
            text: "The onboarding process was smooth, and the team is always available to help. Great experience overall.",
            imageSrc: "/avatar-5.png",
            name: "Emma Wilson",
            username: "@emmawilson",
        },
        {
            text: "Working with MIGMA has opened doors to exciting projects I wouldn't have access to otherwise.",
            imageSrc: "/avatar-6.png",
            name: "James Taylor",
            username: "@jamestaylor",
        },
        {
            text: "The freedom to work from anywhere combined with USD payments makes this program ideal for global professionals.",
            imageSrc: "/avatar-7.png",
            name: "Luna Martinez",
            username: "@lunamartinez",
        },
        {
            text: "MIGMA values quality work and provides the resources needed to deliver exceptional results.",
            imageSrc: "/avatar-8.png",
            name: "Alex Johnson",
            username: "@alexjohnson",
        },
        {
            text: "Being part of MIGMA's global network has expanded my professional horizons significantly.",
            imageSrc: "/avatar-9.png",
            name: "Sofia Anderson",
            username: "@sofiaanderson",
        },
    ];

    const firstColumn = testimonials.slice(0, 3);
    const secondColumn = testimonials.slice(3, 6);
    const thirdColumn = testimonials.slice(6, 9);

    const TestimonialsColumn = ({ testimonials: columnTestimonials, duration = 15, className = "" }: { testimonials: typeof testimonials, duration?: number, className?: string }) => {
        return (
            <div className={className}>
                <motion.div
                    animate={{
                        translateY: "-50%",
                    }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                    className="flex flex-col gap-6 pb-6"
                >
                    {[
                        ...new Array(2).fill(0).map((_, index) => (
                            <React.Fragment key={index}>
                                {columnTestimonials.map(({ text, imageSrc, name, username }) => (
                                    <div className="bg-white rounded-2xl p-6 shadow-[0_7px_14px_#EAEAEA] border border-[#F1F1F1]" key={username}>
                                        <div className="text-gray-700">{text}</div>
                                        <div className="flex items-center gap-2 mt-5">
                                            <img
                                                src={imageSrc}
                                                alt={name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <div className="font-medium tracking-tight leading-5 text-gray-900">{name}</div>
                                                <div className="leading-5 tracking-tight text-gray-500 text-sm">{username}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        )),
                    ]}
                </motion.div>
            </div>
        );
    };

    return (
        <section className="bg-white py-24">
            <div className="container">
                <div className="section-heading">
                    <div className="flex justify-center">
                        <div className="tag">Testimonials</div>
                    </div>
                    <h2 className="section-title mt-5">What our partners say</h2>
                    <p className="section-description mt-5">
                        Join a community of talented professionals who have found success working with MIGMA as Global Partners.
                    </p>
                </div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

// Call to Action Section
const CallToActionSection = ({ scrollToForm }: { scrollToForm: () => void }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={sectionRef} className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip">
            <div className="container">
                <div className="section-heading relative">
                    <h2 className="section-title">Ready to join our global team?</h2>
                    <p className="section-description mt-5">
                        Start your journey as a MIGMA Global Partner and work with freedom, earn in USD, and collaborate with a world-class team.
                    </p>

                    <motion.img
                        src="/foto6.png"
                        alt="Check Verification"
                        width={360}
                        className="hidden lg:block absolute -left-[350px] -top-[137px]"
                        style={{
                            translateY: translateY,
                        }}
                    />
                    <motion.img
                        src="/spring.png"
                        alt="spring image"
                        width={360}
                        className="hidden lg:block absolute -right-[331px] -top-[19px]"
                        style={{
                            translateY: translateY,
                        }}
                    />
                </div>

                <div className="flex gap-2 mt-10 justify-center">
                    <button onClick={scrollToForm} className="btn btn-primary">Apply now</button>
                </div>
            </div>
        </section>
    );
};

// Footer Section
const FooterSection = () => {
    return (
        <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
            <div className="container">
                <div className="inline-flex">
                    <img src="/logo2.png" alt="MIGMA INC" className="h-16 md:h-20 w-auto" />
                </div>
                <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
                    <a href="#benefits">Benefits</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#application-form">Apply</a>
                    <a href="#application-form">Pricing</a>
                    <a href="#application-form">Help</a>
                    <a href="#application-form">Careers</a>
                </nav>

                <p className="mt-6">&copy; 2025 MIGMA INC. All rights reserved.</p>
            </div>
        </footer>
    );
};

const ApplicationWizard = () => {
    const navigate = useNavigate();
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

    const { register, trigger, formState: { errors }, setValue, watch } = form;
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

    const onSubmit = async (data: FormData) => {
        try {
            // TODO: Implement API call to /api/global-partner/apply
            // await fetch('/api/global-partner/apply', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });
            
            console.log("Form Submitted:", data);
            // Redirect to thank you page
            navigate('/global-partner/thank-you');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting your application. Please try again.");
        }
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
                                <Input id="fullName" {...register('fullName')} />
                                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" {...register('phone')} />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" {...register('country')} />
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
                                <Input id="businessId" {...register('businessId')} />
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
                            <Input id="yearsExperience" type="number" {...register('yearsExperience')} />
                            {errors.yearsExperience && <p className="text-sm text-destructive">{errors.yearsExperience.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>English Level</Label>
                            <Select onValueChange={(val) => setValue('englishLevel', val)}>
                                <SelectTrigger>
                                    <SelectValue />
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
                                    <SelectValue />
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
                            <Textarea id="whyMigma" className="min-h-[120px]" {...register('whyMigma')} />
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
                            <Input id="linkedin" {...register('linkedin')} />
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
