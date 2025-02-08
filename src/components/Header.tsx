import React, { useState, useEffect } from "react";
import { Navbar, IconButton, Menu, MenuHandler, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
    const userData = type === 'owner' 
      ? JSON.parse(localStorage.getItem('ownerData') || '{}')
      : JSON.parse(localStorage.getItem('companyData') || '{}');
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUserData');
    navigate('/');
  };

  const ownerMenuItems = [
    { label: "Mon tableau de bord", link: "/owner/dashboard" },
    { label: "Créer une annonce", link: "/owner/create-ad" },
    { label: "Voir mes annonces en ligne", link: "/owner/view-ads" },
    { label: "Mes chantiers", link: "/owner/projects" },
    { label: "Mes échanges", link: "/owner/exchanges" },
    { label: "Mes devis", link: "/owner/quotes" },
  ];

  const companyMenuItems = [
    { label: "Tableau de bord", link: "/business/pro-dashboard" },
    { label: "Consulter les annonces", link: "/business/pro-view" },
    { label: "Mes chantiers", link: "/business/pro-construction-view" },
    { label: "Mes échanges", link: "/business/exchanges" },
    { label: "Mes devis clients", link: "/business/history" },
  ];

  const menuItems = userType === 'owner' ? ownerMenuItems : companyMenuItems;

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3 bg-blue-gray-50/80 backdrop-blur-sm border-b border-blue-gray-100">
      <div className="flex items-center justify-between w-full">
        <Menu open={isProfileMenuOpen} handler={setIsProfileMenuOpen} placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text" className="h-10 w-10 text-blue-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>
              <Typography variant="small" className="font-bold">Mon profil</Typography>
              <Typography variant="small">
                Type de compte: <span className="font-bold">{userType === 'owner' ? 'Propriétaire' : 'Entreprise'}</span>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="small" className="font-bold">Mes informations</Typography>
              {userInfo && Object.entries(userInfo).map(([key, value]) => (
                <Typography key={key} variant="small">
                  <span className="font-bold">{key}:</span> {value as string}
                </Typography>
              ))}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          </MenuList>
        </Menu>

        <div className="flex-grow"></div>

        <div className="flex items-center gap-4">
          <IconButton variant="text" className="h-10 w-10 text-blue-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </IconButton>

          <Menu open={isMainMenuOpen} handler={setIsMainMenuOpen} placement="bottom-end">
            <MenuHandler>
              <IconButton variant="text" className="h-10 w-10 text-blue-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </IconButton>
            </MenuHandler>
            <MenuList>
              {menuItems.map((item, index) => (
                <MenuItem key={index}>
                  <Link to={item.link} className="w-full block">{item.label}</Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;