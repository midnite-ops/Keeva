import { EllipsisIcon, Heart, MessageCircle, Share } from 'lucide-react'

const OutfitCard = ({img,title,subtitle, creator}: {img:string, title:string, subtitle:string, creator: string}) => {
  return (
    <div className='bg-white pb-4 h-130 w-80 rounded-lg relative'>
        <div className='absolute text-xs font-bold rounded-full   top-0 w-full flex p-2 justify-between items-center text-actionsColor'>
            <div className='bg-white px-2 py-1 rounded-full'>
                {creator}
            </div>
            
            <EllipsisIcon color='white' size={20}/>
        </div>
        <img src={img} alt="" className='object-cover rounded-t-lg object-top h-3/4 w-full'/>
        <div className='mt-5 px-3'>
            <div className='flex justify-between mb-2'>
                <div className='flex items-center gap-2'>
                    <Heart size={20} />
                    <MessageCircle size={20}/>
                    <Share size={20}/>
                </div>
                <button className='bg-actionsColor py-2 px-4 rounded-full text-white font-bold text-xs'>Buy full Look</button>
            </div>
            
            <h2 className='font-medium mb-2'>{title}</h2>
            <p className='text-sm '>
                {subtitle}
                <span className='ml-2 text-subtitleText text-xs'> Read more</span>
            </p>
        </div>
    </div>
  )
}

export default OutfitCard