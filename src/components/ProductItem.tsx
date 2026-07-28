// 📁 src/components/ProductItem.tsx
import Image from 'next/image';

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductItem({ id, title, price, image }: ProductItemProps) {
  return (
    <div className='shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden'>
      {/* لینک رو حذف کردیم، فقط محتوا */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{price}$</p>
      </div>
    </div>
  );
}