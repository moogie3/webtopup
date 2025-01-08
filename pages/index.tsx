import localFont from "next/font/local";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "@/components/organisms/Navbar";
import MainBanner from "@/components/organisms/MainBanner";
import TransactionStep from "@/components/organisms/TransactionStep";
import FeaturedGame from "@/components/organisms/FeaturedGame";
import Reached from "@/components/organisms/Reached";
import Story from "@/components/organisms/Story";
import Footer from "@/components/organisms/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function Home() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <Navbar />
            <MainBanner />
            <TransactionStep />
            <FeaturedGame />
            <Reached />
            <Story />
            <Footer />
        </>
    );
}
