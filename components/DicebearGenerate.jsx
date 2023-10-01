'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
export const DicebearGenerate = () => {
  const [avatars, setavatars] = useState([]);
  useEffect(() => {
    const contributors = [];
    const roboHashBaseUrl = 'https://robohash.org/';
    for (let i = 1; i <= 50; i++) {
      contributors.push(`contributer${i}`);
    }

    const GenerateAvatars = async () => {
      try {
        const avatarUrls = await Promise.all(
          contributors.map(async (contributor) => {
            const avatarUrl = `${roboHashBaseUrl}${contributor}.png`;
            return avatarUrl; 
          })
        );
        setavatars(avatarUrls)
      } catch (error) {
        console.log(error);
      }
    };

    GenerateAvatars();
  }, []);

  return (
    <div className='flex flex-wrap max-w-full justify-center'>
      {avatars?.map((avatar) => (
        <div key={avatar} className='w-24 h-24 ml-[-20px] rounded-full border border-2 bg-gray-400 cursor-pointer hover:opacity-90 rtansition-all duration-300 ease-in-out'>
          <Image alt='avatar' width='100' height='100' src={avatar} />
        </div>
      ))}
    </div>
  )
};
