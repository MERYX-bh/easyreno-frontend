import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import OwnerRegistration from './components/OwnerRegistration';
import CompanyRegistration from './components/CompanyRegistration';
import ConfirmationInscription from './components/ConfirmationRegistration';
import LoginPage from './components/LoginPage';
import ProfileInfo from './components/ProfileInfo';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirmation from './components/ResetPasswordConfirmation';

// Business Pages
import ProDashboard from './Pages/BusinessPages/ProDashboard';
import ProView from './Pages/BusinessPages/ProView';
import ProDetails from './Pages/BusinessPages/ProDetails';
import ProQuotes from './Pages/BusinessPages/ProQuotes';
import Customer from './Pages/BusinessPages/ProQuoteCustomer';
import ProContacts from './Pages/BusinessPages/ProContacts';
import ProExchanges from './Pages/BusinessPages/ProExchanges';
import ProExchangeDetail from './Pages/BusinessPages/ProExchangeDetail';
import ProConstructionView from './Pages/BusinessPages/ProConstructionView';
import ProConstructionInfos from './Pages/BusinessPages/ProConstructionInfos';
import ProSendQuote from './Pages/BusinessPages/ProSendQuote';
import ProHistory from './Pages/BusinessPages/ProHistory';
import ProPlanning from './Pages/BusinessPages/ProPlanning';
import ProInfos from './Pages/BusinessPages/ProInfos';
import ProAdd from './Pages/BusinessPages/ProAdd';

// User Pages
import OwnerDashboard from './Pages/UserPages/OwnerDashboard';
import CreateAd from './Pages/UserPages/CreateAd';
import ViewAds from './Pages/UserPages/ViewAds';
import AdDetails from './Pages/UserPages/AdDetails';
import OwnerPlanning from './Pages/UserPages/OwnerPlanning';
import OwnerProjects from './Pages/UserPages/OwnerProjects';
import OwnerProjectDetails from './Pages/UserPages/OwnerProjectDetails';
import ProjectTimeline from './Pages/UserPages/ProjectTimeline';
import TimelineStepDetail from './Pages/UserPages/TimelineStepDetail';
import RejectStepForm from './Pages/UserPages/RejectStepForm';
import ProjectDocuments from './Pages/UserPages/ProjectDocuments';
import OwnerExchanges from './Pages/UserPages/OwnerExchanges';
import OwnerExchangeDetails from './Pages/UserPages/OwnerExchangeDetails';
import OwnerQuotes from './Pages/UserPages/OwnerQuotes';
import OwnerInvoices from './Pages/UserPages/OwnerInvoices';
import OwnerHistory from './Pages/UserPages/OwnerHistory';
import NoAds from './Pages/UserPages/NoAds';
import OwnerOffers from './Pages/UserPages/OwnerOffers';
import OwnerBudget from './Pages/UserPages/OwnerBudget'; 

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscription-proprietaire" element={<OwnerRegistration />} />
          <Route path="/inscription-entreprise" element={<CompanyRegistration />} />
          <Route path="/confirmation" element={<ConfirmationInscription />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-confirmation" element={<ResetPasswordConfirmation />} />

       
          <Route path="/business">
            <Route path="pro-dashboard" element={<ProDashboard />} />
            <Route path="pro-view" element={<ProView />} />
            <Route path="pro-details/:id" element={<ProDetails />} />
            <Route path="pro-quotes/:adId" element={<ProQuotes />} />
            <Route path="history" element={<Customer />} />
            <Route path="pro-contacts/:id" element={<ProContacts />} />
            <Route path="exchanges" element={<ProExchanges />} />
            <Route path="exchange/:id" element={<ProExchangeDetail />} />
            <Route path="pro-construction-view" element={<ProConstructionView />} />
            <Route path="construction/:id" element={<ProConstructionInfos />} />
            <Route path="pro-send-quote" element={<ProSendQuote />} />
            <Route path="pro-history" element={<ProHistory />} />
            <Route path="planning" element={<ProPlanning />} />
            <Route path="pro-infos/:projectId/:taskId" element={<ProInfos />} />
            <Route path="construction/:projectId/add-step" element={<ProAdd />} />
          </Route>

         
          <Route path="/owner">
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="create-ad" element={<CreateAd />} />
            <Route path="view-ads" element={<ViewAds />} />
            <Route path="ad/:id" element={<AdDetails />} />
            <Route path="ad/:id/offers" element={<OwnerOffers />} />
            <Route path="no-ads" element={<NoAds />} />
            <Route path="planning" element={<OwnerPlanning />} />
            <Route path="projects" element={<OwnerProjects />} />
            <Route path="project/:id" element={<OwnerProjectDetails />} />
            <Route path="project/:id/timeline" element={<ProjectTimeline />} />
            <Route path="project/:id/step/:stepId" element={<TimelineStepDetail />} />
            <Route path="project/:id/step/:stepId/reject" element={<RejectStepForm />} />
            <Route path="project/:id/documents" element={<ProjectDocuments />} />
            <Route path="exchanges" element={<OwnerExchanges />} />
            <Route path="exchanges/:id" element={<OwnerExchangeDetails />} />
            <Route path="quotes" element={<OwnerQuotes />} />
            <Route path="invoices" element={<OwnerInvoices />} />
            <Route path="history" element={<OwnerHistory />} />
            <Route path="budget" element={<OwnerBudget />} /> // Ajoutez cette ligne
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;