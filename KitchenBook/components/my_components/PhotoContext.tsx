import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CameraCapturedPicture } from 'expo-camera';

export type GalleryImage = {
  uri: string;
  width?: number;
  height?: number;
  base64?: string;
};

export type Photo = CameraCapturedPicture | GalleryImage;
type PhotoContextType = {
  tempPhoto: Photo | null;
  setTempPhoto: (p: Photo | null) => void;
}; 

const PhotoContext = createContext<PhotoContextType>({
    tempPhoto: null,
    setTempPhoto: () =>{},
});

export const PhotoProvider = ({children} : {children: ReactNode}) => {
    const [tempPhoto, setTempPhoto] = useState<Photo|null>(null);
    return(
        <PhotoContext.Provider value={{tempPhoto, setTempPhoto}}>
            {children}
        </PhotoContext.Provider>
    );
};
export const usePhoto = () => useContext(PhotoContext);