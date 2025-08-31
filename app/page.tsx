"use client"

import ExploreMenu from "@/components/LadingPage/ExploreMenu"
import Showcase from "@/components/LadingPage/ShowCase"
import TopDishes from "@/components/LadingPage/TopDishes";


import { useState } from "react";

const LandingPage = () => {
  const [category, setCategory] = useState<string>("");

  return (
     <main>
       <Showcase />
       <ExploreMenu category={category} setCategory={setCategory} />
       <TopDishes category={category} />
     </main>
  )
}
export default LandingPage