import logo from "../assets/icons/hm.png";

function EnhancedFooter() {
  const socialLinks = [
    {
      name: "Telegram",
      icon: "📱",
      url: "https://t.me/farmcat",
      color: "hover:text-cyan-400",
      bgColor: "hover:bg-cyan-400/20",
    },
    {
      name: "X (Twitter)",
      icon: "🐦",
      url: "https://twitter.com/farmcat",
      color: "hover:text-sky-400",
      bgColor: "hover:bg-sky-400/20",
    },
    {
      name: "Discord",
      icon: "💬",
      url: "https://discord.gg/farmcat",
      color: "hover:text-indigo-400",
      bgColor: "hover:bg-indigo-400/20",
    },
    {
      name: "Medium",
      icon: "📝",
      url: "https://medium.com/@farmcat",
      color: "hover:text-teal-400",
      bgColor: "hover:bg-teal-400/20",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-gradient-to-r from-slate-900/90 to-cyan-900/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
                <img src={logo} className="w-10 h-10" />
              </div>
              {/* <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Farmcat
              </span> */}
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                Farmcat
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The future of DeFi on Binance Smart Chain. Join our growing
              community and explore the ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">
              Quick Links
            </h4>
            <div className="space-y-3">
              {["Documentation", "Whitepaper", "Audit Report", "Brand Kit"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm hover:translate-x-1 transform duration-200"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Legal</h4>
            <div className="space-y-3">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Disclaimer",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">
              Join Our Community
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay connected and get the latest updates
            </p>
            {/* <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.bgColor}`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors text-lg`}
                  >
                    {social.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-medium text-white ${social.color} transition-colors text-xs`}
                    >
                      {social.name}
                    </div>
                  </div>
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="font-bold text-white mb-2 text-xl">
              🚀 Stay Ahead of the Moon
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Be the first to know about new features, partnerships, and
              exclusive community events
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Farmcat. All rights reserved.
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Social Links Row for Mobile */}
          <div className="flex md:hidden gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center bg-white/10 ${social.bgColor} rounded-lg transition-all duration-300 hover:scale-110 text-lg`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Contract Info */}
          <div className="text-center md:text-right">
            <div className="text-xs text-gray-400 mb-1">
              Contract Address (BSC)
            </div>
            <div className="font-mono text-xs text-gray-300 bg-black/20 px-3 py-1 rounded-lg border border-white/10">
              0x62bf832C5a817C160eb3504A11E96FB13681db15
            </div>
          </div>
        </div>

        {/* Floating Social Media Bar */}
        <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
          <div className="flex flex-col gap-3 p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-12 h-12 flex items-center justify-center ${social.bgColor} border border-white/10 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg text-lg`}
                title={social.name}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {social.icon}
                <div className="absolute right-full mr-3 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {social.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default EnhancedFooter;
