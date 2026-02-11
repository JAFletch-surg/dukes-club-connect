import { Twitter, Instagram, Linkedin } from "lucide-react";

const socialPosts = [
  {
    platform: "Twitter",
    icon: Twitter,
    handle: "@DukesClubUK",
    content: "Excited to announce our 2026 Annual Weekend programme! Registration now open. #ColorectalSurgery #SurgicalTraining",
    time: "2h ago",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    handle: "@dukesclub",
    content: "Behind the scenes at our robotic surgery masterclass. Incredible turnout and hands-on learning! 🔬",
    time: "1d ago",
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    handle: "Dukes' Club",
    content: "Congratulations to our members who passed their FRCS examinations this sitting. Outstanding results! 🎉",
    time: "3d ago",
  },
];

const SocialFeedSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: "hsl(220, 80%, 55%)" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-2">Connect With Us</p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white">
            Social Feed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialPosts.map((post, i) => (
            <div
              key={i}
              className="group p-6 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <post.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{post.handle}</p>
                  <p className="text-xs text-white/60">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialFeedSection;
