import { BarChart } from "@mui/x-charts";

function ProductSale({ Data }) {
  let nameObject = {
    scaleType: "band",
    data: [],
  };

  let priceObject = {
    data: [],
    label: "Selling Price",
  };

  let profitObject = {
    data: [],
    label: "Profit",
  };

  let mcostObject = {
    data: [],
    label: "Cost",
  };

  Data.map((pdct) => {
    nameObject.data.push(pdct.name);
    priceObject.data.push(pdct.price);
    profitObject.data.push(pdct.revenue);
    mcostObject.data.push(pdct.cost);
  });

  return (
    <>
      <BarChart
        xAxis={[nameObject]}
        yAxis={[{width: 70}]}
        series={[priceObject, mcostObject, profitObject]}
        width={1000}
        height={400}
        margin={{ left: 100 }}
      />
    </>
  );
}

export default ProductSale;
