import Image from 'next/image';
import Navbar from './common/navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* <Image src="" width={800} height={800} priority alt="landing-image" /> */}
    </main>
  );
}
