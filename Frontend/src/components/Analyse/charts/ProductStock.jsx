import { BarChart } from "@mui/x-charts/BarChart";

function ProductStock({ Data }) {
  let data = [];

  Data.map((pdct) => {
    data.push({ data: [pdct.stock], label: pdct.name });
  });

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Product Stock"] }]} // Updated to match the number of bars
      series={data}
      barLabel={({ value }) => value.toString()} // Display the value as label
      width={1000}
      height={400}
      margin={{ left: 100 }}
    />
  );
}

export default ProductStock;
