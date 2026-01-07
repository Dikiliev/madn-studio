import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, TeamPage, WorkPage, ProjectDetailsPage, CareersPage, ContactPage, LegalPage, NotFoundPage } from '@pages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Главная страница */}
      <Route path="/" element={<HomePage />} />
      
      {/* Страницы */}
      <Route path="/team" element={<TeamPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:projectId" element={<ProjectDetailsPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Юридические страницы */}
      <Route path="/privacy" element={<LegalPage type="privacy" />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/cookies" element={<LegalPage type="cookies" />} />
      
      {/* 404 - должна быть последней */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

