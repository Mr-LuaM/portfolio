"use client";
import React from 'react';

const AboutSection = () => {
    return (
        <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
            {/* Header Section */}
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h2 className="text-lg font-bold">About</h2>
            </div>

            {/* About Description */}
            <p className="text-sm text-foreground/70 leading-relaxed">
                I'm a full-stack software engineer specializing in developing solutions with JavaScript, Python, and PHP. 
                I work on projects including building modern websites, web applications, mobile apps, search engine optimization, 
                digital marketing, and making code tutorials.

                <br /><br />

                I've helped startups and MSMEs grow and streamline their processes through software solutions. 
                I've also built a community of over 200,000 developers sharing knowledge and mentorship.

                <br /><br />

                Lately, I've been diving deeper into the world of artificial intelligence, focusing on integrating AI tools 
                and techniques into modern applications. My work now includes developing AI-powered solutions, creating intelligent applications, 
                and leveraging generative AI to optimize development workflows and deliver cutting-edge technology.
            </p>
        </div>
    );
};

export default AboutSection;
