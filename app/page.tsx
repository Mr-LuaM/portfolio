// pages/index.tsx
import Profile from '../components/profile';  // Import the Profile component
// import Achievements from '../components/Achievements'; // You can add other sections like Achievements, Projects, etc.

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Section */}
  
      <Profile />
      {/* Other sections like Achievements, Projects, etc. */}
      {/* <Achievements /> */}

      {/* Add more sections below */}
    </div>
  );
};

export default Home;
