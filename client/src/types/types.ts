export interface Users {
    id: string,
    name: string,
    username: string,
    profilePic: string,
    dateOfBirth: string,
    location: string
    role: 'creator' | 'customer' | 'vendor',
    followers?: number

}

export interface Outfits{
    id: string,
    creatorId: number
    image: string[],
    caption: string;
    taggedProducts: string[],
    likes: number,
    time: string
}

export interface Products {
    id: string;
    vendorId: number;
    caption: string;
    description: string;
    category: string;
    name: string
    price: number;
    images: string[];
    stock: number;
    likes: number;
    createdAt: string;
}