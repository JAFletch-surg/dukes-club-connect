import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Exams, AnnualWeekend, Contact, Join } from "./pages/PlaceholderPages";
import EventsPage from "./pages/EventsPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import EventDetailPage from "./pages/EventDetailPage";
import ContactPage from "./pages/ContactPage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ScrollToTop from "./components/ScrollToTop";

// Members Dashboard
import MembersLayout from "./components/members/MembersLayout";
import MembersDashboard from "./pages/members/MembersDashboard";
import VideoArchive from "./pages/members/VideoArchive";
import FRCSResources from "./pages/members/FRCSResources";
import QuestionBank from "./pages/members/QuestionBank";
import FellowshipsPage from "./pages/members/FellowshipsPage";
import MemberDirectory from "./pages/members/MemberDirectory";
import MemberProfile from "./pages/members/MemberProfile";
import { LiveWebinars, Podcasts } from "./pages/members/PlaceholderMemberPages";
import { AdminUserManagement, AdminContentManager, AdminAnalytics, AdminRoleManagement } from "./pages/members/AdminPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<PostDetailPage />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/annual-weekend" element={<AnnualWeekend />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Members Dashboard */}
          <Route path="/members" element={<MembersLayout />}>
            <Route index element={<MembersDashboard />} />
            <Route path="videos" element={<VideoArchive />} />
            <Route path="webinars" element={<LiveWebinars />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="frcs" element={<FRCSResources />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="fellowships" element={<FellowshipsPage />} />
            <Route path="directory" element={<MemberDirectory />} />
            <Route path="profile" element={<MemberProfile />} />
            <Route path="admin/users" element={<AdminUserManagement />} />
            <Route path="admin/content" element={<AdminContentManager />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="admin/roles" element={<AdminRoleManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
