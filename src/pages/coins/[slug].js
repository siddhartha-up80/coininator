import { useRouter } from "next/router";

// import { SC } from "../config/SC";

// import { SingleCoin } from "../config/api";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { SC } from "@/config/SC";
import { SingleCoin, api } from "@/config/api";

const CoinsPage = () => {
  const router = useRouter();
  const { slug } = router.query;

//   const [cryptoId, setCryptoId] = useState(slug);
//   const [loading, setLoading] = useState(false);

  const [coin, setCoin] = useState();


  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(slug));
      setCoin(data);
    } catch (error) {
      setCoin(SC);
    }
  };

  useEffect(() => {
    fetchCoin();
  },[]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!coin) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="text-white bg-[url(https://source.unsplash.com/random/100×100/?crypto)] bg-cover h-full">
        <div className="flex justify-center items-center flex-row h-screen p-10 flex-wrap md:flex-nowrap ">
          <div className="flex flex-col justify-center items-center md:max-w-[50vw] bg-black bg-opacity-70 p-10 rounded-2xl shadow-2xl">
            <div>
              <img src={coin?.image.large} className="h-[25vh]" alt="" />
            </div>
            <div>
              <div className="text-4xl text-center font-bold">{coin?.name}</div>
              <div className=" mt-5 md:text-lg">
                {coin?.description.en.split(". ")[0]}.
              </div>
              <div className="text-xl mt-3 font-semibold">
                <div>
                  <span>
                    Rank:{" "}
                    <span className="font-normal">{coin?.market_cap_rank}</span>
                  </span>
                </div>
                <div>
                  <span>
                    Current Price:{" "}
                    <span className="font-normal">
                      {`₹`}
                      {numberWithCommas(coin?.market_data.current_price["inr"])}
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    Market Cap:{" "}
                    <span className="font-normal">
                      {"₹"}
                      {numberWithCommas(
                        coin?.market_data.market_cap["inr"]
                          .toString()
                          .slice(0, -6)
                      )}{" "}
                      M
                    </span>
                  </span>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsPage;
