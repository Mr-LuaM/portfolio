// pages/index.tsx
import AboutPage from '@/components/about';
import TechStack from '@/components/techstack';
import Experience from '@/components/experience';
import ProfileComponent from '@/components/profile';
import Hobby from '@/components/hobby';
import Projects from '@/components/projects';
import CertificationsSection from '@/components/certifications';
import BlogPostsSection from '@/components/blog';
import TestimonialsSection from '@/components/testimonials';
import ContactSection from '@/components/contact';
const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <ProfileComponent />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">



        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
                <AboutPage />
    </div>
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
            <Experience />

        </div>         
    

          <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-200">
                    <TechStack />
          

          </div>
   <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 space-y-2 group  animate-fade-in animation-delay-200">
                    <Hobby />
          

          </div>

     
   <div className="border dark:bg-neutral-900 rounded-lg  p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">
                    <Projects />
          

          </div>

      <div className="border dark:bg-neutral-900 rounded-lg  p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
                    <CertificationsSection />
          

          </div>
            <div className="border dark:bg-neutral-900 rounded-lg  p-4 col-span-1 md:col-span-3 space-y-2 group overflow-hidden animate-fade-in animation-delay-400">
                    <TestimonialsSection />
          

          </div>
             <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 space-y-3 group animate-fade-in animation-delay-500">
                    <ContactSection />
          

          </div>
             <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-500">
                    <BlogPostsSection />
          

          </div>
      </div>

    </div>
  );
};

export default Home;