"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PropertyImagePreview({ images, title}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    const previewImages = images.filter(Boolean).slice(0, 5);

    function startSlideshow() {
        if (previewImages.length <= 1) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((previousIndex) =>
                (previousIndex + 1) % previewImages.length
            );
        }, 2000);
    }

    function stopSlideshow() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setCurrentIndex(0);
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    if (previewImages.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-800">
                No image
            </div>
        );
    }

    return (
        <div
            className="relative h-full w-full"
            onMouseEnter={startSlideshow}
            onMouseLeave={stopSlideshow}
        > 
        <div className="relative h-full w-full overflow-hidden">
            <img
                key={currentIndex}
                src={previewImages[currentIndex]}
                alt={title}
                className="h-full w-full object-cover animate-image-fade"
            />
        </div>
            {previewImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {previewImages.map((_, index) => (
                        <span
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full transition-all ${
                                index === currentIndex
                                    ? "w-3 bg-white"
                                    : "bg-white/60"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}