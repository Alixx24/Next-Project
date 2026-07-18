import Container from '@/components/Container'
import ProductItem from '@/components/ProductItem'
import Link from 'next/link'
import React from 'react'

function Store() {
    return (
        <Container>
            <h1 className='text-left py-4'>home</h1>
            <div className='grid grid-cols-4 gap-4'>
                <Link href={'/store/${item.id}'}>
                    <ProductItem />
                </Link>
            </div>
        </Container>
    )
}

export default Store