import AccountProfile from "../../components/app/account/AccountProfile";
import { getCurrentUser } from "../../utils/user/getCurrentUser";




const Account = () => {
    const user = getCurrentUser()
    console.log(user)
    if(!user){
        return
    }
    return(
        <div className='section-scrolling h-screen overflow-y-scroll no-scrollbar'>
            {user.role === 'brand' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'brand' followers={user.followers} products={user.products} profilePic={user.profilePic} location={user.location}/>}

            {user.role === 'customer' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'customer' followers={user.following}  profilePic={user.profilePic} location={user.location}/>}

            {user.role === 'creator' && <AccountProfile id={user.id} name={user.name} username={user.username} bio={user.bio} role= 'creator' followers={user.followers} outfits={user.outfits} location={user.location}   profilePic={user.profilePic}/>}
            
        </div>
    )
}

export default Account