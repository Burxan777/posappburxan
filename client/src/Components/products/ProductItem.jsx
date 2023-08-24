import { message } from "antd"
import { addProduct } from "../../Redux/cartSlice"
import { useDispatch } from "react-redux"

const ProductItem = ({item}) => {
  const dispatch = useDispatch()

  const handleClick = () =>{
    dispatch(addProduct({...item,quantity:1}))
    message.success("məhsul səbətə əlavə edildi")
  }
  return (
    <div className='products-item border hover:shadow-lg cursor-pointer transition-all select-none' onClick={handleClick} >
         <div className="product-img">
             <img src={item.img} alt="" className='h-28 object-cover w-full border-b' />
         </div>
         <div className="product-info flex flex-col">
             <span className='font-bold'>{item.title}</span>
             <span>{item.price}</span>
         </div>
     </div>
  )
}

export default ProductItem