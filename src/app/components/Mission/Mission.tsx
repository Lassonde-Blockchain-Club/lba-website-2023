"use client";

import React from "react";
import MissionBigTitle from "./MissionBigTitle";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

function Mission() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 1,
        width: 750,
        height: 750,
        phi: 2.7,
        theta: 0.7,
        dark: 1,
        diffuse: 2.85,
        opacity: 0.4,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          // longitude latitude
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [43.650182, -79.378144], size: 0.1 },
          { location: [35.673541, 139.698401], size: 0.06 },
          { location: [28.613534, 77.2282], size: 0.1 },
          { location: [1.289931, 103.857082], size: 0.05 },
          { location: [25.232026, 55.270747], size: 0.04 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });

      return () => {
        globe.destroy();
      };
    }
  }, []);

  return (
    <div id="mission" className="md:h-[100vh] flex justify-center items-center ">
      <div className="container relative mx-auto w-[92%] md:w-[85%] overflow-hidden">
        <div className="flex w-[100%] items-center rounded-lg border border-white bg-[#FFFFFF] bg-opacity-10 backdrop-blur-30 p-5">
          <MissionBigTitle />
          <div className="absolute -right-1/4">
            <canvas
              className="opacity-20 md:opacity-100"
              ref={canvasRef}
              style={{
                width: 750,
                height: 750,
                maxWidth: "100%",
                aspectRatio: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
