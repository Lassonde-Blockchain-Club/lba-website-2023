"use client";
import React, { useEffect, useRef } from "react";
import Timeline from "../Timeline";
import timelineData from "./TimelineData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Project: React.FC = () => {
  console.log("ScrollSection component rendered"); // Add this line

  const timelineRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);
  console.log(sectionRef); // Add this line

  const bodyRef = useRef(null);
  const maskRef = useRef(null); // Needed for the max
  const projectBodyColour = "gray-200";

  const bodyClassName: string = `bg-gray-500 min-h-screen p-8`;
  // Unsure how to make the rectangle fill the whole screen, causes glitches in smaller screens
  const maskClassName: string = `absolute bg-gray-500 h-16 w-3/4`;

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineBlocks = Array.from(timelineRef.current.children);
        timelineBlocks.forEach((block) => {
          if (
            block.getBoundingClientRect().top <= window.innerHeight * 0.75 &&
            block.classList.contains("is-hidden")
          ) {
            block.classList.remove("is-hidden");
            block.classList.add("bounce-in");
          }
        });
      }
    };
    let ctx = gsap.context(() => {
      gsap.to(maskRef.current, {
        width: "5%",
        translateX: `${
          Math.ceil(7 * timelineData.length) +
          8 * timelineData.length * (1920 / window.innerWidth - 1)
        }vw`,
        duration: 20,
        // Trying to figure out how to sync it with the scroll

        scrollTrigger: {
          trigger: bodyRef.current,
          markers: true,
          start: "top top",
          end: `+=${Math.ceil(1500 * Math.pow(timelineData.length, 0.4))}`,
          scrub: 1,
          pin: true,
        },
      });
      gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `${-250 - 7 * Math.pow(timelineData.length, 1.35)}vw`,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `${800 + 100 * Math.pow(timelineData.length, 1.2)} top`,
            scrub: 0.6,
            pin: true,
            markers: true,
          },
        }
      );
    });

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden flex">
      <div ref={bodyRef} className="overflow-hidden ">
        <div className={bodyClassName}>
          <h2 className="text-3xl font-bold mb-8">Project Timeline</h2>
          <div className="flextems-center justify-center">
            <div className="absolute">
              <Timeline
                className="flex flex-start h-16 opacity-100 "
                length={timelineData.length}
              />
            </div>
            <div ref={maskRef} className={maskClassName}></div>
            <div className="absolute">
              <Timeline
                className="flex flex-start h-16 opacity-40"
                length={timelineData.length}
              />
            </div>
          </div>

          <div
            ref={sectionRef}
            className="h-screen w-[400vw] flex flex-row relative items-center justify-center"
          >
            {timelineData.map((item, index) => (
              <section key={index} className="w-screen p-16 border text-center	">
                <span className="item-center flex justify-center">
                  {item.date}
                </span>
                <h1 className="text-5xl flex justify-center">{item.title}</h1>
                <p className="text-lg italic leading-6 flex justify-center">
                  {item.description}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
