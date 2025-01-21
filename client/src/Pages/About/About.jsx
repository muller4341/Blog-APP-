import {muller} from '../../assets'
const About = () => {

    return (  
        <div className=" md:py-20 py-28 w-100% px-4">
           <h1 className="text-[16px] font-bold text-center 
           md:text-[20px] bg-gradient-to-r  
            from-pink-500 to-yellow-500 bg-clip-text
             text-transparent  font-[cursive] italic tracking-wide ml-2 "
               style={{ fontFamily: 'Garamond, Georgia, serif' }}>About this page </h1>
               <div className='flex flex-col  py-4 px-4 border-b border-gray-500 justify-center items-center'>

                <img src= {muller} alt='muller ' className='w-11/12 h-[260PX] md:w-2/5 md:h-[340px]
                border rounded-md ' />
                <div>
                <p className="text-[10px]  text-center 
           md:text-[16px] bg-gradient-to-r  
            from-orange-500 to-yellow-500 bg-clip-text
             text-transparent  font-[cursive] italic tracking-wide ml-2 "
               style={{ fontFamily: 'Garamond, Georgia, serif' }}> Muluken Walle(Muller)</p>
                <p className="text-[10px]  text-center 
          md:text-[16px] bg-gradient-to-r  
            from-orange-500 to-yellow-500 bg-clip-text
             text-transparent  font-[cursive] italic tracking-wide ml-2 "
               style={{ fontFamily: 'Garamond, Georgia, serif' }}> Software devloper </p>
                <p className="text-[10px]  text-center 
          md:text-[16px] bg-gradient-to-r  
            from-orange-500 to-yellow-500 bg-clip-text
             text-transparent  font-[cursive] italic tracking-wide ml-2 "
               style={{ fontFamily: 'Garamond, Georgia, serif' }}> The devloper and the admin of this website</p>
                </div>
               </div>
               <div className=' py-2 px-2 md:px-28 py-10'>

                <p className='font-bold md:text-[24px] text-[18px] md:py-4 py-2'>About Amanuel Hub</p>
                <p className=' md:text-[18px] text-[16px] py-1'>
                Welcome to Amanuel Hub—a platform dedicated to celebrating the rich history, culture, and people of Amanuel. Our mission is to preserve and share the stories of Amanuel, past and present, while fostering a vibrant community of individuals connected to its legacy.
                </p>
                <p className=' md:text-[18px] text-[16px] py-1'>
                At Amanuel Hub, you can explore the history of Amanuel and its people, stay informed about the current events shaping the community, and read inspiring biographies of notable individuals born in Amanuel. Whether you're a resident, a member of the diaspora, or simply curious to learn more, this platform offers a unique glimpse into the life and heritage of Amanuel.
                </p>
                <div>
                <p className='font-bold md:text-[24px] text-[18px] md:py-4 py-2'>
                What We Offer
                </p>
                <p className='f md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
                <span className='font-semibold'>Discover History:</span> Learn about the origins, traditions, and milestones that define Amanuel's identity. 
                </p>
                <p className=' md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
               <span className='font-semibold'> Stay Updated:</span> Stay informed about the latest news, events, and developments in Amanuel.
                </p>
                <p className=' md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
               <span className='font-semibold' >Inspiring Stories:</span> Read biographies and personal stories of people who trace their roots to Amanuel.
                </p>
                </div>
                <div>
                    <p className='font-bold md:text-[24px] text-[18px] md:py-4 py-2'>Join Our Community</p>
                    <p className=' md:text-[18px] text-[14px] py-1'>At Amanuel Hub, we believe in the power of collaboration and contribution. Anyone, from anywhere in the world, can:</p>
                    <p className=' md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
                    <span className='font-semibold'>Register and Explore:</span> Gain access to a growing library of posts and stories.
                    </p>
                    <p className=' md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
                    <span className='font-semibold'>Engage and Contribute:</span> Share your thoughts and comments on posts.
                    </p >
                    <p className=' md:text-[18px] text-[14px] py-1 px-2 md:px-4'>
                        <span className='font-semibold'> Become a Content Creator:</span> With meaningful contributions and active participation, you can earn the privilege to create and share your own posts.</p>
                
                <p className=' md:text-[18px] text-[16px] py-1'>
                Join us in celebrating Amanuel's heritage, connecting with its people, and building a vibrant online community. Together, let's ensure the stories of Amanuel continue to inspire generations to come.


                </p>
                </div>

               </div>

            
        </div>
    );
}

export default About;
 