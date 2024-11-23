import React, { Fragment, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Loading from './components/Loading'; // Ensure this component exists and is functional

import './index.css'; // Ensure this file exists and has valid styles

// Initialize React Query Client
const queryClient = new QueryClient();

// Lazy-loaded components
const Header = lazy(() => import("CMS_Registry/Header"));
const Footer = lazy(() => import("CMS_Registry/Footer"));
const Hero = lazy(() => import("CMS_Registry/Hero"));
const About = lazy(() => import("CMS_Registry/About"));
const LabHome = lazy(() => import("CMS_Registry/LabHome"));
const Project = lazy(() => import("CMS_Registry/Project"));
const Experience = lazy(() => import("CMS_Registry/Experience"));
const Contact = lazy(() => import("CMS_Registry/Contact"));
const ChatbotButton = lazy(() => import("CMS_Registry/ChatbotButton"));
const LabIndex = lazy(() => import("CMS_Registry/LabIndex"));
const LabDetail = lazy(() => import("CMS_Registry/LabDetail"));

// Main content component
function Main() {
  return (
    <Fragment>
      <Hero SecretKey={process.env.EXPOSE_SECRET_KEY} />
      <About SecretKey={process.env.EXPOSE_SECRET_KEY} />
      <LabHome SecretKey={process.env.EXPOSE_SECRET_KEY} />
      <Project SecretKey={process.env.EXPOSE_SECRET_KEY} />
      <Experience SecretKey={process.env.EXPOSE_SECRET_KEY} />
      <Contact SecretKey={process.env.EXPOSE_SECRET_KEY} />
    </Fragment>
  );
}

// App Component
const App = () => (
  <ChakraProvider>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Header SecretKey={process.env.EXPOSE_SECRET_KEY} />
          <ChatbotButton />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/labs" element={<LabIndex SecretKey={process.env.EXPOSE_SECRET_KEY} />} />
            <Route path='/lab/:blogId' element={<LabDetail SecretKey={process.env.EXPOSE_SECRET_KEY} />} />
          </Routes>
          <Footer SecretKey={process.env.EXPOSE_SECRET_KEY} />
        </Suspense>
      </QueryClientProvider>
    </HashRouter>
  </ChakraProvider>
);

// Render the App
const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure your index.html includes a <div id='app'></div>.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
