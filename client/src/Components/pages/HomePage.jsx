import { useEffect, useState } from "react";
import CardTotals from "../cardtotals/CardTotals";
import Categories from "../categories/Categories";
import Headerr from "../header/Headerr";
import Products from "../products/Products";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCatgories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState([""]);

  useEffect( () => {
    const getCategorise = async ()=> {
     try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
      const data = await res.json();
      data && setCatgories(data.map((item)=>{
        return {...item,value:item.title}
      }) ); 
      
     } catch (error) {
      console.log(error);  
     }
    };
    getCategorise();
   
  }, [])
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
   <>
   
<Headerr setSearch={setSearch}/>

{products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCatgories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CardTotals />
          </div>
</div>
   ) : (
    <Spin
      size="large"
      className="absolute top-1/2 h-screen w-screen flex justify-center"
    />
  )}

   
   </>
  )
}

export default HomePage