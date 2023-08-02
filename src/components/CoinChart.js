import { HC } from '@/config/HC';
import { HistoricalChart } from '@/config/api';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { chartDays } from '@/config/data';
import Chart from "chart.js/auto";

const CoinChart = ({coin}) => {
    

    const [hisdata, setHisdata] = useState();
    const [days, setDays] = useState(1);
    const [flag, setflag] = useState(false);

     const fetchHisdata = async () => {
       try {
         const { data } = await axios.get(HistoricalChart(coin.id, days));
         setflag(true);
         setHisdata(data.prices);
       } catch (error) {
        setflag(true);
         setHisdata(HC.prices);
       }
     };

     useEffect(() => {
         fetchHisdata()
     },[days])

  return (
    <div className="min-w-[80vw] pb-5 mb-10 bg-yellow-50  rounded-xl px-2">
      {!hisdata | (flag === false) ? (
        <CircularProgress
          style={{
            color: "gold",
          }}
          size={50}
          thickness={5}
        />
      ) : (
        <>
          <Line
            data={{
              labels: hisdata.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: hisdata.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in INR`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <button
                className="bg-yellow-300 text-black px-2 py-1 rounded-lg"
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CoinChart