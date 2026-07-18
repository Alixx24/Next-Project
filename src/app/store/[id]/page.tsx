import Container from "@/components/Container";

function Store() {
    return (
        <Container>
            <div className="grid grid-cols-12">
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
                <div className="col-span-3 p-4">
                    <img 
                        src="https://via.placeholder.com/300" 
                        alt="product image"
                        className="w-full h-auto rounded"
                    />
                </div>
                <div className="col-span-12 bg-slate-300 h-12">
                  
                </div>
            </div>
        </Container>
    )
}

export default Store;