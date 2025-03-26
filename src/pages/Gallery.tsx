
import React, { useState } from 'react';
import { galleries } from '@/lib/data';
import { Image as ImageIcon, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Gallery</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Photos from matches and events of the Multai Premier Cricket League.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.map((item) => (
            <div 
              key={item.id} 
              className="glass-card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => handleImageClick(item.image)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {galleries.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">No Images Found</h2>
            <p className="text-slate-500 dark:text-slate-400">
              There are currently no images in the gallery.
            </p>
          </div>
        )}
        
        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery Image" 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
