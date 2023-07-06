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
        <div className="absolute top-8 right-8">
          <Typography className="text-right text-2xl font-mono tracking-tighter font-semibold text-slate-100">
            Saving one dog won't change the world, but it will change the world for that dog
          </Typography>
        </div>
      </div>
    </main>
  );
}
