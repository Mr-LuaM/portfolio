// pages/index.tsx
import AboutPage from '@/components/aboutPage';
import TechStack from '@/components/techstack';
import Experience from '@/components/experience';
import ProfileComponent from '@/components/profile';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <ProfileComponent />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">



        <div className="border bg-green-100 p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
                <TechStack />
    </div>
        <div className="border bg-green-100 p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
            <TechStack />

        </div>            <TechStack />

    

          <div className="border bg-green-100 p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-200">
                    <TechStack />
          

          </div>




     
      </div>

    </div>
  );
};

export default Home;