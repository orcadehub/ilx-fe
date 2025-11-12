// GalleryTab.jsx
import { Button } from 'antd';
import { Upload, X } from 'lucide-react';
import React, { useState } from 'react'

const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
    "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=400",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400",
    "https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=400",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400",
];
const GalleryTab = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <div>

            <div className='flex !justify-end py-2'>
                <Button className='border !border-[var(--border)] !bg-[var(--primary)] !text-white !py-4'> <Upload size={14} /> Upload Images</Button>
               </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {images.map((src, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                // for touch devices you might also want onClick to toggle:
                // onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                    <img
                        className="w-full h-48 rounded-lg bg-[var(--card)] object-cover hover:scale-105 transition-transform duration-500"
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                    />

                    {/* Show only when activeIndex matches this index */}
                    {activeIndex === index && (
                        <div
                            className="absolute top-1 right-1 p-1 bg-orange-600 rounded z-10
                         transition-opacity duration-200"
                        >
                            <X size={14} className="text-white" />
                        </div>
                    )}
                </div>
            ))}
        </div>
        </div>
    )
}

export default GalleryTab;
