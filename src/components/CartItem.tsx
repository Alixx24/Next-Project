function CartItem() {
    return (
        <div className="grid grid-cols-12 bg-slate-100 mb-2">
          <div className="col-span-9 p-4">
                    <h2 className="font-bold text-2xl">product 1</h2>
                    <span>desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis nisi autem voluptatibus earum, iste voluptates iusto minus accusantium quibusdam accusamus eos repellendus obcaecati molestias ipsam alias. Totam, blanditiis consectetur.</span>
                    <p>price: <span>20$</span></p>

                    <div className="mt-2">
                        <button className="py-2 px-4 rounded bg-sky-500 text-white">+</button>
                        <span className="mx-4">3</span>
                        <button className="py-2 px-4 rounded bg-sky-500 text-white">-</button>
                    </div>
                </div>
    
          
        </div>
    )
}
export default CartItem