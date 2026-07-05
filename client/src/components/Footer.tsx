

const Footer = () => {
    const collections = ['New Arrivals', 'Men']
  return (
    <footer className='bg-bgBlack text-white pt-20 pb-10 '>
        <hr className='text-subtitleText/50 w-full '/>
        <div className="space">
            <div className='mt-10 mb-20'>
                <h1 className='text-9xl mb-5'>Keeva</h1>
                <p className='text-[#c9a87c] font-light tracking-[0.3em] uppercase font-sans'>Create the Look. Shop the Look. Earn from Style.</p>
            </div>


            <div className='flex flex-col gap-10 md:gap-0 md:flex-row justify-between md:items-center'>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="bg-[#c9a87c] size-2 rounded-full inline"></div>
                        <p className="uppercase text-[#f0ebe0] text-[10px] tracking-[0.3em]">coming soon</p>
                    </div>
                    <p className="w-3/4 mt-4 text-[#f0ebe0]">We're building something new at the intersection of fashion, community and commerce.</p>
                </div>

                <div className="flex gap-2 uppercase tracking-[0.3em] text-xs text-[#f0ebe0]">
                    <p>instagram</p>
                    <p>twitter</p>
                </div>
            </div>

            <div className="border-t border-subtitleText/50 mt-20 pt-5">
                <p className="text-xs text-[#c9a87c] uppercase tracking-[0.3em]">
                    @{new Date().getFullYear()} keeva
                </p>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer