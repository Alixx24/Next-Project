import CartItem from "@/components/CartItem"
import Container from "@/components/Container"

function Cart() {
    return (
        <Container>
            <div className="grid grid-cols-3 gap-4">
                {/* لیست آیتم‌های سبد خرید */}
                <div className="col-span-2">
                    <CartItem key={1} />
                    <CartItem key={2} />
                    <CartItem key={3} />
                </div>
                
                <div className="col-span-1 border shadow-md text-right p-4 rounded-lg h-fit sticky top-4">
                    <h3 className="font-bold text-lg mb-2">summary</h3>
                    <p>amount: 3</p>
                    <p> total: 60$</p>
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                       Submit Order
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Cart;