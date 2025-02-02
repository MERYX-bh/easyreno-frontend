import React, { useEffect } from 'react'; 
 import { useLocation, useNavigate } from 'react-router-dom'; 
 import Header from './Header'; 

 interface LayoutProps { 
   children: React.ReactNode; 
 } 

 function Layout({ children }: LayoutProps) { 
   const location = useLocation(); 
   const navigate = useNavigate(); 
   const hideHeaderPaths = [ 
     '/', 
     '/inscription-proprietaire', 
     '/inscription-entreprise', 
     '/forgot-password', 
     '/reset-password', 
     '/reset-confirmation', 
     '/login', 
     '/confirmation' 
   ]; 

   const shouldShowHeader = !hideHeaderPaths.includes(location.pathname); 

   useEffect(() => { 
     const userType = localStorage.getItem('userType'); 
     if (location.pathname === '/' && userType) { 
       if (userType === 'owner') { 
         navigate('/owner/dashboard'); 
       } else if (userType === 'company') { 
         navigate('/business/pro-dashboard'); 
       } 
     } 
   }, [navigate, location]); 

   return ( 
     <div className='flex flex-col min-h-screen'> 
       {shouldShowHeader && <Header />}
      
       {children} 
     </div> 
   ); 
 } 

 export default Layout; 
