import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { amanuel3 } from '../../assets';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-1 border-teal-100'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            
              <Link to='/' className='self-center whitespace-nowrap 
                              text-2xl sm:text-3xl font-semibold dark:text-white flex '>
                                
                                   
                                  <img src={amanuel3} alt='logo' className='w-10 h-10 md:h-12 md:h-12 inline' />
                                  
                                  <p className=' text-[16px] md:text-[18px] font-[cursive] italic tracking-wide ml-2 text-pink-500'
                  style={{ fontFamily: 'Garamond, Georgia, serif' }}> Amanuel Hub</p>
                                  
                
                              </Link>
              
              
            
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/muller4341'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Different Projects
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Amanuel Hub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/muller4341'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Amanuel Hub"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://web.facebook.com/login/identify/?ctx=not_my_account' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/muller4341' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}