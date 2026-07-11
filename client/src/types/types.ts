export interface Users {
    id: number,
    name: string,
    username: string,
    profilePic: string,
    dateOfBirth: string,
    location: string
    role: 'creator' | 'customer' | 'vendor',

}

export interface Outfits{
    id: number,
    creatorId: number
    image: string[],
    caption: string;
    taggedProducts: object[],
    likes: number,
    time: string
}

export interface Products {
    id: number;
    vendorId: number;
    caption: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    stock: number;
    likes: number;
    createdAt: string;
}