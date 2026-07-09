import { EllipsisIcon, HandshakeIcon, Heart, MessageCircle, Send, SeparatorVertical, Share } from 'lucide-react'
import { useState } from 'react'

const OutfitCard = ({img,title,subtitle, creator}: {img:string, title:string, subtitle:string, creator: string}) => {

    const [post, setPosts] = useState({
        likes: 0,
        comments: 0
    })
  return (
    <div className='pb-4 h-130 w-120 rounded-lg flex gap-5'>
        
        <div className='h-full relative'>
            <div className='absolute text-xs font-bold rounded-full   top-0 w-full flex py-2 px-4 justify-between items-center text-actionsColor'>
                <div className='bg-white cursor-pointer px-2 py-1 rounded-full'>
                    {creator}
                </div>
                
                <EllipsisIcon color='white' size={20} className='cursor-pointer'/>
            </div>
            <img src={img} alt="" className='object-cover rounded-t-lg object-top h-3/4 w-full'/>
            <div className='mt-5 px-3'>
                <div className='flex justify-between items-center mb-2'>
                    <div className='flex items-center gap-5'>
                        <button className='bg-actionsColor py-2 px-4 rounded-full text-white font-bold text-xs'>Buy full Look</button>
                        <div className='bg-actionsColor flex justify-center items-center rounded-full size-12 cursor-pointer'>
                            <SeparatorVertical />
                        </div>
                    </div>
                    <h2 className='text-lg font-bold'>$14,000</h2>
                    
                    
                </div>
                
                <h2 className='font-medium mb-2'>{title}</h2>
                <p className='text-sm '>
                    {subtitle}
                    <span className='ml-2 text-subtitleText text-xs'> Read more</span>
                </p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-5 pt-4' >
            <div>
                <Heart size={25} />
                <p className='text-sm font-bold '>{post.likes || ""}</p>
            </div>
            
            <Send size={25} />
            <HandshakeIcon size={25} />
        </div>
        
    </div>
  )
}

export default OutfitCard