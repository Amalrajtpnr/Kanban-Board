import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import KanbanBoard from "../components/KanbanBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen flex flex-col  items-center justify-center">
      <h1 className="text-[30px] font-bold">Kanban Board</h1>
      <div className="lg:w-full  h-[80%] flex lg:flex-row sm:flex-col  items-center justify-around overflow-y-scroll mt-3">
        
     <KanbanBoard/>
      </div>
    </div>
  );
}
