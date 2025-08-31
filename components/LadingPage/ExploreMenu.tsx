"use client"

import { menu_list } from "@/constants/assets";

type ExploreMenuProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const ExploreMenu = ({ category, setCategory }: ExploreMenuProps) => {
  return (
    <div className="wrapper px-4 lg:px-0 py-10 text-left overflow-hidden">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl text-[#262626] font-medium">
        Explore Our Menu
      </h1>

      {/* Description */}
      <p className="max-w-[500px] text-black text-lg md:text-xl text-left mx-auto md:mx-0">
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
        1500s, when an unknown printer.
      </p>

      {/* Scrollable Menu List */}
      <div className="flex gap-6 md:gap-8 text-center my-5 overflow-x-auto hide-scrollbar px-4 md:px-0">
        {menu_list?.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="flex flex-col items-center mt-2 text-black text-[18px] md:text-[20px] cursor-pointer"
          >
            {/* Menu Image */}
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[80px] md:w-[100px] min-w-[70px] md:min-w-[80px] object-contain rounded-full transition duration-200 ${
                category === item.menu_name
                  ? "border-2 border-[#FF3D00] p-1"
                  : ""
              }`}
            />
            <p className="mt-2 text-base md:text-xl">{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
