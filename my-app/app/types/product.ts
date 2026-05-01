export interface Product {
    id: string
    name: string
    price: number
    description: string
    images: { url: string; alt: string }[]
    specs: string[]
    threeSixtyImages?: string[]
}

export interface CartItem extends Product {
    quantity: number
}
