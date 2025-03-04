import { useEffect, useRef } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const boxesRef = useRef([]);

  useEffect(() => {
    boxesRef.current.forEach((box, index) => {
      gsap.fromTo(box, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, []);

  return (
    <div className="container">
      {Array.from({ length: 5 }).map((_, index) => (
        <div 
          key={index} 
          className="box" 
          ref={el => boxesRef.current[index] = el}
        >
          <img src={`https://via.placeholder.com/150?text=Image+${index + 1}`} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
