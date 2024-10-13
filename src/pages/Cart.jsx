import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Emptycart from '../assets/Images/emptycart.png'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from '../components/Modal'
import ChangeAddress from '../components/ChangeAddress'
import {increaseQuantity,decreaseQuantity, removeFromCart } from '../redux/cartSlice'
import { Navigate, useNavigate } from 'react-router-dom'
const Cart = () => {
    const cart=useSelector((state)=>state.cart);
    const[address,setaddress]=useState('Gulistan-e-johar,block#18');
    const[isModelopen,setIsModelopen]=useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
  return (
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
     {cart.products.length > 0 ?(
     <div>
        <h3 className='text-2xl font-bold mb-4 text-red-700'>SHOPPING CART</h3>
        <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
        <div className='md:w-2/3'>
            <div className='flex justify-between border-2 items-center mb-4 text-xs font-bold text-red-700'>
                <p>PRODUCTS</p>
            <div className='flex space-x-8 text-red-700'>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>SUB-TOTAL</p>
                <p>REMOVE</p>
            </div>
            </div>
            {cart.products.map((product)=>(
                <div key={product.id} className='flex items-center justify-between border-b p-3'>
                    <div className='md:flex items-center space-x-4'>
                        <img src={product.image} alt={product.name} className='w-16 h-16 object-contain rounded'></img>
                        <div className='flex-1 ml-4'>
                            <h3 className='text-lg font-semibold'>{product.name}</h3>
                        </div>
                    </div>
                    <div className='flex items-center space-x-12'>
                        <p>${product.price}</p>
                        <div className='flex justify-center items-center border'>
                            <button className='text-xl font-bold px-1.5 border-r'
                            onClick={()=>dispatch(decreaseQuantity(product.id))}>-</button>
                            <p className='text-xl px-2'>{product.quantity}</p>
                            <button className='text-xl px-1 border-l'
                             onClick={()=>dispatch(increaseQuantity(product.id))}>+</button>
                        </div>
                        <p>${(product.quantity*product.price).toFixed(2)}</p>
                        <button className='text-red-500 hover:text-red-700'
                        onClick={()=>dispatch(removeFromCart(product.id))}>
                            <FaTrashAlt/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
            <h3 className='text-sm font-bold mb-5 text-red-700'>CART TOTAL</h3>
            <div className='flex justify-between mb-5 border-b pb-1'>
                <span className='text-sm'>Total Items:</span>
                <span>{cart.totalQuantity}</span>
                </div>
                <div className='mb-4 border-b pb-2'>
                    <p>Shipping...</p>
                    <p className='ml-2'>Shipping to:{""}</p>
                    <span className='text-xs font-bold'>{address}</span>
                    <button className='text-blue-500 hover:underline mt-1 ml-2' 
                    onClick={()=>setIsModelopen(true)}>Change Address</button>
                </div>
                <div className='flex justify-between mb-4'>
                    <span>Total Price:</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <button className='w-full bg-red-600 text-white py-2 hover:bg-red-800'
                onClick={()=>navigate("/checkout")}>Proceed to Checkout</button>
        </div>
        </div>
        <Modal isModelopen={isModelopen} setIsModelopen={setIsModelopen}>
            <ChangeAddress setaddress={setaddress} setIsModelopen={setIsModelopen} />
        </Modal>
     </div>):(
     <div className='flex justify-center'>
        <img src={Emptycart}alt='' className='h-96'></img>
        </div>)}
    </div>
  )
}
export default Cart
