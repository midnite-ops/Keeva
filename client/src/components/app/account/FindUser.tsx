import AccountProfile from './AccountProfile'
import { getStorage } from '../../../utils/localStorage/initializeStorage'
import type { Users } from '../../../types/userTypes'

const FindUser = () => {
  const user = getStorage<Users>('users').find((user) => user.id === window.location.pathname.split('/')[4])
    console.log(user, getStorage('products'))
    if(!user){
        return
    }
    return(
        <div className='section-scrolling h-screen mt-0 overflow-y-auto no-scrollbar'>
            {user.role === 'brand' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'brand' followers={user.followers} products={user.products} profilePic={user.profilePic} location={user.location}/>}

            {user.role === 'customer' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'customer' followers={user.following}  profilePic={user.profilePic} location={user.location}/>}

            {user.role === 'creator' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'creator' followers={user.followers} outfits={user.outfits} location={user.location}   profilePic={user.profilePic}/>}
            
        </div>
    )
}

export default FindUser