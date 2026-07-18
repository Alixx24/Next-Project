import Link from "next/link";

interface IProductItemProps{
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
}

function ProductItem({ id, image, title, description, price }: IProductItemProps) {
    return (
        <div className='shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden'>
            <Link href={`/product/${id}`}>
                <img 
                    src={image} 
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className='p-4'>
                    <h2 className='font-bold text-lg truncate'>{title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                    <p className='mt-2 font-semibold text-blue-600'>
                        price: <span>{price} $</span>
                    </p>
                </div>
            </Link>
        </div>
    )
}
export default ProductItem