'use client';

import Image from 'next/image';
import { Typography } from '@mui/material';
import Navbar from './common/navbar';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="relative overflow-hidden flex-auto">
        <Image src="/landing-img.png" fill priority alt="landing-image" className="object-cover" />
        <Typography className="absolute top-16 right-12">
          Saving one dog won't change the world, but it will change the world for that dog.
        </Typography>
      </div>
    </main>
  );
}
