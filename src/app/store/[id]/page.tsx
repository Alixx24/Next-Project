import AddToCart from "@/components/AddToCart";
import Container from "@/components/Container";
import { Suspense } from "react";

interface IProductItemPage {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

async function getProduct(id: string) {
    const res = await fetch(`http://localhost:8000/product/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

interface ProductProps {
    params: { id: string };
}

async function Product({ params }: ProductProps) {
    const data: IProductItemPage = await getProduct(params.id);
    
    return (
        <Container>
            <div className="grid grid-cols-12">
                <div className="col-span-9 p-4">
                    <h2 className="font-bold text-2xl">{data.title}</h2>
                    <span>{data.description}</span>
                    <p>price: <span>{data.price}$</span></p>
                    <AddToCart id={params.id} />
                </div>
                <div className="col-span-3 p-4">
                    <img 
                        src={data.image || "https://via.placeholder.com/300"} 
                        alt="product image"
                        className="w-full h-auto rounded"
                    />
                </div>
                <div className="col-span-12 bg-slate-300 h-12">
                    {/* سایر محتوا */}
                </div>
            </div>
        </Container>
    )
}

export default Product;