import React from 'react';
import { Link, useNavigate,useLocation } from "react-router-dom";
import { Badge, Input, message } from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  BarChartOutlined,
  UserOutlined ,
  LogoutOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.css'


const Header = ({setSearch}) => {

  const cart = useSelector((state)=>state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = () =>{
    if(window.confirm("cikis yapmak isteiginize emin misiniz?")){
      localStorage.removeItem("posUser")
      navigate("/login")
      message.success("Cıxış  Olundu")
    }
  }

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="...Məhsul Axtar"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
        
          <Link to={"/"} className={`menu-link ${
            pathname === "/" && "active"
          }`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Səhifə</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
          
            <Link to={"/cart"} className={`menu-link ${
              pathname === "/cart" && "active"
            }`}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Səbət</span>
            </Link>
          </Badge>
         
          <Link to={"/bills"} className={`menu-link ${
            pathname === "/bills" && "active"
          }`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Fakturalar</span>
          </Link>
         
          <Link to={"/customers"} className={`menu-link ${
            pathname === "/customers" && "active"
          }`}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müştərilər</span>
          </Link>
        
          <Link to={"/statistic"} className={`menu-link ${
            pathname === "/statistic" && "active"
          }`}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistiklər</span>
          </Link>
          <div onClick={logOut}>
         
               <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıxış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
         
          <Link to={"/"} className={`menu-link ${
            pathname === "/cart" && "active"
          }`}>
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Səbət</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};
export default Header;
