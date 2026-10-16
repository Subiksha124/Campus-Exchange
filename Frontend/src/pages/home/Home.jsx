import react from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { cards,projects } from "../../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProjectCard from "../../components/projectCard/ProjectCard";
import "swiper/css";
import "swiper/css/navigation";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
        <Featured />
        <TrustedBy />
       <Slide
        navigation
        loop
        spaceBetween={20}
        slidesPerView={4}
      >
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
 <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
          </div>
          <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              liverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Liverr Business</button>
          </div>
          <div className="item">
          <img
  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
  alt="Business"
/>
          </div>
        </div>
      </div>
          <Slide
            navigation
            loop
            spaceBetween={20}
            slidesPerView={4}
          >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Slide>
        </div>
      
  );
};

export default Home;
