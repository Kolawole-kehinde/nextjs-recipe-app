"use client"

import Banner from "@/components/LadingPage/Banner";
import ExploreMenu from "@/components/LadingPage/ExploreMenu"
import { RecommendedDishes } from "@/components/LadingPage/RecommendedDishes";
import Showcase from "@/components/LadingPage/ShowCase"
import TopBanner from "@/components/LadingPage/TopBanner";
import TopDishes from "@/components/LadingPage/TopDishes";


import { useState } from "react";

const LandingPage = () => {
const [category, setCategory] = useState<string>("All");


  return (
     <main>
       <Showcase />
       <ExploreMenu category={category} setCategory={setCategory} />
       <TopDishes category={category} />
       <RecommendedDishes/>
       <TopBanner/>
     </main>
  )
}
export default LandingPage